'use client';

import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Layout = styled.div``;

const Home = () => {
  const { t } = useTranslation(['user', 'common']);

  return (
    <Layout>
      {t('user:user-label')}
      <br />
      {t('common:home-screen')}
    </Layout>
  );
};

export default Home;
