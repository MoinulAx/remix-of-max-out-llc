import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** 'job' saves to job_applications; 'roster' saves to applications */
  variant?: 'job' | 'roster';
  jobTitle?: string;
  jobType?: string;
  jobLocation?: string;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  variant = 'job',
  jobTitle = '',
  jobType = '',
  jobLocation = '',
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    portfolio: '',
    experience: '',
    whyInterested: '',
  });

  const set = (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast({ title: 'Missing Information', description: 'Please fill in your name and email.', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);

    const table = variant === 'roster' ? 'applications' : 'job_applications';

    const payload = variant === 'roster'
      ? {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          portfolio: formData.portfolio || null,
          experience: formData.experience || null,
          why_interested: formData.whyInterested || null,
        }
      : {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          portfolio_url: formData.portfolio || null,
          cover_letter: formData.whyInterested || formData.experience || null,
          job_title: jobTitle,
          job_type: jobType,
          job_location: jobLocation,
        };

    const { error } = await supabase.from(table as 'applications').insert([payload as never]);

    setIsSubmitting(false);

    if (error) {
      const msg = error.code === 'P0001'
        ? 'Too many submissions — please wait before trying again.'
        : 'There was an error submitting your application. Please try again.';
      toast({ title: 'Submission Failed', description: msg, variant: 'destructive' });
      return;
    }

    const successMsg = variant === 'roster'
      ? "We'll review your application and be in touch soon!"
      : `Thank you for applying to ${jobTitle}. We'll be in touch soon!`;

    toast({ title: 'Application Submitted!', description: successMsg });
    setFormData({ name: '', email: '', phone: '', portfolio: '', experience: '', whyInterested: '' });
    onClose();
  };

  const isRoster = variant === 'roster';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {isRoster ? 'Apply to Join Our Roster' : 'Apply for Position'}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            {isRoster
              ? 'Submit your info and we\'ll review your application.'
              : `Applying for: ${jobTitle}`}
          </DialogDescription>
        </DialogHeader>

        {!isRoster && (
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-bold text-lg mb-2">{jobTitle}</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              {jobType && <span className="bg-background px-2 py-1 rounded">{jobType}</span>}
              {jobLocation && <span className="bg-background px-2 py-1 rounded">{jobLocation}</span>}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" placeholder="Your full name" value={formData.name} onChange={set('name')} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" placeholder="your@email.com" value={formData.email} onChange={set('email')} required />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="(555) 123-4567" value={formData.phone} onChange={set('phone')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolio">{isRoster ? 'Instagram / Portfolio' : 'Portfolio / LinkedIn'}</Label>
              <Input id="portfolio" placeholder="https://..." value={formData.portfolio} onChange={set('portfolio')} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">{isRoster ? 'Your Experience & Background' : 'Relevant Experience'}</Label>
            <Textarea
              id="experience"
              placeholder={isRoster ? 'Tell us about yourself, your music, performances, etc.' : 'Tell us about your relevant experience...'}
              rows={3}
              value={formData.experience}
              onChange={set('experience')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whyInterested">
              {isRoster ? 'Why do you want to join Max Out Management?' : 'Why are you interested in this role?'}
            </Label>
            <Textarea
              id="whyInterested"
              placeholder={isRoster ? 'What are your goals and why are you a good fit?' : 'What excites you about this opportunity...'}
              rows={3}
              value={formData.whyInterested}
              onChange={set('whyInterested')}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1" disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationModal;
