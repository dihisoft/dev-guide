'use client';

import { I18nextProvider } from 'react-i18next';
import { createInstance } from 'i18next';
import initTranslations from '@/app/i18n';

const TranslationsProvider = ({
  children,
  locale,
  namespaces,
  resources,
}: {
  children: React.ReactNode;
  locale: string;
  namespaces: string[];
  resources: Record<string, Record<string, string>>;
}) => {
  const i18n = createInstance();

  initTranslations(locale, namespaces, i18n, resources);

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
};

export default TranslationsProvider;
