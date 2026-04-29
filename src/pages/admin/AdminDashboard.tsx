import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Video, Users, Briefcase, Handshake, GraduationCap,
  ShieldCheck, RefreshCw, Activity, Clock,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

type AdminStatus = {
  ok: boolean;
  user: { id: string; email?: string };
  role: string;
  timestamp: string;
  pending: {
    inquiries: number;
    applications: number;
    job_applications: number;
    quote_requests: number;
  };
};

type Counts = {
  videos: number;
  roster: number;
  activeJobs: number;
  newInquiries: number;
  partners: number;
};

/**
 * Per-table breakdown of submissions by status, plus the most recent
 * created_at across rows. Powers the Activity widget.
 */
type ActivityTable =
  | 'inquiries'
  | 'applications'
  | 'job_applications'
  | 'quote_requests'
  | 'careers';

type ActivityEntry = {
  table: ActivityTable;
  label: string;
  total: number;
  byStatus: Record<string, number>;
  lastActivityAt: string | null;
  path: string;
};

const ACTIVITY_CONFIG: { table: ActivityTable; label: string; path: string }[] = [
  { table: 'inquiries',        label: 'Inquiries',        path: '/admin/inquiries' },
  { table: 'applications',     label: 'Roster Applications', path: '/admin/applications' },
  { table: 'job_applications', label: 'Job Applications', path: '/admin/job-applications' },
  { table: 'quote_requests',   label: 'Quote Requests',   path: '/admin/quote-requests' },
  { table: 'careers',          label: 'Careers',          path: '/admin/careers' },
];

const STATUS_BADGE_CLASS: Record<string, string> = {
  new:         'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  in_progress: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  closed:      'bg-zinc-500/15 text-zinc-300 border-zinc-500/30',
  archived:    'bg-zinc-500/10 text-zinc-400 border-zinc-600/30',
  active:      'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  inactive:    'bg-zinc-500/10 text-zinc-400 border-zinc-600/30',
};

