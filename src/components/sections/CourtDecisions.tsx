import React from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { Carousel } from '../ui/Carousel';
import { supremeCourtDecisions } from '../../data/supremeCourtDecisions';

import { useApp } from '../../context/AppContext';

export const CourtDecisions: React.FC = () => {
  const { t } = useApp();

  return (
    <section id="decisions" className="py-20 bg-darker-bg/50 relative">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionTitle
          title={t('courtTitle')}
          subtitle={t('courtSubtitle')}
          theme="dark"
        />

        <p className="text-center text-gray-305 max-w-3xl mx-auto mb-12 text-base leading-relaxed">
          {t('courtDescription')}
        </p>

        {/* Carousel containing 15 Decisions */}
        <div className="w-full">
          <Carousel items={supremeCourtDecisions} />
        </div>
      </div>
    </section>
  );
};
