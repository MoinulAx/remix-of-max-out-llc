import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Photography = () => {
  const packages = [
    {
      title: "Portrait Photography",
      description: "Professional headshots and personal portraits",
      features: ["Studio or location shooting", "Professional retouching", "High-resolution files", "Multiple outfit changes"],
      price: "Starting at $300"
    },
    {
      title: "Event Photography",
      description: "Capture your special moments and celebrations",
      features: ["Full event coverage", "Candid and posed shots", "Same-day preview", "Online gallery delivery"],
      price: "Starting at $800"
    },
    {
      title: "Product Photography",
      description: "Showcase your products with stunning visuals",
      features: ["Studio lighting setup", "Multiple angles", "Background options", "E-commerce ready files"],
      price: "Starting at $150/product"
    },
    {
      title: "Video Production",
      description: "Professional video content for your brand",
      features: ["4K video recording", "Professional editing", "Color grading", "Multiple format delivery"],
      price: "Starting at $1,200"
    },
    {
      title: "Commercial Photography",
      description: "Business and corporate photography services",
      features: ["Brand photography", "Office environments", "Team photos", "Marketing materials"],
      price: "Starting at $600"
    },
    {
      title: "Wedding Photography",
      description: "Your special day captured beautifully",
      features: ["Full day coverage", "Engagement session", "Online gallery", "Print release included"],
      price: "Starting at $2,500"
    }
  ];

  return (
    <main className="relative">
      <Header />
      
      <section className="pt-24 pb-20 md:py-32 bg-gradient-to-br from-background to-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Photography & Video Services
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional photography and videography services to capture your vision and tell your story
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

          <FadeIn delay={400} className="text-center mt-16">
            <div className="bg-card/80 backdrop-blur-sm shadow-[var(--shadow-card)] p-8 md:p-12 max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Custom Photography Projects</h2>
              <p className="text-muted-foreground mb-6">
                Need something specific? We create custom photography and video solutions tailored to your unique requirements.
              </p>
              <button className="bg-primary text-primary-foreground px-8 py-3 font-medium hover:bg-primary/90 transition-colors">
                Discuss Your Project
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Photography;