import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { images } from '@/assets/images';


const PortfolioWeb = () => {
  const webProjects = [
    {
      title: 'E-commerce Platform',
      category: 'E-commerce',
      image: images.webProjects.modernEcommerceDashboard,
      description: 'Modern online store with full payment integration',
    },
    {
      title: 'Portfolio Website',
      category: 'Portfolio',
      image: images.backgrounds.luxuryOrangeryInterior,
      description: 'Responsive portfolio site for creative professionals',
    },
  ];

  return (
    <main className="relative">
      <Header />
      <div className="pt-24 pb-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Web Projects</h1>
            <Link to="/portfolio" className="px-4 py-2 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
              ← Back to Portfolio
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {webProjects.map((item, index) => (
              <FadeIn key={item.title} delay={200 + index * 100}>
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
                    <button className="text-primary font-semibold hover:underline">View Project →</button>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default PortfolioWeb;
