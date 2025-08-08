import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const PortfolioPhotography = () => {
  const albums = [
    {
      id: 'aqua-headwrap',
      name: 'Aqua Headwrap Series',
      person: 'Model — Blue Headwrap',
      cover: '/lovable-uploads/dd63bc8c-851a-451c-8330-82b1b31829b2.png',
      photos: [
        '/lovable-uploads/dd63bc8c-851a-451c-8330-82b1b31829b2.png',
        '/lovable-uploads/23433dc1-77c1-4a75-9af7-472f398955e1.png',
        '/lovable-uploads/a7d5a05f-c4e1-4c2d-a78f-cf155f1f6f2d.png',
        '/lovable-uploads/f7afd1ed-fa8c-4e1b-af72-7dcfa398c9cd.png',
        '/lovable-uploads/ad08e91d-3ee2-44f6-af1d-069b15d2c318.png',
        '/lovable-uploads/7e6cf1cd-a5e2-41be-a479-484862aa56f2.png',
      ],
    },
    {
      id: 'feather-editorial',
      name: 'Feather Editorial Series',
      person: 'Model — Feather Styling',
      cover: '/lovable-uploads/b35f30fe-e495-4a6a-96da-bf3887c2eee8.png',
      photos: [
        '/lovable-uploads/b35f30fe-e495-4a6a-96da-bf3887c2eee8.png',
        '/lovable-uploads/c4fe038c-4847-4ce5-9910-de0d5660717e.png',
        '/lovable-uploads/e27c412d-869d-4ab2-be1f-fb615b093fe6.png',
      ],
    },
    {
      id: 'gold-nail-art',
      name: 'Gold Nail Art',
      person: 'Model — Fashion',
      cover: '/lovable-uploads/aa2b7c10-b1db-49d8-bb88-0eecb67ba0a1.png',
      photos: ['/lovable-uploads/aa2b7c10-b1db-49d8-bb88-0eecb67ba0a1.png'],
    },
    {
      id: 'pink-beauty',
      name: 'Pink Backdrop Beauty',
      person: 'Model — Beauty',
      cover: '/lovable-uploads/373096af-ca0a-4bfb-9ca8-15f70d6a3bc1.png',
      photos: ['/lovable-uploads/373096af-ca0a-4bfb-9ca8-15f70d6a3bc1.png'],
    },

    // New uploaded series
    {
      id: 'golden-glam-beach',
      name: 'Golden Glam Beach',
      person: 'Model — Beach Glam',
      cover: '/lovable-uploads/2a0e7345-2340-4715-bc5d-3149cd6a8501.png',
      photos: ['/lovable-uploads/2a0e7345-2340-4715-bc5d-3149cd6a8501.png'],
    },
    {
      id: 'floral-veil-sunset',
      name: 'Floral Veil Sunset',
      person: 'Model — Sunset Portrait',
      cover: '/lovable-uploads/9c25ad72-5dbb-49ae-8f01-aa60c6616ee2.png',
      photos: ['/lovable-uploads/9c25ad72-5dbb-49ae-8f01-aa60c6616ee2.png'],
    },
    {
      id: 'ocean-wave-portrait',
      name: 'Ocean Wave Portrait',
      person: 'Model — Waves',
      cover: '/lovable-uploads/f087efbd-c7d1-4f54-ab10-7dc9b39fe390.png',
      photos: ['/lovable-uploads/f087efbd-c7d1-4f54-ab10-7dc9b39fe390.png'],
    },
    {
      id: 'coral-dress-series',
      name: 'Coral Dress Series',
      person: 'Model — Coral Dress',
      cover: '/lovable-uploads/205456aa-59cf-4441-af1b-54eba5624bd7.png',
      photos: [
        '/lovable-uploads/205456aa-59cf-4441-af1b-54eba5624bd7.png',
        '/lovable-uploads/5be1af74-99d2-4acd-b4cb-ce32fce4431e.png',
      ],
    },
  ];

  return (
    <main className="relative">
      <Header />
      <div className="pt-24 pb-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Photography</h1>
            <Link to="/portfolio" className="px-4 py-2 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
              ← Back to Portfolio
            </Link>
          </div>

          <div className="space-y-12">
            {albums.map((album) => (
              <FadeIn key={album.id}>
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-1">{album.name}</h3>
                  <p className="text-muted-foreground">{album.person}</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {album.photos.map((src, index) => (
                    <Card key={index} className="group overflow-hidden bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-sharp)] transition-all duration-300">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={src}
                          alt={`${album.name} photo ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default PortfolioPhotography;
