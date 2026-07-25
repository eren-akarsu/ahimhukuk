import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Scale, X } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { useApp } from '../../context/AppContext';

interface DecisionItem {
  id: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  citation: string;
}

interface CarouselProps {
  items: DecisionItem[];
}

export const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [selectedDecision, setSelectedDecision] = useState<DecisionItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { language, t } = useApp();

  const isTr = language === 'tr';

  // Update visible cards based on window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, items.length - visibleCards);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  const dotsCount = maxIndex + 1;

  return (
    <div className="relative w-full select-none">
      {/* Controls Container */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm text-gray-400 font-medium">
          {currentIndex + 1} - {Math.min(currentIndex + visibleCards, items.length)} / {items.length} {isTr ? 'Karar' : 'Decisions'}
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-full border border-primary-light/20 bg-dark-bg/60 text-white hover:text-gold hover:border-gold/50 hover:bg-primary/20 transition-all duration-300 cursor-pointer"
            aria-label="Önceki Karar"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="p-2.5 rounded-full border border-primary-light/20 bg-dark-bg/60 text-white hover:text-gold hover:border-gold/50 hover:bg-primary/20 transition-all duration-300 cursor-pointer"
            aria-label="Sonraki Karar"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Carousel Wrapper */}
      <div className="overflow-hidden w-full rounded-2xl" ref={containerRef}>
        <motion.div
          animate={{ x: `-${currentIndex * (100 / visibleCards)}%` }}
          transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          className="flex w-full"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 px-3"
              style={{ width: `${100 / visibleCards}%` }}
            >
              <Card className="h-full flex flex-col justify-between min-h-[300px]" theme="dark">
                <div>
                  <div className="flex items-center space-x-2 text-gold mb-3">
                    <Scale size={18} />
                    <span className="text-xs font-semibold tracking-wider uppercase">{isTr ? 'Yargıtay Kararı' : 'Court Precedent'}</span>
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-white mb-2 line-clamp-1">
                    {isTr ? item.title : item.titleEn}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4 line-clamp-4">
                    {isTr ? item.summary : item.summaryEn}
                  </p>
                </div>
                <div>
                  <div className="text-xs text-primary-light italic font-medium mb-4 line-clamp-1">
                    {item.citation}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full text-xs py-2 px-4 rounded-md"
                    onClick={() => setSelectedDecision(item)}
                  >
                    {isTr ? 'Detayı Gör' : 'View Details'}
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center space-x-2 mt-8">
        {Array.from({ length: dotsCount }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === idx
                ? 'w-8 bg-gold'
                : 'w-2 bg-primary-light/30 hover:bg-primary-light/60'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* High Fidelity Detail Modal */}
      <AnimatePresence>
        {selectedDecision && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDecision(null)}
              className="fixed inset-0 bg-darker-bg/85 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 md:p-8 overflow-hidden z-10 border border-gold/20"
            >
              {/* Header decor */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-gold to-primary-light" />
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedDecision(null)}
                className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="flex items-center space-x-3 text-gold mb-4">
                <Scale size={24} />
                <span className="text-xs md:text-sm font-semibold tracking-widest uppercase">
                  {isTr ? 'YARGITAY KARAR DETAYI' : 'COURT PRECEDENT DETAIL'}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-4 pr-8">
                {isTr ? selectedDecision.title : selectedDecision.titleEn}
              </h3>

              <div className="bg-darker-bg/40 border border-primary-light/10 rounded-xl p-4 md:p-5 mb-6">
                <p className="text-sm md:text-base text-gray-200 leading-relaxed font-normal">
                  {isTr ? selectedDecision.summary : selectedDecision.summaryEn}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-2 border-t border-white/10">
                <div>
                  <span className="text-xs text-gray-400 block mb-1">
                    {isTr ? 'Karar Künyesi' : 'Decision Citation'}
                  </span>
                  <span className="text-sm text-gold font-medium font-mono">{selectedDecision.citation}</span>
                </div>
                <Button
                  variant="primary"
                  className="text-xs py-2 px-5 self-end sm:self-center"
                  onClick={() => setSelectedDecision(null)}
                >
                  {t('courtCardClose')}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
