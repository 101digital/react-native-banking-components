import React, { useMemo, useState } from 'react';
import { defaultTheme } from '../theme/styled-theme';
import { BankingThemeProps } from '../theme/types';

export interface ThemeContextData {
  theme: BankingThemeProps;
}

export const themeDefaultValue: ThemeContextData = {
  theme: defaultTheme,
};

export const BankThemeContext = React.createContext<ThemeContextData>(themeDefaultValue);

export function useBankThemeContextValue(initial: BankingThemeProps): ThemeContextData {
  const [theme] = useState<BankingThemeProps>(initial);

  return useMemo(
    () => ({
      theme,
    }),
    [theme]
  );
}
