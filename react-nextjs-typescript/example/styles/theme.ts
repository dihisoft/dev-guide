import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: ColorType;
    font: FontType;
  }
}

type ColorType = {
  bg: {
    primary: string;
  };
};
type FontType = { fontSizes: string[] };

const font: FontType = {
  fontSizes: ['14px'],
};

export type ThemeType =
  | 'light'
  | 'dark'
  | 'pink'
  | 'purple'
  | 'blue';
export const themes: { [key in ThemeType]: DefaultTheme } =
  {
    light: {
      color: {
        bg: {
          primary: '#ffdcc3',
        },
      },
      font,
    },
    dark: {
      color: {
        bg: {
          primary: '#333',
        },
      },
      font,
    },
    pink: {
      color: {
        bg: {
          primary: '#ffa8d4',
        },
      },
      font,
    },
    purple: {
      color: {
        bg: {
          primary: '#9d2cfe',
        },
      },
      font,
    },
    blue: {
      color: {
        bg: {
          primary: '#4b4bff',
        },
      },
      font,
    },
  };

// ThemeType에 정의된 값 중 하나인지 검사하는 함수
export const isValidTheme = (
  theme: ThemeType,
): theme is ThemeType => {
  const themeValues: { [key in ThemeType]: null } = {
    light: null,
    dark: null,
    pink: null,
    purple: null,
    blue: null,
  };
  return Object.keys(themeValues).includes(theme);
};
