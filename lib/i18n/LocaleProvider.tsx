'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type AppLocale = 'en' | 'vi';

type LocaleContextValue = { locale: AppLocale; setLocale: (locale: AppLocale) => void; toggleLocale: () => void };

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<AppLocale>('en');

  useEffect(() => {
    const saved = window.localStorage.getItem('ck-locale');
    if (saved === 'en' || saved === 'vi') setLocaleState(saved);
  }, []);

  const setLocale = (next: AppLocale) => {
    setLocaleState(next);
    window.localStorage.setItem('ck-locale', next);
    document.documentElement.lang = next;
  };

  const value = useMemo(() => ({ locale, setLocale, toggleLocale: () => setLocale(locale === 'en' ? 'vi' : 'en') }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used inside LocaleProvider');
  return context;
}
