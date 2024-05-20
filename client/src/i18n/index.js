import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './translations/en.json';
import frTranslation from './translations/fr.json';
import deTranslation from './translations/de.json';
import arTranslation from './translations/ar.json';
import itTranslation from './translations/it.json';
import esTranslation from './translations/es.json';
import trTranslation from './translations/tr.json';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(initReactI18next)
  .use(LanguageDetector) // Add LanguageDetector plugin
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      fr: {
        translation: frTranslation
      },
      de: {
        translation: deTranslation
      },
      ar: {
        translation: arTranslation
      },
      it: {
        translation: itTranslation
      },
      es: {
        translation: esTranslation
      },
      tr: {
        translation: trTranslation
      }
    },
    fallbackLng: 'en', // Fallback language
    detection: {
      order: ['navigator', 'htmlTag', 'path', 'subdomain'], // Order of detection methods
      caches: ['localStorage', 'cookie'], // Caches where detected language is stored
    },
    interpolation: {
      escapeValue: false // React already does escaping
    }
  });

export default i18n;
