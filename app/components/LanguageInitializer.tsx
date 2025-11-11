'use client';

import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../context/LanguageContext';

interface LanguageInitializerProps {
  language: Language;
}

export default function LanguageInitializer({ language }: LanguageInitializerProps) {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    // Sync the URL language parameter with the context
    setLanguage(language);
  }, [language, setLanguage]);

  return null; // This component doesn't render anything
}
