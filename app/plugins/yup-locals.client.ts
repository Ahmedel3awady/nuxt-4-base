import * as yup from 'yup';

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = nuxtApp.$i18n as any;

  // Helper function to create translation function
  const t = (key: string, params?: Record<string, any>) => {
    return i18n.t(`validation.${key}`, params || {});
  };

  // Comprehensive Yup locale configuration
  yup.setLocale({
    mixed: {
      default: () => t('mixed.default'),
      required: () => t('mixed.required'),
      oneOf: ({ values }) => t('mixed.oneOf', { values: values.join(', ') }),
      notOneOf: ({ values }) => t('mixed.notOneOf', { values: values.join(', ') }),
      defined: () => t('mixed.defined'),
      notType: ({ type }) => t('mixed.notType', { type }),
    },
    string: {
      length: ({ length }) => t('string.length', { length }),
      min: ({ min }) => t('string.min', { min }),
      max: ({ max }) => t('string.max', { max }),
      matches: () => t('string.matches'),
      email: () => t('string.email'),
      url: () => t('string.url'),
      uuid: () => t('string.uuid'),
      trim: () => t('string.trim'),
      lowercase: () => t('string.lowercase'),
      uppercase: () => t('string.uppercase'),
    },
    number: {
      min: ({ min }) => t('number.min', { min }),
      max: ({ max }) => t('number.max', { max }),
      lessThan: ({ less }) => t('number.lessThan', { less }),
      moreThan: ({ more }) => t('number.moreThan', { more }),
      positive: () => t('number.positive'),
      negative: () => t('number.negative'),
      integer: () => t('number.integer'),
    },
    date: {
      min: ({ min }) => t('date.min', { min }),
      max: ({ max }) => t('date.max', { max }),
    },
    boolean: {
      isValue: ({ value }) => t('boolean.isValue', { value }),
    },
    object: {
      noUnknown: ({ unknown }) => t('object.noUnknown', { unknown }),
    },
    array: {
      min: ({ min }) => t('array.min', { min }),
      max: ({ max }) => t('array.max', { max }),
      length: ({ length }) => t('array.length', { length }),
    },
  });
});
