'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { useContext } from 'react';
import { ExampleThemeContext } from '@/context/ExampleThemeProvider';
import { ThemeType, themes } from '@/styles/theme';
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/i18nConfig';
import { useRouter, usePathname } from 'next/navigation';

const Layout = styled.div`
  width: 100%;
  height: 200px;
  background-color: white;
`;

const LanguageRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background-color: #b0e2ff;
`;

const MenuRow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background-color: #b0e2ff;
`;

const Col = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  background-color: #b0e2ff;
`;

const ThemeRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const LanguageBox = styled.button<{
  $themeName: ThemeType;
}>`
  width: 100px;
  height: 30px;

  background-color: ${({ $themeName }) =>
    themes[$themeName].color.bg.primary};

  color: ${({ $themeName }) =>
    $themeName === 'dark' ? 'white' : 'black'};
`;

const Box = styled.div`
  display: flex;
  width: 100px;
  height: 100px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  background-color: aliceblue;
  text-align: center;
  cursor: pointer;
`;

const ThemeBox = styled.div<{ $themeName: ThemeType }>`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  cursor: pointer;

  background-color: ${({ $themeName }) =>
    themes[$themeName].color.bg.primary};
`;

const Header = () => {
  const { t, i18n } = useTranslation();
  const { theme: currentTheme, changeTheme } = useContext(
    ExampleThemeContext,
  );
  const router = useRouter();
  const currentPathname = usePathname();

  const currentLocale = i18n.language;

  const handleChangeTheme = (newTheme: ThemeType) => {
    changeTheme(newTheme);
  };

  const handleChangeLanguage = (newLocale: string) => {
    // NOTE 쿠키 설정 for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(
      date.getTime() + days * 24 * 60 * 60 * 1000,
    );
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // NOTE 새로운 locale 경로로 리다이렉트
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push(`/${newLocale}${currentPathname}`);
    } else {
      router.push(
        currentPathname.replace(
          `/${currentLocale}`,
          `/${newLocale}`,
        ),
      );
    }

    router.refresh();
  };

  return (
    <Layout>
      <Col>
        <LanguageRow>
          <LanguageBox
            $themeName={currentTheme}
            onClick={() => handleChangeLanguage('ko')}
          >
            {t('language-ko')}
          </LanguageBox>
          <LanguageBox
            $themeName={currentTheme}
            onClick={() => handleChangeLanguage('en')}
          >
            {t('language-en')}
          </LanguageBox>
        </LanguageRow>
        <MenuRow>
          <Link href="/">
            <Box>{t('menu-home')}</Box>
          </Link>
          <Link href="user-profile">
            <Box>{t('menu-user-profile')}</Box>
          </Link>
          <Link href="error-page">
            <Box>{t('menu-error')}</Box>
          </Link>
          <Box>{t('menu-4')}</Box>
          <Box>{t('menu-5')}</Box>
          <ThemeRow>
            {Object.keys(themes).map(theme => (
              <ThemeBox
                key={theme}
                $themeName={theme as ThemeType}
                onClick={() =>
                  handleChangeTheme(theme as ThemeType)
                }
              />
            ))}
          </ThemeRow>
        </MenuRow>
      </Col>
    </Layout>
  );
};

export default Header;
