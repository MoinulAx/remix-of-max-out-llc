import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { Link } from 'react-router-dom';

const MaxOutMethod = () => {
  return (
    <main className="relative min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pb-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                THE MAX OUT <span className="text-primary">METHOD</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Our proven framework for discovering, developing, and maximizing talent potential.
              </p>
              <div className="w-32 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Method Pillars */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">The Three Pillars</h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FadeIn delay={100}>
              <div className="text-center p-8 border rounded-2xl hover:border-primary hover:shadow-lg transition-all duration-300 group">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <span className="text-4xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Discover</h3>
                <p className="text-muted-foreground">
                  We identify raw talent with authentic potential. Our A&R scouts and management team search for artists who bring something unique to the table.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="text-center p-8 border rounded-2xl hover:border-primary hover:shadow-lg transition-all duration-300 group">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <span className="text-4xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Develop</h3>
                <p className="text-muted-foreground">
                  Through strategic guidance, media production, and brand building, we help artists refine their craft and expand their reach.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="text-center p-8 border rounded-2xl hover:border-primary hover:shadow-lg transition-all duration-300 group">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <span className="text-4xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Maximize</h3>
                <p className="text-muted-foreground">
                  We position talent for maximum exposure through tours, partnerships, content creation, and industry connections that create lasting impact.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Tour Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Max Out Method Tour</h2>
              <p className="text-lg text-muted-foreground text-center mb-12">
                The movement is taking over cities nationwide. Our tour showcases the best of Max Out talent while discovering the next wave of artists ready to be Fully Invested.
              </p>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="bg-background border rounded-2xl p-8 md:p-12 text-center">
                <h3 className="text-2xl font-bold mb-4">NYC Times Square Launch</h3>
                <p className="text-muted-foreground mb-6">
                  Our inaugural tour stop made history in Times Square, featuring Hot 97.1's DJ Drewski and led by Sheedy the Plug. The energy proved that the independent hustle can meet mainstream power.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">NYC ✓</span>
                  <span className="bg-muted text-muted-foreground px-4 py-2 rounded-full font-medium">More Cities Coming</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Max Out?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're an artist looking for representation or a brand seeking partnerships, we're ready to invest in your vision.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/inquire"
                className="bg-primary text-primary-foreground px-8 py-4 font-bold text-lg hover:bg-primary/90 transition-colors rounded-lg"
              >
                Get In Touch
              </Link>
              <Link 
                to="/roster"
                className="border-2 border-primary text-primary px-8 py-4 font-bold text-lg hover:bg-primary hover:text-primary-foreground transition-colors rounded-lg"
              >
                View Our Roster
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default MaxOutMethod;
