import React from 'react';
import { cn } from '@/lib/utils';
import { images } from '@/assets/images';

interface BackgroundImageProps {
  children: React.ReactNode;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ 
  children, 
  className, 
  overlay = true, 
  overlayOpacity = 0.3 
}) => {
  return (
    <section className={cn('relative', className)}>
      <div className="absolute inset-0 -z-10">
        <img 
          src={images.backgrounds.luxuryOrangeryInterior} 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        {overlay && (
          <div 
            className="absolute inset-0 bg-black" 
            style={{ opacity: overlayOpacity }}
          />
        )}
      </div>
      {children}
    </section>
  );
};

export default BackgroundImage;