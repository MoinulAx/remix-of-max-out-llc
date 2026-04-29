import React, { useMemo, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, User, Crown, Upload, Loader2, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useSupabaseTable } from '@/hooks/useSupabaseTable';
import { uploadImage } from '@/lib/uploadImage';
import type { Database } from '@/integrations/supabase/types';

type RosterRow = Database['public']['Tables']['roster']['Row'];

const LEADERSHIP_CATEGORY = 'leadership';

const AdminRoster: React.FC = () => {
  const { toast } = useToast();
  const { rows, setRows, loading, error, refetch } = useSupabaseTable('roster', {
    orderBy: 'sort_order',
    ascending: true,
  });
  const all = rows as RosterRow[];
  const leadership = useMemo(() => all.filter((m) => m.category === LEADERSHIP_CATEGORY), [all]);
  const talent = useMemo(() => all.filter((m) => m.category !== LEADERSHIP_CATEGORY), [all]);
  const categories = useMemo(
    () => Array.from(new Set(talent.map((m) => m.category).filter(Boolean))) as string[],
    [talent]
  );

  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  const addMember = async (category: string) => {
    const order = (all.reduce((max, m) => Math.max(max, m.sort_order ?? 0), 0)) + 1;
    const { data, error } = await supabase
      .from('roster')
      .insert({ name: 'New Member', category, sort_order: order, social_links: {} })
      .select()
      .single();
    if (error) {
      toast({ title: 'Could not add member', description: error.message, variant: 'destructive' });
      return;
    }
    setRows((prev) => [...(prev as RosterRow[]), data] as typeof prev);
  };

  const updateMember = async (id: string, patch: Partial<RosterRow>) => {
    const previous = all;
    setRows((prev) => (prev as RosterRow[]).map((m) => (m.id === id ? { ...m, ...patch } : m)) as typeof prev);
    const { error } = await supabase.from('roster').update(patch).eq('id', id);
    if (error) {
      setRows(previous as typeof rows);
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
    }
  };

  const removeMember = async (id: string) => {
    const previous = all;
    setRows((prev) => (prev as RosterRow[]).filter((m) => m.id !== id) as typeof prev);
    const { error } = await supabase.from('roster').delete().eq('id', id);
    if (error) {
      setRows(previous as typeof rows);
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Member removed' });
    }
  };

  const handleFile = async (id: string, file: File) => {
    setUploadingId(id);
    try {
      const url = await uploadImage('roster-images', file);
      await updateMember(id, { image_url: url });
      toast({ title: 'Image uploaded' });
    } catch (e) {
      toast({ title: 'Upload failed', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setUploadingId(null);
    }
  };

  const updateSocial = (m: RosterRow, key: string, value: string) => {
    const social: Record<string, string | boolean> = {
      ...(m.social_links as Record<string, string | boolean> ?? {}),
    };
    if (value) social[key] = value; else delete social[key];
    // social_links column accepts Json; cast through unknown to satisfy generated types
    return updateMember(m.id, { social_links: social as unknown as RosterRow['social_links'] });
  };

  const renderUpload = (id: string) => (
    <>
      <input
        ref={(el) => { fileInputs.current[id] = el; }}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(id, f);
          e.target.value = '';
        }}
      />
      <Button
        variant="outline" size="sm"
        onClick={() => fileInputs.current[id]?.click()}
        disabled={uploadingId === id}
        className="border-zinc-700 text-zinc-300"
      >
        {uploadingId === id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
      </Button>
    </>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Leadership & Roster</h1>
          <p className="text-zinc-400 text-sm mt-1">{leadership.length} leadership · {talent.length} talent</p>
        </div>
        <Button variant="outline" size="sm" onClick={refetch} disabled={loading} className="border-zinc-700 text-zinc-300">
          <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </Button>
      </div>

      {loading && all.length === 0 && <p className="text-zinc-500 text-sm text-center py-6">Loading roster…</p>}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      <Tabs defaultValue="leadership" className="space-y-4">
        <TabsList className="bg-zinc-800">
          <TabsTrigger value="leadership" className="data-[state=active]:bg-zinc-700">Leadership ({leadership.length})</TabsTrigger>
          <TabsTrigger value="talent" className="data-[state=active]:bg-zinc-700">Talent ({talent.length})</TabsTrigger>
        </TabsList>

        {/* LEADERSHIP */}
        <TabsContent value="leadership" className="space-y-4">
          <Button size="sm" variant="outline" onClick={() => addMember(LEADERSHIP_CATEGORY)} className="border-zinc-700 text-zinc-300">
            <Plus className="w-4 h-4 mr-1" /> Add Leadership Member
          </Button>

          {leadership.map((person) => {
            const social = (person.social_links ?? {}) as Record<string, string>;
            return (
              <Card key={person.id} className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-16 rounded-lg bg-zinc-800 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {person.image_url ? (
                        <img src={person.image_url} alt={person.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-6 h-6 text-zinc-600" />
                      )}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input placeholder="Name" defaultValue={person.name} onBlur={(e) => e.target.value !== person.name && updateMember(person.id, { name: e.target.value })} className="bg-zinc-800 border-zinc-700 text-white" />
                        <Input placeholder="Title (e.g. CEO & Founder)" defaultValue={social.title ?? ''} onBlur={(e) => updateSocial(person, 'title', e.target.value)} className="bg-zinc-800 border-zinc-700 text-white" />
                      </div>
                      <div className="flex gap-2">
                        <Input placeholder="Image URL (or upload)" defaultValue={person.image_url ?? ''} onBlur={(e) => e.target.value !== (person.image_url ?? '') && updateMember(person.id, { image_url: e.target.value || null })} className="bg-zinc-800 border-zinc-700 text-white flex-1" />
                        {renderUpload(person.id)}
                      </div>
                      <Textarea placeholder="Bio" defaultValue={person.bio ?? ''} onBlur={(e) => e.target.value !== (person.bio ?? '') && updateMember(person.id, { bio: e.target.value || null })} className="bg-zinc-800 border-zinc-700 text-white min-h-[60px]" />
                      {social.is_founder ? (
                        <Label className="text-zinc-300 text-sm flex items-center gap-1">
                          <Crown className="w-3 h-3 text-yellow-500" /> Founder
                        </Label>
                      ) : null}
                    </div>
                    <button onClick={() => removeMember(person.id)} className="text-zinc-500 hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        {/* TALENT */}
        <TabsContent value="talent" className="space-y-4">
          <div className="flex items-center gap-2">
            <CategoryAdder existing={categories} onAdd={(cat) => addMember(cat)} />
          </div>

          {categories.length === 0 && !loading && (
            <p className="text-zinc-500 text-sm text-center py-4">No talent yet. Use the menu above to add a member to a category.</p>
          )}

          {categories.map((cat) => (
            <div key={cat} className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-white text-sm font-semibold">{cat}</h3>
                <Button size="sm" variant="ghost" onClick={() => addMember(cat)} className="text-zinc-400 hover:text-white h-7">
                  <Plus className="w-3 h-3 mr-1" /> Add
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {talent.filter((m) => m.category === cat).map((member) => {
                  const social = (member.social_links ?? {}) as Record<string, string>;
                  return (
                    <Card key={member.id} className="bg-zinc-900 border-zinc-800">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-full bg-zinc-800 overflow-hidden flex-shrink-0">
                            {member.image_url ? (
                              <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center"><User className="w-5 h-5 text-zinc-600" /></div>
                            )}
                          </div>
                          <div className="flex-1 space-y-2 min-w-0">
                            <Input placeholder="Name" defaultValue={member.name} onBlur={(e) => e.target.value !== member.name && updateMember(member.id, { name: e.target.value })} className="bg-zinc-800 border-zinc-700 text-white h-8 text-sm" />
                            <Input placeholder="Bio / specialty" defaultValue={member.bio ?? ''} onBlur={(e) => e.target.value !== (member.bio ?? '') && updateMember(member.id, { bio: e.target.value || null })} className="bg-zinc-800 border-zinc-700 text-white h-8 text-xs" />
                            <div className="flex gap-2">
                              <Input placeholder="Image URL" defaultValue={member.image_url ?? ''} onBlur={(e) => e.target.value !== (member.image_url ?? '') && updateMember(member.id, { image_url: e.target.value || null })} className="bg-zinc-800 border-zinc-700 text-white h-8 text-xs flex-1" />
                              {renderUpload(member.id)}
                            </div>
                            <Input placeholder="Instagram URL" defaultValue={social.instagram ?? ''} onBlur={(e) => updateSocial(member, 'instagram', e.target.value)} className="bg-zinc-800 border-zinc-700 text-white h-8 text-xs" />
                          </div>
                          <button onClick={() => removeMember(member.id)} className="text-zinc-500 hover:text-red-400 self-start">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const CategoryAdder: React.FC<{ existing: string[]; onAdd: (cat: string) => void }> = ({ existing, onAdd }) => {
  const [value, setValue] = useState('');
  const [picked, setPicked] = useState<string>(existing[0] ?? '');

  React.useEffect(() => {
    if (!picked && existing[0]) setPicked(existing[0]);
  }, [existing, picked]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {existing.length > 0 && (
        <>
          <select
            value={picked}
            onChange={(e) => setPicked(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 text-white rounded px-2 py-1 text-sm"
          >
            {existing.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <Button size="sm" variant="outline" onClick={() => picked && onAdd(picked)} className="border-zinc-700 text-zinc-300">
            <Plus className="w-4 h-4 mr-1" /> Add to category
          </Button>
        </>
      )}
      <Input
        placeholder="New category name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="bg-zinc-800 border-zinc-700 text-white h-8 w-full sm:w-56 text-sm"
      />
      <Button size="sm" onClick={() => { if (value.trim()) { onAdd(value.trim()); setValue(''); } }}>
        <Plus className="w-4 h-4 mr-1" /> Create category
      </Button>
    </div>
  );
};

export default AdminRoster;