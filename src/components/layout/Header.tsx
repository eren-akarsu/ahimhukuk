import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoTransparent from '../../assets/images/logo-transparent.png';
import { useApp } from '../../context/AppContext';

interface NavItem {
  labelKey: 'navHome' | 'navAbout' | 'navServices' | 'navBlog' | 'navContact';
  href: string;
}

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme, language, setLanguage, t } = useApp();

  const navItems: NavItem[] = [
    { labelKey: 'navHome', href: '#home' },
    { labelKey: 'navAbout', href: '#about' },
    { labelKey: 'navServices', href: '#services' },
    { labelKey: 'navBlog', href: '#blog' },
    { labelKey: 'navContact', href: '#contact' },
  ];

  // Track scroll position for background styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const scrollPosition = window.scrollY + 100;
      for (const item of navItems) {
        const targetId = item.href.substring(1);
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
      setIsMobileOpen(false);
    }
  };

  // Header background theme classes
  const headerBgClasses = theme === 'dark'
    ? (isScrolled ? 'bg-darker-bg/90 backdrop-blur-lg border-b border-white/5 shadow-lg' : 'bg-transparent')
    : (isScrolled ? 'bg-white/95 backdrop-blur-lg border-b border-gray-150 shadow-md text-gray-800' : 'bg-transparent text-white');

  const navLinkColorClasses = (isActive: boolean) => {
    if (isActive) return 'text-gold';
    if (theme === 'dark') {
      return 'text-gray-300 hover:text-white';
    } else {
      return isScrolled ? 'text-gray-700 hover:text-primary' : 'text-gray-250 hover:text-white';
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-2 ${
          isScrolled ? 'py-1.5' : 'py-3'
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
              {navItems.map((item) => {
                const targetId = item.href.substring(1);
                const isActive = activeSection === targetId;
                
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-sm font-semibold tracking-wide transition-colors duration-300 relative py-1 cursor-pointer ${navLinkColorClasses(isActive)}`}
                  >
                    {t(item.labelKey)}
                    {/* Underline Slide Effect */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavUnderline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-gold-light"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
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
              className="relative w-14 h-7 rounded-full bg-primary/10 dark:bg-white/5 border border-gold/30 p-1 flex items-center justify-between cursor-pointer select-none focus:outline-none focus:ring-0"
              aria-label="Koyu/Açık Tema"
            >
              <Sun size={12} className={theme === 'light' ? 'text-[#07222c] z-10 font-bold' : 'text-gold/40 z-10'} />
              <Moon size={12} className={theme === 'dark' ? 'text-[#07222c] z-10 font-bold' : 'text-gold/40 z-10'} />
              <motion.div
                animate={{ x: theme === 'dark' ? 26 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute left-1 w-5 h-5 rounded-full bg-gold shadow-sm"
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
            className={`fixed top-[80px] left-4 right-4 z-40 md:hidden rounded-2xl p-6 shadow-2xl border ${
              theme === 'dark' 
                ? 'glass-panel border-white/10 text-white' 
                : 'bg-white border-gray-200 text-gray-800 shadow-xl'
            }`}
          >
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const targetId = item.href.substring(1);
                const isActive = activeSection === targetId;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-base font-semibold px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'text-gold bg-primary/10 border-l-4 border-gold'
                        : (theme === 'dark' 
                            ? 'text-gray-300 hover:text-white hover:bg-white/5 border-l-4 border-transparent' 
                            : 'text-gray-600 hover:text-primary hover:bg-gray-50 border-l-4 border-transparent')
                    }`}
                  >
                    {t(item.labelKey)}
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
