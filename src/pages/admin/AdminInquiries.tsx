import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  Mail, Calendar as CalendarIcon, Trash2, RefreshCw,
  Phone, User, Clock,
} from 'lucide-react';

import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from '@/components/ui/sheet';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { useAdminInbox } from '@/hooks/useAdminInbox';
import { InboxFilters } from '@/components/admin/InboxFilters';
import { PaginationBar } from '@/components/admin/PaginationBar';

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  type: string;
  status: string;
  created_at: string;
  updated_at: string;
};

const TYPE_OPTIONS = [
  { value: 'all', label: 'All types' },
  { value: 'contact', label: 'Contact' },
  { value: 'booking', label: 'Booking' },
  { value: 'management', label: 'Management' },
  { value: 'newsletter', label: 'Newsletter' },
  { value: 'tmobile', label: 'T-Mobile' },
];
const STATUS_OPTIONS_FILTER = [
  { value: 'all', label: 'All statuses' },
  { value: 'new', label: 'New' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'closed', label: 'Closed' },
  { value: 'archived', label: 'Archived' },
];
const STATUS_OPTIONS_DETAIL = ['new', 'in_progress', 'closed', 'archived'] as const;

const typeBadgeClass = (type: string) => {
  switch (type) {
    case 'contact':    return 'border-blue-600 text-blue-400';
    case 'booking':    return 'border-green-600 text-green-400';
    case 'management': return 'border-purple-600 text-purple-400';
    case 'newsletter': return 'border-amber-600 text-amber-400';
    case 'tmobile':    return 'border-pink-600 text-pink-400';
    default:           return 'border-zinc-600 text-zinc-400';
  }
};

const statusBadgeClass = (status: string) => {
  switch (status) {
    case 'new': return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
    case 'in_progress': return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    case 'closed': return 'bg-zinc-700 text-zinc-300 border-zinc-600';
    default: return 'bg-zinc-700 text-zinc-300 border-zinc-600';
  }
};

