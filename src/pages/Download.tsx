import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundImage from '@/components/BackgroundImage';
import FadeIn from '@/components/animations/FadeIn';

const Download = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <BackgroundImage className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <FadeIn direction="up" delay={200}>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-8">
              Download the App
            </h1>
          </FadeIn>
          
          <FadeIn direction="up" delay={400}>
            <p className="text-2xl md:text-3xl text-white/80 mb-12">
              Coming Soon
            </p>
          </FadeIn>
          
          <FadeIn direction="up" delay={600}>
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-white/70 leading-relaxed">
                We're working hard to bring you an amazing mobile experience. 
                Stay tuned for the launch of our mobile application.
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