import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, GripVertical, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VideoItem {
  id: string;
  title: string;
  type: 'youtube' | 'upload';
  url: string;
  featured: boolean;
}

interface ArticleItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
}

interface SocialItem {
  id: string;
  label: string;
  url: string;
}

const defaultVideos: VideoItem[] = [
  { id: '1', title: 'ev09 Loso', type: 'youtube', url: 'https://youtu.be/tqAfN9iqzk8', featured: true },
  { id: '2', title: 'Sky Bank', type: 'youtube', url: 'https://youtu.be/-irsKNSAbdE', featured: false },
  { id: '3', title: 'Sstels', type: 'youtube', url: 'https://youtu.be/8zeHmxZW4t4', featured: false },
  { id: '4', title: 'Runway', type: 'youtube', url: 'https://youtu.be/QarooJx_QvY', featured: false },
  { id: '5', title: 'Use Knight', type: 'youtube', url: 'https://youtu.be/jZFPDOxpE64', featured: false },
  { id: '6', title: "Don't Stop It", type: 'youtube', url: 'https://youtu.be/FlX7mMj-f0k', featured: false },
];

const defaultArticles: ArticleItem[] = [
  { id: '1', title: 'Max Out Method Tour Takes Over NYC Times Square', excerpt: 'NYC stood still as the Max Out Method Tour officially touched down...', content: 'NYC stood still as the Max Out Method Tour officially touched down in Times Square.', coverImage: '' },
  { id: '2', title: 'Max Out Method Tour Coming to a City Near You', excerpt: 'The movement is moving...', content: 'Following the massive success in NYC, the Max Out Method Tour is hitting the road.', coverImage: '' },
  { id: '3', title: 'EPC Studios Projects on the Way', excerpt: 'We are currently in the lab...', content: 'We are currently in the lab finalizing exclusive projects and visuals.', coverImage: '' },
];

const defaultSocials: SocialItem[] = [
  { id: '1', label: 'ev09 Loso', url: 'https://www.instagram.com/reel/DSx9bj3j2-I/' },
  { id: '2', label: 'Post', url: 'https://www.instagram.com/p/Ca2mkGEtfxx/' },
  { id: '3', label: 'Post', url: 'https://www.instagram.com/p/DS_G5tykgav/' },
  { id: '4', label: 'Anais', url: 'https://www.instagram.com/reel/DI9oLR9yUG7/' },
];

