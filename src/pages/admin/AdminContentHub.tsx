import React, { useMemo, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, ExternalLink, Upload, Loader2, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useSupabaseTable } from '@/hooks/useSupabaseTable';
import { uploadImage } from '@/lib/uploadImage';
import type { Database } from '@/integrations/supabase/types';

type Post = Database['public']['Tables']['content_hub_posts']['Row'];

const TABS = [
  { value: 'youtube', label: 'YouTube', defaultPlatform: 'youtube' },
  { value: 'social', label: 'Social', defaultPlatform: 'instagram' },
  { value: 'video', label: 'Video Uploads', defaultPlatform: 'upload' },
  { value: 'image', label: 'Images', defaultPlatform: 'image' },
] as const;

const AdminContentHub: React.FC = () => {
  const { toast } = useToast();
  const { rows, setRows, loading, error, refetch } = useSupabaseTable('content_hub_posts', {
    orderBy: 'sort_order',
    ascending: true,
  });
  const posts = rows as Post[];
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  const grouped = useMemo(() => {
    const map: Record<string, Post[]> = { youtube: [], social: [], video: [], image: [] };
    for (const p of posts) {
      const k = p.media_type ?? 'youtube';
      if (!map[k]) map[k] = [];
      map[k].push(p);
    }
    return map;
  }, [posts]);

  const addPost = async (mediaType: string, platform: string) => {
    const order = (posts.reduce((max, p) => Math.max(max, p.sort_order ?? 0), 0)) + 1;
    const { data, error } = await supabase
      .from('content_hub_posts')
      .insert({ title: 'New Post', media_type: mediaType, platform, sort_order: order, is_published: true })
      .select()
      .single();
    if (error) {
      toast({ title: 'Could not add post', description: error.message, variant: 'destructive' });
      return;
    }
    setRows((prev) => [...(prev as Post[]), data] as typeof prev);
  };

  const updatePost = async (id: string, patch: Partial<Post>) => {
    const previous = posts;
    setRows((prev) => (prev as Post[]).map((p) => (p.id === id ? { ...p, ...patch } : p)) as typeof prev);
    const { error } = await supabase.from('content_hub_posts').update(patch).eq('id', id);
    if (error) {
      setRows(previous as typeof rows);
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
    }
  };

  const removePost = async (id: string) => {
    const previous = posts;
    setRows((prev) => (prev as Post[]).filter((p) => p.id !== id) as typeof prev);
    const { error } = await supabase.from('content_hub_posts').delete().eq('id', id);
    if (error) {
      setRows(previous as typeof rows);
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Post removed' });
    }
  };

  const handleFile = async (id: string, file: File) => {
    setUploadingId(id);
    try {
      const url = await uploadImage('content-hub-media', file);
      await updatePost(id, { media_url: url });
      toast({ title: 'Media uploaded' });
    } catch (e) {
      toast({ title: 'Upload failed', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setUploadingId(null);
    }
  };

  const renderRow = (post: Post, allowUpload: boolean) => (
    <Card key={post.id} className="bg-zinc-900 border-zinc-800">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <Input
                placeholder="Title"
                defaultValue={post.title}
                onBlur={(e) => e.target.value !== post.title && updatePost(post.id, { title: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white flex-1"
              />
              <div className="flex items-center gap-2">
                <Label className="text-zinc-400 text-xs">Published</Label>
                <Switch checked={post.is_published} onCheckedChange={(v) => updatePost(post.id, { is_published: v })} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="URL"
                defaultValue={post.media_url ?? ''}
                onBlur={(e) => e.target.value !== (post.media_url ?? '') && updatePost(post.id, { media_url: e.target.value || null })}
                className="bg-zinc-800 border-zinc-700 text-white flex-1"
              />
              {allowUpload && (
                <>
                  <input
                    ref={(el) => { fileInputs.current[post.id] = el; }}
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleFile(post.id, f);
                      e.target.value = '';
                    }}
                  />
                  <Button
                    variant="outline" size="sm"
                    onClick={() => fileInputs.current[post.id]?.click()}
                    disabled={uploadingId === post.id}
                    className="border-zinc-700 text-zinc-300"
                  >
                    {uploadingId === post.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  </Button>
                </>
              )}
              {post.media_url && (
                <a href={post.media_url} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white">
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
          <button onClick={() => removePost(post.id)} className="text-zinc-500 hover:text-red-400 mt-1">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Content Hub</h1>
          <p className="text-zinc-300 text-sm mt-1">{posts.length} total posts</p>
        </div>
        <Button variant="outline" size="sm" onClick={refetch} disabled={loading} className="border-zinc-600 text-zinc-200 hover:text-white hover:border-zinc-400">
          <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </Button>
      </div>

      {loading && posts.length === 0 && <p className="text-zinc-300 text-sm text-center py-6">Loading content…</p>}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      <Tabs defaultValue="youtube" className="space-y-4">
        <TabsList className="bg-zinc-800">
          {TABS.map((t) => (
            <TabsTrigger key={t.value} value={t.value} className="data-[state=active]:bg-zinc-700">
              {t.label} ({grouped[t.value]?.length ?? 0})
            </TabsTrigger>
          ))}
        </TabsList>

        {TABS.map((t) => (
          <TabsContent key={t.value} value={t.value} className="space-y-3">
            <Button size="sm" variant="outline" onClick={() => addPost(t.value, t.defaultPlatform)} className="border-zinc-700 text-zinc-300">
              <Plus className="w-4 h-4 mr-1" /> Add {t.label}
            </Button>
            {(grouped[t.value] ?? []).map((p) => renderRow(p, t.value === 'video' || t.value === 'image'))}
            {!loading && (grouped[t.value]?.length ?? 0) === 0 && (
              <p className="text-zinc-300 text-sm text-center py-4">No {t.label.toLowerCase()} posts yet.</p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AdminContentHub;