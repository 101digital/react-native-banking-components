import React, { useCallback, useMemo, useState } from 'react';
import { WalletService } from '../services/wallet-service';
import {
  GroupedWallets,
  Wallet,
  WalletSummary,
  orderBy,
  isEmpty,
  chain3,
} from '@banking-component/core';

const walletService = WalletService.instance();

export interface WalletContextData {
  wallets: Wallet[];
  isLoadingWallets: boolean;
  isLinkingWallet: boolean;
  linkedWallet?: Wallet;
  summary?: WalletSummary;
  unlinkedWallet?: Wallet;
  isUnlinking: boolean;
  fetchWallets: () => void;
  getGroupWallets: () => GroupedWallets | undefined;
  getDefaultWallet: () => Wallet | undefined;
  getWalletDetail: (walletId?: string) => Wallet | undefined;
  getAggregatedWallets: () => Wallet[];
  deleteWallet: (wallet: Wallet) => void;
  setPrimaryWallet: (walletId: string) => void;
  linkWallet: (bankId: string, accountId: string, consentId: string) => void;
  clearLinkedWallet: () => void;
  clearWalletErrors: () => void;
  clearUnlinkedWallet: () => void;
  errorLoadWallet?: Error;
  errorUnlinkWallet?: Error;
  errorUpdatePrimary?: Error;
  errorLinkWallet?: Error;
  isUpdatingPrimary: boolean;
}

export const walletDefaultValue: WalletContextData = {
  wallets: [],
  isLoadingWallets: false,
  fetchWallets: () => null,
  getGroupWallets: () => undefined,
  getDefaultWallet: () => undefined,
  getWalletDetail: () => undefined,
  getAggregatedWallets: () => [],
  isUnlinking: false,
  deleteWallet: () => null,
  isUpdatingPrimary: false,
  setPrimaryWallet: () => null,
  linkWallet: () => null,
  isLinkingWallet: false,
  clearLinkedWallet: () => null,
  clearWalletErrors: () => null,
  clearUnlinkedWallet: () => null,
};

export const WalletContext =
  React.createContext<WalletContextData>(walletDefaultValue);

