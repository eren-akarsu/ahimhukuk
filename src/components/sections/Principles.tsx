import React from 'react';
import * as Icons from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { Card } from '../ui/Card';
import { useApp } from '../../context/AppContext';

export const Principles: React.FC = () => {
  const { theme, t } = useApp();

  const sectionBgClass = theme === 'dark' ? 'bg-[#0b2e3b] text-white' : 'bg-gray-50 text-gray-900';
  const dividerClass = theme === 'dark' ? 'bg-white/5' : 'bg-gray-200';
  const cardTitleClass = theme === 'dark' ? 'text-white' : 'text-darker-bg';
  const cardDescClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  const principlesData = [
    {
      id: 1,
      titleKey: 'principle1Title',
      descKey: 'principle1Desc',
      icon: 'Shield',
    },
    {
      id: 2,
      titleKey: 'principle2Title',
      descKey: 'principle2Desc',
      icon: 'Eye',
    },
    {
      id: 3,
      titleKey: 'principle3Title',
      descKey: 'principle3Desc',
      icon: 'Target',
    },
  ];

  return (
    <section id="principles" className={`py-20 relative transition-colors duration-500 ${sectionBgClass}`}>
      {/* Subtle border dividing sections */}
      <div className={`absolute top-0 left-0 right-0 h-[1px] ${dividerClass}`} />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionTitle
          title={t('principlesTitle')}
          subtitle={t('principlesSubtitle')}
          theme={theme === 'dark' ? 'dark' : 'light'}
        />

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {principlesData.map((principle, idx) => {
            const IconComponent = (Icons as any)[principle.icon] || Icons.Shield;

            return (
              <Card
                key={principle.id}
                delay={idx * 0.05}
                theme={theme === 'dark' ? 'dark' : 'light'}
                className="flex flex-col items-center text-center p-8 group border border-primary/5"
              >
                <div className="p-4 bg-primary/5 text-gold rounded-full mb-6 border border-primary-light/10 transition-transform duration-300 group-hover:scale-110">
                  <IconComponent size={28} />
                </div>
                <h3 className={`text-lg font-serif font-semibold mb-3 tracking-wide ${cardTitleClass}`}>
                  {t(principle.titleKey as any)}
                </h3>
                <p className={`text-sm leading-relaxed max-w-xs ${cardDescClass}`}>
                  {t(principle.descKey as any)}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
