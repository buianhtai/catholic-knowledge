'use client';

import { useLocale } from '@/lib/i18n/LocaleProvider';

export default function LanguageSwitch() {
  const { locale, toggleLocale } = useLocale();
  return <button className="btn btn-secondary" type="button" onClick={toggleLocale} aria-label="Switch language">{locale === 'en' ? 'EN / VI' : 'VI / EN'}</button>;
}
