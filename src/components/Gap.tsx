import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface GapProps {
  className?: string;
}

const Gap: React.FC<GapProps> = ({ className }) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from('inquiries')
        .insert({ name: 'Newsletter Subscriber', email, message: 'Newsletter subscription', type: 'newsletter' });
      if (error) throw error;
      toast({ title: 'Subscribed!', description: "You're on the list. We'll keep you updated." });
      setEmail('');
    } catch {
      toast({ title: 'Error', description: 'Could not subscribe. Please try again.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="newsletter" className={cn('py-20 bg-muted/30', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn>
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-muted-foreground mb-8">
              Get updates on new talent, projects, and opportunities from Max Out Management.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" disabled={loading} className="shadow-[var(--shadow-sharp)]">
                {loading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Gap;
