import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundImage from '@/components/BackgroundImage';
import FadeIn from '@/components/animations/FadeIn';

const Download = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <BackgroundImage overlayOpacity={0.8} className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Artistic paint splatters and textures */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-48 h-48 bg-accent/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-secondary/25 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <FadeIn direction="up" delay={200}>
            <div className="relative">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 drop-shadow-2xl paint-text">
                Download the App
              </h1>
              <div className="absolute -top-4 -left-4 w-16 h-16 border-4 border-white/30 rounded-full animate-spin-slow"></div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white/20 rounded-full blur-sm"></div>
            </div>
          </FadeIn>
          
          <FadeIn direction="up" delay={400}>
            <div className="inline-block px-8 py-4 bg-black/30 backdrop-blur-sm rounded-2xl border-2 border-white/40 mb-8 shadow-2xl artistic-badge">
              <p className="text-xl md:text-2xl text-white font-medium tracking-wide paint-text">
                Coming Soon
              </p>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary/60 rounded-full animate-ping"></div>
            </div>
          </FadeIn>
          
          <FadeIn direction="up" delay={600}>
            <div className="max-w-3xl mx-auto space-y-6 relative">
              <div className="relative p-8 bg-black/20 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl">
                <p className="text-xl md:text-2xl text-white/95 font-light leading-relaxed paint-text">
                  We're crafting an exceptional mobile experience
                </p>
                <p className="text-lg text-white/85 leading-relaxed mt-4 paint-text">
                  Stay tuned for the launch of our mobile application that will bring 
                  all of our services directly to your fingertips.
                </p>
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-primary/40 rounded-full blur-sm"></div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent/40 rounded-full blur-sm"></div>
              </div>
            </div>
          </FadeIn>
        </div>
      </BackgroundImage>
      
      <Footer />
    </div>
  );
};

export default Download;