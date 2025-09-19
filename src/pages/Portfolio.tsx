import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import FadeIn from '@/components/animations/FadeIn';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundImage from '@/components/BackgroundImage';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ImageModal from '@/components/ImageModal';
import WebProjectModal from '@/components/WebProjectModal';
import ImageLoader from '@/components/ImageLoader';
import { usePortfolioAlbumsByCategory, usePortfolioItems } from '@/hooks/usePortfolio';
import { getImageUrl } from '@/lib/portfolioUtils';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('photography');
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const [expandedAlbums, setExpandedAlbums] = useState<Set<string>>(new Set());
  const [selectedProject, setSelectedProject] = useState<{ title: string; category: string; image: string; description: string } | null>(null);

  // Fetch portfolio data from Supabase
  const { data: photographyAlbums = [], isLoading: albumsLoading } = usePortfolioAlbumsByCategory('photography');
  const { data: photographyItems = [] } = usePortfolioItems(undefined, 'photography');
  const { data: webItems = [] } = usePortfolioItems(undefined, 'web-projects');

  const tabs = [
    { id: 'photography', label: 'Photography' },
    { id: 'videography', label: 'Videography' },
    { id: 'web', label: 'Web Projects' }
  ];

  const getAlbumItems = (albumId: string) => {
    return photographyItems.filter(item => item.album_id === albumId);
  };

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
              {albumsLoading ? (
                <div className="text-center py-8">Loading portfolio...</div>
              ) : (
                photographyAlbums.map((album, aIndex) => {
                  const albumItems = getAlbumItems(album.id);
                  
                  return (
                    <FadeIn key={album.id} delay={200 + aIndex * 100}>
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold mb-1">{album.name}</h3>
                        {album.person && <p className="text-muted-foreground">{album.person}</p>}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                        {(expandedAlbums.has(album.id) ? albumItems : albumItems.slice(0, 3)).map((item, index) => (
                          <Card 
                            key={item.id} 
                            className="group overflow-hidden bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-sharp)] transition-all duration-300 cursor-pointer relative"
                            onClick={() => setSelectedImage({ 
                              src: getImageUrl(item.image_url), 
                              alt: item.alt_text || `${album.name} photo ${index + 1}` 
                            })}
                          >
                            <ImageLoader
                              src={getImageUrl(item.image_url)}
                              alt={item.alt_text || `${album.name} photo ${index + 1}`}
                              aspectRatio="square"
                              showWatermark={true}
                            />
                          </Card>
                        ))}
                      </div>
                      {albumItems.length > 3 && (
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
                            {expandedAlbums.has(album.id) ? 'Show Less' : `See More (${albumItems.length - 3} more)`}
                          </Button>
                        </div>
                      )}
                    </FadeIn>
                  );
                })
              )}
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
            <div className="text-center py-20">
              <FadeIn>
                <h3 className="text-2xl font-bold mb-4">Web Development Portfolio</h3>
                <p className="text-muted-foreground mb-8">Coming soon - showcasing web development projects and applications</p>
                <button className="bg-primary text-primary-foreground px-8 py-3 font-semibold hover:bg-primary/90 transition-colors shadow-[var(--shadow-sharp)] rounded-md">
                  Contact for Web Development Services
                </button>
              </FadeIn>
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