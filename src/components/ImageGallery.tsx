import { useState, useEffect, useRef, useCallback } from 'react';

interface ImageGalleryProps {
  /** Array of image URLs to display in the gallery */
  images: string[];
  /** Product code for alt text and accessibility */
  productCode: string;
  /** Product name for alt text */
  productName: string;
}

/**
 * ImageGallery component - Story 2.4
 * Interactive image gallery with thumbnails, zoom, keyboard and touch navigation
 *
 * Features:
 * - Main image display (min 500px desktop)
 * - Clickable thumbnail strip with selected indicator
 * - Click-to-zoom lightbox modal
 * - Keyboard navigation (arrow keys, Enter, Esc)
 * - Touch/swipe gestures on mobile
 * - Lazy loading with loading states
 * - Fully responsive
 * - WCAG AA accessibility compliant
 */
function ImageGallery({ images, productCode, productName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Navigate to next image
  const goToNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Navigate to previous image
  const goToPrevious = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Open lightbox
  const openLightbox = useCallback(() => {
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }, []);

  // Close lightbox
  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    document.body.style.overflow = ''; // Restore scrolling
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          goToNext();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'Enter':
          if (!isLightboxOpen) {
            openLightbox();
          }
          break;
        case 'Escape':
          if (isLightboxOpen) {
            closeLightbox();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious, isLightboxOpen, openLightbox, closeLightbox]);

  // Touch gesture handling for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50; // Minimum swipe distance in pixels
    const swipeDistance = touchStartX.current - touchEndX.current;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

  // Handle image loading
  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set([...prev, index]));
  };

  // Focus trap for lightbox accessibility
  useEffect(() => {
    if (isLightboxOpen && lightboxRef.current) {
      const focusableElements = lightboxRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      firstElement?.focus();

      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [isLightboxOpen]);

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-gray-light bg-gray-lighter p-12 text-center">
        <p className="text-gray-medium">No hay imágenes disponibles</p>
      </div>
    );
  }

  const currentImage = images[selectedIndex];
  const altText = `${productCode} - ${productName} - Imagen ${selectedIndex + 1} de ${images.length}`;

  return (
    <div className="w-full">
      {/* Main Image Display */}
      <div
        className="group relative overflow-hidden rounded-lg border border-gray-light bg-white"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Loading skeleton */}
        {!loadedImages.has(selectedIndex) && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-lighter">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-light border-t-brand-red" />
          </div>
        )}

        {/* Main Image */}
        <img
          src={currentImage}
          alt={altText}
          className={`h-auto w-full cursor-pointer object-contain transition-opacity duration-300 ${
            loadedImages.has(selectedIndex) ? 'opacity-100' : 'opacity-0'
          } min-h-[300px] md:min-h-[500px]`}
          loading={selectedIndex === 0 ? 'eager' : 'lazy'}
          onClick={openLightbox}
          onLoad={() => handleImageLoad(selectedIndex)}
        />

        {/* Zoom hint on hover (desktop only) */}
        <div className="pointer-events-none absolute inset-0 hidden items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100 md:flex">
          <div className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-dark">
            Click para ampliar
          </div>
        </div>

        {/* Navigation arrows (only if multiple images) */}
        {images.length > 1 && (
          <>
            {/* Previous button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 shadow-md transition-all hover:bg-white group-hover:opacity-100 md:left-4 md:p-3"
              aria-label="Imagen anterior"
            >
              <svg className="h-5 w-5 text-gray-dark md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 shadow-md transition-all hover:bg-white group-hover:opacity-100 md:right-4 md:p-3"
              aria-label="Imagen siguiente"
            >
              <svg className="h-5 w-5 text-gray-dark md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-2 right-2 rounded-full bg-black/60 px-3 py-1 text-sm text-white md:bottom-4 md:right-4">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Strip - Only show if multiple images */}
      {images.length > 1 && (
        <div className="mt-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-medium scrollbar-track-gray-lighter">
            {images.map((image, index) => {
              const thumbnailAlt = `${productCode} - Vista ${index + 1}`;
              const isSelected = index === selectedIndex;

              return (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`flex-shrink-0 overflow-hidden rounded border-2 transition-all ${
                    isSelected
                      ? 'border-brand-red shadow-md'
                      : 'border-gray-light hover:border-brand-red hover:opacity-70'
                  }`}
                  aria-label={`Ver imagen ${index + 1}`}
                  aria-pressed={isSelected}
                >
                  <img
                    src={image}
                    alt={thumbnailAlt}
                    className="h-20 w-20 object-cover"
                    loading="lazy"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Vista ampliada de imagen"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/20 p-3 text-white transition-colors hover:bg-white/30"
            aria-label="Cerrar vista ampliada"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Lightbox image */}
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={currentImage}
              alt={altText}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />

            {/* Navigation arrows in lightbox */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white transition-colors hover:bg-white/30"
                  aria-label="Imagen anterior"
                >
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white transition-colors hover:bg-white/30"
                  aria-label="Imagen siguiente"
                >
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Image counter in lightbox */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-white">
                {selectedIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
