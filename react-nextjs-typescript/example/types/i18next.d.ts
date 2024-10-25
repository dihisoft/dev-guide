import user from '@/locales/ko/user.json';
import common from '@/locales/ko/common.json';

const resources = {
  user,
  common,
} as const;

export const defaultNS = 'common';
declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: typeof defaultNS;
    resources: typeof resources;
  }
}