function timeAgo(iso: string | null): string {
  if (!iso) return 'No activity yet';
  const diff = Date.now() - new Date(iso).getTime();
  if (diff < 0) return 'just now';
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day}d ago`;
  return new Date(iso).toLocaleDateString();
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState<AdminStatus | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);

  const [counts, setCounts] = useState<Counts | null>(null);
  const [countsLoading, setCountsLoading] = useState(false);

  const [activity, setActivity] = useState<ActivityEntry[] | null>(null);
  const [activityLoading, setActivityLoading] = useState(false);

  const loadStatus = async () => {
    setStatusLoading(true);
    setStatusError(null);
    const { data, error } = await supabase.functions.invoke<AdminStatus>('admin-status', {
      method: 'GET',
    });
    if (error) setStatusError(error.message);
    else setStatus(data ?? null);
    setStatusLoading(false);
  };

  const loadCounts = async () => {
    setCountsLoading(true);
    const headFilter = { count: 'exact' as const, head: true };
    const [videos, roster, jobs, inquiries, partners] = await Promise.all([
      supabase.from('content_hub_posts').select('*', headFilter),
      supabase.from('roster').select('*', headFilter),
      supabase.from('careers').select('*', headFilter).eq('is_active', true),
      supabase.from('inquiries').select('*', headFilter).eq('status', 'new'),
      supabase.from('partners').select('*', headFilter),
    ]);
    setCounts({
      videos: videos.count ?? 0,
      roster: roster.count ?? 0,
      activeJobs: jobs.count ?? 0,
      newInquiries: inquiries.count ?? 0,
      partners: partners.count ?? 0,
    });
    setCountsLoading(false);
  };

  /**
   * Fetch every row's status + created_at for each activity table and
   * aggregate client-side. The dataset is small (admin-only), and this avoids
   * needing a custom RPC just to group counts.
   */
  const loadActivity = async () => {
    setActivityLoading(true);
    const results = await Promise.all(
      ACTIVITY_CONFIG.map(async ({ table, label, path }) => {
        // careers uses is_active instead of a free-form status column
        if (table === 'careers') {
          const { data } = await supabase
            .from('careers')
            .select('is_active, updated_at, created_at')
            .order('updated_at', { ascending: false });
          const rows = data ?? [];
          const byStatus: Record<string, number> = { active: 0, inactive: 0 };
          let last: string | null = null;
          for (const r of rows) {
            byStatus[r.is_active ? 'active' : 'inactive']++;
            const ts = r.updated_at ?? r.created_at;
            if (ts && (!last || ts > last)) last = ts;
          }
          return { table, label, path, total: rows.length, byStatus, lastActivityAt: last } as ActivityEntry;
        }
        const { data } = await supabase
          .from(table)
          .select('status, created_at')
          .order('created_at', { ascending: false });
        const rows = (data ?? []) as { status: string | null; created_at: string }[];
        const byStatus: Record<string, number> = {};
        for (const r of rows) {
          const key = r.status ?? 'unknown';
          byStatus[key] = (byStatus[key] ?? 0) + 1;
        }
        return {
          table,
          label,
          path,
          total: rows.length,
          byStatus,
          lastActivityAt: rows[0]?.created_at ?? null,
        } as ActivityEntry;
      })
    );
    setActivity(results);
    setActivityLoading(false);
  };

  useEffect(() => {
    loadStatus();
    loadCounts();
    loadActivity();
  }, []);

  // Live updates: refresh counts (and the server-verified status card) whenever
  // a submission table changes. Debounced so a burst of inserts only triggers
  // one refetch.
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    const scheduleRefresh = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        loadCounts();
        loadStatus();
        loadActivity();
      }, 400);
    };

    const channel = supabase
      .channel('admin-dashboard-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'inquiries' }, scheduleRefresh)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'applications' }, scheduleRefresh)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'job_applications' }, scheduleRefresh)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'quote_requests' }, scheduleRefresh)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'content_hub_posts' }, scheduleRefresh)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'roster' }, scheduleRefresh)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'careers' }, scheduleRefresh)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'partners' }, scheduleRefresh)
      .subscribe();

    return () => {
      if (timeout) clearTimeout(timeout);
      supabase.removeChannel(channel);
    };
  }, []);

  const fmt = (n: number | undefined) => (n === undefined ? '—' : String(n));
  const stats = [
    { label: 'Videos & Posts', value: fmt(counts?.videos), icon: Video, path: '/admin/content-hub' },
    { label: 'Roster Members', value: fmt(counts?.roster), icon: Users, path: '/admin/roster' },
    { label: 'Open Positions', value: fmt(counts?.activeJobs), icon: GraduationCap, path: '/admin/careers' },
    { label: 'New Inquiries', value: fmt(counts?.newInquiries), icon: Briefcase, path: '/admin/inquiries' },
    { label: 'Partners', value: fmt(counts?.partners), icon: Handshake, path: '/admin/partners' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-zinc-400 text-sm mt-1">Live overview of your website content.</p>
        </div>
        <Button
          variant="outline" size="sm" onClick={() => { loadCounts(); loadStatus(); loadActivity(); }}
          disabled={countsLoading || statusLoading || activityLoading}
          className="bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${(countsLoading || activityLoading) ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((s) => (
          <Card
            key={s.label}
            className="bg-zinc-900 border-zinc-800 cursor-pointer hover:border-zinc-600 transition-colors"
            onClick={() => navigate(s.path)}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">{s.label}</CardTitle>
              <s.icon className="w-4 h-4 text-zinc-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Status breakdown + recent activity per submission table */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-white text-base flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            Submissions Activity
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={loadActivity}
            disabled={activityLoading}
            className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${activityLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {!activity && activityLoading && (
            <p className="text-zinc-500 text-sm">Loading activity…</p>
          )}
          {activity && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {activity.map((entry) => {
                const statuses = Object.entries(entry.byStatus).sort((a, b) => b[1] - a[1]);
                return (
                  <button
                    key={entry.table}
                    onClick={() => navigate(entry.path)}
                    className="text-left rounded-lg bg-zinc-800/60 border border-zinc-800 hover:border-zinc-600 transition-colors p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-white">{entry.label}</p>
                        <p className="text-2xl font-bold text-white mt-1">{entry.total}</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-zinc-500">
                        <Clock className="w-3 h-3" />
                        {timeAgo(entry.lastActivityAt)}
                      </div>
                    </div>
                    {statuses.length === 0 ? (
                      <p className="text-xs text-zinc-500">No records yet.</p>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {statuses.map(([statusKey, count]) => (
                          <span
                            key={statusKey}
                            className={`text-xs px-2 py-0.5 rounded border ${
                              STATUS_BADGE_CLASS[statusKey] ??
                              'bg-zinc-700/40 text-zinc-300 border-zinc-600/40'
                            }`}
                          >
                            {statusKey.replace(/_/g, ' ')} · {count}
                          </span>
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Server-verified admin status (calls /functions/v1/admin-status) */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-white text-base flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Server-Verified Admin Status
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={loadStatus}
            disabled={statusLoading}
            className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${statusLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {statusLoading && !status && (
            <p className="text-zinc-500 text-sm">Verifying with edge function…</p>
          )}
          {statusError && (
            <p className="text-red-400 text-sm">Error: {statusError}</p>
          )}
          {status && (
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                Verified as <span className="font-mono">{status.user.email}</span>
                <span className="text-zinc-500">·</span>
                <span className="text-zinc-400">role: {status.role}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(status.pending).map(([k, v]) => (
                  <div key={k} className="rounded-md bg-zinc-800/60 border border-zinc-800 px-3 py-2">
                    <p className="text-xs text-zinc-500 capitalize">
                      {k.replace(/_/g, ' ')}
                    </p>
                    <p className="text-lg font-semibold text-white">{v}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-zinc-600">
                Last checked {new Date(status.timestamp).toLocaleTimeString()}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button onClick={() => navigate('/admin/content-hub')} className="text-left p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors">
            <p className="text-white font-medium text-sm">Manage Content Hub</p>
            <p className="text-zinc-400 text-xs mt-1">Add videos, articles, and social posts</p>
          </button>
          <button onClick={() => navigate('/admin/roster')} className="text-left p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors">
            <p className="text-white font-medium text-sm">Manage Roster</p>
            <p className="text-zinc-400 text-xs mt-1">Update talent and leadership</p>
          </button>
          <button onClick={() => navigate('/admin/careers')} className="text-left p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors">
            <p className="text-white font-medium text-sm">Manage Careers</p>
            <p className="text-zinc-400 text-xs mt-1">Add or toggle job listings</p>
          </button>
          <button onClick={() => navigate('/admin/inquiries')} className="text-left p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors">
            <p className="text-white font-medium text-sm">View Inquiries</p>
            <p className="text-zinc-400 text-xs mt-1">Check new submissions</p>
          </button>
          <button onClick={() => navigate('/admin/partners')} className="text-left p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors">
            <p className="text-white font-medium text-sm">Manage Partners</p>
            <p className="text-zinc-400 text-xs mt-1">Add or remove partner logos</p>
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
