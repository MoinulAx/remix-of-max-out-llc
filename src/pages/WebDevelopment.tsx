import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const WebDevelopment = () => {
  const packages = [
    {
      title: "Landing Page",
      description: "High-converting single page websites",
      features: ["Responsive design", "SEO optimization", "Contact forms", "Fast loading"],
      price: "Starting at $800"
    },
    {
      title: "Business Website",
      description: "Multi-page professional websites",
      features: ["Custom design", "CMS integration", "Mobile responsive", "Analytics setup"],
      price: "Starting at $2,500"
    },
    {
      title: "E-commerce Store",
      description: "Full-featured online stores",
      features: ["Payment integration", "Inventory management", "Order tracking", "Admin dashboard"],
      price: "Starting at $4,000"
    },
    {
      title: "Web Application",
      description: "Custom web applications and platforms",
      features: ["User authentication", "Database design", "API development", "Cloud deployment"],
      price: "Starting at $6,000"
    },
    {
      title: "Website Redesign",
      description: "Modernize your existing website",
      features: ["UI/UX improvements", "Performance optimization", "Mobile optimization", "Content migration"],
      price: "Starting at $1,800"
    },
    {
      title: "Maintenance & Support",
      description: "Ongoing website maintenance and updates",
      features: ["Security updates", "Content updates", "Performance monitoring", "24/7 support"],
      price: "Starting at $200/month"
    }
  ];

  return (
    <main className="relative">
      <Header />
      
      <section className="pt-24 pb-20 md:py-32 bg-gradient-to-br from-background to-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Web Development Services
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Modern, fast, and scalable web solutions built with cutting-edge technologies
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <FadeIn key={pkg.title} delay={100 + (index * 50)}>
                <Card className="h-full transition-all duration-300 hover:shadow-[var(--shadow-sharp)] hover:-translate-y-1 border-0 shadow-[var(--shadow-card)] bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-foreground">{pkg.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary flex-shrink-0"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-border">
                      <p className="font-semibold text-primary text-lg">{pkg.price}</p>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={300} className="mt-16">
            <div className="bg-card/80 backdrop-blur-sm shadow-[var(--shadow-card)] p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Technologies We Use</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <h3 className="font-semibold mb-2">Frontend</h3>
                  <p className="text-sm text-muted-foreground">React, Next.js, TypeScript, Tailwind CSS</p>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold mb-2">Backend</h3>
                  <p className="text-sm text-muted-foreground">Node.js, Python, Supabase, PostgreSQL</p>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold mb-2">Cloud</h3>
                  <p className="text-sm text-muted-foreground">AWS, Vercel, Netlify, Docker</p>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold mb-2">Tools</h3>
                  <p className="text-sm text-muted-foreground">Git, Figma, Analytics, SEO Tools</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={400} className="text-center mt-16">
            <div className="bg-card/80 backdrop-blur-sm shadow-[var(--shadow-card)] p-8 md:p-12 max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
              <p className="text-muted-foreground mb-6">
                Let's discuss your web development needs and create something amazing together.
              </p>
              <button className="bg-primary text-primary-foreground px-8 py-3 font-medium hover:bg-primary/90 transition-colors">
                Get Started Today
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default WebDevelopment;