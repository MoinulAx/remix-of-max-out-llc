import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

/**
 * Tables that follow the admin-inbox shape: append-only submissions with
 * a `status` column and a `created_at` timestamp. Each row also carries
 * indexed text columns we let the user search with `ilike`.
 */
export type InboxTable =
  | 'inquiries'
  | 'applications'
  | 'job_applications'
  | 'quote_requests';

type RowOf<T extends InboxTable> = Database['public']['Tables'][T]['Row'];

export type InboxFilters = {
  /** "all" disables the filter; otherwise must equal a row.status value. */
  status: string;
  /** Only used by the inquiries inbox — "all" disables. */
  type?: string;
  /** Free-text query, matched (case-insensitive) against `searchColumns`. */
  search: string;
  /** ISO date strings (yyyy-MM-dd) — inclusive. */
  fromDate?: string;
  toDate?: string;
};

type Options<T extends InboxTable> = {
  /** Columns the search box should `ilike` across. */
  searchColumns: (keyof RowOf<T> & string)[];
  /** Whether the table has a `type` column the UI can filter on. */
  hasTypeColumn?: boolean;
  pageSize?: number;
  /**
   * Optional initial filter values — used when the page is opened with
   * query-string filters (e.g. linked from the dashboard activity widget).
   */
  initialFilters?: Partial<InboxFilters>;
};

const DEFAULT_PAGE_SIZE = 25;

/**
 * Server-paginated, server-filtered admin inbox fetcher.
 *
 * - Uses Supabase `range()` for pagination (no `.limit(1000)` cliff).
 * - Uses `count: 'exact'` so the UI can show a real total.
 * - Search uses `or(... ilike ...)` against trigram-indexed columns.
 * - Filters and search trigger a refetch and reset the page to 0.
 * - Cancels stale fetches with a generation counter so out-of-order
 *   responses don't overwrite newer data.
 */
export function useAdminInbox<T extends InboxTable>(
  table: T,
  options: Options<T>
) {
  const { searchColumns, hasTypeColumn = false, pageSize = DEFAULT_PAGE_SIZE, initialFilters } = options;
  const { toast } = useToast();

  // Stabilise the searchColumns array reference — callers often pass an
  // inline literal which is a new array on every render, causing fetchPage
  // to recreate and the fetch effect to fire in an infinite loop.
  const searchColumnsKey = searchColumns.join(',');

  // Keep toast in a ref so it never appears in fetchPage's dep array.
  const toastRef = useRef(toast);
  toastRef.current = toast;

  const [rows, setRows] = useState<RowOf<T>[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<InboxFilters>({
    status: 'all',
    type: hasTypeColumn ? 'all' : undefined,
    search: '',
    ...initialFilters,
  });

  // Debounce the search string so each keystroke doesn't fire a query.
  const [debouncedSearch, setDebouncedSearch] = useState('');
  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(filters.search.trim()), 300);
    return () => clearTimeout(id);
  }, [filters.search]);

  // Whenever any filter changes, jump back to page 0.
  useEffect(() => {
    setPage(0);
  }, [filters.status, filters.type, filters.fromDate, filters.toDate, debouncedSearch]);

  const generation = useRef(0);

  const fetchPage = useCallback(async () => {
    const myGen = ++generation.current;
    setLoading(true);
    setError(null);

    // The generic <T> over union table names confuses the supabase-js
    // column-name narrowing on `.eq('status', ...)`, so we step through `any`
    // for the chained filter calls. The actual column names are guarded at
    // the call site (only inbox tables are allowed) and through `Options`.
    /* eslint-disable @typescript-eslint/no-explicit-any */
    let query: any = (supabase as any)
      .from(table)
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(page * pageSize, page * pageSize + pageSize - 1);

    if (filters.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }
    if (hasTypeColumn && filters.type && filters.type !== 'all') {
      query = query.eq('type', filters.type);
    }
    if (filters.fromDate) {
      query = query.gte('created_at', `${filters.fromDate}T00:00:00`);
    }
    if (filters.toDate) {
      query = query.lte('created_at', `${filters.toDate}T23:59:59.999`);
    }
    if (debouncedSearch) {
      // Escape PostgREST OR delimiters so user-typed commas/parens don't break the filter.
      const safe = debouncedSearch.replace(/[(),%]/g, ' ').trim();
      if (safe) {
        const cols = searchColumnsKey.split(',');
        const orExpr = cols.map((col) => `${col}.ilike.%${safe}%`).join(',');
        query = query.or(orExpr);
      }
    }

    const { data, error: queryError, count } = await query;
    /* eslint-enable @typescript-eslint/no-explicit-any */

    // Drop the response if a newer fetch has started in the meantime.
    if (myGen !== generation.current) return;

    if (queryError) {
      setError(queryError.message);
      toastRef.current({
        title: `Failed to load ${table.replace('_', ' ')}`,
        description: queryError.message,
        variant: 'destructive',
      });
    } else {
      setRows((data ?? []) as unknown as RowOf<T>[]);
      setTotal(count ?? 0);
    }
    setLoading(false);
  }, [table, page, pageSize, filters.status, filters.type, filters.fromDate, filters.toDate, debouncedSearch, hasTypeColumn, searchColumnsKey]);

  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  // Subscribe to realtime changes for this table. Any insert/update/delete
  // triggers a refetch of the current page so admins see new submissions
  // (and status changes) without manually refreshing.
  useEffect(() => {
    const channel = supabase
      .channel(`admin-inbox-${table}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table },
        () => {
          fetchPage();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, fetchPage]);

  const setFilters = useCallback((patch: Partial<InboxFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...patch }));
  }, []);

  const clearFilters = useCallback(() => {
    setFiltersState({
      status: 'all',
      type: hasTypeColumn ? 'all' : undefined,
      search: '',
      fromDate: undefined,
      toDate: undefined,
    });
  }, [hasTypeColumn]);

  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const hasActiveFilters = useMemo(() => {
    return (
      filters.status !== 'all' ||
      (hasTypeColumn && filters.type !== 'all') ||
      !!filters.fromDate ||
      !!filters.toDate ||
      !!filters.search.trim()
    );
  }, [filters, hasTypeColumn]);

  return {
    rows,
    setRows,
    total,
    page,
    pageCount,
    pageSize,
    setPage,
    loading,
    error,
    filters,
    setFilters,
    clearFilters,
    hasActiveFilters,
    refetch: fetchPage,
  };
}