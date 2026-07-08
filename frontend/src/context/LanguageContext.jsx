import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    // A simple mock translation function
    const translations = {
      en: {
        'app.name': 'PRAGATI AI',
        'nav.home': 'Home',
        'nav.dashboard': 'Dashboard',
      },
      hi: {
        'app.name': 'प्रगति AI',
        'nav.home': 'मुख्य पृष्ठ',
        'nav.dashboard': 'डैशबोर्ड',
      }
    };
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
