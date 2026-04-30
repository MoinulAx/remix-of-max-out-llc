import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

import { useAdminInbox } from '@/hooks/useAdminInbox';
import { InboxFilters } from '@/components/admin/InboxFilters';
import { PaginationBar } from '@/components/admin/PaginationBar';
import { SubmissionList } from '@/components/admin/SubmissionList';
import type { Database } from '@/integrations/supabase/types';

type Quote = Database['public']['Tables']['quote_requests']['Row'];

const STATUS_OPTIONS_FILTER = [
  { value: 'all', label: 'All statuses' },
  { value: 'new', label: 'New' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'closed', label: 'Closed' },
  { value: 'archived', label: 'Archived' },
];
const STATUS_OPTIONS_ROW = STATUS_OPTIONS_FILTER.filter((s) => s.value !== 'all');

const AdminQuoteRequests: React.FC = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const initialStatus = searchParams.get('status') ?? undefined;
  const {
    rows, setRows, total, page, pageCount, pageSize, setPage,
    loading, error, filters, setFilters, clearFilters, hasActiveFilters, refetch,
  } = useAdminInbox('quote_requests', {
    searchColumns: ['name', 'email', 'phone', 'message', 'service_type'],
    initialFilters: initialStatus ? { status: initialStatus } : undefined,
  });
  const quotes = rows as Quote[];

  const updateStatus = async (id: string, status: string) => {
    const previous = quotes;
    setRows((prev) => (prev as Quote[]).map((q) => (q.id === id ? { ...q, status } : q)) as typeof prev);
    const { error } = await supabase.from('quote_requests').update({ status }).eq('id', id);
    if (error) {
      setRows(previous as typeof rows);
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
    }
  };

  const deleteQuote = async (id: string) => {
    const previous = quotes;
    setRows((prev) => (prev as Quote[]).filter((q) => q.id !== id) as typeof prev);
    const { error } = await supabase.from('quote_requests').delete().eq('id', id);
    if (error) {
      setRows(previous as typeof rows);
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Quote request deleted' });
      refetch();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Quote Requests</h1>
          <p className="text-sm text-zinc-400 mt-1">{total.toLocaleString()} total</p>
        </div>
        <Button
          variant="outline" size="sm" onClick={refetch} disabled={loading}
          className="bg-zinc-900 border-zinc-600 text-zinc-200 hover:bg-zinc-800 hover:text-white hover:border-zinc-400"
        >
          <RefreshCw className={cn('w-4 h-4 mr-2', loading && 'animate-spin')} /> Refresh
        </Button>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-4">
          <InboxFilters
            filters={filters}
            onChange={setFilters}
            onClear={clearFilters}
            hasActive={hasActiveFilters}
            statusOptions={STATUS_OPTIONS_FILTER}
            searchPlaceholder="Search name, email, phone, message, service…"
            total={total}
            showing={quotes.length}
          />
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2 text-base">
            <FileText className="w-4 h-4" /> Submissions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <SubmissionList
            rows={quotes.map((q) => ({
              id: q.id,
              name: q.name,
              email: q.email,
              phone: q.phone,
              status: q.status,
              created_at: q.created_at,
              body: [
                q.service_type && `Service: ${q.service_type}`,
                q.budget_range && `Budget: ${q.budget_range}`,
                q.project_timeline && `Timeline: ${q.project_timeline}`,
                q.message,
              ].filter(Boolean).join('\n'),
            }))}
            loading={loading}
            error={error}
            hasActiveFilters={hasActiveFilters}
            emptyLabel="No quote requests yet."
            statusOptions={STATUS_OPTIONS_ROW}
            onUpdateStatus={updateStatus}
            onDelete={deleteQuote}
          />
          <PaginationBar
            page={page}
            pageCount={pageCount}
            pageSize={pageSize}
            total={total}
            onPageChange={setPage}
            loading={loading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminQuoteRequests;