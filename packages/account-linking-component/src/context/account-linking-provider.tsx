import React, { ReactNode } from 'react';
import { AccountLinkingContext, useBankContextValue } from './account-linking-context';

export type AccountLinkingProviderProps = {
  children: ReactNode;
};

const AccountLinkingProvider = (props: AccountLinkingProviderProps) => {
  const { children } = props;
  const accountLinkingContextData = useBankContextValue();

  return (
    <AccountLinkingContext.Provider value={accountLinkingContextData}>
      {children}
    </AccountLinkingContext.Provider>
  );
};

export default AccountLinkingProvider;
