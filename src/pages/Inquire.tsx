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

const talentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  specialty: z.string().min(2, 'Please specify your specialty'),
  portfolio: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const careerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  position: z.string().min(2, 'Please specify desired position'),
  experience: z.string().min(10, 'Please describe your experience'),
  resume: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});

const Inquire = () => {
  const { toast } = useToast();

  const talentForm = useForm({
    resolver: zodResolver(talentSchema),
    defaultValues: { name: '', email: '', phone: '', specialty: '', portfolio: '', message: '' },
  });

  const careerForm = useForm({
    resolver: zodResolver(careerSchema),
    defaultValues: { name: '', email: '', phone: '', position: '', experience: '', resume: '' },
  });

  const onTalentSubmit = (data: z.infer<typeof talentSchema>) => {
    const mailtoLink = `mailto:epcstudiosny@gmail.com?subject=Talent Inquiry - ${data.name}&body=Name: ${data.name}%0D%0AEmail: ${data.email}%0D%0APhone: ${data.phone}%0D%0ASpecialty: ${data.specialty}%0D%0APortfolio: ${data.portfolio}%0D%0A%0D%0AMessage:%0D%0A${data.message}`;
    window.location.href = mailtoLink;
    toast({ title: 'Opening email client...', description: 'Your inquiry will be sent to our team.' });
  };

  const onCareerSubmit = (data: z.infer<typeof careerSchema>) => {
    const mailtoLink = `mailto:epcstudiosny@gmail.com?subject=Career Inquiry - ${data.name}&body=Name: ${data.name}%0D%0AEmail: ${data.email}%0D%0APhone: ${data.phone}%0D%0APosition: ${data.position}%0D%0AResume: ${data.resume}%0D%0A%0D%0AExperience:%0D%0A${data.experience}`;
    window.location.href = mailtoLink;
    toast({ title: 'Opening email client...', description: 'Your application will be sent to our team.' });
  };

  return (
    <main className="relative min-h-screen">
      <Header />
      
      <section className="pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Inquire</h1>
            <p className="text-xl text-muted-foreground mb-16 max-w-3xl">
              Whether you're talent seeking representation or a professional looking to join our team, we'd love to hear from you.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Talent Inquiry Form */}
            <FadeIn delay={100}>
              <div className="border rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-2">Management Inquiry</h2>
                <p className="text-muted-foreground mb-6">For artists, models, and creators seeking representation</p>
                
                <Form {...talentForm}>
                  <form onSubmit={talentForm.handleSubmit(onTalentSubmit)} className="space-y-6">
                    <FormField control={talentForm.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={talentForm.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl><Input type="email" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={talentForm.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={talentForm.control} name="specialty" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specialty *</FormLabel>
                        <FormControl><Input placeholder="e.g., Photography, Acting, Modeling" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={talentForm.control} name="portfolio" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Portfolio Link</FormLabel>
                        <FormControl><Input placeholder="https://" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={talentForm.control} name="message" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl><Textarea rows={4} {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <Button type="submit" className="w-full">Submit Inquiry</Button>
                  </form>
                </Form>
              </div>
            </FadeIn>

            {/* Career Inquiry Form */}
            <FadeIn delay={200}>
              <div className="border rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-2">Career Inquiry</h2>
                <p className="text-muted-foreground mb-6">For management and agency professionals</p>
                
                <Form {...careerForm}>
                  <form onSubmit={careerForm.handleSubmit(onCareerSubmit)} className="space-y-6">
                    <FormField control={careerForm.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={careerForm.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl><Input type="email" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={careerForm.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={careerForm.control} name="position" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Desired Position *</FormLabel>
                        <FormControl><Input placeholder="e.g., Talent Manager, Agent" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={careerForm.control} name="resume" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resume Link</FormLabel>
                        <FormControl><Input placeholder="https://" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={careerForm.control} name="experience" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience *</FormLabel>
                        <FormControl><Textarea rows={4} {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <Button type="submit" className="w-full">Submit Application</Button>
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