const AdminInquiries: React.FC = () => {
  const { toast } = useToast();
  const {
    rows, setRows, total, page, pageCount, pageSize, setPage,
    loading, error, filters, setFilters, clearFilters, hasActiveFilters, refetch,
  } = useAdminInbox('inquiries', {
    searchColumns: ['name', 'email', 'phone', 'message'],
    hasTypeColumn: true,
  });
  const inquiries = rows as Inquiry[];
  const [selected, setSelected] = useState<Inquiry | null>(null);

  const updateStatus = async (id: string, status: string) => {
    const previous = inquiries;
    setRows((prev) => (prev as Inquiry[]).map((i) => (i.id === id ? { ...i, status } : i)) as typeof prev);
    if (selected?.id === id) setSelected({ ...selected, status });
    const { error } = await supabase.from('inquiries').update({ status }).eq('id', id);
    if (error) {
      setRows(previous as typeof rows);
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Status updated', description: `Marked as ${status.replace('_', ' ')}.` });
    }
  };

  const deleteInquiry = async (id: string) => {
    const previous = inquiries;
    setRows((prev) => (prev as Inquiry[]).filter((i) => i.id !== id) as typeof prev);
    if (selected?.id === id) setSelected(null);
    const { error } = await supabase.from('inquiries').delete().eq('id', id);
    if (error) {
      setRows(previous as typeof rows);
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Inquiry deleted' });
      // After deleting from the current page, refetch so the page stays full.
      refetch();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Inquiries</h1>
          <p className="text-sm text-zinc-400 mt-1">
            {total.toLocaleString()} total
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={refetch}
          disabled={loading}
          className="bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white"
        >
          <RefreshCw className={cn('w-4 h-4 mr-2', loading && 'animate-spin')} />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-4">
          <InboxFilters
            filters={filters}
            onChange={setFilters}
            onClear={clearFilters}
            hasActive={hasActiveFilters}
            statusOptions={STATUS_OPTIONS_FILTER}
            typeOptions={TYPE_OPTIONS}
            searchPlaceholder="Search name, email, phone, message…"
            total={total}
            showing={inquiries.length}
          />
        </CardContent>
      </Card>

      {/* List */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2 text-base">
            <Mail className="w-4 h-4" /> Inbox
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {loading && (
            <p className="text-zinc-500 text-sm text-center py-8">Loading inquiries…</p>
          )}
          {!loading && error && (
            <p className="text-red-400 text-sm text-center py-8">{error}</p>
          )}
          {!loading && !error && inquiries.length === 0 && (
            <p className="text-zinc-500 text-sm text-center py-8">
              {hasActiveFilters ? 'No inquiries match your filters.' : 'No inquiries yet.'}
            </p>
          )}
          {!loading && !error && inquiries.map((inquiry) => (
            <button
              key={inquiry.id}
              onClick={() => setSelected(inquiry)}
              className={cn(
                'w-full text-left p-4 rounded-lg border transition-colors',
                inquiry.status === 'new'
                  ? 'bg-zinc-800 border-zinc-700 hover:border-zinc-600'
                  : 'bg-zinc-800/30 border-zinc-800 hover:bg-zinc-800/60'
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {inquiry.status === 'new' && (
                      <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    )}
                    <span className="text-white font-medium text-sm truncate">{inquiry.name}</span>
                    <Badge variant="outline" className={cn('text-xs capitalize', typeBadgeClass(inquiry.type))}>
                      {inquiry.type}
                    </Badge>
                    <Badge variant="outline" className={cn('text-xs capitalize', statusBadgeClass(inquiry.status))}>
                      {inquiry.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-zinc-400 text-xs mb-1 truncate">{inquiry.email}</p>
                  <p className="text-zinc-300 text-sm line-clamp-2 whitespace-pre-line">
                    {inquiry.message || <span className="text-zinc-600 italic">No message</span>}
                  </p>
                  <p className="text-zinc-600 text-xs mt-2 flex items-center gap-1">
                    <CalendarIcon className="w-3 h-3" />
                    {format(new Date(inquiry.created_at), 'PPp')}
                  </p>
                </div>
              </div>
            </button>
          ))}
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

      {/* Detail sheet */}
      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="bg-zinc-950 border-zinc-800 text-white w-full sm:max-w-lg overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="text-white text-xl">{selected.name}</SheetTitle>
                <SheetDescription className="text-zinc-400 flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className={cn('text-xs capitalize', typeBadgeClass(selected.type))}>
                    {selected.type}
                  </Badge>
                  <Badge variant="outline" className={cn('text-xs capitalize', statusBadgeClass(selected.status))}>
                    {selected.status.replace('_', ' ')}
                  </Badge>
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-5">
                <DetailRow icon={Mail} label="Email">
                  <a href={`mailto:${selected.email}`} className="text-blue-400 hover:underline break-all">
                    {selected.email}
                  </a>
                </DetailRow>
                {selected.phone && (
                  <DetailRow icon={Phone} label="Phone">
                    <a href={`tel:${selected.phone}`} className="text-blue-400 hover:underline">
                      {selected.phone}
                    </a>
                  </DetailRow>
                )}
                <DetailRow icon={Clock} label="Submitted">
                  {format(new Date(selected.created_at), 'PPpp')}
                </DetailRow>
                <DetailRow icon={User} label="Status">
                  <Select
                    value={selected.status}
                    onValueChange={(v) => updateStatus(selected.id, v)}
                  >
                    <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white h-9 w-full max-w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                      {STATUS_OPTIONS_DETAIL.map((s) => (
                        <SelectItem key={s} value={s} className="capitalize focus:bg-zinc-800">
                          {s.replace('_', ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </DetailRow>

                <div>
                  <p className="text-xs uppercase tracking-wide text-zinc-500 mb-2">Message</p>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-sm text-zinc-200 whitespace-pre-line">
                    {selected.message || <span className="text-zinc-600 italic">No message</span>}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-zinc-800">
                  <Button asChild variant="outline" className="flex-1 bg-zinc-900 border-zinc-700 text-white hover:text-white">
                    <a href={`mailto:${selected.email}?subject=Re: Your inquiry`}>
                      <Mail className="w-4 h-4 mr-2" /> Reply
                    </a>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete inquiry?</AlertDialogTitle>
                        <AlertDialogDescription className="text-zinc-400">
                          This will permanently remove the inquiry from {selected.name}. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 hover:text-white">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteInquiry(selected.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

const DetailRow: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}> = ({ icon: Icon, label, children }) => (
  <div className="flex items-start gap-3">
    <Icon className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
    <div className="flex-1 min-w-0">
      <p className="text-xs uppercase tracking-wide text-zinc-500 mb-1">{label}</p>
      <div className="text-sm text-zinc-200">{children}</div>
    </div>
  </div>
);

export default AdminInquiries;