const AdminContentHub: React.FC = () => {
  const [videos, setVideos] = useState<VideoItem[]>(defaultVideos);
  const [articles, setArticles] = useState<ArticleItem[]>(defaultArticles);
  const [socials, setSocials] = useState<SocialItem[]>(defaultSocials);
  const [newVideoType, setNewVideoType] = useState<'youtube' | 'upload'>('youtube');
  const { toast } = useToast();

  const addVideo = () => {
    setVideos([...videos, { id: Date.now().toString(), title: '', type: newVideoType, url: '', featured: false }]);
  };

  const updateVideo = (id: string, field: keyof VideoItem, value: any) => {
    setVideos(videos.map(v => v.id === id ? { ...v, [field]: value } : v));
  };

  const removeVideo = (id: string) => {
    setVideos(videos.filter(v => v.id !== id));
    toast({ title: 'Video removed' });
  };

  const addArticle = () => {
    setArticles([...articles, { id: Date.now().toString(), title: '', excerpt: '', content: '', coverImage: '' }]);
  };

  const updateArticle = (id: string, field: keyof ArticleItem, value: string) => {
    setArticles(articles.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const removeArticle = (id: string) => {
    setArticles(articles.filter(a => a.id !== id));
    toast({ title: 'Article removed' });
  };

  const addSocial = () => {
    setSocials([...socials, { id: Date.now().toString(), label: '', url: '' }]);
  };

  const updateSocial = (id: string, field: keyof SocialItem, value: string) => {
    setSocials(socials.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const removeSocial = (id: string) => {
    setSocials(socials.filter(s => s.id !== id));
    toast({ title: 'Social post removed' });
  };

  const handleSave = () => {
    toast({ title: 'Changes saved', description: 'Content Hub has been updated.' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Content Hub</h1>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>

      <Tabs defaultValue="videos" className="space-y-4">
        <TabsList className="bg-zinc-800">
          <TabsTrigger value="videos" className="data-[state=active]:bg-zinc-700">Videos</TabsTrigger>
          <TabsTrigger value="articles" className="data-[state=active]:bg-zinc-700">Articles / Press</TabsTrigger>
          <TabsTrigger value="social" className="data-[state=active]:bg-zinc-700">Social Media</TabsTrigger>
        </TabsList>

        {/* VIDEOS TAB */}
        <TabsContent value="videos" className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label className="text-zinc-300 text-sm">Type:</Label>
              <button
                onClick={() => setNewVideoType('youtube')}
                className={`px-3 py-1 rounded text-xs font-medium ${newVideoType === 'youtube' ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-400'}`}
              >
                YouTube
              </button>
              <button
                onClick={() => setNewVideoType('upload')}
                className={`px-3 py-1 rounded text-xs font-medium ${newVideoType === 'upload' ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-400'}`}
              >
                Upload
              </button>
            </div>
            <Button size="sm" variant="outline" onClick={addVideo} className="border-zinc-700 text-zinc-300">
              <Plus className="w-4 h-4 mr-1" /> Add Video
            </Button>
          </div>

          {videos.map((video) => (
            <Card key={video.id} className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <GripVertical className="w-4 h-4 text-zinc-600 mt-3 cursor-grab" />
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <Input
                        placeholder="Video title"
                        value={video.title}
                        onChange={(e) => updateVideo(video.id, 'title', e.target.value)}
                        className="bg-zinc-800 border-zinc-700 text-white flex-1"
                      />
                      <div className="flex items-center gap-2">
                        <Label className="text-zinc-400 text-xs">Featured</Label>
                        <Switch
                          checked={video.featured}
                          onCheckedChange={(v) => updateVideo(video.id, 'featured', v)}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs ${video.type === 'youtube' ? 'bg-red-900/50 text-red-400' : 'bg-blue-900/50 text-blue-400'}`}>
                        {video.type === 'youtube' ? 'YouTube' : 'Upload'}
                      </span>
                      <Input
                        placeholder={video.type === 'youtube' ? 'YouTube URL' : 'Video file path'}
                        value={video.url}
                        onChange={(e) => updateVideo(video.id, 'url', e.target.value)}
                        className="bg-zinc-800 border-zinc-700 text-white flex-1"
                      />
                    </div>
                  </div>
                  <button onClick={() => removeVideo(video.id)} className="text-zinc-500 hover:text-red-400 mt-3">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* ARTICLES TAB */}
        <TabsContent value="articles" className="space-y-4">
          <Button size="sm" variant="outline" onClick={addArticle} className="border-zinc-700 text-zinc-300">
            <Plus className="w-4 h-4 mr-1" /> Add Article
          </Button>

          {articles.map((article) => (
            <Card key={article.id} className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-1 space-y-3">
                    <Input
                      placeholder="Article title"
                      value={article.title}
                      onChange={(e) => updateArticle(article.id, 'title', e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white"
                    />
                    <Input
                      placeholder="Cover image URL"
                      value={article.coverImage}
                      onChange={(e) => updateArticle(article.id, 'coverImage', e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white"
                    />
                    <Input
                      placeholder="Excerpt (short summary)"
                      value={article.excerpt}
                      onChange={(e) => updateArticle(article.id, 'excerpt', e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white"
                    />
                    <Textarea
                      placeholder="Full content"
                      value={article.content}
                      onChange={(e) => updateArticle(article.id, 'content', e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white min-h-[100px]"
                    />
                  </div>
                  <button onClick={() => removeArticle(article.id)} className="text-zinc-500 hover:text-red-400 mt-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* SOCIAL TAB */}
        <TabsContent value="social" className="space-y-4">
          <Button size="sm" variant="outline" onClick={addSocial} className="border-zinc-700 text-zinc-300">
            <Plus className="w-4 h-4 mr-1" /> Add Instagram Post
          </Button>

          {socials.map((social) => (
            <Card key={social.id} className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 flex gap-3">
                    <Input
                      placeholder="Label (e.g. Artist name)"
                      value={social.label}
                      onChange={(e) => updateSocial(social.id, 'label', e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white w-40"
                    />
                    <Input
                      placeholder="Instagram URL"
                      value={social.url}
                      onChange={(e) => updateSocial(social.id, 'url', e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white flex-1"
                    />
                    <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white mt-2">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <button onClick={() => removeSocial(social.id)} className="text-zinc-500 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminContentHub;
