import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          top: element.offsetTop - 80, // Account for header height
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 bg-white border-b',
        className
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <NavLink 
          to="/" 
          className="text-xl font-bold tracking-tight text-foreground hover:opacity-80"
        >
          RummSpace
        </NavLink>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks scrollToSection={scrollToSection} />
        </div>
        
        <button 
          className="md:hidden flex items-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={cn(
            "block w-6 transition-all duration-300",
            isMobileMenuOpen ? "opacity-0" : "opacity-100"
          )}>
            <span className="block w-6 h-0.5 bg-foreground mb-1.5" />
            <span className="block w-6 h-0.5 bg-foreground mb-1.5" />
            <span className="block w-4 h-0.5 bg-foreground" />
          </span>
        </button>
      </div>
      
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 transition-transform duration-500 ease-in-out transform md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button 
          className="absolute top-5 right-5 p-2"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <span className="block w-6 h-0.5 bg-foreground transform rotate-45 translate-y-0.5" />
          <span className="block w-6 h-0.5 bg-foreground transform -rotate-45" />
        </button>
        
        <nav className="flex flex-col space-y-6 text-lg">
          <NavLink 
            to="/" 
            className={({ isActive }) => cn(
              "hover:text-primary transition-colors",
              isActive && "text-primary font-semibold"
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink 
            to="/portfolio"
            className="text-left hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Portfolio
          </NavLink>
          <NavLink 
            to="/services"
            className="text-left hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Services
          </NavLink>
          <NavLink 
            to="/about"
            className="text-left hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink 
            to="/team"
            className="text-left hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Team
          </NavLink>
          <NavLink 
            to="/careers"
            className="text-left hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Careers
          </NavLink>
          <NavLink 
            to="/contact"
            className="text-left hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

interface NavLinksProps {
  scrollToSection: (id: string) => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ scrollToSection }) => (
  <>
    <NavLink 
      to="/about"
      className={({ isActive }) => cn(
        "text-sm font-medium hover:text-primary transition-colors",
        isActive && "text-primary"
      )}
    >
      About
    </NavLink>
    <NavLink 
      to="/portfolio"
      className={({ isActive }) => cn(
        "text-sm font-medium hover:text-primary transition-colors",
        isActive && "text-primary"
      )}
    >
      Portfolio
    </NavLink>
    <NavLink 
      to="/services"
      className={({ isActive }) => cn(
        "text-sm font-medium hover:text-primary transition-colors",
        isActive && "text-primary"
      )}
    >
      Services
    </NavLink>
    <NavLink 
      to="/team"
      className={({ isActive }) => cn(
        "text-sm font-medium hover:text-primary transition-colors",
        isActive && "text-primary"
      )}
    >
      Team
    </NavLink>
    <NavLink 
      to="/careers"
      className={({ isActive }) => cn(
        "text-sm font-medium hover:text-primary transition-colors",
        isActive && "text-primary"
      )}
    >
      Careers
    </NavLink>
    <NavLink 
      to="/contact"
      className={({ isActive }) => cn(
        "text-sm font-medium hover:text-primary transition-colors",
        isActive && "text-primary"
      )}
    >
      Contact
    </NavLink>
  </>
);

export default Header;
