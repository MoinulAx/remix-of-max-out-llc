import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

type Props = {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  className?: string;
};

/**
 * Compact client-side filter input used on the small CMS admin lists
 * (Partners, Careers, Roster, Content Hub). Pure UI — the parent owns
 * the filtering logic so it can hide categories that have no matches.
 */
export const ListSearchBox: React.FC<Props> = ({
  value, onChange, placeholder = 'Filter…', className,
}) => (
  <div className={`relative w-full sm:w-72 ${className ?? ''}`}>
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="pl-9 pr-8 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 h-9"
    />
    {value && (
      <button
        onClick={() => onChange('')}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-zinc-700 text-zinc-400 hover:text-white"
        aria-label="Clear search"
        type="button"
      >
        <X className="w-3 h-3" />
      </button>
    )}
  </div>
);