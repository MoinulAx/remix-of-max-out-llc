import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import FadeIn from '@/components/animations/FadeIn';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundImage from '@/components/BackgroundImage';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { images } from '@/assets/images';
import ImageModal from '@/components/ImageModal';
import WebProjectModal from '@/components/WebProjectModal';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('photography');
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const [expandedAlbums, setExpandedAlbums] = useState<Set<string>>(new Set());
  const [selectedProject, setSelectedProject] = useState<{ title: string; category: string; image: string; description: string } | null>(null);

  const photographyWork: Array<any> = []; // moved to albums structure

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

  // Albums grouped by person/series
  const albums = [
    {
      id: 'aqua-headwrap',
      name: 'Aqua Headwrap Series',
      person: 'Model — Blue Headwrap',
      cover: images.portraits.etherealBlueHeadwrap,
      photos: [
        '/lovable-uploads/dd63bc8c-851a-451c-8330-82b1b31829b2.png',
        '/lovable-uploads/23433dc1-77c1-4a75-9af7-472f398955e1.png',
        '/lovable-uploads/a7d5a05f-c4e1-4c2d-a78f-cf155f1f6f2d.png',
        '/lovable-uploads/f7afd1ed-fa8c-4e1b-af72-7dcfa398c9cd.png',
        '/lovable-uploads/ad08e91d-3ee2-44f6-af1d-069b15d2c318.png',
        '/lovable-uploads/7e6cf1cd-a5e2-41be-a479-484862aa56f2.png',
        images.portraits.etherealBlueHeadwrap
      ]
    },
    {
      id: 'feather-editorial',
      name: 'Feather Editorial Series',
      person: 'Model — Feather Styling',
      cover: images.portraits.dramaticFeatherPortrait,
      photos: [
        images.portraits.dramaticFeatherPortrait,
        images.portraits.boldFeatherEditorial,
        images.portraits.duplicateFeatherShoot
      ]
    },
    {
      id: 'gold-nail-art',
      name: 'Gold Nail Art',
      person: 'Model — Fashion',
      cover: images.portraits.goldNailArtPortrait,
      photos: [images.portraits.goldNailArtPortrait]
    },
    {
      id: 'pink-beauty',
      name: 'Pink Backdrop Beauty',
      person: 'Model — Beauty',
      cover: '/lovable-uploads/373096af-ca0a-4bfb-9ca8-15f70d6a3bc1.png',
      photos: ['/lovable-uploads/373096af-ca0a-4bfb-9ca8-15f70d6a3bc1.png']
    },
    {
      id: 'city-street',
      name: 'City & Street',
      person: 'New York',
      cover: images.cityscape.vintageCityClockScene,
      photos: [images.cityscape.vintageCityClockScene, images.cityscape.subwayStationMoment]
    },
    {
      id: 'client-work',
      name: 'Client Work',
      person: 'Events & Products',
      cover: '/lovable-uploads/135A8479.jpg',
      photos: [
        '/lovable-uploads/135A8479.jpg',
        '/lovable-uploads/135A8916.jpg',
        '/lovable-uploads/135A8948.jpg',
        '/lovable-uploads/135A9034.jpg',
        '/lovable-uploads/DSC_6799.jpg',
        '/lovable-uploads/DSC_6828.jpg'
      ]
    }
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
            <div className="flex flex-wrap justify-center bg-card shadow-[var(--shadow-card)] p-1 gap-1 rounded-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-3 py-2 text-sm sm:text-base font-semibold transition-all duration-300 whitespace-nowrap rounded-md",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-[var(--shadow-sharp)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Photography Tab */}
          {activeTab === 'photography' && (
            <div className="space-y-12">
              {albums.map((album, aIndex) => (
                <FadeIn key={album.id} delay={200 + aIndex * 100}>
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold mb-1">{album.name}</h3>
                    <p className="text-muted-foreground">{album.person}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    {(expandedAlbums.has(album.id) ? album.photos : album.photos.slice(0, 3)).map((src, index) => (
                      <Card 
                        key={index} 
                        className="group overflow-hidden bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-sharp)] transition-all duration-300 cursor-pointer relative"
                        onClick={() => setSelectedImage({ src, alt: `${album.name} photo ${index + 1}` })}
                      >
                        <div className="aspect-square overflow-hidden relative">
                          <img 
                            src={src} 
                            alt={`${album.name} photo ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            draggable="false"
                            onContextMenu={(e) => e.preventDefault()}
                            onDragStart={(e) => e.preventDefault()}
                          />
                          {/* Watermark */}
                          <div className="absolute bottom-2 right-2 text-white/80 text-xs font-medium bg-black/50 px-1.5 py-0.5 rounded pointer-events-none">
                            RummSpace
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  {album.photos.length > 3 && (
                    <div className="mt-4 text-center">
                      <Button
                        variant="outline"
                        onClick={() => {
                          const newExpanded = new Set(expandedAlbums);
                          if (expandedAlbums.has(album.id)) {
                            newExpanded.delete(album.id);
                          } else {
                            newExpanded.add(album.id);
                          }
                          setExpandedAlbums(newExpanded);
                        }}
                        className="text-sm"
                      >
                        {expandedAlbums.has(album.id) ? 'Show Less' : `See More (${album.photos.length - 3} more)`}
                      </Button>
                    </div>
                  )}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {webProjects.map((item, index) => (
                <FadeIn key={item.title} delay={200 + (index * 100)}>
                  <Card 
                    className="group overflow-hidden bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-sharp)] transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedProject(item)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="p-4 md:p-6">
                      <div className="text-sm text-primary font-semibold mb-2">{item.category}</div>
                      <h3 className="text-lg md:text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground mb-4 text-sm md:text-base">{item.description}</p>
                      <button 
                        className="text-primary font-semibold hover:underline text-sm md:text-base"
                        onClick={(e) => { e.stopPropagation(); setSelectedProject(item); }}
                      >
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
      
      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          src={selectedImage.src}
          alt={selectedImage.alt}
        />
      )}

      {/* Web Project Modal */}
      {selectedProject && (
        <WebProjectModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      )}
    </main>
  );
};

export default Portfolio;