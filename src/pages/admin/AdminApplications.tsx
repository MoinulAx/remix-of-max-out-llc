import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

import { useAdminInbox } from '@/hooks/useAdminInbox';
import { InboxFilters } from '@/components/admin/InboxFilters';
import { PaginationBar } from '@/components/admin/PaginationBar';
import { SubmissionList } from '@/components/admin/SubmissionList';
import type { Database } from '@/integrations/supabase/types';

type Application = Database['public']['Tables']['applications']['Row'];

const STATUS_OPTIONS_FILTER = [
  { value: 'all', label: 'All statuses' },
  { value: 'new', label: 'New' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'closed', label: 'Closed' },
  { value: 'archived', label: 'Archived' },
];
const STATUS_OPTIONS_ROW = STATUS_OPTIONS_FILTER.filter((s) => s.value !== 'all');

const AdminApplications: React.FC = () => {
  const { toast } = useToast();
  const {
    rows, setRows, total, page, pageCount, pageSize, setPage,
    loading, error, filters, setFilters, clearFilters, hasActiveFilters, refetch,
  } = useAdminInbox('applications', {
    searchColumns: ['name', 'email', 'phone', 'why_interested', 'experience'],
  });
  const apps = rows as Application[];

  const updateStatus = async (id: string, status: string) => {
    const previous = apps;
    setRows((prev) => (prev as Application[]).map((a) => (a.id === id ? { ...a, status } : a)) as typeof prev);
    const { error } = await supabase.from('applications').update({ status }).eq('id', id);
    if (error) {
      setRows(previous as typeof rows);
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
    }
  };

  const deleteApp = async (id: string) => {
    const previous = apps;
    setRows((prev) => (prev as Application[]).filter((a) => a.id !== id) as typeof prev);
    const { error } = await supabase.from('applications').delete().eq('id', id);
    if (error) {
      setRows(previous as typeof rows);
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Application deleted' });
      refetch();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Applications</h1>
          <p className="text-sm text-zinc-400 mt-1">{total.toLocaleString()} total</p>
        </div>
        <Button
          variant="outline" size="sm" onClick={refetch} disabled={loading}
          className="bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white"
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
            searchPlaceholder="Search name, email, phone, interests…"
            total={total}
            showing={apps.length}
          />
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2 text-base">
            <ClipboardList className="w-4 h-4" /> Submissions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <SubmissionList
            rows={apps.map((a) => ({
              id: a.id,
              name: a.name,
              email: a.email,
              phone: a.phone,
              status: a.status,
              created_at: a.created_at,
              body: a.why_interested ?? a.experience,
              link: a.portfolio ? { label: 'Portfolio', url: a.portfolio } : null,
            }))}
            loading={loading}
            error={error}
            hasActiveFilters={hasActiveFilters}
            emptyLabel="No applications yet."
            statusOptions={STATUS_OPTIONS_ROW}
            onUpdateStatus={updateStatus}
            onDelete={deleteApp}
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

export default AdminApplications;