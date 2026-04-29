import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

type Props = {
  page: number;        // zero-indexed
  pageCount: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
};

export const PaginationBar: React.FC<Props> = ({
  page, pageCount, pageSize, total, onPageChange, loading,
}) => {
  if (total === 0) return null;
  const start = page * pageSize + 1;
  const end = Math.min(total, (page + 1) * pageSize);
  const canPrev = page > 0 && !loading;
  const canNext = page < pageCount - 1 && !loading;

  return (
    <div className="flex items-center justify-between gap-3 pt-3 border-t border-zinc-800">
      <p className="text-xs text-zinc-300">
        {start.toLocaleString()}–{end.toLocaleString()} of {total.toLocaleString()}
      </p>
      <div className="flex items-center gap-1">
        <NavBtn disabled={!canPrev} onClick={() => onPageChange(0)} aria-label="First page">
          <ChevronsLeft className="w-4 h-4" />
        </NavBtn>
        <NavBtn disabled={!canPrev} onClick={() => onPageChange(page - 1)} aria-label="Previous page">
          <ChevronLeft className="w-4 h-4" />
        </NavBtn>
        <span className="px-2 text-xs text-zinc-300 tabular-nums">
          Page {page + 1} of {pageCount}
        </span>
        <NavBtn disabled={!canNext} onClick={() => onPageChange(page + 1)} aria-label="Next page">
          <ChevronRight className="w-4 h-4" />
        </NavBtn>
        <NavBtn disabled={!canNext} onClick={() => onPageChange(pageCount - 1)} aria-label="Last page">
          <ChevronsRight className="w-4 h-4" />
        </NavBtn>
      </div>
    </div>
  );
};

const NavBtn: React.FC<React.ComponentProps<typeof Button>> = (props) => (
  <Button
    variant="outline"
    size="icon"
    className="h-8 w-8 bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 disabled:opacity-40"
    {...props}
  />
);