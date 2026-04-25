import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, Users, Briefcase, Handshake, GraduationCap, Database, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSyncExternalStore } from 'react';
import { careersStore } from '@/lib/careersStore';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const jobs = useSyncExternalStore(careersStore.subscribe, careersStore.getJobs);
  const activeJobs = jobs.filter(j => j.is_active);

  const stats = [
    { label: 'Videos', value: '6', icon: Video, path: '/admin/content-hub' },
    { label: 'Roster Members', value: '4', icon: Users, path: '/admin/roster' },
    { label: 'Open Positions', value: String(activeJobs.length), icon: GraduationCap, path: '/admin/careers' },
    { label: 'Inquiries', value: '12', icon: Briefcase, path: '/admin/inquiries' },
    { label: 'Partners', value: '5', icon: Handshake, path: '/admin/partners' },
  ];

  return (
    <div className="space-y-6">
      {/* Mock Data Banner */}
      <Card className="bg-amber-950/40 border-amber-700/50">
        <CardContent className="py-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-amber-300 font-semibold text-sm">Mock Data Mode</h3>
            <p className="text-amber-200/70 text-xs mt-1">
              This admin panel is running on local mock data. Changes will reset on page reload.
              Connect a database to persist data and sync with the live website.
            </p>
          </div>
          <Database className="w-5 h-5 text-amber-500/50 flex-shrink-0" />
        </CardContent>
      </Card>

      <div>
        <h1 className="text-2xl font-bold text-white">Welcome back</h1>
        <p className="text-zinc-400 text-sm mt-1">Here's an overview of your website content.</p>
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
