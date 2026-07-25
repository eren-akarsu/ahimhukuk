import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, BookOpen, Scale, ShieldCheck } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { Card } from '../ui/Card';
import { useApp } from '../../context/AppContext';

import telliMain from '../../assets/images/telli-hakkında.webp';
import telli1 from '../../assets/images/telli-hakkında1.webp';
import telli2 from '../../assets/images/telli-hakkında2.webp';

const profileImages = [telliMain, telli1, telli2];

export const About: React.FC = () => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const { theme, t } = useApp();

  const sectionBgClass = theme === 'dark' ? 'bg-[#07222c] text-white' : 'bg-white text-gray-900';
  const dividerClass = theme === 'dark' ? 'bg-white/5' : 'bg-gray-100';
  const bodyTextClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const mainTitleClass = theme === 'dark' ? 'text-white' : 'text-darker-bg';
  const frameBorderClass = theme === 'dark' ? 'border-white/10' : 'border-gray-250';
  const selectorBorderClass = (idx: number) => {
    if (activeImageIdx === idx) return 'border-gold scale-105';
    return theme === 'dark' ? 'border-white/10 hover:border-white/40' : 'border-gray-200 hover:border-gray-400';
  };

  return (
    <section id="about" className={`py-20 relative transition-colors duration-500 ${sectionBgClass}`}>
      {/* Subtle border dividing sections */}
      <div className={`absolute top-0 left-0 right-0 h-[1px] ${dividerClass}`} />
      
      {/* Background blobs */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionTitle
          title={t('aboutTitle')}
          subtitle={t('aboutSubtitle')}
          theme={theme === 'dark' ? 'dark' : 'light'}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Interactive Photo Frame */}
          <div className="lg:col-span-5 flex flex-col items-center space-y-4">
            <div className={`relative w-full max-w-[400px] aspect-3/4 rounded-3xl overflow-hidden bg-gray-100 border shadow-2xl group ${frameBorderClass}`}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none" />
              
              {/* Profile Image View */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIdx}
                  src={profileImages[activeImageIdx]}
                  alt="Av. A. Celil TELLİ"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover object-top"
                />
              </AnimatePresence>
            </div>

            {/* Thumbnail Selectors */}
            <div className="flex space-x-3">
              {profileImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-16 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${selectorBorderClass(idx)}`}
                >
                  <img
                    src={img}
                    alt={`Küçük Görsel ${idx + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                  {activeImageIdx !== idx && <div className="absolute inset-0 bg-black/10" />}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Rich Biography */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="border-l-4 border-gold pl-4 mb-6">
              <h3 className={`text-2xl font-serif font-bold tracking-wide ${mainTitleClass}`}>
                {t('aboutLawyerTitle')}
              </h3>
              <p className="text-sm text-gold font-semibold uppercase tracking-wider mt-1">
                {t('aboutKurucu')}
              </p>
            </div>

            <div className={`space-y-5 text-sm md:text-base leading-relaxed ${bodyTextClass}`}>
              <p>
                {t('aboutBioPara1')}
              </p>
              <p>
                {t('aboutBioPara2')}
              </p>
              <p>
                {t('aboutBioPara3')}
              </p>
              <p>
                {t('aboutBioPara4')}
              </p>
              <p>
                {t('aboutBioPara5')}
              </p>
              <p>
                {t('aboutBioPara6')}
              </p>
            </div>

            {/* Micro Badges of Trust */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t ${theme === 'dark' ? 'border-white/10' : 'border-gray-150'}`}>
              <Card theme={theme === 'dark' ? 'dark' : 'light'} hoverGlow={true} className="flex flex-col items-center text-center p-4">
                <Scale size={20} className="text-gold mb-2" />
                <h4 className={`text-xs font-serif font-bold mb-1 ${mainTitleClass}`}>{t('aboutCard1Title')}</h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  {t('aboutCard1Desc')}
                </p>
              </Card>

              <Card theme={theme === 'dark' ? 'dark' : 'light'} hoverGlow={true} className="flex flex-col items-center text-center p-4">
                <BookOpen size={20} className="text-gold mb-2" />
                <h4 className={`text-xs font-serif font-bold mb-1 ${mainTitleClass}`}>{t('aboutCard2Title')}</h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  {t('aboutCard2Desc')}
                </p>
              </Card>

              <Card theme={theme === 'dark' ? 'dark' : 'light'} hoverGlow={true} className="flex flex-col items-center text-center p-4">
                <ShieldCheck size={20} className="text-gold mb-2" />
                <h4 className={`text-xs font-serif font-bold mb-1 ${mainTitleClass}`}>{t('aboutCard3Title')}</h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  {t('aboutCard3Desc')}
                </p>
              </Card>

              <Card theme={theme === 'dark' ? 'dark' : 'light'} hoverGlow={true} className="flex flex-col items-center text-center p-4">
                <Award size={20} className="text-gold mb-2" />
                <h4 className={`text-xs font-serif font-bold mb-1 ${mainTitleClass}`}>{t('aboutCard4Title')}</h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  {t('aboutCard4Desc')}
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
