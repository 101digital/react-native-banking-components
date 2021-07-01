import React, { useCallback, useMemo, useState } from 'react';
import { BankingService } from '../services/banking-service';
import { Bank, BankAccount, BankImagesMap, BankingConsentData } from '../types';

export interface BankContextData {
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
  clearAccounts: () => void;
  clearErrors: () => void;
}

export const bankDefaultValue: BankContextData = {
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
  clearAccounts: () => null,
  clearErrors: () => null,
};

export const BankContext = React.createContext<BankContextData>(bankDefaultValue);

export function useBankContextValue(): BankContextData {
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

  const getBanks = useCallback(async (searchText?: string) => {
    try {
      setLoadingBanks(true);
      const { data } = await BankingService.getInstance().getBanks(searchText);
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
      setErrorLoadBanks(error);
    }
  }, []);

  const getConsent = useCallback(async (bankId: string) => {
    try {
      setLoadingConsent(true);
      const { data } = await BankingService.getInstance().requestConsent(bankId);
      setConsentData(data);
      setLoadingConsent(false);
    } catch (error) {
      setLoadingConsent(false);
      setErrorLoadConsent(error);
    }
  }, []);

  const clearConsentData = useCallback(() => {
    setConsentData(undefined);
  }, []);

  const confirmConsent = useCallback(async (bankId: string, requestId: string, code: string) => {
    try {
      setConfirmingConsent(true);
      const { data } = await BankingService.getInstance().confirmConsent(bankId, requestId, code);
      setConfirmingConsent(false);
      return data.accountConsentId;
    } catch (error) {
      setConfirmingConsent(false);
      setErrorConfirmConsent(error);
      return undefined;
    }
  }, []);

  const getAccounts = useCallback(async (consentId: string) => {
    try {
      setLoadingAccounts(true);
      const { data } = await BankingService.getInstance().fetchBankAccounts(consentId);
      setAccounts(data.account);
      setLoadingAccounts(false);
    } catch (error) {
      setLoadingAccounts(false);
      setErrorLoadAccounts(error);
    }
  }, []);

  const clearAccounts = useCallback(() => {
    setAccounts([]);
  }, []);

  const clearErrors = useCallback(() => {
    setErrorLoadBanks(undefined);
    setErrorLoadConsent(undefined);
    setErrorConfirmConsent(undefined);
    setErrorLoadAccounts(undefined);
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
      clearErrors,
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
    ]
  );
}
