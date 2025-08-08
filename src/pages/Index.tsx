
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { Link } from 'react-router-dom';

const Index = () => {
  useEffect(() => {
    // Smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Account for header height
            behavior: 'smooth'
          });
        }
      });
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function (e) {
          // Cleanup
        });
      });
    };
  }, []);
  
  return (
    <main className="relative">
      <Header />
      <Hero />
      <About />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="rounded-2xl border bg-gradient-to-r from-primary/10 to-primary/5 p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-serif tracking-tight mb-4">Mobile App</h2>
              <p className="text-muted-foreground mb-6">Our app is coming soon — be the first to know.</p>
              <Link to="/download" className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-primary text-primary-foreground transition-[filter,opacity] hover:opacity-90">
                Download App (Coming Soon)
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Index;
