import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'ru' | 'kz' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

const translations = {
  ru: {
    welcome: 'Добро пожаловать!',
    agreeTo: 'Я согласен с',
    terms: 'условиями использования',
    and: 'и',
    privacyPolicy: 'политикой конфиденциальности',
    continue: 'Продолжить',
  },
  kz: {
    welcome: 'Қош келдіңіз!',
    agreeTo: 'Мен қабылдаймын',
    terms: 'пайдалану шарттарын',
    and: 'және',
    privacyPolicy: 'құпиялылық саясатын',
    continue: 'Жалғастыру',
  },
  en: {
    welcome: 'Welcome!',
    agreeTo: 'I agree to the',
    terms: 'terms of use',
    and: 'and',
    privacyPolicy: 'privacy policy',
    continue: 'Continue',
  },
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
