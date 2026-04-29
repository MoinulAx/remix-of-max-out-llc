import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';
import QuoteModal from '@/components/QuoteModal';
import { Link } from 'react-router-dom';


const PortfolioWeb = () => {
  const [quoteModal, setQuoteModal] = useState({ isOpen: false, serviceType: 'Web Development' });

  const openQuoteModal = () => {
    setQuoteModal({ isOpen: true, serviceType: 'Web Development' });
  };

  const closeQuoteModal = () => {
    setQuoteModal({ isOpen: false, serviceType: 'Web Development' });
  };

  return (
    <main className="relative">
      <Header />
      <div className="pt-24 pb-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Web Projects</h1>
            <Link to="/portfolio" className="px-4 py-2 text-sm bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity whitespace-nowrap">
              ← Back to Portfolio
            </Link>
          </div>

          <FadeIn>
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold mb-4">Web Projects Portfolio</h3>
              <p className="text-muted-foreground mb-8">Coming soon - showcasing web development work</p>
              <div className="space-y-4">
                <button 
                  onClick={openQuoteModal}
                  className="bg-primary text-primary-foreground px-8 py-3 font-semibold hover:bg-primary/90 transition-colors shadow-[var(--shadow-sharp)] inline-block"
                >
                  Get Web Development Quote
                </button>
                <div>
                  <Link to="/contact" className="text-primary hover:underline font-semibold">
                    Or contact us directly →
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <QuoteModal 
        isOpen={quoteModal.isOpen}
        onClose={closeQuoteModal}
        serviceType={quoteModal.serviceType}
      />

      <Footer />
    </main>
  );
};

export default PortfolioWeb;
