import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { X } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src, alt }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[100vw] h-[100vh] md:w-auto md:h-auto md:max-w-[95vw] md:max-h-[95vh] p-0 overflow-hidden border-0 bg-transparent">
        <VisuallyHidden>
          <DialogTitle>Portfolio Image</DialogTitle>
          <DialogDescription>{alt}</DialogDescription>
        </VisuallyHidden>
        <div className="relative flex items-center justify-center h-full md:min-h-[50vh]">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 md:top-4 md:right-4 z-50 p-3 md:p-2 bg-black/60 hover:bg-black/70 text-white rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[85vh] md:max-h-[90vh] object-contain portfolio-protected"
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
          {/* Watermark */}
          <div className="absolute bottom-4 right-4 text-white/80 text-sm font-medium bg-black/30 px-2 py-1 rounded pointer-events-none">
            RummSpace Photography
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;