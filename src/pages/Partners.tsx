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
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const schema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid work email is required'),
  company: z.string().min(2, 'Company name is required'),
  zipCode: z.string().min(5, 'Valid ZIP code is required'),
  consent: z.boolean().refine(val => val === true, 'You must consent to be contacted'),
});

const Partners = () => {
  const { toast } = useToast();
  
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      company: '',
      zipCode: '',
      consent: false,
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    const mailtoLink = `mailto:epcstudiosny@gmail.com?subject=T-Mobile Business Inquiry - ${data.company}&body=First Name: ${data.firstName}%0D%0ALast Name: ${data.lastName}%0D%0APhone: ${data.phone}%0D%0AEmail: ${data.email}%0D%0ACompany: ${data.company}%0D%0AZIP Code: ${data.zipCode}%0D%0A%0D%0AConsent to contact: Yes`;
    window.location.href = mailtoLink;
    toast({ title: 'Opening email client...', description: 'Your business inquiry will be sent.' });
  };

  return (
    <main className="relative min-h-screen">
      <Header />
      
      <section className="pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="mb-16 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Partners</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Strategic partnerships that amplify our impact in music, fashion, and creative industries.
              </p>
            </div>
          </FadeIn>

          {/* Partnered Businesses Section */}
          <FadeIn delay={100}>
            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-8 text-center">Partnered Companies & Platforms</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { name: 'Nologo', role: 'Clothing Brand', instagram: 'https://www.instagram.com/nologo173/' },
                  { name: 'Hip Hop Global', role: 'Business/Platform', instagram: 'https://www.instagram.com/hiphopglobal101/' },
                  { name: 'Hip Hop Fraternity', role: 'Business/Platform', instagram: 'https://www.instagram.com/thehiphopfraternity/' },
                  { name: 'Moms Break Zone', role: 'Business/Platform', instagram: 'https://www.instagram.com/momsbreakzone/' },
                  { name: 'Hit Da Beat Ent', role: 'Party Showcases, Platform', instagram: 'https://www.instagram.com/hitdabeatent/' },
                ].map((partner, index) => (
                  <div key={index} className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold mb-2">{partner.name}</h3>
                    <p className="text-muted-foreground mb-4">{partner.role}</p>
                    <a 
                      href={partner.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      View Profile
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Key Individuals Section */}
          <FadeIn delay={200}>
            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-8 text-center">Key Industry Partners</h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                {[
                  { name: 'CPK Shawn', role: 'Producer', instagram: 'https://www.instagram.com/therealckshawn/', note: 'Highly Important' },
                  { name: 'Bizzaro Beats', role: 'Producer', instagram: 'https://www.instagram.com/bizzarobeats/', note: 'Partnered' },
                ].map((partner, index) => (
                  <div key={index} className="p-8 border rounded-lg hover:shadow-lg transition-shadow bg-card">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{partner.name}</h3>
                        <p className="text-muted-foreground">{partner.role}</p>
                      </div>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                        {partner.note}
                      </span>
                    </div>
                    <a 
                      href={partner.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      Connect on Instagram
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* T-Mobile Business Solutions */}
          <FadeIn delay={300}>
            <div className="max-w-4xl mx-auto">
              <div className="mb-12 text-center">
                <div className="inline-block px-6 py-2 bg-[#E20074] text-white font-bold text-sm mb-6">
                  T-MOBILE
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Business Solutions</h2>
                <p className="text-lg text-muted-foreground">
                  Partnering with T-Mobile for Superior Connectivity
                </p>
              </div>

              <div className="border rounded-2xl p-8 md:p-12">
                <h2 className="text-2xl font-bold mb-6">Connect with a T-Mobile Business Expert</h2>
              
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="firstName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={form.control} name="lastName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl><Input type="tel" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work Email *</FormLabel>
                      <FormControl><Input type="email" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="company" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name *</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="zipCode" render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code *</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="consent" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-normal">
                          I consent to be contacted by a T-Mobile Business Expert *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )} />

                  <Button type="submit" className="w-full bg-[#E20074] hover:bg-[#E20074]/90">
                    Submit Inquiry
                  </Button>
                </form>
              </Form>

              <div className="mt-8 p-4 bg-muted rounded-lg text-sm text-muted-foreground">
                <p>By submitting this form, you agree to be contacted by Max Out Management and T-Mobile regarding business connectivity solutions.</p>
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

export default Partners;
