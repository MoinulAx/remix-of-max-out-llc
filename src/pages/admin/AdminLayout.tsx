import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import {
  LayoutDashboard, Video, Users, Handshake, LogOut, Menu, X, Mail, GraduationCap,
  ClipboardList, BriefcaseBusiness, FileText,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Content Hub', path: '/admin/content-hub', icon: Video },
  { label: 'Leadership & Roster', path: '/admin/roster', icon: Users },
  { label: 'Careers', path: '/admin/careers', icon: GraduationCap },
  { label: 'Inquiries', path: '/admin/inquiries', icon: Mail },
  { label: 'Roster Applications', path: '/admin/applications', icon: ClipboardList },
  { label: 'Job Applications', path: '/admin/job-applications', icon: BriefcaseBusiness },
  { label: 'Quote Requests', path: '/admin/quote-requests', icon: FileText },
  { label: 'Partners', path: '/admin/partners', icon: Handshake },
];

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed md:sticky top-0 left-0 h-screen w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col z-50 transition-transform duration-300",
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <h1 className="text-white font-bold text-lg tracking-tight">MAX OUT ADMIN</h1>
          <button className="md:hidden text-zinc-400" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-zinc-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
          <div className="mt-3 text-center select-none">
            <p className="text-[9px] uppercase tracking-[1.18em] text-zinc-500">
              Powered by <span className="text-zinc-400">RummSpace</span>
            </p>
            <p className="text-[8px] uppercase tracking-[0.16em] text-zinc-600 mt-1">
              Engineered by <span className="text-zinc-500">RummLink</span>
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-zinc-950/80 backdrop-blur border-b border-zinc-800 px-4 py-3 flex items-center gap-3 md:px-6">
          <button className="md:hidden text-zinc-400" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="text-white font-semibold text-sm">
            {navItems.find(i => location.pathname.startsWith(i.path))?.label || 'Admin'}
          </h2>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
