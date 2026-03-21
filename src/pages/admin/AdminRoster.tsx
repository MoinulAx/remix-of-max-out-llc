import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, User, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LeadershipMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  headshot: string;
  isFounder: boolean;
}

interface RosterCategory {
  id: string;
  name: string;
}

interface RosterMember {
  id: string;
  name: string;
  image: string;
  categoryId: string;
  active: boolean;
}

const defaultLeadership: LeadershipMember[] = [
  { id: '1', name: 'Sheedy the Plug', title: 'CEO & Founder', bio: 'Visionary leader of Max Out Management.', headshot: '', isFounder: true },
];

const defaultCategories: RosterCategory[] = [
  { id: '1', name: 'Artists' },
  { id: '2', name: 'Producers' },
];

const defaultRoster: RosterMember[] = [
  { id: '1', name: 'Flacco', image: '/roster/flacco.JPG', categoryId: '1', active: true },
  { id: '2', name: 'Anais', image: '/roster/Anais.jpg', categoryId: '1', active: true },
  { id: '3', name: 'Partii', image: '/roster/partii.png', categoryId: '1', active: true },
  { id: '4', name: 'Danny Nym', image: '/roster/Danny-nym.png', categoryId: '1', active: true },
];

const AdminRoster: React.FC = () => {
  const [leadership, setLeadership] = useState<LeadershipMember[]>(defaultLeadership);
  const [categories, setCategories] = useState<RosterCategory[]>(defaultCategories);
  const [roster, setRoster] = useState<RosterMember[]>(defaultRoster);
  const { toast } = useToast();

  // Leadership CRUD
  const addLeader = () => {
    setLeadership([...leadership, { id: Date.now().toString(), name: '', title: '', bio: '', headshot: '', isFounder: false }]);
  };
  const updateLeader = (id: string, field: keyof LeadershipMember, value: any) => {
    setLeadership(leadership.map(l => l.id === id ? { ...l, [field]: value } : l));
  };
  const removeLeader = (id: string) => {
    setLeadership(leadership.filter(l => l.id !== id));
  };

  // Categories CRUD
  const addCategory = () => {
    setCategories([...categories, { id: Date.now().toString(), name: '' }]);
  };
  const updateCategory = (id: string, name: string) => {
    setCategories(categories.map(c => c.id === id ? { ...c, name } : c));
  };
  const removeCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  // Roster CRUD
  const addMember = () => {
    setRoster([...roster, { id: Date.now().toString(), name: '', image: '', categoryId: categories[0]?.id || '', active: true }]);
  };
  const updateMember = (id: string, field: keyof RosterMember, value: any) => {
    setRoster(roster.map(m => m.id === id ? { ...m, [field]: value } : m));
  };
  const removeMember = (id: string) => {
    setRoster(roster.filter(m => m.id !== id));
  };

  const handleSave = () => {
    toast({ title: 'Changes saved', description: 'Leadership & Roster updated.' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Leadership & Roster</h1>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>

      <Tabs defaultValue="leadership" className="space-y-4">
        <TabsList className="bg-zinc-800">
          <TabsTrigger value="leadership" className="data-[state=active]:bg-zinc-700">Leadership</TabsTrigger>
          <TabsTrigger value="categories" className="data-[state=active]:bg-zinc-700">Categories</TabsTrigger>
          <TabsTrigger value="roster" className="data-[state=active]:bg-zinc-700">Roster Members</TabsTrigger>
        </TabsList>

        {/* LEADERSHIP */}
        <TabsContent value="leadership" className="space-y-4">
          <Button size="sm" variant="outline" onClick={addLeader} className="border-zinc-700 text-zinc-300">
            <Plus className="w-4 h-4 mr-1" /> Add Person
          </Button>

          {leadership.map((person) => (
            <Card key={person.id} className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 rounded-lg bg-zinc-800 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {person.headshot ? (
                      <img src={person.headshot} alt={person.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-zinc-600" />
                    )}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Input placeholder="Name" value={person.name} onChange={(e) => updateLeader(person.id, 'name', e.target.value)} className="bg-zinc-800 border-zinc-700 text-white" />
                      <Input placeholder="Title" value={person.title} onChange={(e) => updateLeader(person.id, 'title', e.target.value)} className="bg-zinc-800 border-zinc-700 text-white" />
                    </div>
                    <Input placeholder="Headshot URL" value={person.headshot} onChange={(e) => updateLeader(person.id, 'headshot', e.target.value)} className="bg-zinc-800 border-zinc-700 text-white" />
                    <Textarea placeholder="Bio" value={person.bio} onChange={(e) => updateLeader(person.id, 'bio', e.target.value)} className="bg-zinc-800 border-zinc-700 text-white min-h-[60px]" />
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={person.isFounder}
                        onCheckedChange={(v) => updateLeader(person.id, 'isFounder', !!v)}
                      />
                      <Label className="text-zinc-300 text-sm flex items-center gap-1">
                        <Crown className="w-3 h-3 text-yellow-500" /> Is Founder
                      </Label>
                    </div>
                  </div>
                  <button onClick={() => removeLeader(person.id)} className="text-zinc-500 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* CATEGORIES */}
        <TabsContent value="categories" className="space-y-4">
          <Button size="sm" variant="outline" onClick={addCategory} className="border-zinc-700 text-zinc-300">
            <Plus className="w-4 h-4 mr-1" /> Add Category
          </Button>

          {categories.map((cat) => (
            <Card key={cat.id} className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4 flex items-center gap-3">
                <Input
                  placeholder="Category name"
                  value={cat.name}
                  onChange={(e) => updateCategory(cat.id, e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white flex-1"
                />
                <span className="text-zinc-500 text-xs">{roster.filter(r => r.categoryId === cat.id).length} members</span>
                <button onClick={() => removeCategory(cat.id)} className="text-zinc-500 hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* ROSTER MEMBERS */}
        <TabsContent value="roster" className="space-y-4">
          <Button size="sm" variant="outline" onClick={addMember} className="border-zinc-700 text-zinc-300">
            <Plus className="w-4 h-4 mr-1" /> Add Member
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roster.map((member) => (
              <Card key={member.id} className={`border-zinc-800 ${member.active ? 'bg-zinc-900' : 'bg-zinc-900/50 opacity-60'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-zinc-800 overflow-hidden flex-shrink-0">
                      {member.image ? (
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="w-5 h-5 text-zinc-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <Input placeholder="Name" value={member.name} onChange={(e) => updateMember(member.id, 'name', e.target.value)} className="bg-zinc-800 border-zinc-700 text-white h-8 text-sm" />
                      <div className="flex items-center gap-2">
                        <select
                          value={member.categoryId}
                          onChange={(e) => updateMember(member.id, 'categoryId', e.target.value)}
                          className="bg-zinc-800 border border-zinc-700 text-white rounded px-2 py-1 text-xs flex-1"
                        >
                          {categories.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                        <div className="flex items-center gap-1">
                          <Checkbox checked={member.active} onCheckedChange={(v) => updateMember(member.id, 'active', !!v)} />
                          <Label className="text-zinc-400 text-xs">Active</Label>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => removeMember(member.id)} className="text-zinc-500 hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminRoster;
