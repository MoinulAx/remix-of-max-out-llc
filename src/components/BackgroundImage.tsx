import React from 'react';
import { cn } from '@/lib/utils';

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
          src="/lovable-uploads/a0278ce1-b82d-4ed6-a186-14a9503ef65c.png" 
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