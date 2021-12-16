import React, { useCallback, useMemo, useState } from 'react';
import { AccountLinkingService } from '../service/account-linking-service';
import {
  AccountConsent,
  Bank,
  BankAccount,
  BankImagesMap,
  BankingConsentData,
  GroupAccountConsent,
  groupBy,
} from '@banking-component/core';
import moment from 'moment';

const accountService = AccountLinkingService.instance();

export interface AccountLinkingContextData {
  banks: Bank[];
  bankImages: BankImagesMap;
  isLoadingBanks: boolean;
  errorLoadBanks?: Error;
  getBanks: () => void;
  getConsent: (bankId: string) => void;
  isLoadingConsent: boolean;
  errorLoadConsent?: Error;
  consentData?: BankingConsentData;
  clearConsentData: () => void;
  confirmConsent: (
    bankId: string,
    accountRequestId: string,
    code: string
  ) => Promise<string | undefined>;
  isConfirmingConsent: boolean;
  errorConfirmConsent?: Error;
  isLoadingAccounts: boolean;
  accounts: BankAccount[];
  getAccounts: (consentId: string) => void;
  errorLoadAccounts?: Error;
  clearBankErrors: () => void;
  clearAccounts: () => void;
  accountConsents: GroupAccountConsent[];
  isLoadingAccountConsents: boolean;
  errorLoadAccountConsents?: Error;
  getAccountConsents: () => void;
}

export const bankDefaultValue: AccountLinkingContextData = {
  banks: [],
  bankImages: {},
  isLoadingBanks: false,
  getBanks: () => null,
  isLoadingConsent: false,
  getConsent: () => null,
  clearConsentData: () => null,
  confirmConsent: async () => undefined,
  isConfirmingConsent: false,
  isLoadingAccounts: false,
  accounts: [],
  getAccounts: () => null,
  clearBankErrors: () => null,
  clearAccounts: () => null,
  isLoadingAccountConsents: false,
  getAccountConsents: () => null,
  accountConsents: [],
};

export const AccountLinkingContext = React.createContext<AccountLinkingContextData>(
  bankDefaultValue
);

