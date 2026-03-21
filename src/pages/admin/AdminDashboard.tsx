import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, Users, Briefcase, Handshake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const stats = [
  { label: 'Videos', value: '6', icon: Video, path: '/admin/content-hub' },
  { label: 'Roster Members', value: '4', icon: Users, path: '/admin/roster' },
  { label: 'Inquiries', value: '12', icon: Briefcase, path: '/admin/inquiries' },
  { label: 'Partners', value: '5', icon: Handshake, path: '/admin/partners' },
];

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Welcome back</h1>
        <p className="text-zinc-400 text-sm mt-1">Here's an overview of your website content.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
