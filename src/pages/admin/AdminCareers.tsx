import React, { useState, useSyncExternalStore } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Pencil, Trash2, Briefcase, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { careersStore, type JobListing } from '@/lib/careersStore';

type JobFormData = Omit<JobListing, 'id' | 'created_at'>;

const emptyJob: JobFormData = {
  title: '', department: '', location: 'Remote', type: 'Part-time',
  salary_range: '', description: '', requirements: [], is_active: true,
};

const AdminCareers: React.FC = () => {
  const jobs = useSyncExternalStore(careersStore.subscribe, careersStore.getJobs);
  const [editing, setEditing] = useState<JobListing | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<JobFormData>(emptyJob);
  const [newReq, setNewReq] = useState('');
  const { toast } = useToast();

  const startAdd = () => { setForm(emptyJob); setEditing(null); setIsAdding(true); };

  const startEdit = (job: JobListing) => {
    setForm({ title: job.title, department: job.department, location: job.location, type: job.type, salary_range: job.salary_range, description: job.description, requirements: [...job.requirements], is_active: job.is_active });
    setEditing(job); setIsAdding(true);
  };

  const addRequirement = () => {
    if (newReq.trim()) { setForm({ ...form, requirements: [...form.requirements, newReq.trim()] }); setNewReq(''); }
  };

  const removeRequirement = (idx: number) => {
    setForm({ ...form, requirements: form.requirements.filter((_, i) => i !== idx) });
  };

  const saveJob = () => {
    if (!form.title.trim()) { toast({ title: 'Title is required', variant: 'destructive' }); return; }
    if (editing) {
      careersStore.updateJob(editing.id, form);
      toast({ title: 'Job updated' });
    } else {
      careersStore.addJob(form);
      toast({ title: 'Job added' });
    }
    setIsAdding(false); setEditing(null);
  };

  const deleteJob = (id: string) => { careersStore.deleteJob(id); toast({ title: 'Job removed' }); };

  const activeCount = jobs.filter(j => j.is_active).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Careers Management</h1>
          <p className="text-zinc-400 text-sm mt-1">{activeCount} active listings · {jobs.length} total</p>
        </div>
        <Button onClick={startAdd} size="sm" className="gap-2"><Plus className="w-4 h-4" /> Add Position</Button>
      </div>

      {isAdding && (
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader><CardTitle className="text-white text-lg">{editing ? 'Edit Position' : 'New Position'}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label className="text-zinc-300">Job Title *</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="bg-zinc-800 border-zinc-700 text-white" placeholder="e.g. Social Media Marketing Intern" /></div>
              <div><Label className="text-zinc-300">Department</Label><Input value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} className="bg-zinc-800 border-zinc-700 text-white" placeholder="e.g. Marketing" /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><Label className="text-zinc-300">Location</Label>
                <Select value={form.location} onValueChange={v => setForm({ ...form, location: v })}><SelectTrigger className="bg-zinc-800 border-zinc-700 text-white"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Remote">Remote</SelectItem><SelectItem value="Hybrid">Hybrid</SelectItem><SelectItem value="On-site">On-site</SelectItem></SelectContent></Select>
              </div>
              <div><Label className="text-zinc-300">Type</Label>
                <Select value={form.type} onValueChange={v => setForm({ ...form, type: v })}><SelectTrigger className="bg-zinc-800 border-zinc-700 text-white"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Full-time">Full-time</SelectItem><SelectItem value="Part-time">Part-time</SelectItem><SelectItem value="Contract">Contract</SelectItem><SelectItem value="Internship">Internship</SelectItem></SelectContent></Select>
              </div>
              <div><Label className="text-zinc-300">Compensation</Label><Input value={form.salary_range} onChange={e => setForm({ ...form, salary_range: e.target.value })} className="bg-zinc-800 border-zinc-700 text-white" placeholder="e.g. Commission Only" /></div>
            </div>
            <div><Label className="text-zinc-300">Description</Label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="bg-zinc-800 border-zinc-700 text-white" rows={3} /></div>
            <div>
              <Label className="text-zinc-300">Requirements</Label>
              <div className="flex gap-2 mt-1"><Input value={newReq} onChange={e => setNewReq(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addRequirement())} className="bg-zinc-800 border-zinc-700 text-white" placeholder="Add a requirement" /><Button type="button" variant="outline" size="sm" onClick={addRequirement}>Add</Button></div>
              <div className="flex flex-wrap gap-2 mt-2">{form.requirements.map((req, i) => (<Badge key={i} variant="secondary" className="gap-1 pr-1">{req}<button onClick={() => removeRequirement(i)} className="ml-1 hover:text-red-400"><X className="w-3 h-3" /></button></Badge>))}</div>
            </div>
            <div className="flex items-center gap-2"><Switch checked={form.is_active} onCheckedChange={v => setForm({ ...form, is_active: v })} /><Label className="text-zinc-300">Active on website</Label></div>
            <div className="flex gap-2 pt-2"><Button onClick={saveJob}>{editing ? 'Update' : 'Add'} Position</Button><Button variant="outline" onClick={() => { setIsAdding(false); setEditing(null); }}>Cancel</Button></div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader><CardTitle className="text-white flex items-center gap-2"><Briefcase className="w-5 h-5" /> All Positions</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {jobs.length === 0 ? (
            <p className="text-zinc-500 text-sm text-center py-4">No positions added yet.</p>
          ) : jobs.map(job => (
            <div key={job.id} className={`p-4 rounded-lg border transition-colors ${job.is_active ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-800/30 border-zinc-800 opacity-60'}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-white font-medium text-sm">{job.title}</span>
                    <Badge variant="outline" className="text-xs">{job.type}</Badge>
                    <Badge variant="outline" className="text-xs">{job.location}</Badge>
                    {!job.is_active && <Badge variant="destructive" className="text-xs">Inactive</Badge>}
                  </div>
                  <p className="text-zinc-400 text-xs">{job.department} · {job.salary_range}</p>
                  <p className="text-zinc-500 text-xs mt-1 truncate">{job.description}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Switch checked={job.is_active} onCheckedChange={() => careersStore.toggleActive(job.id)} />
                  <button onClick={() => startEdit(job)} className="p-1.5 text-zinc-500 hover:text-white"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => deleteJob(job.id)} className="p-1.5 text-zinc-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCareers;
