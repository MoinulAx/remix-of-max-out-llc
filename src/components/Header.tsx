import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
          MAX OUT MANAGEMENT
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
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">Maxout Hub</p>
            <div className="flex flex-col space-y-4 pl-2">
              <NavLink
                to="/roster"
                className="text-left hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Maxout Management
              </NavLink>
              <span className="text-left text-muted-foreground">
                Maxout Agency (Coming Soon)
              </span>
              <NavLink
                to="/max-out-method"
                className="text-left hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Maxout Method
              </NavLink>
            </div>
          </div>
          <NavLink
            to="/content-hub"
            className="text-left hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Content Hub
          </NavLink>
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">Our Team</p>
            <div className="flex flex-col space-y-4 pl-2">
              <NavLink
                to="/leadership"
                className="text-left hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Leadership
              </NavLink>
              <NavLink
                to="/partners"
                className="text-left hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Partners
              </NavLink>
            </div>
          </div>
          <div className="pt-2">
            <p className="text-sm font-semibold text-muted-foreground mb-2">Get Involved</p>
            <div className="flex flex-col space-y-4 pl-2">
              <NavLink 
                to="/inquire"
                className="text-left hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inquire
              </NavLink>
              <NavLink 
                to="/careers"
                className="text-left hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Careers
              </NavLink>
            </div>
          </div>
          <NavLink
            to="/tmobile"
            className="text-left bg-[#E20074] text-white px-4 py-2 rounded font-bold hover:bg-[#E20074]/90 transition-colors inline-block"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            T-Mobile
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
    <MaxoutHubDropdown />
    <NavLink
      to="/content-hub"
      className={({ isActive }) => cn(
        "text-sm font-medium hover:text-primary transition-colors",
        isActive && "text-primary"
      )}
    >
      Content Hub
    </NavLink>
    <OurTeamDropdown />
    <GetInvolvedDropdown />
    <NavLink
      to="/tmobile"
      className={({ isActive }) => cn(
        "text-sm font-bold px-4 py-2 rounded transition-colors",
        isActive ? "bg-[#E20074] text-white" : "bg-[#E20074]/10 text-[#E20074] hover:bg-[#E20074]/20"
      )}
    >
      T-Mobile
    </NavLink>
  </>
);

const MaxoutHubDropdown: React.FC = () => {
  const location = useLocation();
  const isActive = location.pathname === '/roster' || location.pathname === '/max-out-method';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors outline-none",
          isActive && "text-primary"
        )}
      >
        Maxout Hub
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background z-50">
        <DropdownMenuItem asChild>
          <NavLink to="/roster" className="cursor-pointer w-full">
            Maxout Management
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem disabled className="text-muted-foreground">
          Maxout Agency (Coming Soon)
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <NavLink to="/max-out-method" className="cursor-pointer w-full">
            Maxout Method
          </NavLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const OurTeamDropdown: React.FC = () => {
  const location = useLocation();
  const isActive = location.pathname === '/leadership' || location.pathname === '/partners';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors outline-none",
          isActive && "text-primary"
        )}
      >
        Our Team
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background z-50">
        <DropdownMenuItem asChild>
          <NavLink to="/leadership" className="cursor-pointer w-full">
            Leadership
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <NavLink to="/partners" className="cursor-pointer w-full">
            Partners
          </NavLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const GetInvolvedDropdown: React.FC = () => {
  const location = useLocation();
  const isActive = location.pathname === '/inquire' || location.pathname === '/careers';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors outline-none",
          isActive && "text-primary"
        )}
      >
        Get Involved
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background z-50">
        <DropdownMenuItem asChild>
          <NavLink to="/inquire" className="cursor-pointer w-full">
            Inquire
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <NavLink to="/careers" className="cursor-pointer w-full">
            Careers
          </NavLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Header;
