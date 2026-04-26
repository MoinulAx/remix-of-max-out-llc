import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Mail, Phone, Trash2, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export type SubmissionRow = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  status: string;
  created_at: string;
  /** A short body to show under the headline (message, cover_letter, etc.) */
  body?: string | null;
  /** Optional secondary link, e.g. portfolio or resume URL. */
  link?: { label: string; url: string } | null;
};

type Props = {
  rows: SubmissionRow[];
  loading: boolean;
  error: string | null;
  hasActiveFilters: boolean;
  emptyLabel: string;
  statusOptions: { value: string; label: string }[];
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
};

const statusBadgeClass = (status: string) => {
  switch (status) {
    case 'new': return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
    case 'in_progress': return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    case 'closed': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    case 'archived': return 'bg-zinc-700 text-zinc-300 border-zinc-600';
    default: return 'bg-zinc-700 text-zinc-300 border-zinc-600';
  }
};

export const SubmissionList: React.FC<Props> = ({
  rows, loading, error, hasActiveFilters, emptyLabel,
  statusOptions, onUpdateStatus, onDelete,
}) => {
  if (loading && rows.length === 0) {
    return <p className="text-zinc-500 text-sm text-center py-8">Loading…</p>;
  }
  if (error) {
    return <p className="text-red-400 text-sm text-center py-8">{error}</p>;
  }
  if (rows.length === 0) {
    return (
      <p className="text-zinc-500 text-sm text-center py-8">
        {hasActiveFilters ? 'No results match your filters.' : emptyLabel}
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {rows.map((row) => (
        <div
          key={row.id}
          className={cn(
            'p-4 rounded-lg border transition-colors',
            row.status === 'new'
              ? 'bg-zinc-800 border-zinc-700'
              : 'bg-zinc-800/30 border-zinc-800'
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                {row.status === 'new' && (
                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                )}
                <span className="text-white font-medium text-sm truncate">{row.name}</span>
                <Badge variant="outline" className={cn('text-xs capitalize', statusBadgeClass(row.status))}>
                  {row.status.replace('_', ' ')}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-400 mb-2">
                <a href={`mailto:${row.email}`} className="flex items-center gap-1 hover:text-blue-400">
                  <Mail className="w-3 h-3" /> {row.email}
                </a>
                {row.phone && (
                  <a href={`tel:${row.phone}`} className="flex items-center gap-1 hover:text-blue-400">
                    <Phone className="w-3 h-3" /> {row.phone}
                  </a>
                )}
                {row.link && (
                  <a href={row.link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-400">
                    <ExternalLink className="w-3 h-3" /> {row.link.label}
                  </a>
                )}
              </div>
              {row.body && (
                <p className="text-zinc-300 text-sm line-clamp-2 whitespace-pre-line">{row.body}</p>
              )}
              <p className="text-zinc-600 text-xs mt-2 flex items-center gap-1">
                <CalendarIcon className="w-3 h-3" />
                {format(new Date(row.created_at), 'PPp')}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Select value={row.status} onValueChange={(v) => onUpdateStatus(row.id, v)}>
                <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white h-8 w-[140px] text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                  {statusOptions.map((s) => (
                    <SelectItem key={s.value} value={s.value} className="capitalize focus:bg-zinc-800">
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-red-400 h-8 w-8">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete submission?</AlertDialogTitle>
                    <AlertDialogDescription className="text-zinc-400">
                      This will permanently remove the submission from {row.name}.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 hover:text-white">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDelete(row.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};