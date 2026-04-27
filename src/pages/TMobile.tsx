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
import { supabase } from '@/integrations/supabase/client';

const schema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid work email is required'),
  company: z.string().min(2, 'Company name is required'),
  zipCode: z.string().min(5, 'Valid ZIP code is required'),
  consent: z.boolean().refine(val => val === true, 'You must consent to be contacted'),
});

const TMobile = () => {
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

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const composed = [
      `Company: ${data.company}`,
      `Phone: ${data.phone}`,
      `ZIP: ${data.zipCode}`,
      `Consent to contact: Yes`,
    ].join('\n');

    const { error } = await supabase.from('inquiries').insert({
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      message: composed,
      type: 'tmobile',
    });

    if (error) {
      const msg = error.code === 'P0001'
        ? 'Too many submissions — please wait before trying again.'
        : 'Failed to submit. Please try again.';
      toast({ title: 'Error', description: msg, variant: 'destructive' });
      return;
    }

    toast({ title: 'Inquiry Submitted!', description: "A T-Mobile Business Expert will be in touch shortly." });
    form.reset();
  };

  return (
    <main className="relative min-h-screen">
      <Header />
      
      <section className="pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-4xl mx-auto">
              <div className="mb-12 text-center">
                <div className="inline-block px-6 py-2 bg-[#E20074] text-white font-bold text-sm mb-6">
                  T-MOBILE
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Business Solutions</h1>
                <p className="text-xl text-muted-foreground">
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

                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      className="w-full bg-[#E20074] hover:bg-[#E20074]/90"
                    >
                      {form.formState.isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
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

export default TMobile;
