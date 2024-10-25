'use client';

import {
  ThemeType,
  isValidTheme,
  themes,
} from '@/styles/theme';
import React, { useEffect, useMemo, useState } from 'react';

import { ThemeContext } from 'styled-components';

type ExampleThemeContextType = {
  theme: ThemeType;
  changeTheme: (theme: ThemeType) => void;
};
export const ExampleThemeContext =
  React.createContext<ExampleThemeContextType>({
    theme: 'light',
    changeTheme: () => {},
  });

export const ExampleThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<ThemeType>('light');

  const value = useMemo<ExampleThemeContextType>(
    () => ({
      theme,
      changeTheme: (newTheme: ThemeType) => {
        setTheme(() => {
          localStorage.setItem('theme', newTheme);
          return newTheme;
        });
      },
    }),
    [theme],
  );

  useEffect(() => {
    setTheme(
      isValidTheme(
        localStorage.getItem('theme') as ThemeType,
      )
        ? (localStorage.getItem('theme') as ThemeType)
        : 'light',
    );
  }, []);

  return (
    <ExampleThemeContext.Provider value={value}>
      <ThemeContext.Provider value={themes[theme]}>
        {children}
      </ThemeContext.Provider>
    </ExampleThemeContext.Provider>
  );
};
