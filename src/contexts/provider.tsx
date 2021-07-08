import { defaultsDeep } from 'lodash';
import React, { ReactNode } from 'react';
import { defaultTheme } from '../theme/styled-theme';
import { BankingThemeProps } from '../theme/types';
import { BankContext, useBankContextValue } from './bank-context';
import { BankThemeContext, useBankThemeContextValue } from './theme-context';
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
  const themeContextData = useBankThemeContextValue(defaultsDeep(theme, defaultTheme));

  return (
    <BankThemeContext.Provider value={themeContextData}>
      <WalletContext.Provider value={walletContextData}>
        <TransactionContext.Provider value={transactionContextData}>
          <BankContext.Provider value={bankContextData}>{children}</BankContext.Provider>
        </TransactionContext.Provider>
      </WalletContext.Provider>
    </BankThemeContext.Provider>
  );
};

export default BankingProvider;
