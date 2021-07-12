import React, { ReactNode } from 'react';
import { BankContext, useBankContextValue } from './bank-context';
import { TransactionContext, useTransactionContextValue } from './transaction-context';
import { useWalletContextValue, WalletContext } from './wallet-context';

export type BankingProviderProps = {
  children: ReactNode;
};

const BankingProvider = (props: BankingProviderProps) => {
  const { children } = props;
  const walletContextData = useWalletContextValue();
  const transactionContextData = useTransactionContextValue();
  const bankContextData = useBankContextValue();

  return (
    <WalletContext.Provider value={walletContextData}>
      <TransactionContext.Provider value={transactionContextData}>
        <BankContext.Provider value={bankContextData}>{children}</BankContext.Provider>
      </TransactionContext.Provider>
    </WalletContext.Provider>
  );
};

export default BankingProvider;
