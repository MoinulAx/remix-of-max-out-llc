import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
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
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-auto h-auto p-0 overflow-hidden border-0 bg-transparent">
        <div className="relative flex items-center justify-center min-h-[50vh]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[90vh] object-contain portfolio-protected"
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