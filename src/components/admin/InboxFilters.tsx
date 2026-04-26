import React from 'react';
import { format, parseISO } from 'date-fns';
import { Search, FilterX, Calendar as CalendarIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { InboxFilters as InboxFiltersValue } from '@/hooks/useAdminInbox';

export type StatusOption = { value: string; label: string };
export type TypeOption = { value: string; label: string };

type Props = {
  filters: InboxFiltersValue;
  onChange: (patch: Partial<InboxFiltersValue>) => void;
  onClear: () => void;
  hasActive: boolean;
  statusOptions: StatusOption[];
  typeOptions?: TypeOption[];
  searchPlaceholder?: string;
  total: number;
  showing: number;
};

export const InboxFilters: React.FC<Props> = ({
  filters, onChange, onClear, hasActive,
  statusOptions, typeOptions, searchPlaceholder = 'Search…',
  total, showing,
}) => {
  const fromDate = filters.fromDate ? parseISO(filters.fromDate) : undefined;
  const toDate = filters.toDate ? parseISO(filters.toDate) : undefined;

  return (
    <div className="grid gap-3 md:grid-cols-12">
      <div className={cn('relative', typeOptions ? 'md:col-span-5' : 'md:col-span-6')}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <Input
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          placeholder={searchPlaceholder}
          className="pl-9 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
        />
      </div>

      <Select value={filters.status} onValueChange={(v) => onChange({ status: v })}>
        <SelectTrigger className="md:col-span-2 bg-zinc-800 border-zinc-700 text-white">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
          {statusOptions.map((s) => (
            <SelectItem key={s.value} value={s.value} className="capitalize focus:bg-zinc-800">
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {typeOptions && (
        <Select value={filters.type ?? 'all'} onValueChange={(v) => onChange({ type: v })}>
          <SelectTrigger className="md:col-span-2 bg-zinc-800 border-zinc-700 text-white">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
            {typeOptions.map((t) => (
              <SelectItem key={t.value} value={t.value} className="capitalize focus:bg-zinc-800">
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <div className={cn('grid grid-cols-2 gap-2', typeOptions ? 'md:col-span-3' : 'md:col-span-4')}>
        <DatePickerButton
          label="From"
          value={fromDate}
          onChange={(d) => onChange({ fromDate: d ? format(d, 'yyyy-MM-dd') : undefined })}
        />
        <DatePickerButton
          label="To"
          value={toDate}
          onChange={(d) => onChange({ toDate: d ? format(d, 'yyyy-MM-dd') : undefined })}
        />
      </div>

      {hasActive && (
        <div className="md:col-span-12 flex items-center justify-between text-xs text-zinc-400">
          <span>Showing {showing} of {total.toLocaleString()}</span>
          <Button variant="ghost" size="sm" onClick={onClear} className="text-zinc-400 hover:text-white h-7">
            <FilterX className="w-3 h-3 mr-1" /> Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};

const DatePickerButton: React.FC<{
  label: string;
  value: Date | undefined;
  onChange: (d: Date | undefined) => void;
}> = ({ label, value, onChange }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        size="sm"
        className={cn(
          'justify-start text-left font-normal bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 hover:text-white relative pr-7',
          !value && 'text-zinc-500'
        )}
      >
        <CalendarIcon className="w-3.5 h-3.5 mr-1.5 shrink-0" />
        {value ? format(value, 'MMM d, yyyy') : label}
        {value && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => { e.stopPropagation(); onChange(undefined); }}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); onChange(undefined); } }}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-zinc-600 cursor-pointer"
          >
            <X className="w-3 h-3" />
          </span>
        )}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-700" align="start">
      <Calendar
        mode="single"
        selected={value}
        onSelect={onChange}
        initialFocus
        className={cn('p-3 pointer-events-auto')}
      />
    </PopoverContent>
  </Popover>
);