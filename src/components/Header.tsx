import React, { useState, useEffect, useRef } from 'react';
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
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close on Escape and manage focus when the mobile menu opens/closes
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        toggleButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    // Move focus into the panel
    closeButtonRef.current?.focus();
    // Prevent body scroll while open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isMobileMenuOpen]);

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
          ref={toggleButtonRef}
          type="button"
          className="md:hidden flex items-center rounded p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-panel"
          aria-haspopup="menu"
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
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Main navigation"
        aria-hidden={!isMobileMenuOpen}
        className={cn(
          "fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 transition-transform duration-500 ease-in-out transform md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button
          ref={closeButtonRef}
          type="button"
          tabIndex={isMobileMenuOpen ? 0 : -1}
          className="absolute top-5 right-5 p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          onClick={() => {
            setIsMobileMenuOpen(false);
            toggleButtonRef.current?.focus();
          }}
          aria-label="Close menu"
        >
          <span className="block w-6 h-0.5 bg-foreground transform rotate-45 translate-y-0.5" />
          <span className="block w-6 h-0.5 bg-foreground transform -rotate-45" />
        </button>
        
        <nav className="flex flex-col space-y-6 text-lg">
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">Maxout Hub</p>
            <div className="flex flex-col space-y-4 pl-2">
              <MobileNavLink to="/roster" onClick={() => setIsMobileMenuOpen(false)}>Maxout Management</MobileNavLink>
              <span className="text-left text-muted-foreground">Maxout Agency (Coming Soon)</span>
              <MobileNavLink to="/max-out-method" onClick={() => setIsMobileMenuOpen(false)}>Maxout Method</MobileNavLink>
            </div>
          </div>
          <MobileNavLink to="/content-hub" onClick={() => setIsMobileMenuOpen(false)}>Content Hub</MobileNavLink>
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">Our Team</p>
            <div className="flex flex-col space-y-4 pl-2">
              <MobileNavLink to="/leadership" onClick={() => setIsMobileMenuOpen(false)}>Leadership</MobileNavLink>
              <MobileNavLink to="/partners" onClick={() => setIsMobileMenuOpen(false)}>Partners</MobileNavLink>
            </div>
          </div>
          <div className="pt-2">
            <p className="text-sm font-semibold text-muted-foreground mb-2">Get Involved</p>
            <div className="flex flex-col space-y-4 pl-2">
              <MobileNavLink to="/inquire" onClick={() => setIsMobileMenuOpen(false)}>Inquire</MobileNavLink>
              <MobileNavLink to="/careers" onClick={() => setIsMobileMenuOpen(false)}>Careers</MobileNavLink>
            </div>
          </div>
          <NavLink
            to="/tmobile"
            className={({ isActive }) => cn(
              "text-left px-4 py-2 rounded font-bold transition-colors inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E20074] focus-visible:ring-offset-2",
              isActive
                ? "bg-[#E20074] text-white ring-2 ring-[#E20074]/40"
                : "bg-[#E20074] text-white hover:bg-[#E20074]/90"
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            T-Mobile
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

interface MobileNavLinkProps {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, onClick, children }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) => cn(
      "text-left transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      isActive
        ? "text-[#E20074] font-semibold border-l-4 border-[#E20074] pl-3 -ml-1"
        : "hover:text-primary"
    )}
  >
    {children}
  </NavLink>
);

interface NavLinksProps {
  scrollToSection: (id: string) => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ scrollToSection }) => (
  <>
    <MaxoutHubDropdown />
    <NavLink
      to="/content-hub"
      className={({ isActive }) => cn(
        "relative text-sm font-medium hover:text-primary transition-colors pb-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded",
        isActive && "text-[#E20074] font-semibold after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:bg-[#E20074] after:rounded-full"
      )}
    >
      Content Hub
    </NavLink>
    <OurTeamDropdown />
    <GetInvolvedDropdown />
    <NavLink
      to="/tmobile"
      className={({ isActive }) => cn(
        "text-sm font-bold px-4 py-2 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E20074] focus-visible:ring-offset-2",
        isActive ? "bg-[#E20074] text-white ring-2 ring-[#E20074]/40" : "bg-[#E20074]/10 text-[#E20074] hover:bg-[#E20074]/20"
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
          "relative flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors outline-none pb-1 rounded focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          isActive && "text-[#E20074] font-semibold after:content-[''] after:absolute after:left-0 after:right-5 after:-bottom-0.5 after:h-0.5 after:bg-[#E20074] after:rounded-full"
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
          "relative flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors outline-none pb-1 rounded focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          isActive && "text-[#E20074] font-semibold after:content-[''] after:absolute after:left-0 after:right-5 after:-bottom-0.5 after:h-0.5 after:bg-[#E20074] after:rounded-full"
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
          "relative flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors outline-none pb-1 rounded focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          isActive && "text-[#E20074] font-semibold after:content-[''] after:absolute after:left-0 after:right-5 after:-bottom-0.5 after:h-0.5 after:bg-[#E20074] after:rounded-full"
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
