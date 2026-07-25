import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '../ui/Button';

import img1 from '../../assets/images/preview.jpeg';
import img2 from '../../assets/images/preview-5.webp';
import img3 from '../../assets/images/preview-6.webp';
import img4 from '../../assets/images/preview-13.webp';

import { useApp } from '../../context/AppContext';

const slides = [img1, img2, img3, img4];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useApp();

  // Auto slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-16">
      {/* Background Slideshow Track */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.25, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide]})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-darker-bg via-darker-bg/95 to-darker-bg/60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left: Text & CTA */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-center text-left"
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary-light/20 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-gold uppercase mb-6 w-fit">
            <span>{t('heroHeaderSubtitle')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-wide leading-tight mb-4">
            AHİM Hukuk <br />
            <span className="text-gradient-gold">{t('heroTitle')}</span>
          </h1>

          <h2 className="text-xl md:text-2xl font-sans font-medium text-primary-light mb-6">
            {t('heroSubtitle')}
          </h2>

          <p className="text-base text-gray-300 leading-relaxed max-w-xl mb-10">
            {t('heroDescription')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="secondary"
              className="px-8 py-4 flex items-center justify-center space-x-2 group"
              onClick={() => handleScrollTo('contact')}
            >
              <span>{t('heroCtaButton')}</span>
              <Phone size={16} className="transition-transform duration-300 group-hover:scale-110" />
            </Button>
            
            <Button
              variant="outline"
              className="px-8 py-4 flex items-center justify-center space-x-2 group border-white/20 text-white hover:bg-white/5"
              onClick={() => handleScrollTo('about')}
            >
              <span>{t('heroMoreButton')}</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>

        {/* Right: Modern Slideshow Gallery */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative w-full aspect-4/3 sm:aspect-video lg:aspect-square"
        >
          {/* Framed Stack Look */}
          <div className="absolute inset-0 bg-gold/10 rounded-3xl translate-x-3 translate-y-3 pointer-events-none" />
          
          <div className="relative w-full h-full rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
            {/* Slideshow */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0"
              >
                <motion.img
                  src={slides[currentSlide]}
                  alt="AHİM Hukuk Ofis"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 6 }}
                  className="w-full h-full object-cover object-center"
                />
                {/* Visual overlay for styling */}
                <div className="absolute inset-0 bg-gradient-to-t from-darker-bg/60 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </AnimatePresence>

            {/* Slider navigation indicator dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === index ? 'w-6 bg-gold' : 'w-1.5 bg-white/55 hover:bg-white/90'
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
