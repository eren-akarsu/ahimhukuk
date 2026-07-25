import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, ChevronDown, Calculator, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoTransparent from '../../assets/images/logo-transparent.png';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { theme, toggleTheme, language, setLanguage, t } = useApp();

  // Track scroll position for background styling & active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Check current hash or section
      if (window.location.hash === '#hesaplama') {
        setActiveSection('hesaplama');
        return;
      }

      const sections = ['home', 'about', 'services', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 100;
      for (const targetId of sections) {
        const element = document.getElementById(targetId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(targetId);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsDropdownOpen(false);
    setIsMobileOpen(false);

    if (href === '#hesaplama') {
      window.location.hash = 'hesaplama';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('hesaplama');
      return;
    }

    // If navigating to home section from another page/hash
    if (window.location.hash === '#hesaplama') {
      window.location.hash = href;
    }

    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else {
      window.location.hash = href;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  const effectiveIsScrolled = isScrolled || activeSection === 'hesaplama';

  // Header background theme classes
  const headerBgClasses = theme === 'dark'
    ? (effectiveIsScrolled ? 'bg-darker-bg/90 backdrop-blur-lg border-b border-white/5 shadow-lg' : 'bg-transparent')
    : (effectiveIsScrolled ? 'bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-md text-gray-800' : 'bg-transparent text-white');

  const navLinkColorClasses = (isActive: boolean) => {
    if (isActive) return 'text-gold';
    if (theme === 'dark') {
      return 'text-gray-300 hover:text-white';
    } else {
      return effectiveIsScrolled ? 'text-gray-700 hover:text-primary' : 'text-gray-200 hover:text-white';
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-2 ${
          effectiveIsScrolled ? 'py-1.5' : 'py-3'
        } ${headerBgClasses}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo Area */}
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center">
            <img
              src={logoTransparent}
              alt="AHİM Hukuk Bürosu Logo"
              className="h-16 md:h-[84px] w-auto object-contain transition-transform duration-300 hover:scale-102 filter dark:brightness-100"
            />
          </a>

          {/* Actions & Navigation Area */}
          <div className="flex items-center space-x-6">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {/* Home */}
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, '#home')}
                className={`text-sm font-semibold tracking-wide transition-colors duration-300 relative py-1 cursor-pointer ${navLinkColorClasses(activeSection === 'home')}`}
              >
                {t('navHome')}
                {activeSection === 'home' && (
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-gold-light"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>

              {/* About */}
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, '#about')}
                className={`text-sm font-semibold tracking-wide transition-colors duration-300 relative py-1 cursor-pointer ${navLinkColorClasses(activeSection === 'about')}`}
              >
                {t('navAbout')}
                {activeSection === 'about' && (
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-gold-light"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>

              {/* Services */}
              <a
                href="#services"
                onClick={(e) => handleNavClick(e, '#services')}
                className={`text-sm font-semibold tracking-wide transition-colors duration-300 relative py-1 cursor-pointer ${navLinkColorClasses(activeSection === 'services')}`}
              >
                {t('navServices')}
                {activeSection === 'services' && (
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-gold-light"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>

              {/* Dropdown Menu for "Hukuki İçerikler" */}
              <div
                className="relative py-1"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex items-center space-x-1 text-sm font-semibold tracking-wide transition-colors duration-300 cursor-pointer ${navLinkColorClasses(activeSection === 'blog' || activeSection === 'hesaplama')}`}
                >
                  <span>{t('navBlog')}</span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-gold' : ''}`} />
                  {(activeSection === 'blog' || activeSection === 'hesaplama') && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-gold-light"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>

                {/* Dropdown Content */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className={`absolute top-full left-0 mt-2 w-64 rounded-2xl p-2 shadow-2xl border backdrop-blur-xl ${
                        theme === 'dark'
                          ? 'bg-[#07222c]/95 border-gold/30 text-white'
                          : 'bg-white/95 border-gold/30 text-gray-800 shadow-xl'
                      }`}
                    >
                      <a
                        href="#blog"
                        onClick={(e) => handleNavClick(e, '#blog')}
                        className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                          theme === 'dark'
                            ? 'hover:bg-primary/20 hover:text-gold text-gray-200'
                            : 'hover:bg-primary/10 hover:text-primary text-gray-700'
                        }`}
                      >
                        <div className="p-1.5 rounded-lg bg-gold/10 text-gold">
                          <BookOpen size={16} />
                        </div>
                        <div>
                          <div className="font-bold">{t('navArticles')}</div>
                          <div className="text-[10px] text-gray-400 font-normal">Güncel Hukuki Gelişmeler & Makaleler</div>
                        </div>
                      </a>

                      <a
                        href="#hesaplama"
                        onClick={(e) => handleNavClick(e, '#hesaplama')}
                        className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                          theme === 'dark'
                            ? 'hover:bg-primary/20 hover:text-gold text-gray-200'
                            : 'hover:bg-primary/10 hover:text-primary text-gray-700'
                        }`}
                      >
                        <div className="p-1.5 rounded-lg bg-gold/10 text-gold">
                          <Calculator size={16} />
                        </div>
                        <div>
                          <div className="font-bold text-gold">{t('navCalculators')}</div>
                          <div className="text-[10px] text-gray-400 font-normal">Kıdem, İhbar, Faiz, Süre & Harç Hesabı</div>
                        </div>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Contact */}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className={`text-sm font-semibold tracking-wide transition-colors duration-300 relative py-1 cursor-pointer ${navLinkColorClasses(activeSection === 'contact')}`}
              >
                {t('navContact')}
                {activeSection === 'contact' && (
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-gold-light"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </nav>

            {/* Visual Divider on Desktop */}
            <div className="hidden md:block h-5 w-[1px] bg-gray-300/30 dark:bg-white/10" />

            {/* Language Switcher Button (TR / EN) */}
            <div className="flex bg-primary/10 dark:bg-white/5 border border-gold/30 rounded-full p-0.5 select-none text-[11px] font-bold">
              <button
                onClick={() => setLanguage('tr')}
                className={`px-2 py-0.5 rounded-full cursor-pointer transition-all duration-300 ${
                  language === 'tr' 
                    ? 'bg-gold text-[#07222c]' 
                    : (theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-primary')
                }`}
              >
                TR
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-full cursor-pointer transition-all duration-300 ${
                  language === 'en' 
                    ? 'bg-gold text-[#07222c]' 
                    : (theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-primary')
                }`}
              >
                EN
              </button>
            </div>

            {/* Dark Mode / Light Mode Switcher Capsule */}
            <button
              onClick={toggleTheme}
              className="relative w-14 h-7 rounded-full bg-primary/10 dark:bg-white/5 border border-gold/30 flex items-center cursor-pointer select-none focus:outline-none focus:ring-0"
              aria-label="Koyu/Açık Tema"
            >
              <div className="absolute inset-0 flex justify-between items-center px-[7px] pointer-events-none z-10">
                <Sun size={14} className={`transition-colors duration-300 ${theme === 'light' ? 'text-[#07222c] font-bold' : 'text-gold/40'}`} />
                <Moon size={14} className={`transition-colors duration-300 ${theme === 'dark' ? 'text-[#07222c] font-bold' : 'text-gold/40'}`} />
              </div>
              <motion.div
                animate={{ x: theme === 'dark' ? 26 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute left-[3px] top-[2px] w-[22px] h-[22px] rounded-full bg-gold shadow-sm"
              />
            </button>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className={`p-2 focus:outline-none cursor-pointer rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-white hover:bg-white/5' 
                    : 'text-gray-700 hover:text-primary hover:bg-black/5'
                }`}
                aria-label="Menüyü Aç/Kapat"
              >
                {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Dropdown Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`fixed top-[80px] left-4 right-4 z-40 md:hidden rounded-2xl p-5 shadow-2xl border ${
              theme === 'dark' 
                ? 'glass-panel border-white/10 text-white' 
                : 'bg-white border-gray-200 text-gray-800 shadow-xl'
            }`}
          >
            <nav className="flex flex-col space-y-3">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, '#home')}
                className={`text-base font-semibold px-4 py-2.5 rounded-lg transition-all duration-300 cursor-pointer ${
                  activeSection === 'home'
                    ? 'text-gold bg-primary/10 border-l-4 border-gold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {t('navHome')}
              </a>

              <a
                href="#about"
                onClick={(e) => handleNavClick(e, '#about')}
                className={`text-base font-semibold px-4 py-2.5 rounded-lg transition-all duration-300 cursor-pointer ${
                  activeSection === 'about'
                    ? 'text-gold bg-primary/10 border-l-4 border-gold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {t('navAbout')}
              </a>

              <a
                href="#services"
                onClick={(e) => handleNavClick(e, '#services')}
                className={`text-base font-semibold px-4 py-2.5 rounded-lg transition-all duration-300 cursor-pointer ${
                  activeSection === 'services'
                    ? 'text-gold bg-primary/10 border-l-4 border-gold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {t('navServices')}
              </a>

              {/* Mobile Sub-Menu for Hukuki İçerikler */}
              <div className="pl-2 pr-2 py-2 rounded-xl bg-primary/10 border border-gold/20 space-y-2">
                <div className="text-xs font-bold text-gold px-3 pt-1 uppercase tracking-wider">
                  {t('navBlog')}
                </div>
                <a
                  href="#blog"
                  onClick={(e) => handleNavClick(e, '#blog')}
                  className="flex items-center space-x-2 text-sm font-semibold px-3 py-2 rounded-lg text-gray-200 hover:text-gold hover:bg-white/5 cursor-pointer"
                >
                  <BookOpen size={16} className="text-gold" />
                  <span>{t('navArticles')}</span>
                </a>
                <a
                  href="#hesaplama"
                  onClick={(e) => handleNavClick(e, '#hesaplama')}
                  className="flex items-center space-x-2 text-sm font-bold px-3 py-2 rounded-lg text-gold bg-gold/10 border border-gold/30 cursor-pointer"
                >
                  <Calculator size={16} className="text-gold" />
                  <span>{t('navCalculators')}</span>
                </a>
              </div>

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className={`text-base font-semibold px-4 py-2.5 rounded-lg transition-all duration-300 cursor-pointer ${
                  activeSection === 'contact'
                    ? 'text-gold bg-primary/10 border-l-4 border-gold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {t('navContact')}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
