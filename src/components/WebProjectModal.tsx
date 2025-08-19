import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface WebProject {
  title: string;
  category: string;
  image: string;
  description: string;
}

interface WebProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: WebProject;
}

const WebProjectModal: React.FC<WebProjectModalProps> = ({ isOpen, onClose, project }) => {
  const handleBackdropEvent = (e: React.MouseEvent | React.TouchEvent) => {
    // Only close if touching/clicking the backdrop, not the content
    if (e.target === e.currentTarget) {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="w-[100vw] h-[100vh] md:w-auto md:h-auto md:max-w-2xl p-0 border-0 bg-transparent overflow-hidden"
      >
        <VisuallyHidden>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>{project.description}</DialogDescription>
        </VisuallyHidden>
        <div 
          className="absolute inset-0 bg-black/20"
          onClick={handleBackdropEvent}
          onTouchStart={handleBackdropEvent}
        />
        <div 
          className="relative h-full md:h-auto flex items-center justify-center touch-manipulation z-10"
        >
          <button
            onClick={onClose}
            onTouchEnd={(e) => { e.preventDefault(); onClose(); }}
            className="absolute top-4 right-4 z-[60] p-2 bg-background/90 hover:bg-background text-foreground rounded-full transition-colors shadow-lg border border-border/20 backdrop-blur-sm touch-manipulation pointer-events-auto"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <Card 
            className="mx-auto w-[92vw] md:w-full overflow-hidden bg-card shadow-[var(--shadow-card)]"
            onClick={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="w-full h-full object-cover"
                loading="lazy"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
            <CardContent className="p-4 md:p-6">
              <div className="text-sm text-primary font-semibold mb-2">{project.category}</div>
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm md:text-base mb-2">{project.description}</p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WebProjectModal;
