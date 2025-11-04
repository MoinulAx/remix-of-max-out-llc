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

const bookingSchema = z.object({
  yourName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  talentName: z.string().min(2, 'Please specify who you are inquiring about'),
  services: z.string().min(2, 'Please specify the services needed'),
  budget: z.string().min(1, 'Please provide a budget range'),
  timeline: z.string().min(2, 'Please specify your timeline'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const Inquire = () => {
  const { toast } = useToast();

  const bookingForm = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: { yourName: '', email: '', talentName: '', services: '', budget: '', timeline: '', message: '' },
  });

  const onBookingSubmit = (data: z.infer<typeof bookingSchema>) => {
    const mailtoLink = `mailto:epcstudiosny@gmail.com?subject=Booking Inquiry - ${data.talentName}&body=Your Name: ${data.yourName}%0D%0AEmail: ${data.email}%0D%0AInquiring About: ${data.talentName}%0D%0AServices Needed: ${data.services}%0D%0ABudget: ${data.budget}%0D%0ATimeline: ${data.timeline}%0D%0A%0D%0AMessage:%0D%0A${data.message}`;
    window.location.href = mailtoLink;
    toast({ title: 'Opening email client...', description: 'Your booking inquiry will be sent to our team.' });
  };

  return (
    <main className="relative min-h-screen">
      <Header />
      
      <section className="pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Book Talent</h1>
            <p className="text-xl text-muted-foreground mb-16 max-w-3xl">
              Submit an inquiry to book one of our exclusive roster talents for your project.
            </p>
          </FadeIn>

          {/* Booking Form */}
          <FadeIn delay={100}>
            <div className="max-w-3xl mx-auto mb-20">
              <div className="border rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-2">Talent Booking Inquiry</h2>
                <p className="text-muted-foreground mb-6">Fill out the form below and we'll get back to you shortly</p>
                
                <Form {...bookingForm}>
                  <form onSubmit={bookingForm.handleSubmit(onBookingSubmit)} className="space-y-6">
                    <FormField control={bookingForm.control} name="yourName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Who are you? *</FormLabel>
                        <FormControl><Input placeholder="Your full name" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={bookingForm.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl><Input type="email" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={bookingForm.control} name="talentName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Who are you inquiring about? *</FormLabel>
                        <FormControl><Input placeholder="Talent name from roster" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={bookingForm.control} name="services" render={({ field }) => (
                      <FormItem>
                        <FormLabel>What services do you need? *</FormLabel>
                        <FormControl><Input placeholder="e.g., Photoshoot, Music Video, Brand Campaign" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={bookingForm.control} name="budget" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget *</FormLabel>
                        <FormControl><Input placeholder="e.g., $5,000 - $10,000" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={bookingForm.control} name="timeline" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timeline *</FormLabel>
                        <FormControl><Input placeholder="e.g., Within 2 weeks, Next month" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={bookingForm.control} name="message" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Details *</FormLabel>
                        <FormControl><Textarea rows={4} placeholder="Tell us more about your project..." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <Button type="submit" className="w-full">Submit Booking Inquiry</Button>
                  </form>
                </Form>
              </div>
            </div>
          </FadeIn>

          {/* Roster Cards Section */}
          <FadeIn delay={200}>
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Featured Roster Talent</h2>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[
                  { name: 'EV09 Loso', image: '/roster/ev09-loso.jpg' },
                  { name: 'Sky Banks', image: '/roster/sky-banks.jpeg' },
                  { name: 'Rakku', image: '/roster/rakku.heic' },
                  { name: 'Film by Jwxra', image: '/roster/jwxra.jpeg' },
                ].map((talent, index) => (
                  <div key={index} className="group">
                    <div className="aspect-[3/4] overflow-hidden rounded-lg mb-3">
                      <img src={talent.image} alt={talent.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <h3 className="font-bold text-center">{talent.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Management Cards Section */}
          <FadeIn delay={300}>
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Meet the Team</h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {[
                  { name: 'Rasheed Moon', role: 'Owner / CEO' },
                  { name: 'Adeola Oni', role: 'Creative Director & Videographer' },
                  { name: 'Casalo D', role: 'Talent Manager' },
                ].map((member, index) => (
                  <div key={index} className="text-center p-6 border rounded-lg">
                    <div className="aspect-square bg-muted rounded-full mx-auto mb-4 w-32 h-32"></div>
                    <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                    <p className="text-primary text-sm">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Inquire;
