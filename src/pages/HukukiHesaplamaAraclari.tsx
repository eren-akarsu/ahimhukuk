import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  ShieldAlert,
  Search,
  Filter,
  Scale,
  Award,
  Briefcase,
  Palmtree,
  Clock,
  Home,
  Percent,
  Coins,
  Mail,
  Landmark,
  Hourglass,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

// Import all 13 legal calculator components
import { ArabuluculukSuresi } from '../components/legal-calculators/ArabuluculukSuresi';
import { IseIadeSuresi } from '../components/legal-calculators/IseIadeSuresi';
import { KiraArtisHesaplama } from '../components/legal-calculators/KiraArtisHesaplama';
import { KidemTazminatiHesaplama } from '../components/legal-calculators/KidemTazminatiHesaplama';
import { IhbarTazminatiHesaplama } from '../components/legal-calculators/IhbarTazminatiHesaplama';
import { YillikIzinHesaplama } from '../components/legal-calculators/YillikIzinHesaplama';
import { FazlaMesaiHesaplama } from '../components/legal-calculators/FazlaMesaiHesaplama';
import { FaizHesaplama } from '../components/legal-calculators/FaizHesaplama';
import { HarcHesaplama } from '../components/legal-calculators/HarcHesaplama';
import { TebligatSuresi } from '../components/legal-calculators/TebligatSuresi';
import { IstinafSuresi } from '../components/legal-calculators/IstinafSuresi';
import { TemyizSuresi } from '../components/legal-calculators/TemyizSuresi';
import { ZamanasimiBilgi } from '../components/legal-calculators/ZamanasimiBilgi';

