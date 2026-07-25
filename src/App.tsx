import React from 'react';
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

const App: React.FC = () => {
  return (
    <AppProvider>
      <ToastProvider>
        <div className="min-h-screen bg-darker-bg text-gray-100 flex flex-col">

      {/* Sticky Header */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-grow">
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
      </main>

      {/* Footer */}
      <Footer />
      </div>
    </ToastProvider>
    </AppProvider>
  );
};

export default App;
