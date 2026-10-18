import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Maximize, X } from 'lucide-react';

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Handle keyboard navigation for modal and gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') setIsFullscreen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevImage, nextImage]);

  return (
    <div className="space-y-3">
      {/* Main Hero Image */}
      <div className="relative aspect-[16/9] sm:aspect-[21/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-900 group shadow-lg">
        <img
          src={images[currentIndex]}
          alt={`${title} - view ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-500 ease-out"
        />

        {/* Ambient Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 opacity-60" />

        {/* Counter Badge */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium tracking-wider">
          <span>{currentIndex + 1}</span> / <span>{images.length}</span>
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
          aria-label="Open Fullscreen Gallery"
        >
          <Maximize className="w-4 h-4" />
        </button>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              aria-label="Previous Image"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/85 hover:bg-white text-zinc-900 shadow-lg flex items-center justify-center transition-all duration-200 opacity-90 group-hover:opacity-100 hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 -ml-0.5" />
            </button>
            <button
              onClick={nextImage}
              aria-label="Next Image"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/85 hover:bg-white text-zinc-900 shadow-lg flex items-center justify-center transition-all duration-200 opacity-90 group-hover:opacity-100 hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5 -mr-0.5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Bar */}
      {images.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar pt-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex-shrink-0 w-20 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden transition-all duration-200 ${
                currentIndex === idx
                  ? 'ring-2 ring-[#C59B63] ring-offset-2 scale-102 opacity-100'
                  : 'opacity-60 hover:opacity-100 hover:scale-102'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200">
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white z-10 pb-4">
            <div className="flex items-center gap-3">
              <span className="font-serif text-lg text-zinc-200 hidden sm:inline">{title}</span>
              <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-zinc-300">
                {currentIndex + 1} of {images.length}
              </span>
            </div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close Fullscreen Gallery"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Central Image with Arrows */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden">
            <img
              src={images[currentIndex]}
              alt={`${title} - fullscreen ${currentIndex + 1}`}
              className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg shadow-2xl transition-all duration-300 select-none"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  aria-label="Previous"
                  className="absolute left-2 sm:left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-md"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  aria-label="Next"
                  className="absolute right-2 sm:right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-md"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="flex justify-center gap-2 overflow-x-auto pt-4 no-scrollbar">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-14 h-11 rounded-lg overflow-hidden transition-all ${
                  currentIndex === idx
                    ? 'ring-2 ring-[#C59B63] opacity-100 scale-105'
                    : 'opacity-40 hover:opacity-80'
                }`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
