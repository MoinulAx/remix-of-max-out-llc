import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const bookingSchema = z.object({
  yourName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  talentName: z.string().min(2, 'Please specify who you are inquiring about'),
  services: z.string().min(2, 'Please specify the services needed'),
  budget: z.string().min(1, 'Please provide a budget range'),
  timeline: z.string().min(2, 'Please specify your timeline'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const managementSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  inquiry: z.string().min(10, 'Please provide more details'),
});

const Inquire = () => {
  const { toast } = useToast();

  const bookingForm = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: { yourName: '', email: '', talentName: '', services: '', budget: '', timeline: '', message: '' },
  });

  const managementForm = useForm({
    resolver: zodResolver(managementSchema),
    defaultValues: { name: '', email: '', company: '', inquiry: '' },
  });

  const onBookingSubmit = async (data: z.infer<typeof bookingSchema>) => {
    const composed = [
      `Inquiring about: ${data.talentName}`,
      `Services: ${data.services}`,
      `Budget: ${data.budget}`,
      `Timeline: ${data.timeline}`,
      `\n${data.message}`,
    ].join('\n');

    const { error } = await supabase.from('inquiries').insert({
      name: data.yourName,
      email: data.email,
      message: composed,
      type: 'booking',
    });

    if (error) {
      toast({ title: 'Error', description: 'Failed to send inquiry. Please try again.', variant: 'destructive' });
      return;
    }

    toast({ title: 'Booking Inquiry Sent!', description: "We'll get back to you within 24 hours." });
    bookingForm.reset();
  };

  const onManagementSubmit = async (data: z.infer<typeof managementSchema>) => {
    const composed = [
      data.company && `Company: ${data.company}`,
      `\n${data.inquiry}`,
    ].filter(Boolean).join('\n');

    const { error } = await supabase.from('inquiries').insert({
      name: data.name,
      email: data.email,
      message: composed,
      type: 'management',
    });

    if (error) {
      toast({ title: 'Error', description: 'Failed to send inquiry. Please try again.', variant: 'destructive' });
      return;
    }

    toast({ title: 'Inquiry Sent!', description: "We'll get back to you within 24 hours." });
    managementForm.reset();
  };

  return (
    <main className="relative min-h-screen">
      <Header />
      
      <section className="pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Inquire</h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
              Get in touch with us for booking or management inquiries.
            </p>
          </FadeIn>

          {/* Two Forms Side by Side */}
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {/* Client Booking Form */}
            <FadeIn delay={100}>
              <div className="border rounded-2xl p-6 md:p-8 bg-card h-full">
                <h2 className="text-2xl font-bold mb-1">Client Booking</h2>
                <p className="text-muted-foreground mb-6 text-sm">Book talent for your project</p>
                
                <Form {...bookingForm}>
                  <form onSubmit={bookingForm.handleSubmit(onBookingSubmit)} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField control={bookingForm.control} name="yourName" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Your Name *</FormLabel>
                          <FormControl><Input placeholder="Full name" className="h-10" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      
                      <FormField control={bookingForm.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Email *</FormLabel>
                          <FormControl><Input type="email" className="h-10" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    
                    <FormField control={bookingForm.control} name="talentName" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Who are you inquiring about? *</FormLabel>
                        <FormControl><Input placeholder="Talent name" className="h-10" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={bookingForm.control} name="services" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Services needed *</FormLabel>
                        <FormControl><Input placeholder="e.g., Music Video, Campaign" className="h-10" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField control={bookingForm.control} name="budget" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Budget *</FormLabel>
                          <FormControl><Input placeholder="$5,000 - $10,000" className="h-10" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      
                      <FormField control={bookingForm.control} name="timeline" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Timeline *</FormLabel>
                          <FormControl><Input placeholder="Within 2 weeks" className="h-10" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    
                    <FormField control={bookingForm.control} name="message" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Additional Details *</FormLabel>
                        <FormControl><Textarea rows={3} placeholder="Tell us more..." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <Button type="submit" disabled={bookingForm.formState.isSubmitting} className="w-full h-11 mt-2">
                      {bookingForm.formState.isSubmitting ? 'Sending...' : 'Submit Booking'}
                    </Button>
                  </form>
                </Form>
              </div>
            </FadeIn>

            {/* Management Inquiry Form */}
            <FadeIn delay={200}>
              <div className="border rounded-2xl p-6 md:p-8 bg-card h-full flex flex-col">
                <h2 className="text-2xl font-bold mb-1">Management Inquiry</h2>
                <p className="text-muted-foreground mb-6 text-sm">Reach out to our management team</p>
                
                <Form {...managementForm}>
                  <form onSubmit={managementForm.handleSubmit(onManagementSubmit)} className="space-y-4 flex-1 flex flex-col">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField control={managementForm.control} name="name" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Name *</FormLabel>
                          <FormControl><Input placeholder="Your name" className="h-10" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      
                      <FormField control={managementForm.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Email *</FormLabel>
                          <FormControl><Input type="email" className="h-10" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    
                    <FormField control={managementForm.control} name="company" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Company</FormLabel>
                        <FormControl><Input placeholder="Your company (optional)" className="h-10" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={managementForm.control} name="inquiry" render={({ field }) => (
                      <FormItem className="flex-1 flex flex-col">
                        <FormLabel className="text-sm">Your Inquiry *</FormLabel>
                        <FormControl><Textarea className="flex-1 min-h-[120px]" placeholder="Tell us about your inquiry..." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <Button type="submit" disabled={managementForm.formState.isSubmitting} className="w-full h-11 mt-2">
                      {managementForm.formState.isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                    </Button>
                  </form>
                </Form>
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Inquire;
