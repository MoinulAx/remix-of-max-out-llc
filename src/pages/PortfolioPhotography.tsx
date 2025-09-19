import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ImageModal from '@/components/ImageModal';
import ImageLoader from '@/components/ImageLoader';
import { usePortfolioAlbumsByCategory, usePortfolioItems } from '@/hooks/usePortfolio';
import { getImageUrl } from '@/lib/portfolioUtils';

const PortfolioPhotography = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const [expandedAlbums, setExpandedAlbums] = useState<Set<string>>(new Set());
  
  const { data: albums = [], isLoading: albumsLoading } = usePortfolioAlbumsByCategory('photography');
  const { data: allItems = [] } = usePortfolioItems(undefined, 'photography');

  const getAlbumItems = (albumId: string) => {
    return allItems.filter(item => item.album_id === albumId);
  };

  return (
    <main className="relative">
      <Header />
      <div className="pt-24 pb-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight">Photography</h1>
            <Link to="/portfolio" className="px-3 py-2 md:px-4 md:py-2 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity text-sm md:text-base rounded-md">
              ← Back to Portfolio
            </Link>
          </div>

          {albumsLoading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Loading portfolio...</p>
            </div>
          ) : (
            <div className="space-y-12">
              {albums.map((album) => {
                const albumItems = getAlbumItems(album.id);
                
                return (
                  <FadeIn key={album.id}>
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
              })}
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
    </main>
  );
};

export default PortfolioPhotography;