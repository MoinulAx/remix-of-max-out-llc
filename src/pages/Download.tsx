import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundImage from '@/components/BackgroundImage';
import FadeIn from '@/components/animations/FadeIn';

const Download = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <BackgroundImage overlayOpacity={0.6} className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <FadeIn direction="up" delay={200}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-primary-foreground mb-6">
              Download the App
            </h1>
          </FadeIn>
          
          <FadeIn direction="up" delay={400}>
            <div className="inline-block px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
              <p className="text-xl md:text-2xl text-primary-foreground font-medium tracking-wide">
                Coming Soon
              </p>
            </div>
          </FadeIn>
          
          <FadeIn direction="up" delay={600}>
            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-xl md:text-2xl text-primary-foreground/90 font-light leading-relaxed">
                We're crafting an exceptional mobile experience
              </p>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                Stay tuned for the launch of our mobile application that will bring 
                all of our services directly to your fingertips.
              </p>
            </div>
          </FadeIn>
        </div>
      </BackgroundImage>
      
      <Footer />
    </div>
  );
};

export default Download;