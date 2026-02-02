import React, { useState } from 'react';
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
import ApplicationModal from '@/components/ApplicationModal';

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

interface JobListing {
  title: string;
  type: string;
  location: string;
  note: string;
}

const Inquire = () => {
  const { toast } = useToast();
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleApply = (job: JobListing) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const internships: JobListing[] = [
    { title: 'Social Media Marketing Intern', type: 'Part-time', location: 'Remote', note: 'Unpaid Internship (College Credit Available)' },
    { title: 'Artist Management Intern', type: 'Part-time', location: 'Hybrid', note: 'Unpaid Internship' },
    { title: 'A&R Scout Intern', type: 'Part-time', location: 'Remote', note: 'Unpaid Internship' },
    { title: 'Graphic Design / Content Intern', type: 'Part-time', location: 'Remote', note: 'Unpaid Internship' },
  ];

  const commissionJobs: JobListing[] = [
    { title: 'Talent Manager', type: 'Full-time', location: 'Hybrid', note: 'Commission Only (% of Client Earnings)' },
    { title: 'Booking Agent', type: 'Contract', location: 'Remote', note: 'Commission Based (Per Booking)' },
    { title: 'Brand Partnership Specialist', type: 'Contract', location: 'Remote', note: 'Commission on Sponsorship Deals' },
    { title: 'Sales Representative', type: 'Contract', location: 'Remote', note: '100% Commission' },
  ];

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
                    
                    <Button type="submit" className="w-full h-11 mt-2">Submit Booking</Button>
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
                    
                    <Button type="submit" className="w-full h-11 mt-2">Submit Inquiry</Button>
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
                <h3 className="text-xl font-semibold mb-4 text-primary">Internships (Entry Level)</h3>
                <div className="grid gap-4">
                  {internships.map((job, index) => (
                    <div key={index} className="border rounded-xl p-5 hover:border-primary/50 transition-all bg-card">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div>
                          <h4 className="text-lg font-bold mb-2">{job.title}</h4>
                          <div className="flex flex-wrap gap-2 text-sm">
                            <span className="bg-muted px-3 py-1 rounded-full">{job.type}</span>
                            <span className="bg-muted px-3 py-1 rounded-full">{job.location}</span>
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">{job.note}</span>
                          </div>
                        </div>
                        <Button 
                          variant="default" 
                          size="sm"
                          className="shrink-0"
                          onClick={() => handleApply(job)}
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commission-Based Positions */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Commission-Based Positions</h3>
                <div className="grid gap-4">
                  {commissionJobs.map((job, index) => (
                    <div key={index} className="border rounded-xl p-5 hover:border-primary/50 transition-all bg-card">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div>
                          <h4 className="text-lg font-bold mb-2">{job.title}</h4>
                          <div className="flex flex-wrap gap-2 text-sm">
                            <span className="bg-muted px-3 py-1 rounded-full">{job.type}</span>
                            <span className="bg-muted px-3 py-1 rounded-full">{job.location}</span>
                            <span className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full">{job.note}</span>
                          </div>
                        </div>
                        <Button 
                          variant="default" 
                          size="sm"
                          className="shrink-0"
                          onClick={() => handleApply(job)}
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <ApplicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          jobTitle={selectedJob.title}
          jobType={selectedJob.type}
          jobLocation={selectedJob.location}
        />
      )}

      <Footer />
    </main>
  );
};

export default Inquire;
