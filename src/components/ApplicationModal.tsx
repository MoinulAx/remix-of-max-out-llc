import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { sendApplicationEmail } from '@/lib/emailjs';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  jobType: string;
  jobLocation: string;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  jobTitle,
  jobType,
  jobLocation,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in your name and email.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await sendApplicationEmail({
        name: formData.name,
        email: formData.email,
        jobTitle: jobTitle,
      });

      toast({
        title: 'Application Submitted!',
        description: `Thank you for applying to ${jobTitle}. We'll be in touch soon!`,
      });

      // Reset form and close modal
      setFormData({
        name: '',
        email: '',
        phone: '',
        portfolio: '',
        experience: '',
        whyInterested: '',
      });
      onClose();
    } catch (error) {
      console.error('Application submission error:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your application. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Apply for Position</DialogTitle>
          <DialogDescription className="sr-only">
            Application form for {jobTitle}
          </DialogDescription>
        </DialogHeader>

        {/* Job Details Badge */}
        <div className="bg-muted rounded-lg p-4 mb-4">
          <h3 className="font-bold text-lg mb-2">{jobTitle}</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="bg-background px-2 py-1 rounded">{jobType}</span>
            <span className="bg-background px-2 py-1 rounded">{jobLocation}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio / LinkedIn</Label>
              <Input
                id="portfolio"
                placeholder="https://..."
                value={formData.portfolio}
                onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Relevant Experience</Label>
            <Textarea
              id="experience"
              placeholder="Tell us about your relevant experience..."
              rows={3}
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whyInterested">Why are you interested in this role?</Label>
            <Textarea
              id="whyInterested"
              placeholder="What excites you about this opportunity..."
              rows={3}
              value={formData.whyInterested}
              onChange={(e) => setFormData({ ...formData, whyInterested: e.target.value })}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationModal;
