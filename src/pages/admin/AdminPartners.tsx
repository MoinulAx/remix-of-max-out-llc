import React, { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, ExternalLink, RefreshCw, Upload, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useSupabaseTable } from '@/hooks/useSupabaseTable';
import { uploadImage } from '@/lib/uploadImage';
import type { Database } from '@/integrations/supabase/types';

type Partner = Database['public']['Tables']['partners']['Row'];

const AdminPartners: React.FC = () => {
  const { toast } = useToast();
  const { rows, setRows, loading, error, refetch } = useSupabaseTable('partners', {
    orderBy: 'sort_order',
    ascending: true,
  });
  const partners = rows as Partner[];
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  const addPartner = async () => {
    const nextOrder = (partners[partners.length - 1]?.sort_order ?? 0) + 1;
    const { data, error } = await supabase
      .from('partners')
      .insert({ name: 'New Partner', sort_order: nextOrder })
      .select()
      .single();
    if (error) {
      toast({ title: 'Could not add partner', description: error.message, variant: 'destructive' });
      return;
    }
    setRows((prev) => [...(prev as Partner[]), data] as typeof prev);
  };

  const updatePartner = async (id: string, patch: Partial<Partner>) => {
    const previous = partners;
    setRows((prev) => (prev as Partner[]).map((p) => (p.id === id ? { ...p, ...patch } : p)) as typeof prev);
    const { error } = await supabase.from('partners').update(patch).eq('id', id);
    if (error) {
      setRows(previous as typeof rows);
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
    }
  };

  const removePartner = async (id: string) => {
    const previous = partners;
    setRows((prev) => (prev as Partner[]).filter((p) => p.id !== id) as typeof prev);
    const { error } = await supabase.from('partners').delete().eq('id', id);
    if (error) {
      setRows(previous as typeof rows);
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Partner removed' });
    }
  };

  const handleFile = async (partnerId: string, file: File) => {
    setUploadingId(partnerId);
    try {
      const url = await uploadImage('partner-logos', file);
      await updatePartner(partnerId, { logo_url: url });
      toast({ title: 'Logo uploaded' });
    } catch (e) {
      toast({ title: 'Upload failed', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setUploadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Partners</h1>
          <p className="text-zinc-400 text-sm mt-1">{partners.length} partner{partners.length === 1 ? '' : 's'}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={refetch} disabled={loading} className="border-zinc-700 text-zinc-300">
            <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </Button>
          <Button size="sm" onClick={addPartner}>
            <Plus className="w-4 h-4 mr-1" /> Add Partner
          </Button>
        </div>
      </div>

      {loading && partners.length === 0 && (
        <p className="text-zinc-500 text-sm text-center py-8">Loading partners…</p>
      )}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Preview */}
      {partners.length > 0 && (
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white text-sm">Preview — Partner Grid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {partners.map((p) => (
                <div key={p.id} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-zinc-800">
                  <div className="w-16 h-16 rounded-lg bg-zinc-700 flex items-center justify-center overflow-hidden">
                    {p.logo_url ? (
                      <img src={p.logo_url} alt={p.name} className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all" />
                    ) : (
                      <span className="text-zinc-500 text-xs text-center">{p.name || 'Logo'}</span>
                    )}
                  </div>
                  <span className="text-zinc-400 text-xs text-center truncate w-full">{p.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit list */}
      <div className="space-y-3">
        {partners.map((partner) => (
          <Card key={partner.id} className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded bg-zinc-800 overflow-hidden flex items-center justify-center flex-shrink-0">
                  {partner.logo_url ? (
                    <img src={partner.logo_url} alt={partner.name} className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-zinc-600 text-[10px]">No logo</span>
                  )}
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    placeholder="Partner name"
                    defaultValue={partner.name}
                    onBlur={(e) => e.target.value !== partner.name && updatePartner(partner.id, { name: e.target.value })}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                  <Input
                    placeholder="Logo URL (or upload)"
                    defaultValue={partner.logo_url ?? ''}
                    onBlur={(e) => e.target.value !== (partner.logo_url ?? '') && updatePartner(partner.id, { logo_url: e.target.value || null })}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                  <Input
                    placeholder="Website URL"
                    defaultValue={partner.website ?? ''}
                    onBlur={(e) => e.target.value !== (partner.website ?? '') && updatePartner(partner.id, { website: e.target.value || null })}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
                <input
                  ref={(el) => { fileInputs.current[partner.id] = el; }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(partner.id, f);
                    e.target.value = '';
                  }}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputs.current[partner.id]?.click()}
                  disabled={uploadingId === partner.id}
                  className="border-zinc-700 text-zinc-300"
                >
                  {uploadingId === partner.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                </Button>
                {partner.website && (
                  <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button onClick={() => removePartner(partner.id)} className="text-zinc-500 hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!loading && partners.length === 0 && (
        <p className="text-zinc-500 text-sm text-center py-8">No partners yet. Click "Add Partner" to create one.</p>
      )}
    </div>
  );
};

export default AdminPartners;