export function useWalletContextValue(): WalletContextData {
  const [_wallets, setWallets] = useState<Wallet[]>([]);
  const [_isLoading, setIsLoading] = useState(false);
  const [_summary, setSummary] = useState<WalletSummary | undefined>();
  const [_loadError, setLoadError] = useState<Error | undefined>();
  const [_unlinkError, setUnlinkError] = useState<Error | undefined>();
  const [_isUnlinking, setIsUnlinking] = useState(false);
  const [_isUpdatingPrimary, setIsUpdatingPrimary] = useState(false);
  const [_updatePrimaryError, setUpdatePrimaryError] = useState<
    Error | undefined
  >();
  const [_isLinkingWallet, setIsLinkingWallet] = useState(false);
  const [_linkWalletError, setLinkWalletError] = useState<Error | undefined>();
  const [_linkedWallet, setLinkedWallet] = useState<Wallet | undefined>(
    undefined
  );
  const [_unLinkedWallet, setUnLinkedWallet] = useState<Wallet | undefined>(
    undefined
  );

  const fetchWallets = useCallback(async () => {
    try {
      setIsLoading(true);
      const resp = await walletService.getWallets();
      setWallets(orderBy<Wallet>(resp.data, ['isDefaultWallet'], ['desc']));
      setSummary(resp.summary);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setLoadError(err as Error);
    }
  }, []);

  const setPrimaryWallet = useCallback(async (walletId: string) => {
    try {
      setIsUpdatingPrimary(true);
      await walletService.setDefaultWallet(walletId, true);
      clearLinkedWallet();
      fetchWallets();
      setIsUpdatingPrimary(false);
    } catch (error) {
      setIsUpdatingPrimary(false);
      setUpdatePrimaryError(error as Error);
    }
  }, []);

  const deleteWallet = useCallback(
    async (wallet: Wallet) => {
      try {
        setIsUnlinking(true);
        await walletService.unlinkBankWallet(wallet.walletId);
        const newWallets = [..._wallets];
        const removedWalletIndex = newWallets.findIndex(
          (wallets) => wallets.walletId === wallet.walletId
        );
        if (removedWalletIndex > -1) {
          newWallets.splice(removedWalletIndex, 1);
        }
        setUnLinkedWallet(wallet);
        setWallets(newWallets);
        setIsUnlinking(false);
      } catch (error) {
        setIsUnlinking(false);
        setUnlinkError(error as Error);
      }
    },
    [_wallets]
  );

  const getAggregatedWallets = useCallback(() => {
    if (isEmpty(_wallets)) {
      return [];
    }
    if (_wallets.length === 1) {
      return _wallets;
    }
    const aggregatedWallet: Wallet = {
      walletName: 'All Accounts',
      walletId: _wallets.map((w: Wallet) => w.walletId).join(','),
      availableBalance: _summary?.availableBalance ?? 0,
      currentBalance: _summary?.currentBalance ?? 0,
      isDefaultWallet: false,
      type: _wallets[0].type,
      bankAccount: _wallets[0].bankAccount,
      currencyCode: _wallets[0].currencyCode,
      isAggregated: true,
    };
    return [aggregatedWallet, ..._wallets];
  }, [_wallets, _summary]);

  const getGroupWallets = useCallback(() => {
    const group = chain3(_wallets).groupBy('type').value();
    return Object.keys(group).map((key) => {
      let section;
      switch (key) {
        case 'BANK_WALLET':
          section = 'Bank Accounts';
          break;
        case 'VIRTUAL_WALLET':
          section = 'Wallets';
          break;
        default:
          section = key;
          break;
      }
      return {
        section,
        data: orderBy<Wallet>(group[key], ['isDefaultWallet'], ['desc']),
      };
    });
  }, [_wallets]);

  const getDefaultWallet = useCallback(() => {
    return _wallets.find((wallet) => wallet.isDefaultWallet);
  }, [_wallets]);

  const getWalletDetail = useCallback(
    (walletId?: string) => {
      if (!walletId) {
        return undefined;
      }
      const wallet = _wallets.find(
        (item) => item.walletId.replace(/-/g, '') === walletId.replace(/-/g, '')
      );
      return wallet;
    },
    [_wallets]
  );

  const linkWallet = useCallback(
    async (bankId: string, accountId: string, consentId: string) => {
      try {
        setIsLinkingWallet(true);
        const { data } = await walletService.linkBankAccount(
          bankId,
          accountId,
          consentId
        );
        setLinkedWallet(data);
        setIsLinkingWallet(false);
      } catch (error) {
        setLinkWalletError(error as Error);
        setIsLinkingWallet(false);
      }
    },
    []
  );

  const clearLinkedWallet = useCallback(() => {
    setLinkedWallet(undefined);
  }, []);

  const clearWalletErrors = useCallback(() => {
    setLoadError(undefined);
    setUnlinkError(undefined);
    setUpdatePrimaryError(undefined);
    setLinkWalletError(undefined);
  }, []);

  const clearUnlinkedWallet = useCallback(() => {
    setUnLinkedWallet(undefined);
  }, []);

  return useMemo(
    () => ({
      wallets: _wallets,
      isLoadingWallets: _isLoading,
      fetchWallets,
      summary: _summary,
      errorLoadWallet: _loadError,
      getGroupWallets,
      getDefaultWallet,
      getWalletDetail,
      getAggregatedWallets,
      deleteWallet,
      errorUnlinkWallet: _unlinkError,
      isUnlinking: _isUnlinking,
      isUpdatingPrimary: _isUpdatingPrimary,
      errorUpdatePrimary: _updatePrimaryError,
      setPrimaryWallet,
      linkWallet,
      isLinkingWallet: _isLinkingWallet,
      errorLinkWallet: _linkWalletError,
      clearLinkedWallet,
      linkedWallet: _linkedWallet,
      clearWalletErrors,
      clearUnlinkedWallet,
      unlinkedWallet: _unLinkedWallet,
    }),
    [
      _wallets,
      _isLoading,
      _summary,
      _loadError,
      _unlinkError,
      _isUnlinking,
      _isUpdatingPrimary,
      _updatePrimaryError,
      _isLinkingWallet,
      _linkWalletError,
      _linkedWallet,
      _unLinkedWallet,
    ]
  );
}