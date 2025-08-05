import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import FadeIn from '@/components/animations/FadeIn';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundImage from '@/components/BackgroundImage';
import QuoteModal from '@/components/QuoteModal';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Services = () => {
  const [quoteModal, setQuoteModal] = useState({ isOpen: false, serviceType: '' });
  const photographyServices = [
    {
      title: "Portrait Photography",
      description: "Professional headshots and personal portraits that capture your unique personality",
      features: ["Studio or location shoots", "Professional retouching", "Multiple outfit changes", "High-resolution files"],
      startingPrice: "From $200"
    },
    {
      title: "Event Photography",
      description: "Complete event coverage for weddings, corporate events, and special occasions",
      features: ["Full event coverage", "Candid and posed shots", "Online gallery delivery", "Print release included"],
      startingPrice: "From $500"
    },
    {
      title: "Product Photography",
      description: "High-quality product shots for e-commerce, catalogs, and marketing materials",
      features: ["Studio lighting setup", "Multiple angles", "Lifestyle and clean shots", "Same-day turnaround"],
      startingPrice: "From $150"
    },
    {
      title: "Photo Editing",
      description: "Professional post-processing and retouching services",
      features: ["Color correction", "Background removal", "Skin retouching", "Batch processing"],
      startingPrice: "From $25/photo"
    }
  ];

  const webServices = [
    {
      title: "Website Design",
      description: "Custom websites that perfectly represent your brand and convert visitors",
      features: ["Responsive design", "SEO optimization", "Content management", "Performance optimization"],
      startingPrice: "From $1,500"
    },
    {
      title: "E-commerce Development",
      description: "Online stores built for sales with secure payment processing",
      features: ["Payment integration", "Inventory management", "Mobile optimization", "Analytics setup"],
      startingPrice: "From $2,500"
    },
    {
      title: "Brand & Logo Design",
      description: "Complete brand identity packages that make you stand out",
      features: ["Logo design", "Brand guidelines", "Business cards", "Social media kit"],
      startingPrice: "From $800"
    },
    {
      title: "UI/UX Consulting",
      description: "User experience optimization for better engagement and conversions",
      features: ["User research", "Wireframing", "Prototype testing", "Design systems"],
      startingPrice: "From $150/hour"
    }
  ];

  const openQuoteModal = (serviceType: string) => {
    setQuoteModal({ isOpen: true, serviceType });
  };

  const closeQuoteModal = () => {
    setQuoteModal({ isOpen: false, serviceType: '' });
  };

  return (
    <main className="relative">
      <Header />
      
      <BackgroundImage className="pt-24 pb-20 md:py-32" overlayOpacity={0.7}>
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white">
              Services
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Professional photography and web development services tailored to your needs
            </p>
          </FadeIn>

          {/* Photography Services */}
          <FadeIn delay={100} className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Photography Services</h2>
              <div className="w-24 h-1 bg-white mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {photographyServices.map((service, index) => (
                <FadeIn key={service.title} delay={200 + (index * 100)}>
                  <Card className="h-full bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-sharp)] transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                      <p className="text-muted-foreground">{service.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-primary mr-3 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="pt-4 border-t border-border">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-primary">{service.startingPrice}</span>
                          <button 
                            onClick={() => openQuoteModal(service.title)}
                            className="bg-primary text-primary-foreground px-6 py-2 font-semibold hover:bg-primary/90 transition-colors shadow-[var(--shadow-sharp)]"
                          >
                            Request Quote
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </FadeIn>

          {/* Web & Branding Services */}
          <FadeIn delay={300}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Web & Branding</h2>
              <div className="w-24 h-1 bg-white mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {webServices.map((service, index) => (
                <FadeIn key={service.title} delay={400 + (index * 100)}>
                  <Card className="h-full bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-sharp)] transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                      <p className="text-muted-foreground">{service.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-primary mr-3 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="pt-4 border-t border-border">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-primary">{service.startingPrice}</span>
                          <button 
                            onClick={() => openQuoteModal(service.title)}
                            className="bg-primary text-primary-foreground px-6 py-2 font-semibold hover:bg-primary/90 transition-colors shadow-[var(--shadow-sharp)]"
                          >
                            Request Quote
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </FadeIn>

          {/* CTA Section */}
          <FadeIn delay={600} className="text-center mt-20">
            <div className="bg-card shadow-[var(--shadow-card)] p-8 md:p-12 max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">Transform Your Vision Into Reality</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                From concept to completion, I deliver exceptional results that exceed expectations. Let's bring your ideas to life with professional creativity and technical expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => openQuoteModal('Consultation')}
                  className="bg-primary text-primary-foreground px-8 py-3 font-semibold hover:bg-primary/90 transition-colors shadow-[var(--shadow-sharp)]"
                >
                  Get Free Quote
                </button>
                <Link 
                  to="/portfolio"
                  className="border-2 border-primary text-primary px-8 py-3 font-semibold hover:bg-primary hover:text-primary-foreground transition-colors text-center"
                >
                  See My Work
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </BackgroundImage>

      <QuoteModal 
        isOpen={quoteModal.isOpen}
        onClose={closeQuoteModal}
        serviceType={quoteModal.serviceType}
      />

      <Footer />
    </main>
  );
};

export default Services;