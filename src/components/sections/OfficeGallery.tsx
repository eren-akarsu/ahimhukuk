import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight, Pause } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SectionTitle } from '../ui/SectionTitle';

import img1 from '../../assets/images/preview-4.webp';
import img2 from '../../assets/images/preview-5.webp';
import img3 from '../../assets/images/preview-6.webp';
import img4 from '../../assets/images/preview-7.webp';
import img5 from '../../assets/images/preview-8.webp';
import img6 from '../../assets/images/preview-11.webp';
import img7 from '../../assets/images/preview-13.webp';

const galleryImages = [
  { id: 1, src: img1, title: 'Toplantı ve Çalışma Alanı' },
  { id: 2, src: img2, title: 'Toplantı Odası Görünümü' },
  { id: 3, src: img3, title: 'Ofis Giriş ve Karşılama' },
  { id: 4, src: img4, title: 'Müvekkil Görüşme Salonu' },
  { id: 5, src: img5, title: 'Hukuki Kütüphane & Arşiv' },
  { id: 6, src: img6, title: 'Lobi ve Bekleme Alanı' },
  { id: 7, src: img7, title: 'Çalışma Ofisi Detay' },
];

export const OfficeGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const autoplayTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const { theme, t } = useApp();

  // Autoplay function
  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimer.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 6000); // 6 seconds slow transition
  };

  const stopAutoplay = () => {
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
      autoplayTimer.current = null;
    }
  };

  useEffect(() => {
    if (!isHovered && !activeImage) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
    return () => stopAutoplay();
  }, [isHovered, activeImage]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  // Section styling classes
  const sectionBgClass = theme === 'dark' ? 'bg-[#07222c] text-white' : 'bg-white text-gray-900';
  const dividerClass = theme === 'dark' ? 'bg-white/5' : 'bg-gray-100';
  const containerClass = theme === 'dark' ? 'border-white/5 bg-darker-bg/60 shadow-2xl' : 'border-gray-100 bg-gray-50 shadow-2xl';

  return (
    <section id="gallery" className={`py-20 relative transition-colors duration-500 ${sectionBgClass}`}>
      {/* Subtle border dividing sections */}
      <div className={`absolute top-0 left-0 right-0 h-[1px] ${dividerClass}`} />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionTitle
          title={t('galleryTitle')}
          subtitle={t('gallerySubtitle')}
          theme={theme === 'dark' ? 'dark' : 'light'}
        />

        {/* Modern Slide Show / Carousel Container */}
        <div 
          className={`relative max-w-5xl mx-auto aspect-16/10 sm:aspect-16/9 rounded-3xl overflow-hidden border ${containerClass}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Slide Track */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 cursor-zoom-in"
              onClick={() => setActiveImage(galleryImages[currentIndex].src)}
            >
              <img
                src={galleryImages[currentIndex].src}
                alt={galleryImages[currentIndex].title}
                className="w-full h-full object-cover"
              />
              
              {/* Soft overlay gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Title & Info Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-left text-white z-10 flex justify-between items-end">
                <div>
                  <span className="text-xs text-gold font-bold tracking-widest uppercase mb-1 block">AHİM Hukuk Bürosu</span>
                  <h3 className="text-xl md:text-2xl font-serif font-semibold">{galleryImages[currentIndex].title}</h3>
                </div>
                <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-gold flex items-center justify-center hover:scale-105 transition-transform duration-200">
                  <ZoomIn size={18} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/35 backdrop-blur-md text-white hover:text-gold border border-white/10 hover:bg-black/60 transition-all duration-300 z-20 cursor-pointer"
            aria-label="Önceki Fotoğraf"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/35 backdrop-blur-md text-white hover:text-gold border border-white/10 hover:bg-black/60 transition-all duration-300 z-20 cursor-pointer"
            aria-label="Sonraki Fotoğraf"
          >
            <ChevronRight size={24} />
          </button>

          {/* Autoplay Pause Indicator (Visible when hovering) */}
          <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md text-white/80 text-xs px-3 py-1.5 rounded-full flex items-center space-x-1.5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Pause size={12} />
            <span>Slayt Durduruldu</span>
          </div>
        </div>

        {/* Navigation Indicator Dots */}
        <div className="flex justify-center items-center space-x-2 mt-6">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === index 
                  ? 'w-8 bg-gold' 
                  : 'w-2 bg-gray-200 hover:bg-gray-400'
              }`}
              aria-label={`Fotoğraf ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImage(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm cursor-zoom-out"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl shadow-2xl z-10 border border-white/10"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-gray-300 hover:text-white hover:bg-black transition-colors duration-200 cursor-pointer"
              >
                <X size={20} />
              </button>

              <img
                src={activeImage}
                alt="AHİM Hukuk Lightbox"
                className="w-auto h-auto max-h-[85vh] object-contain max-w-full"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
