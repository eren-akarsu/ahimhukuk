import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { PracticeAreas } from './components/sections/PracticeAreas';
import { About } from './components/sections/About';
import { Principles } from './components/sections/Principles';
import { OfficeGallery } from './components/sections/OfficeGallery';
import { CourtDecisions } from './components/sections/CourtDecisions';
import { Blog } from './components/sections/Blog';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';
import { ToastProvider } from './components/ui/Toast';
import { AppProvider } from './context/AppContext';
import { useApp } from './context/AppContext';
import { HukukiHesaplamaAraclariPage } from './pages/HukukiHesaplamaAraclari';

const MainAppContent: React.FC = () => {
  const { theme } = useApp();
  const [isCalculatorsPage, setIsCalculatorsPage] = useState<boolean>(() => {
    return window.location.hash === '#hesaplama';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const isCalc = window.location.hash === '#hesaplama';
      setIsCalculatorsPage(isCalc);
      if (isCalc) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      theme === 'dark' ? 'bg-darker-bg text-gray-100' : 'bg-gray-50 text-gray-800'
    }`}>
      {/* Sticky Header */}
      <Header />

      {/* Main Content View */}
      <main className="flex-grow">
        {isCalculatorsPage ? (
          <HukukiHesaplamaAraclariPage />
        ) : (
          <>
            {/* Hero Landing */}
            <Hero />
            
            {/* Office Gallery */}
            <OfficeGallery />

            {/* Practice Areas / Services */}
            <PracticeAreas />

            {/* About Av. Celil Telli */}
            <About />

            {/* Working Principles */}
            <Principles />

            {/* Supreme Court Decisions / Yargıtay Kararları */}
            <CourtDecisions />

            {/* Legal Blog / Hukuki İçerikler */}
            <Blog />

            {/* Contact Form & Map */}
            <Contact />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <ToastProvider>
        <MainAppContent />
      </ToastProvider>
    </AppProvider>
  );
};

export default App;
