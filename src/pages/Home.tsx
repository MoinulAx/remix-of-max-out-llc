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
              {/* EV09 Loso */}
              <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <img 
                  src="/roster/ev09-loso.jpg" 
                  alt="EV09 Loso"
                  className="aspect-[3/4] w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end p-6">
                  <div className="w-full">
                    <h3 className="text-white text-2xl font-bold mb-2">EV09 Loso</h3>
                    <p className="text-white/80 mb-4 text-sm">Artist, Model, Actor, Fashion Designer</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm capitalize flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        Available
                      </span>
                      <a 
                        href="https://www.instagram.com/ev09loso/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white hover:text-primary transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Flaco */}
              <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="aspect-[3/4] bg-muted"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end p-6">
                  <div className="w-full">
                    <h3 className="text-white text-2xl font-bold mb-2">Flaco</h3>
                    <p className="text-white/80 mb-4 text-sm">Artist, Model, Actor</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm capitalize flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        Available
                      </span>
                      <a 
                        href="https://www.instagram.com/whois.flac0/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white hover:text-primary transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ayce Slater */}
              <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <img 
                  src="/roster/ayce-slater.jpg" 
                  alt="Ayce Slater"
                  className="aspect-[3/4] w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end p-6">
                  <div className="w-full">
                    <h3 className="text-white text-2xl font-bold mb-2">Ayce Slater</h3>
                    <p className="text-white/80 mb-4 text-sm">Artist, Content Creator</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm capitalize flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        Pending
                      </span>
                      <a 
                        href="https://www.instagram.com/ayceslater/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white hover:text-primary transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
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
