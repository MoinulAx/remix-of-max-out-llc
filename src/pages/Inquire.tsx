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

  const onBookingSubmit = (data: z.infer<typeof bookingSchema>) => {
    const mailtoLink = `mailto:epcstudiosny@gmail.com?subject=Booking Inquiry - ${data.talentName}&body=Your Name: ${data.yourName}%0D%0AEmail: ${data.email}%0D%0AInquiring About: ${data.talentName}%0D%0AServices Needed: ${data.services}%0D%0ABudget: ${data.budget}%0D%0ATimeline: ${data.timeline}%0D%0A%0D%0AMessage:%0D%0A${data.message}`;
    window.location.href = mailtoLink;
    toast({ title: 'Opening email client...', description: 'Your booking inquiry will be sent to our team.' });
  };

  const onManagementSubmit = (data: z.infer<typeof managementSchema>) => {
    const mailtoLink = `mailto:epcstudiosny@gmail.com?subject=Management Inquiry&body=Name: ${data.name}%0D%0AEmail: ${data.email}%0D%0ACompany: ${data.company || 'N/A'}%0D%0A%0D%0AInquiry:%0D%0A${data.inquiry}`;
    window.location.href = mailtoLink;
    toast({ title: 'Opening email client...', description: 'Your management inquiry will be sent to our team.' });
  };

  return (
    <main className="relative min-h-screen">
      <Header />
      
      <section className="pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Inquire</h1>
            <p className="text-xl text-muted-foreground mb-16 max-w-3xl">
              Get in touch with us for booking or management inquiries.
            </p>
          </FadeIn>

          {/* Two Forms Side by Side */}
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {/* Client Booking Form */}
            <FadeIn delay={100}>
              <div className="border rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-2">Client Booking</h2>
                <p className="text-muted-foreground mb-6">Book talent for your project</p>
                
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
                        <FormControl><Input placeholder="Talent name" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={bookingForm.control} name="services" render={({ field }) => (
                      <FormItem>
                        <FormLabel>What services do you need? *</FormLabel>
                        <FormControl><Input placeholder="e.g., Music Video, Campaign" {...field} /></FormControl>
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
                        <FormControl><Input placeholder="e.g., Within 2 weeks" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={bookingForm.control} name="message" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Details *</FormLabel>
                        <FormControl><Textarea rows={3} placeholder="Tell us more..." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <Button type="submit" className="w-full">Submit Booking</Button>
                  </form>
                </Form>
              </div>
            </FadeIn>

            {/* Management Inquiry Form */}
            <FadeIn delay={200}>
              <div className="border rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-2">Management Inquiry</h2>
                <p className="text-muted-foreground mb-6">Reach out to our management team</p>
                
                <Form {...managementForm}>
                  <form onSubmit={managementForm.handleSubmit(onManagementSubmit)} className="space-y-6">
                    <FormField control={managementForm.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name *</FormLabel>
                        <FormControl><Input placeholder="Your name" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={managementForm.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl><Input type="email" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={managementForm.control} name="company" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl><Input placeholder="Your company (optional)" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={managementForm.control} name="inquiry" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Inquiry *</FormLabel>
                        <FormControl><Textarea rows={8} placeholder="Tell us about your inquiry..." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <Button type="submit" className="w-full">Submit Inquiry</Button>
                  </form>
                </Form>
              </div>
            </FadeIn>
          </div>

          {/* Job Listings Section */}
          <FadeIn delay={300}>
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8">Max Out Management Openings</h2>
              
              {/* Internships */}
              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-6 text-primary">Internships (Entry Level)</h3>
                <div className="space-y-4 max-w-4xl">
                  {[
                    { title: 'Social Media Marketing Intern', type: 'Part-time', location: 'Remote', note: 'Unpaid Internship (College Credit Available)' },
                    { title: 'Artist Management Intern', type: 'Part-time', location: 'Hybrid', note: 'Unpaid Internship' },
                    { title: 'A&R Scout Intern', type: 'Part-time', location: 'Remote', note: 'Unpaid Internship' },
                    { title: 'Graphic Design / Content Intern', type: 'Part-time', location: 'Remote', note: 'Unpaid Internship' },
                  ].map((job, index) => (
                    <div key={index} className="border rounded-lg p-6 hover:border-primary transition-colors">
                      <div className="flex justify-between items-start flex-wrap gap-4">
                        <div>
                          <h4 className="text-xl font-bold mb-2">{job.title}</h4>
                          <div className="flex flex-wrap gap-2 text-muted-foreground text-sm">
                            <span className="bg-muted px-2 py-1 rounded">{job.type}</span>
                            <span className="bg-muted px-2 py-1 rounded">{job.location}</span>
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded">{job.note}</span>
                          </div>
                        </div>
                        <Button variant="outline">Apply Now</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commission-Based Positions */}
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-primary">Commission-Based Positions</h3>
                <div className="space-y-4 max-w-4xl">
                  {[
                    { title: 'Talent Manager', type: 'Full-time', location: 'Hybrid', note: 'Commission Only (% of Client Earnings)' },
                    { title: 'Booking Agent', type: 'Contract', location: 'Remote', note: 'Commission Based (Per Booking)' },
                    { title: 'Brand Partnership Specialist', type: 'Contract', location: 'Remote', note: 'Commission on Sponsorship Deals' },
                    { title: 'Sales Representative', type: 'Contract', location: 'Remote', note: '100% Commission' },
                  ].map((job, index) => (
                    <div key={index} className="border rounded-lg p-6 hover:border-primary transition-colors">
                      <div className="flex justify-between items-start flex-wrap gap-4">
                        <div>
                          <h4 className="text-xl font-bold mb-2">{job.title}</h4>
                          <div className="flex flex-wrap gap-2 text-muted-foreground text-sm">
                            <span className="bg-muted px-2 py-1 rounded">{job.type}</span>
                            <span className="bg-muted px-2 py-1 rounded">{job.location}</span>
                            <span className="bg-green-500/10 text-green-600 px-2 py-1 rounded">{job.note}</span>
                          </div>
                        </div>
                        <Button variant="outline">Apply Now</Button>
                      </div>
                    </div>
                  ))}
                </div>
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
