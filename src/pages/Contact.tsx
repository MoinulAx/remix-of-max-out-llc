import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import FadeIn from '@/components/animations/FadeIn';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundImage from '@/components/BackgroundImage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { sendContactEmail } from '@/lib/emailjs';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
    timeline: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Build a single message that captures all fields for the inquiries table
      const composedMessage = [
        formData.service && `Service: ${formData.service}`,
        formData.budget && `Budget: ${formData.budget}`,
        formData.timeline && `Timeline: ${formData.timeline}`,
        formData.message && `\n${formData.message}`,
      ]
        .filter(Boolean)
        .join('\n');

      const { error } = await supabase
        .from('inquiries')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          message: composedMessage,
          type: 'contact',
        });

      if (error) throw error;

      // Send confirmation email via EmailJS
      await sendContactEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.message
      });

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. Check your email for confirmation - we'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        message: '',
        timeline: ''
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactMethods = [
    {
      title: "Email",
      value: "rummspace@gmail.com",
      description: "For project inquiries and collaborations",
      icon: "📧"
    },
    {
      title: "Phone",
      value: "(347) 460-3609",
      description: "Available Mon-Fri, 9AM-6PM EST",
      icon: "📞"
    },
    {
      title: "Studio Location",
      value: "538 Johnson Ave, Brooklyn NY 11237",
      description: "Available for local shoots and consultations",
      icon: "📍"
    }
  ];

  const faqs = [
    {
      question: "What's your typical project timeline?",
      answer: "Photography projects: 1-2 weeks. Web development: 2-6 weeks depending on complexity. We'll provide exact timelines during consultation."
    },
    {
      question: "Do you offer package deals?",
      answer: "Yes! We offer discounted packages for clients needing both photography and web services. Contact us for custom package pricing."
    },
    {
      question: "What's included in your photography sessions?",
      answer: "All sessions include professional editing, high-resolution files, and an online gallery for sharing. Print releases are included for commercial work."
    },
    {
      question: "Do you travel for projects?",
      answer: "Absolutely! We travel locally and nationally for projects. Travel costs are discussed during project planning."
    }
  ];

  return (
    <main className="relative">
      <Header />
      
      {/* Hero Section */}
      <BackgroundImage className="pt-24 pb-20 md:py-32" overlayOpacity={0.7}>
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white">
              Let's Create Together
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Ready to bring your vision to life? Get in touch and let's discuss your next project.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <FadeIn delay={100}>
              <Card className="bg-card shadow-[var(--shadow-card)] p-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Start Your Project</CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Service Needed *</label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select a service</option>
                          <option value="photography">Photography</option>
                          <option value="videography">Videography</option>
                          <option value="web-development">Web Development</option>
                          <option value="branding">Branding & Design</option>
                          <option value="package">Multiple Services</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Budget Range</label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select budget range</option>
                          <option value="under-100">Under $100</option>
                          <option value="100-250">$100 - $250</option>
                          <option value="250-500">$250 - $500</option>
                          <option value="500-1000">$500 - $1,000</option>
                          <option value="1000-2500">$1,000 - $2,500</option>
                          <option value="2500-5000">$2,500 - $5,000</option>
                          <option value="over-5000">$5,000+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Timeline</label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select timeline</option>
                          <option value="asap">ASAP</option>
                          <option value="1-2-weeks">1-2 weeks</option>
                          <option value="1-month">Within 1 month</option>
                          <option value="2-3-months">2-3 months</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Project Details *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        placeholder="Tell me about your project, goals, and any specific requirements..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "w-full py-4 font-bold text-lg transition-all duration-300 shadow-[var(--shadow-sharp)]",
                        isSubmitting
                          ? "bg-muted text-muted-foreground cursor-not-allowed"
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                      )}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Contact Info & FAQ */}
            <div className="space-y-8">
              {/* Contact Methods */}
              <FadeIn delay={200}>
                <Card className="bg-card shadow-[var(--shadow-card)]">
                  <CardHeader>
                    <CardTitle className="text-xl">Get In Touch</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {contactMethods.map((method, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <span className="text-2xl">{method.icon}</span>
                        <div>
                          <h4 className="font-semibold">{method.title}</h4>
                          <p className="font-medium text-primary">{method.value}</p>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </FadeIn>

              {/* FAQ */}
              <FadeIn delay={300}>
                <Card className="bg-card shadow-[var(--shadow-card)]">
                  <CardHeader>
                    <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {faqs.map((faq, index) => (
                      <div key={index}>
                        <h4 className="font-semibold mb-2">{faq.question}</h4>
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Quick Response Promise */}
              <FadeIn delay={400}>
                <Card className="bg-primary text-primary-foreground shadow-[var(--shadow-card)]">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">24-Hour Response Guarantee</h3>
                    <p className="text-primary-foreground/90">
                      I personally respond to every inquiry within 24 hours. For urgent projects, call directly for immediate assistance.
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </BackgroundImage>

      <Footer />
    </main>
  );
};

export default Contact;