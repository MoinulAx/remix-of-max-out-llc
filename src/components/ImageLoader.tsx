import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'auto';
  showWatermark?: boolean;
  onClick?: () => void;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({
  src,
  alt,
  className,
  aspectRatio = 'auto',
  showWatermark = false,
  onClick
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
    setHasError(true);
    console.error('Image failed to load:', src);
    
    // Fallback logic
    const filename = src.split('/').pop();
    if (filename && !src.includes('/lovable-uploads/')) {
      (e.currentTarget as HTMLImageElement).src = `/lovable-uploads/${filename}`;
      setHasError(false);
      setIsLoading(true);
    }
  };

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    auto: ''
  };

  return (
    <div 
      className={cn(
        'relative overflow-hidden',
        aspectClasses[aspectRatio],
        className,
        onClick && 'cursor-pointer'
      )}
      onClick={onClick}
    >
      {/* Loading skeleton */}
      {isLoading && (
        <div className={cn(
          'absolute inset-0 bg-muted animate-pulse flex items-center justify-center',
          aspectClasses[aspectRatio]
        )}>
          <div className="text-muted-foreground text-sm">Loading...</div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className={cn(
          'absolute inset-0 bg-muted flex items-center justify-center',
          aspectClasses[aspectRatio]
        )}>
          <div className="text-muted-foreground text-sm text-center p-4">
            Failed to load image
          </div>
        </div>
      )}

      {/* Image */}
      <img
        src={src}
        alt={alt}
        className={cn(
          'w-full h-full object-cover transition-all duration-300',
          'group-hover:scale-105',
          isLoading && 'opacity-0',
          !isLoading && !hasError && 'opacity-100'
        )}
        loading="lazy"
        draggable="false"
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        onLoad={handleLoad}
        onError={handleError}
      />

      {/* Watermark */}
      {showWatermark && !isLoading && !hasError && (
        <div className="absolute bottom-2 right-2 text-white/80 text-xs font-medium bg-black/50 px-1.5 py-0.5 rounded pointer-events-none">
          RummSpace
        </div>
      )}
    </div>
  );
};

export default ImageLoader;