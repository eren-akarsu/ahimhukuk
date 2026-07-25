import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, type Translations } from '../data/translations';

interface AppContextProps {
  theme: 'light' | 'dark';
  language: 'tr' | 'en';
  toggleTheme: () => void;
  setLanguage: (lang: 'tr' | 'en') => void;
  t: (key: keyof Translations) => string;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('ahim-theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  const [language, setLanguageState] = useState<'tr' | 'en'>(() => {
    const saved = localStorage.getItem('ahim-lang');
    return (saved as 'tr' | 'en') || 'tr';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    localStorage.setItem('ahim-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('ahim-lang', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setLanguage = (lang: 'tr' | 'en') => {
    setLanguageState(lang);
  };

  const t = (key: keyof Translations): string => {
    const translationSet = translations[language];
    if (translationSet && translationSet[key]) {
      return translationSet[key];
    }
    return translations['tr'][key] || '';
  };

  return (
    <AppContext.Provider value={{ theme, language, toggleTheme, setLanguage, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
