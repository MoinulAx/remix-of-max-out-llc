import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';
import { Link } from 'react-router-dom';
import { images } from '@/assets/images';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <section className={cn('relative min-h-screen flex items-center overflow-hidden', className)}>
      <div className="absolute inset-0 -z-10">
        <img 
          src={"/lovable-uploads/4d40bf6f-b67b-4203-a5d4-4448b598571b.png"}
          alt="City skybridge over street traffic"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-20 md:py-32 relative z-10 max-w-4xl">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn delay={200}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
              RummSpace
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          </FadeIn>
          
          <FadeIn delay={300}>
            <p className="text-xl md:text-2xl text-white/95 mb-6 font-medium">
              Media. Web. Vision by Rummy.
            </p>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Professional photography, videography, and web development services for modern creators and businesses
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/portfolio"
                className="bg-white text-primary px-8 py-4 font-bold text-lg hover:bg-white/90 transition-colors shadow-[var(--shadow-sharp)] text-center"
              >
                View Portfolio
              </Link>
              <Link 
                to="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-4 font-bold text-lg hover:bg-white hover:text-primary transition-colors text-center"
              >
                Book Now
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Hero;
