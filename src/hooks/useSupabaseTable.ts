import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type AdminTableName = 'partners' | 'careers' | 'roster' | 'content_hub_posts';

type RowOf<T extends AdminTableName> = Database['public']['Tables'][T]['Row'];

type Options = {
  /** Column to order by. Defaults to created_at desc. */
  orderBy?: string;
  ascending?: boolean;
};

/**
 * Lightweight hook for fetching a Supabase table from the admin panel.
 * Owns loading/error state and exposes a refetch + a setter for optimistic UI.
 */
export function useSupabaseTable<T extends AdminTableName>(
  table: T,
  options: Options = {}
) {
  const { orderBy = 'created_at', ascending = false } = options;
  const { toast } = useToast();
  const [rows, setRows] = useState<RowOf<T>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order(orderBy, { ascending });
    if (error) {
      setError(error.message);
      toast({
        title: `Failed to load ${table}`,
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setRows((data ?? []) as RowOf<T>[]);
    }
    setLoading(false);
  }, [table, orderBy, ascending, toast]);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { rows, setRows, loading, error, refetch };
}