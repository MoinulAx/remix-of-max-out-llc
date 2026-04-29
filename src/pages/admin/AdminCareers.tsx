import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Pencil, Trash2, Briefcase, X, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useSupabaseTable } from '@/hooks/useSupabaseTable';
import type { Database } from '@/integrations/supabase/types';

type Job = Database['public']['Tables']['careers']['Row'];
type JobInsert = Database['public']['Tables']['careers']['Insert'];

type FormState = {
  title: string;
  department: string;
  location: string;
  type: string;
  salary_range: string;
  description: string;
  requirements: string[];
  is_active: boolean;
};

const emptyJob: FormState = {
  title: '', department: '', location: 'Remote', type: 'Part-time',
  salary_range: '', description: '', requirements: [], is_active: true,
};

const AdminCareers: React.FC = () => {
  const { toast } = useToast();
  const { rows, setRows, loading, error, refetch } = useSupabaseTable('careers', {
    orderBy: 'display_order',
    ascending: true,
  });
  const jobs = rows as Job[];

  const [editing, setEditing] = useState<Job | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<FormState>(emptyJob);
  const [newReq, setNewReq] = useState('');
  const [saving, setSaving] = useState(false);

  const startAdd = () => { setForm(emptyJob); setEditing(null); setIsAdding(true); };
  const startEdit = (job: Job) => {
    setForm({
      title: job.title,
      department: job.department ?? '',
      location: job.location ?? 'Remote',
      type: job.type ?? 'Part-time',
      salary_range: job.salary_range ?? '',
      description: job.description ?? '',
      requirements: [...(job.requirements ?? [])],
      is_active: job.is_active,
    });
    setEditing(job);
    setIsAdding(true);
  };

  const addRequirement = () => {
    if (newReq.trim()) {
      setForm({ ...form, requirements: [...form.requirements, newReq.trim()] });
      setNewReq('');
    }
  };
  const removeRequirement = (idx: number) =>
    setForm({ ...form, requirements: form.requirements.filter((_, i) => i !== idx) });

  const saveJob = async () => {
    if (!form.title.trim()) {
      toast({ title: 'Title is required', variant: 'destructive' });
      return;
    }
    setSaving(true);
    const payload: JobInsert = {
      title: form.title.trim(),
      department: form.department.trim() || null,
      location: form.location || null,
      type: form.type || null,
      salary_range: form.salary_range.trim() || null,
      description: form.description.trim() || null,
      requirements: form.requirements,
      is_active: form.is_active,
    };
    if (editing) {
      const { error } = await supabase.from('careers').update(payload).eq('id', editing.id);
      if (error) {
        toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Position updated' });
        await refetch();
        setIsAdding(false); setEditing(null);
      }
    } else {
      const nextOrder = (jobs[jobs.length - 1]?.display_order ?? 0) + 1;
      const { error } = await supabase.from('careers').insert({ ...payload, display_order: nextOrder });
      if (error) {
        toast({ title: 'Create failed', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Position added' });
        await refetch();
        setIsAdding(false);
      }
    }
    setSaving(false);
  };

  const deleteJob = async (id: string) => {
    const previous = jobs;
    setRows((prev) => (prev as Job[]).filter((j) => j.id !== id) as typeof prev);
    const { error } = await supabase.from('careers').delete().eq('id', id);
    if (error) {
      setRows(previous as typeof rows);
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Position removed' });
    }
  };

  const toggleActive = async (job: Job) => {
    const next = !job.is_active;
    setRows((prev) => (prev as Job[]).map((j) => (j.id === job.id ? { ...j, is_active: next } : j)) as typeof prev);
    const { error } = await supabase.from('careers').update({ is_active: next }).eq('id', job.id);
    if (error) {
      setRows((prev) => (prev as Job[]).map((j) => (j.id === job.id ? { ...j, is_active: !next } : j)) as typeof prev);
      toast({ title: 'Toggle failed', description: error.message, variant: 'destructive' });
    }
  };

  const activeCount = jobs.filter((j) => j.is_active).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Careers Management</h1>
          <p className="text-zinc-400 text-sm mt-1">{activeCount} active · {jobs.length} total</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={refetch} disabled={loading} className="border-zinc-700 text-zinc-300">
            <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </Button>
          <Button onClick={startAdd} size="sm" className="gap-2"><Plus className="w-4 h-4" /> Add Position</Button>
        </div>
      </div>

      {loading && jobs.length === 0 && <p className="text-zinc-500 text-sm text-center py-6">Loading positions…</p>}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {isAdding && (
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader><CardTitle className="text-white text-lg">{editing ? 'Edit Position' : 'New Position'}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label className="text-zinc-300">Job Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-zinc-800 border-zinc-700 text-white" /></div>
              <div><Label className="text-zinc-300">Department</Label><Input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="bg-zinc-800 border-zinc-700 text-white" /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><Label className="text-zinc-300">Location</Label>
                <Select value={form.location} onValueChange={(v) => setForm({ ...form, location: v })}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="Remote">Remote</SelectItem><SelectItem value="Hybrid">Hybrid</SelectItem><SelectItem value="On-site">On-site</SelectItem></SelectContent>
                </Select>
              </div>
              <div><Label className="text-zinc-300">Type</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="Full-time">Full-time</SelectItem><SelectItem value="Part-time">Part-time</SelectItem><SelectItem value="Contract">Contract</SelectItem><SelectItem value="Internship">Internship</SelectItem></SelectContent>
                </Select>
              </div>
              <div><Label className="text-zinc-300">Compensation</Label><Input value={form.salary_range} onChange={(e) => setForm({ ...form, salary_range: e.target.value })} className="bg-zinc-800 border-zinc-700 text-white" /></div>
            </div>
            <div><Label className="text-zinc-300">Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="bg-zinc-800 border-zinc-700 text-white" rows={3} /></div>
            <div>
              <Label className="text-zinc-300">Requirements</Label>
              <div className="flex gap-2 mt-1">
                <Input value={newReq} onChange={(e) => setNewReq(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())} className="bg-zinc-800 border-zinc-700 text-white" placeholder="Add a requirement" />
                <Button type="button" variant="outline" size="sm" onClick={addRequirement}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {form.requirements.map((req, i) => (
                  <Badge key={i} variant="secondary" className="gap-1 pr-1 bg-zinc-700 text-zinc-200 border-zinc-600">
                    {req}
                    <button onClick={() => removeRequirement(i)} className="ml-1 hover:text-red-400"><X className="w-3 h-3" /></button>
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2"><Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} /><Label className="text-zinc-300">Active on website</Label></div>
            <div className="flex gap-2 pt-2">
              <Button onClick={saveJob} disabled={saving}>{saving ? 'Saving…' : editing ? 'Update Position' : 'Add Position'}</Button>
              <Button variant="outline" onClick={() => { setIsAdding(false); setEditing(null); }}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader><CardTitle className="text-white flex items-center gap-2"><Briefcase className="w-5 h-5" /> All Positions</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {!loading && jobs.length === 0 && <p className="text-zinc-500 text-sm text-center py-4">No positions added yet.</p>}
          {jobs.map((job) => (
            <div key={job.id} className={`p-4 rounded-lg border transition-colors ${job.is_active ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-800/30 border-zinc-800 opacity-60'}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-white font-medium text-sm">{job.title}</span>
                    {job.type && <Badge variant="outline" className="text-xs text-zinc-300 border-zinc-600">{job.type}</Badge>}
                    {job.location && <Badge variant="outline" className="text-xs text-zinc-300 border-zinc-600">{job.location}</Badge>}
                    {!job.is_active && <Badge variant="destructive" className="text-xs">Inactive</Badge>}
                  </div>
                  <p className="text-zinc-400 text-xs">{job.department ?? '—'} · {job.salary_range ?? '—'}</p>
                  <p className="text-zinc-500 text-xs mt-1 line-clamp-2">{job.description}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Switch checked={job.is_active} onCheckedChange={() => toggleActive(job)} />
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