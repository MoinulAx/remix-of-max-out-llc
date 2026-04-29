import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { sendQuoteEmail } from '@/lib/emailjs';

const BUDGET_OPTIONS = [
  'Under $100', '$100 - $250', '$250 - $500',
  '$500 - $1,000', '$1,000 - $2,500', '$2,500 - $5,000', '$5,000+',
] as const;

const TIMELINE_OPTIONS = [
  'ASAP', 'Within 1 month', '1-3 months', '3-6 months', '6+ months', 'Just exploring',
] as const;

const schema = z.object({
  name:             z.string().min(2, 'Name must be at least 2 characters'),
  email:            z.string().email('Enter a valid email address'),
  phone:            z.string().optional(),
  budget_range:     z.string().optional(),
  project_timeline: z.string().optional(),
  message:          z.string().min(10, 'Please describe your project (at least 10 characters)'),
});

type FormValues = z.infer<typeof schema>;

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType?: string;
}

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="text-destructive text-xs mt-1">{message}</p> : null;

const inputClass = 'w-full px-4 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring';

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, serviceType = '' }) => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      const { error } = await supabase
        .from('quote_requests')
        .insert({
          name: values.name!,
          email: values.email!,
          phone: values.phone,
          budget_range: values.budget_range,
          project_timeline: values.project_timeline,
          message: values.message,
          service_type: serviceType,
        });

      if (error) throw error;

      await sendQuoteEmail({
        name: values.name,
        email: values.email,
        phone: values.phone,
        serviceType,
        budgetRange: values.budget_range,
        projectTimeline: values.project_timeline,
        message: values.message,
      });

      toast({
        title: 'Quote Request Sent!',
        description: "Check your email for confirmation — we'll get back to you within 24 hours.",
      });
      reset();
      onClose();
    } catch (err) {
      const e = err as { code?: string };
      const msg = e?.code === 'P0001'
        ? 'Too many submissions — please wait before trying again.'
        : 'Failed to send quote request. Please try again.';
      toast({ title: 'Error', description: msg, variant: 'destructive' });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Request Quote{serviceType && ` — ${serviceType}`}
          </DialogTitle>
        </DialogHeader>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <input {...register('name')} className={inputClass} />
                  <FieldError message={errors.name?.message} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input type="email" {...register('email')} className={inputClass} />
                  <FieldError message={errors.email?.message} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input type="tel" {...register('phone')} className={inputClass} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Budget Range</label>
                  <select {...register('budget_range')} className={inputClass}>
                    <option value="">Select budget range</option>
                    {BUDGET_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Project Timeline</label>
                <select {...register('project_timeline')} className={inputClass}>
                  <option value="">Select timeline</option>
                  {TIMELINE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Project Details *</label>
                <textarea
                  {...register('message')}
                  rows={4}
                  placeholder="Tell us about your project..."
                  className={`${inputClass} resize-vertical`}
                />
                <FieldError message={errors.message?.message} />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-primary text-primary-foreground px-6 py-3 font-semibold hover:bg-primary/90 transition-colors shadow-[var(--shadow-sharp)] disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Quote Request'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 border-2 border-input text-muted-foreground px-6 py-3 font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteModal;
