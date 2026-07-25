import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { X } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { practiceAreas, type PracticeArea } from '../../data/practiceAreas';
import { useApp } from '../../context/AppContext';

export const PracticeAreas: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<PracticeArea | null>(null);
  const { language, t } = useApp();

  const isTr = language === 'tr';

  return (
    <section id="services" className="py-20 bg-[#186078] text-white relative">
      {/* Subtle border dividing sections */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionTitle
          title={t('servicesTitle')}
          subtitle={t('servicesSubtitle')}
          theme="dark"
        />
        
        <p className="text-center text-white/90 max-w-3xl mx-auto mb-16 text-base leading-relaxed">
          {t('servicesDescription')}
        </p>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practiceAreas.map((area, idx) => {
            const IconComponent = (Icons as any)[area.icon] || Icons.Scale;

            return (
              <Card
                key={area.id}
                delay={idx * 0.05}
                theme="light"
                className="flex flex-col justify-between items-start text-left min-h-[260px] relative overflow-hidden group"
              >
                {/* Decorative border line on top */}
                <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-gold to-gold-light group-hover:w-full transition-all duration-500" />
                
                <div className="w-full">
                  <div className="p-3 bg-primary/5 border border-primary-light/10 text-gold rounded-xl w-fit mb-5 transition-transform duration-300 group-hover:scale-110">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-darker-bg mb-3 tracking-wide group-hover:text-primary transition-colors">
                    {isTr ? area.title : area.titleEn}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-6">
                    {isTr ? area.description : area.descriptionEn}
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="text-xs py-2 px-4 rounded-md mt-auto"
                  onClick={() => setSelectedArea(area)}
                >
                  {t('servicesDetailsButton')}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedArea && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArea(null)}
              className="fixed inset-0 bg-darker-bg/85 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-xl glass-panel rounded-3xl p-6 md:p-8 overflow-hidden z-10 border border-gold/20"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedArea(null)}
                className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="flex items-center space-x-3 text-gold mb-4">
                {React.createElement((Icons as any)[selectedArea.icon] || Icons.Scale, { size: 28 })}
                <span className="text-xs md:text-sm font-semibold tracking-widest uppercase">{t('servicesModalSub')}</span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-white mb-4 pr-8">
                {isTr ? selectedArea.title : selectedArea.titleEn}
              </h3>

              <div className="bg-darker-bg/40 border border-primary-light/10 rounded-xl p-5 mb-6">
                <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                  {isTr ? selectedArea.description : selectedArea.descriptionEn}
                </p>
                <p className="text-xs text-gray-400 mt-4 leading-relaxed italic border-t border-white/5 pt-3">
                  {t('servicesModalFooterText')}
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  className="text-xs py-2 px-5"
                  onClick={() => setSelectedArea(null)}
                >
                  {t('servicesModalClose')}
                </Button>
                <Button
                  variant="secondary"
                  className="text-xs py-2 px-5"
                  onClick={() => {
                    setSelectedArea(null);
                    const element = document.getElementById('contact');
                    if (element) {
                      const offsetPosition = element.getBoundingClientRect().top + window.scrollY - 80;
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                  }}
                >
                  {t('heroCtaButton')}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
