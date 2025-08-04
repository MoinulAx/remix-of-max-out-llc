
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import FadeIn from './animations/FadeIn';
import BackgroundImage from './BackgroundImage';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const scrollToSection = (id: string) => {
    if (id === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <BackgroundImage className={cn('py-20 md:py-32', className)} overlayOpacity={0.8}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-xl font-serif font-medium tracking-tight text-white">
              RummSpace
            </Link>
          </div>
          
          <div className="flex space-x-6 mb-4 md:mb-0">
            <button
              onClick={() => scrollToSection('home')} 
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              Home
            </button>
            <Link 
              to="/services"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              Services
            </Link>
            <Link 
              to="/portfolio"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              Portfolio
            </Link>
          </div>
          
          <div className="text-sm text-white/60">
            &copy; {new Date().getFullYear()} RummSpace. All rights reserved.
          </div>
        </div>
      </div>
    </BackgroundImage>
  );
};

export default Footer;
