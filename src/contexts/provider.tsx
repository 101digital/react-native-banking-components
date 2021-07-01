import { defaultsDeep } from 'lodash';
import React, { ReactNode } from 'react';
import { defaultTheme } from '../theme/styled-theme';
import { BankingThemeProps } from '../theme/types';
import { BankContext, useBankContextValue } from './bank-context';
import { ThemeContext, useThemeContextValue } from './them-context';
import { TransactionContext, useTransactionContextValue } from './transaction-context';
import { useWalletContextValue, WalletContext } from './wallet-context';

export type BankingProviderProps = {
  children: ReactNode;
  theme?: BankingThemeProps;
};

const BankingProvider = (props: BankingProviderProps) => {
  const { children, theme } = props;
  const walletContextData = useWalletContextValue();
  const transactionContextData = useTransactionContextValue();
  const bankContextData = useBankContextValue();
  const themeContextData = useThemeContextValue(defaultsDeep(theme, defaultTheme));

  return (
    <ThemeContext.Provider value={themeContextData}>
      <WalletContext.Provider value={walletContextData}>
        <TransactionContext.Provider value={transactionContextData}>
          <BankContext.Provider value={bankContextData}>{children}</BankContext.Provider>
        </TransactionContext.Provider>
      </WalletContext.Provider>
    </ThemeContext.Provider>
  );
};

export default BankingProvider;
