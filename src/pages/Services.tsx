import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import FadeIn from '@/components/animations/FadeIn';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundImage from '@/components/BackgroundImage';
import QuoteModal from '@/components/QuoteModal';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useServicesByCategory, ServiceCategory } from '@/hooks/useServices';

const Services = () => {
  const [quoteModal, setQuoteModal] = useState({ isOpen: false, serviceType: '' });
  
  // Fetch services from database
  const { data: mediaServices = [], isLoading: mediaLoading } = useServicesByCategory('media');
  const { data: webServices = [], isLoading: webLoading } = useServicesByCategory('web');
  const { data: marketingServices = [], isLoading: marketingLoading } = useServicesByCategory('marketing');

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

          {/* Media Services */}
          <FadeIn delay={100} className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Media Services</h2>
              <div className="w-24 h-1 bg-white mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {mediaServices.map((service, index) => (
                <FadeIn key={service.id} delay={200 + (index * 100)}>
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
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <span className="text-lg font-bold text-primary">{service.starting_price}</span>
                          <button 
                            onClick={() => openQuoteModal(service.title)}
                            className="bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors shadow-[var(--shadow-sharp)] w-full sm:w-auto whitespace-nowrap"
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
          <FadeIn delay={300} className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Web & Branding</h2>
              <div className="w-24 h-1 bg-white mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {webServices.map((service, index) => (
                <FadeIn key={service.id} delay={400 + (index * 100)}>
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
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <span className="text-lg font-bold text-primary">{service.starting_price}</span>
                          <button 
                            onClick={() => openQuoteModal(service.title)}
                            className="bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors shadow-[var(--shadow-sharp)] w-full sm:w-auto whitespace-nowrap"
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

          {/* Marketing Services */}
          <FadeIn delay={500} className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Marketing Services</h2>
              <div className="w-24 h-1 bg-white mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {marketingServices.map((service, index) => (
                <FadeIn key={service.id} delay={600 + (index * 100)}>
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
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <span className="text-lg font-bold text-primary">{service.starting_price}</span>
                          <button 
                            onClick={() => openQuoteModal(service.title)}
                            className="bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors shadow-[var(--shadow-sharp)] w-full sm:w-auto whitespace-nowrap"
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