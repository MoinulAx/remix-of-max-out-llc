
import React from 'react';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';
import { images } from '@/assets/images';

interface AboutProps {
  className?: string;
}

const About: React.FC<AboutProps> = ({ className }) => {
  return (
    <section id="about" className={cn('py-20 md:py-32 bg-gray-50', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-start">
          <FadeIn className="md:col-span-5">
            <div className="flex flex-col space-y-6">
              <div>
                <span className="text-sm md:text-base font-medium text-primary mb-2 inline-block">About Me</span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Rummy - Creative Professional</h2>
              </div>
              
              <p className="text-lg text-muted-foreground">
                I'm Rummy, a passionate creator with expertise in photography, videography, and web development. I started RummSpace to combine my love for visual storytelling with modern digital solutions.
              </p>
              <p className="text-lg text-muted-foreground">
                My approach blends artistic vision with technical precision, whether I'm capturing the perfect shot or building a responsive website. I believe every project tells a story, and I'm here to help tell yours.
              </p>
              
              <div className="pt-6">
                <h3 className="text-xl font-bold mb-4">What Makes My Work Unique:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary mr-4 flex-shrink-0"></div>
                    <span className="text-muted-foreground">Professional-grade equipment (Canon R5, Sony A7IV, Fujifilm X-T5)</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary mr-4 flex-shrink-0"></div>
                    <span className="text-muted-foreground">Modern web technologies (React, Node.js, Next.js)</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary mr-4 flex-shrink-0"></div>
                    <span className="text-muted-foreground">Creative editing expertise (Lightroom, Photoshop, Final Cut Pro)</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary mr-4 flex-shrink-0"></div>
                    <span className="text-muted-foreground">Focus on storytelling and authentic moments</span>
                  </li>
                </ul>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={150} className="md:col-span-7">
            <div className="relative h-[500px] lg:h-[600px] w-full rounded-lg overflow-hidden">
              <img 
                src={images.about.modernInteriorDesign}
                alt="Interior with palm trees and ornate architecture"
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default About;
