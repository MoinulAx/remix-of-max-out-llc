import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import FadeIn from '@/components/animations/FadeIn';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundImage from '@/components/BackgroundImage';
import { Card, CardContent } from '@/components/ui/card';
import { images } from '@/assets/images';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('photography');

  const photographyWork = [
    {
      title: "Portrait Session",
      category: "Portraits",
      image: images.portraits.professionalPortraitShoot,
      description: "Professional headshots and portrait photography"
    },
    {
      title: "Event Coverage",
      category: "Events",
      image: images.events.corporateEventPhotography,
      description: "Complete event documentation and highlights"
    },
    {
      title: "Product Shoot",
      category: "Product",
      image: images.products.commercialProductPhotography,
      description: "High-quality product photography for brands"
    }
  ];

  const webProjects = [
    {
      title: "E-commerce Platform",
      category: "E-commerce",
      image: images.webProjects.modernEcommerceDashboard,
      description: "Modern online store with full payment integration"
    },
    {
      title: "Portfolio Website",
      category: "Portfolio",
      image: images.backgrounds.luxuryOrangeryInterior,
      description: "Responsive portfolio site for creative professionals"
    }
  ];

  const tabs = [
    { id: 'photography', label: 'Photography' },
    { id: 'videography', label: 'Videography' },
    { id: 'web', label: 'Web Projects' }
  ];

  return (
    <main className="relative">
      <Header />
      
      <div className="pt-24 pb-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Portfolio
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore my work across photography, videography, and web development
            </p>
          </FadeIn>

          {/* Tab Navigation */}
          <FadeIn delay={100} className="flex justify-center mb-12 px-4">
            <div className="flex flex-wrap justify-center bg-card shadow-[var(--shadow-card)] p-1 gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-4 py-2 text-sm sm:text-base font-semibold transition-all duration-300 whitespace-nowrap",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-[var(--shadow-sharp)]"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Photography Tab */}
          {activeTab === 'photography' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {photographyWork.map((item, index) => (
                <FadeIn key={item.title} delay={200 + (index * 100)}>
                  <Card className="group overflow-hidden bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-sharp)] transition-all duration-300">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="text-sm text-primary font-semibold mb-2">{item.category}</div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          )}

          {/* Videography Tab */}
          {activeTab === 'videography' && (
            <div className="text-center py-20">
              <FadeIn>
                <h3 className="text-2xl font-bold mb-4">Videography Portfolio</h3>
                <p className="text-muted-foreground mb-8">Coming soon - showcasing video production work</p>
                <button className="bg-primary text-primary-foreground px-8 py-3 font-semibold hover:bg-primary/90 transition-colors shadow-[var(--shadow-sharp)]">
                  Contact for Video Services
                </button>
              </FadeIn>
            </div>
          )}

          {/* Web Projects Tab */}
          {activeTab === 'web' && (
            <div className="grid md:grid-cols-2 gap-8">
              {webProjects.map((item, index) => (
                <FadeIn key={item.title} delay={200 + (index * 100)}>
                  <Card className="group overflow-hidden bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-sharp)] transition-all duration-300">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="text-sm text-primary font-semibold mb-2">{item.category}</div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                      <button className="text-primary font-semibold hover:underline">
                        View Project →
                      </button>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Portfolio;