export function useBankContextValue(): AccountLinkingContextData {
  const [_banks, setBanks] = useState<Bank[]>([]);
  const [_isLoadingBanks, setLoadingBanks] = useState(false);
  const [_errorLoadBanks, setErrorLoadBanks] = useState<Error | undefined>(undefined);
  const [_bankImages, setBankImages] = useState<BankImagesMap>({});
  const [_isLoadingConsent, setLoadingConsent] = useState(false);
  const [_errorLoadConsent, setErrorLoadConsent] = useState<Error | undefined>(undefined);
  const [_consentData, setConsentData] = useState<BankingConsentData | undefined>(undefined);
  const [_isConfirmingConsent, setConfirmingConsent] = useState(false);
  const [_errorConfirmConsent, setErrorConfirmConsent] = useState<Error | undefined>(undefined);
  const [_accounts, setAccounts] = useState<BankAccount[]>([]);
  const [_isLoadingAccounts, setLoadingAccounts] = useState(false);
  const [_errorLoadAccounts, setErrorLoadAccounts] = useState<Error | undefined>(undefined);
  const [_isLoadingAccountConsents, setLoadingAccountConsent] = useState(false);
  const [_errorLoadAccountConsents, setErrorLoadAccountConsents] = useState<Error | undefined>(
    undefined
  );
  const [_accountConsents, setAccountConsents] = useState<GroupAccountConsent[]>([]);

  const getBanks = useCallback(async (searchText?: string) => {
    try {
      setLoadingBanks(true);
      const { data } = await accountService.getBanks(searchText);
      setBanks(data);
      setBankImages(
        data.reduce((acc: BankImagesMap, bank: Bank) => {
          acc[bank.id] = bank.imageUrl;
          return acc;
        }, _bankImages)
      );
      setLoadingBanks(false);
    } catch (error) {
      setLoadingBanks(false);
      setErrorLoadBanks(error as Error);
    }
  }, []);

  const getConsent = useCallback(async (bankId: string) => {
    try {
      setLoadingConsent(true);
      const { data } = await accountService.requestConsent(bankId);
      setConsentData(data);
      setLoadingConsent(false);
    } catch (error) {
      setLoadingConsent(false);
      setErrorLoadConsent(error as Error);
    }
  }, []);

  const clearConsentData = useCallback(() => {
    setConsentData(undefined);
  }, []);

  const confirmConsent = useCallback(async (bankId: string, requestId: string, code: string) => {
    try {
      setConfirmingConsent(true);
      const { data } = await accountService.confirmConsent(bankId, requestId, code);
      setConfirmingConsent(false);
      return data.accountConsentId;
    } catch (error) {
      setConfirmingConsent(false);
      setErrorConfirmConsent(error as Error);
      return undefined;
    }
  }, []);

  const getAccounts = useCallback(async (consentId: string) => {
    try {
      setLoadingAccounts(true);
      const { data } = await accountService.fetchBankAccounts(consentId);
      setAccounts(data.account);
      setLoadingAccounts(false);
    } catch (error) {
      setLoadingAccounts(false);
      setErrorLoadAccounts(error as Error);
    }
  }, []);

  const clearAccounts = useCallback(() => {
    setAccounts([]);
  }, []);

  const clearBankErrors = useCallback(() => {
    setErrorLoadBanks(undefined);
    setErrorLoadConsent(undefined);
    setErrorConfirmConsent(undefined);
    setErrorLoadAccounts(undefined);
    setErrorLoadAccountConsents(undefined);
  }, []);

  const getAccountConsents = useCallback(async () => {
    try {
      setLoadingAccountConsent(true);
      const { data } = await accountService.getAccountConsents();
      const _groupConsent = groupBy<AccountConsent>(
        data.map((consent: AccountConsent) => {
          return {
            ...consent,
            expiredAt: moment(consent.createdAt).add(1, 'y'),
          };
        }),
        (consent: AccountConsent) => {
          if (moment(consent.expiredAt).isAfter(moment())) {
            return 'Active';
          }
          return 'Expired';
        }
      );
      setAccountConsents(
        Object.keys(_groupConsent).map((key) => ({
          section: key,
          data: _groupConsent[key],
        }))
      );
      setLoadingAccountConsent(false);
    } catch (error) {
      setLoadingAccountConsent(false);
      setErrorLoadAccountConsents(error as Error);
    }
  }, []);

  return useMemo(
    () => ({
      banks: _banks,
      bankImages: _bankImages,
      isLoadingBanks: _isLoadingBanks,
      errorLoadBanks: _errorLoadBanks,
      getBanks,
      getConsent,
      isLoadingConsent: _isLoadingConsent,
      errorLoadConsent: _errorLoadConsent,
      consentData: _consentData,
      clearConsentData,
      confirmConsent,
      isConfirmingConsent: _isConfirmingConsent,
      errorConfirmConsent: _errorConfirmConsent,
      isLoadingAccounts: _isLoadingAccounts,
      errorLoadAccounts: _errorLoadAccounts,
      getAccounts,
      accounts: _accounts,
      clearAccounts,
      clearBankErrors,
      getAccountConsents,
      errorLoadAccountConsents: _errorLoadAccountConsents,
      isLoadingAccountConsents: _isLoadingAccountConsents,
      accountConsents: _accountConsents,
    }),
    [
      _banks,
      _isLoadingBanks,
      _errorLoadBanks,
      _bankImages,
      _isLoadingConsent,
      _errorLoadConsent,
      _consentData,
      _isConfirmingConsent,
      _errorConfirmConsent,
      _isLoadingAccounts,
      _errorLoadAccounts,
      _accounts,
      _errorLoadAccountConsents,
      _isLoadingAccountConsents,
      _accountConsents,
    ]
  );
}
