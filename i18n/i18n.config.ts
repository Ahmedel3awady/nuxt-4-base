
import ar from './locales/ar.json';
import en from './locales/en.json';

//@ts-ignore
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'ar',
  availableLocales: ['en', 'ar'],
  fallbackLocale: 'ar',

  messages: {
    en,
    ar
  }
}))
