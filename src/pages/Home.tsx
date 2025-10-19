import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className="relative">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img 
            src="/lovable-uploads/4d40bf6f-b67b-4203-a5d4-4448b598571b.png"
            alt="Max Out Management"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-32 relative z-10">
          <FadeIn delay={200}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-4xl">
              Connecting Visionaries, Creators, and Brands Through World-Class Representation
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mb-6"></div>
            <p className="text-xl md:text-2xl text-white/95 mb-8 max-w-2xl">
              At Max Out Management, we don't just represent talent—we build legacies.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured Talent */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Talent</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="group relative overflow-hidden rounded-lg shadow-lg">
                  <div className="aspect-[3/4] bg-muted"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-white text-xl font-bold mb-1">Talent Name</h3>
                      <p className="text-white/80 text-sm">Specialty</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link 
                to="/roster"
                className="inline-block bg-primary text-primary-foreground px-8 py-4 font-bold hover:opacity-90 transition-opacity"
              >
                View Full Roster
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn>
              <Link to="/roster" className="block group">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-12 rounded-2xl border hover:border-primary transition-colors">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Talent Roster</h3>
                  <p className="text-muted-foreground mb-4">Explore our exclusive roster of world-class talent and book directly.</p>
                  <span className="text-primary font-semibold">View Roster →</span>
                </div>
              </Link>
            </FadeIn>
            <FadeIn delay={100}>
              <Link to="/content-hub" className="block group">
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-12 rounded-2xl border hover:border-accent transition-colors">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">Content Hub</h3>
                  <p className="text-muted-foreground mb-4">Discover our latest projects, media, and creative works.</p>
                  <span className="text-accent font-semibold">Explore Content →</span>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Partner with Max Out</h2>
            <p className="text-xl mb-8 opacity-90">Let's build legacy together.</p>
            <Link 
              to="/inquire"
              className="inline-block bg-white text-primary px-8 py-4 font-bold hover:bg-white/90 transition-colors"
            >
              Get in Touch
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Home;
