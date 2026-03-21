import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Mail, Calendar, Eye, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  type: 'client' | 'management';
  message: string;
  date: string;
  read: boolean;
}

interface Opportunity {
  id: string;
  title: string;
  type: string;
  enabled: boolean;
}

const mockInquiries: Inquiry[] = [
  { id: '1', name: 'John Smith', email: 'john@example.com', type: 'client', message: 'Looking to book Flacco for an event in NYC on March 15th.', date: '2026-03-20', read: false },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@email.com', type: 'management', message: 'Interested in your talent management services for our label.', date: '2026-03-19', read: true },
  { id: '3', name: 'Mike Torres', email: 'mike@company.com', type: 'client', message: 'Need a quote for a private corporate event entertainment.', date: '2026-03-18', read: false },
  { id: '4', name: 'Emily Davis', email: 'emily@uni.edu', type: 'management', message: 'Applying for the Social Media Marketing Intern position.', date: '2026-03-17', read: true },
  { id: '5', name: 'Alex Rivera', email: 'alex@music.co', type: 'client', message: 'Partnership inquiry for upcoming music festival.', date: '2026-03-16', read: true },
];

const defaultOpportunities: Opportunity[] = [
  { id: '1', title: 'Social Media Marketing Intern', type: 'Internship', enabled: true },
  { id: '2', title: 'Artist Management Intern', type: 'Internship', enabled: true },
  { id: '3', title: 'A&R Scout Intern', type: 'Internship', enabled: true },
  { id: '4', title: 'Graphic Design / Content Intern', type: 'Internship', enabled: true },
  { id: '5', title: 'Talent Manager', type: 'Commission', enabled: true },
  { id: '6', title: 'Booking Agent', type: 'Commission', enabled: true },
  { id: '7', title: 'Brand Partnership Specialist', type: 'Commission', enabled: true },
  { id: '8', title: 'Sales Representative', type: 'Commission', enabled: true },
];

const AdminInquiries: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>(mockInquiries);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(defaultOpportunities);
  const [filter, setFilter] = useState<'all' | 'client' | 'management'>('all');
  const { toast } = useToast();

  const filtered = filter === 'all' ? inquiries : inquiries.filter(i => i.type === filter);
  const unreadCount = inquiries.filter(i => !i.read).length;

  const markRead = (id: string) => {
    setInquiries(inquiries.map(i => i.id === id ? { ...i, read: true } : i));
  };

  const removeInquiry = (id: string) => {
    setInquiries(inquiries.filter(i => i.id !== id));
    toast({ title: 'Inquiry removed' });
  };

  const toggleOpportunity = (id: string) => {
    setOpportunities(opportunities.map(o => o.id === id ? { ...o, enabled: !o.enabled } : o));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Inquiries</h1>

      {/* Inbox */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Inbox
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs">{unreadCount} new</Badge>
              )}
            </CardTitle>
            <div className="flex gap-1">
              {(['all', 'client', 'management'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded text-xs font-medium capitalize ${filter === f ? 'bg-primary text-primary-foreground' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {filtered.length === 0 ? (
            <p className="text-zinc-500 text-sm text-center py-4">No inquiries found.</p>
          ) : (
            filtered.map((inquiry) => (
              <div
                key={inquiry.id}
                className={`p-4 rounded-lg border transition-colors ${inquiry.read ? 'bg-zinc-800/30 border-zinc-800' : 'bg-zinc-800 border-zinc-700'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {!inquiry.read && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                      <span className="text-white font-medium text-sm">{inquiry.name}</span>
                      <Badge variant="outline" className={`text-xs ${inquiry.type === 'client' ? 'border-green-600 text-green-400' : 'border-purple-600 text-purple-400'}`}>
                        {inquiry.type}
                      </Badge>
                    </div>
                    <p className="text-zinc-400 text-xs mb-1">{inquiry.email}</p>
                    <p className="text-zinc-300 text-sm">{inquiry.message}</p>
                    <p className="text-zinc-600 text-xs mt-2 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {inquiry.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 ml-3">
                    {!inquiry.read && (
                      <button onClick={() => markRead(inquiry.id)} className="p-1.5 text-zinc-500 hover:text-white" title="Mark read">
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                    <button onClick={() => removeInquiry(inquiry.id)} className="p-1.5 text-zinc-500 hover:text-red-400" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Opportunity Toggles */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white text-lg">Inquiry Opportunities</CardTitle>
          <p className="text-zinc-400 text-sm">Toggle which job openings appear on the front-end.</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {opportunities.map((opp) => (
            <div key={opp.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-800">
              <div>
                <p className="text-white text-sm font-medium">{opp.title}</p>
                <p className="text-zinc-500 text-xs">{opp.type}</p>
              </div>
              <Switch checked={opp.enabled} onCheckedChange={() => toggleOpportunity(opp.id)} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminInquiries;
