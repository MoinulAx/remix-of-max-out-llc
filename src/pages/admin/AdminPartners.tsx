import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, ExternalLink, GripVertical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Partner {
  id: string;
  name: string;
  logo: string;
  website: string;
}

const defaultPartners: Partner[] = [
  { id: '1', name: 'CPK Shawn', logo: '', website: '' },
  { id: '2', name: 'Rummspace', logo: '', website: '' },
  { id: '3', name: 'EPC Studios', logo: '', website: '' },
];

const AdminPartners: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>(defaultPartners);
  const { toast } = useToast();

  const addPartner = () => {
    setPartners([...partners, { id: Date.now().toString(), name: '', logo: '', website: '' }]);
  };

  const updatePartner = (id: string, field: keyof Partner, value: string) => {
    setPartners(partners.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const removePartner = (id: string) => {
    setPartners(partners.filter(p => p.id !== id));
    toast({ title: 'Partner removed' });
  };

  const handleSave = () => {
    toast({ title: 'Changes saved', description: 'Partners page updated.' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Partners</h1>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>

      <Button size="sm" variant="outline" onClick={addPartner} className="border-zinc-700 text-zinc-300">
        <Plus className="w-4 h-4 mr-1" /> Add Partner
      </Button>

      {/* Preview */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white text-sm">Preview — Partner Grid</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {partners.map((p) => (
              <div key={p.id} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-zinc-800">
                <div className="w-16 h-16 rounded-lg bg-zinc-700 flex items-center justify-center overflow-hidden">
                  {p.logo ? (
                    <img src={p.logo} alt={p.name} className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all" />
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

      {/* Edit List */}
      <div className="space-y-3">
        {partners.map((partner) => (
          <Card key={partner.id} className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-zinc-600 cursor-grab" />
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    placeholder="Partner name"
                    value={partner.name}
                    onChange={(e) => updatePartner(partner.id, 'name', e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                  <Input
                    placeholder="Logo URL"
                    value={partner.logo}
                    onChange={(e) => updatePartner(partner.id, 'logo', e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                  <Input
                    placeholder="Website URL"
                    value={partner.website}
                    onChange={(e) => updatePartner(partner.id, 'website', e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
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
    </div>
  );
};

export default AdminPartners;