interface CalculatorMetadata {
  id: string;
  title: string;
  category: 'is' | 'sureler' | 'faiz_kira' | 'harc_bilgi';
  categoryLabel: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

export const HukukiHesaplamaAraclariPage: React.FC = () => {
  const { theme, t } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Update Page Title, Meta tags and Schema.org on mount
  useEffect(() => {
    document.title = 'Hukuki Hesaplama Araçları | AHİM Hukuk Bürosu';

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Kıdem tazminatı, ihbar tazminatı, kira artışı, dava süreleri, faiz hesaplama ve diğer hukuki hesaplama araçlarına AHİM Hukuk Bürosu üzerinden ulaşabilirsiniz.'
    );

    // Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', 'Hukuki Hesaplama Araçları | AHİM Hukuk Bürosu');

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + window.location.pathname + '#hesaplama');

    // Schema.org Breadcrumb JSON-LD
    const jsonLdScriptId = 'schema-breadcrumb-jsonld';
    let jsonLdScript = document.getElementById(jsonLdScriptId) as HTMLScriptElement | null;
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.id = jsonLdScriptId;
      jsonLdScript.type = 'application/ld+json';
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Ana Sayfa',
          item: window.location.origin,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Hukuki Hesaplama Araçları',
          item: window.location.origin + '/#hesaplama',
        },
      ],
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

    const calculators: CalculatorMetadata[] = [
      {
        id: 'kidem',
        title: t('calcTitleKidem'),
        category: 'is',
        categoryLabel: t('calcCategoryLabor'),
        icon: <Award size={20} />,
        component: <KidemTazminatiHesaplama />,
      },
      {
        id: 'ihbar',
        title: t('calcTitleIhbar'),
        category: 'is',
        categoryLabel: t('calcCategoryLabor'),
        icon: <ShieldAlert size={20} />,
        component: <IhbarTazminatiHesaplama />,
      },
      {
        id: 'yillik-izin',
        title: t('calcTitleYillikIzin'),
        category: 'is',
        categoryLabel: t('calcCategoryLabor'),
        icon: <Palmtree size={20} />,
        component: <YillikIzinHesaplama />,
      },
      {
        id: 'fazla-mesai',
        title: t('calcTitleFazlaMesai'),
        category: 'is',
        categoryLabel: t('calcCategoryLabor'),
        icon: <Clock size={20} />,
        component: <FazlaMesaiHesaplama />,
      },
      {
        id: 'ise-iade',
        title: t('calcTitleIseIade'),
        category: 'sureler',
        categoryLabel: t('calcCategoryPeriods'),
        icon: <Briefcase size={20} />,
        component: <IseIadeSuresi />,
      },
      {
        id: 'arabuluculuk',
        title: t('calcTitleArabuluculuk'),
        category: 'sureler',
        categoryLabel: t('calcCategoryPeriods'),
        icon: <Scale size={20} />,
        component: <ArabuluculukSuresi />,
      },
      {
        id: 'tebligat',
        title: t('calcTitleTebligat'),
        category: 'sureler',
        categoryLabel: t('calcCategoryPeriods'),
        icon: <Mail size={20} />,
        component: <TebligatSuresi />,
      },
      {
        id: 'istinaf',
        title: t('calcTitleIstinaf'),
        category: 'sureler',
        categoryLabel: t('calcCategoryPeriods'),
        icon: <Scale size={20} />,
        component: <IstinafSuresi />,
      },
      {
        id: 'temyiz',
        title: t('calcTitleTemyiz'),
        category: 'sureler',
        categoryLabel: t('calcCategoryPeriods'),
        icon: <Landmark size={20} />,
        component: <TemyizSuresi />,
      },
      {
        id: 'kira',
        title: t('calcTitleKira'),
        category: 'faiz_kira',
        categoryLabel: t('calcCategoryInterest'),
        icon: <Home size={20} />,
        component: <KiraArtisHesaplama />,
      },
      {
        id: 'faiz',
        title: t('calcTitleFaiz'),
        category: 'faiz_kira',
        categoryLabel: t('calcCategoryInterest'),
        icon: <Percent size={20} />,
        component: <FaizHesaplama />,
      },
      {
        id: 'harc',
        title: t('calcTitleHarc'),
        category: 'harc_bilgi',
        categoryLabel: t('calcCategoryFees'),
        icon: <Coins size={20} />,
        component: <HarcHesaplama />,
      },
      {
        id: 'zamanasimi',
        title: t('calcTitleZamanasimi'),
        category: 'harc_bilgi',
        categoryLabel: t('calcCategoryFees'),
        icon: <Hourglass size={20} />,
        component: <ZamanasimiBilgi />,
      },
    ];

  const filteredCalculators = calculators.filter((calc) => {
    const matchesCategory = selectedCategory === 'all' || calc.category === selectedCategory;
    const matchesSearch = calc.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`min-h-screen pt-28 pb-20 transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#07222c] text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-wider mb-4">
            <Calculator size={16} />
            <span>Mevzuat Uyumlu Hukuki Hesaplayıcılar</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-bold text-gradient-gold mb-4">
            {t('calcPageTitle')}
          </h1>

          <p className={`text-sm md:text-base leading-relaxed ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {t('calcPageSubtitle')}
          </p>
        </div>

        {/* Mandatory Top Disclaimer Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-12 p-4 md:p-5 rounded-2xl bg-primary border border-gold/30 shadow-lg text-xs md:text-sm text-white flex items-start space-x-3"
        >
          <div className="p-2 rounded-xl bg-gold/20 text-gold flex-shrink-0 mt-0.5 border border-gold/40">
            <ShieldAlert size={20} />
          </div>
          <div className="space-y-1">
            <span className="font-bold text-gold text-sm block">{t('calcDisclaimerTitle')}</span>
            <p className="leading-relaxed text-gray-100">
              {t('calcDisclaimerText')}
            </p>
          </div>
        </motion.div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-gold/15">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full md:w-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer flex items-center space-x-1.5 ${
                selectedCategory === 'all'
                  ? 'bg-gold text-[#07222c] font-bold shadow-md'
                  : theme === 'dark'
                  ? 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Filter size={14} />
              <span>{t('calcCategoryAll')} ({calculators.length})</span>
            </button>

            <button
              onClick={() => setSelectedCategory('is')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
                selectedCategory === 'is'
                  ? 'bg-gold text-[#07222c] font-bold shadow-md'
                  : theme === 'dark'
                  ? 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {t('calcCategoryLabor')}
            </button>

            <button
              onClick={() => setSelectedCategory('sureler')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
                selectedCategory === 'sureler'
                  ? 'bg-gold text-[#07222c] font-bold shadow-md'
                  : theme === 'dark'
                  ? 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {t('calcCategoryPeriods')}
            </button>

            <button
              onClick={() => setSelectedCategory('faiz_kira')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
                selectedCategory === 'faiz_kira'
                  ? 'bg-gold text-[#07222c] font-bold shadow-md'
                  : theme === 'dark'
                  ? 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {t('calcCategoryInterest')}
            </button>

            <button
              onClick={() => setSelectedCategory('harc_bilgi')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
                selectedCategory === 'harc_bilgi'
                  ? 'bg-gold text-[#07222c] font-bold shadow-md'
                  : theme === 'dark'
                  ? 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {t('calcCategoryFees')}
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('calcSearchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-xl border border-gold/30 text-xs focus:outline-none focus:border-gold transition-colors placeholder:text-gray-500 ${
                theme === 'dark' ? 'bg-darker-bg/80 text-white' : 'bg-white text-gray-800'
              }`}
            />
          </div>
        </div>

        {/* Calculator Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCalculators.map((calc) => (
            <motion.div
              key={calc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              id={`calc-${calc.id}`}
              className={calc.id === 'zamanasimi' ? "md:col-span-2" : "flex flex-col h-full md:aspect-square"}
            >
              <div className="w-full h-full">
                {calc.component}
              </div>
            </motion.div>
          ))}

          {filteredCalculators.length === 0 && (
            <div className="p-12 text-center text-gray-400 text-sm glass-panel rounded-2xl border border-gray-700">
              {t('calcNoResults')}
            </div>
          )}
        </div>

        {/* Mandatory Bottom Legal Disclaimer (Reklam Yasağı ve Hukuki Uyum Metni) */}
        <div className={`mt-16 p-6 rounded-2xl border border-gold/20 text-xs leading-relaxed text-center max-w-4xl mx-auto space-y-2 ${
          theme === 'dark' ? 'bg-darker-bg/80 text-gray-400' : 'bg-white/80 text-gray-600'
        }`}>
          <div className="font-bold text-gold text-sm flex items-center justify-center space-x-2">
            <Scale size={16} />
            <span>{t('calcFooterDisclaimerTitle')}</span>
          </div>
          <p>
            {t('calcFooterDisclaimerText')}
          </p>
        </div>
      </div>
    </div>
  );
};
