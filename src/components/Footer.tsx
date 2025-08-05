
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
    <footer className={cn('py-8 bg-background border-t', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-lg font-medium tracking-tight">
              RummSpace
            </Link>
            <div className="hidden md:flex space-x-6">
              <button
                onClick={() => scrollToSection('home')} 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </button>
              <Link 
                to="/services"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Services
              </Link>
              <Link 
                to="/portfolio"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Portfolio
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/rummspace" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                📷
              </a>
              <a 
                href="https://linkedin.com/in/rummy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                💼
              </a>
              <a 
                href="https://twitter.com/rummspace" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                🐦
              </a>
              <a 
                href="mailto:hello@rummspace.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                📧
              </a>
            </div>
            
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} RummSpace
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
