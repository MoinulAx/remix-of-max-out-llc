import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { Link } from 'react-router-dom';
import { useScreenshotProtection } from '@/hooks/useScreenshotProtection';

const PortfolioVideography = () => {
  useScreenshotProtection();
  
  return (
    <main className="relative">
      <Header />
      <div className="pt-24 pb-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight">Videography</h1>
            <Link to="/portfolio" className="px-3 py-2 md:px-4 md:py-2 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity text-sm md:text-base rounded-md">
              ← Back to Portfolio
            </Link>
          </div>

          <FadeIn>
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold mb-4">Videography Portfolio</h3>
              <p className="text-muted-foreground mb-8">Coming soon - showcasing video production work</p>
              <Link to="/contact" className="bg-primary text-primary-foreground px-8 py-3 font-semibold hover:bg-primary/90 transition-colors shadow-[var(--shadow-sharp)] inline-block">
                Contact for Video Services
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default PortfolioVideography;
