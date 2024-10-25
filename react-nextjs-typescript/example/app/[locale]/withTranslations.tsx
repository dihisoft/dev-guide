import React, { ComponentType } from 'react';
import TranslationsProvider from '@/context/TranslationsProvider';
import initTranslations from '../i18n';

interface WithParams {
  params: {
    locale: string;
  };
}

// NOTE i18n Namespaces는 여기서 관리
const i18nNamespaces = ['common', 'user'];

const withTranslations = <P extends WithParams>(
  WrappedComponent: ComponentType<P>,
) => {
  // NOTE WithTranslations 컴포넌트는 함수 컴포넌트
  const Component = async (props: P) => {
    const { resources } = await initTranslations(
      props.params.locale,
      i18nNamespaces,
    );

    return (
      <TranslationsProvider
        locale={props.params.locale}
        namespaces={i18nNamespaces}
        resources={resources}
      >
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <WrappedComponent {...props} />
      </TranslationsProvider>
    );
  };
  return Component;
};

export default withTranslations;
