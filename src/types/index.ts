export interface Config {
  baseWalletUrl: string;
  baseBankAuthUrl: string;
  baseBankAispUrl: string;
}

export interface Wallet {
  availableBalance: number;
  currentBalance: number;
  bankAccount: {
    accountId: string;
    accountHolderName: string;
    accountNumber: string;
    bankCode: string;
    currencyCode: string;
    bankBranchId: string;
  };
  currencyCode: string;
  walletName: string;
  type: string;
  walletId: string;
  isDefaultWallet: boolean;
  isAggregated?: boolean;
}

export interface WalletSummary {
  availableBalance: number;
  currentBalance: number;
  minimumBalance: number;
  totalMoneyIn: number;
  totalMoneyOut: number;
}

export interface Bank {
  name: string;
  id: string;
  imageUrl: string;
  isLinked: boolean;
}

export interface Paging {
  totalRecords: number;
  pageSize: number;
  pageNumber: number;
}

export interface TransactionSummary {
  totalMoneyIn: number;
  totalMoneyOut: number;
}

export interface Transaction {
  txnId: string;
  txnType: string;
  txnDateTime: string;
  description: string;
  creditDebitIndicator: string;
  amount: {
    amount: number;
    currency: string;
  };
  destinationAccount: {
    walletId?: string;
  };
  sourceAccount: {
    walletId?: string;
  };
}

export interface WalletTransaction {
  walletId: string;
  paging: Paging;
  data: Transaction[];
  summary: TransactionSummary;
}

export interface GroupedWallet {
  section: string;
  data: Wallet[];
}

export type GroupedWallets = Array<GroupedWallet>;

export interface GroupedTransaction {
  section: string;
  data: Transaction[];
}

export type GroupedTransactions = Array<GroupedTransaction>;

export enum CreditDebitIndicator {
  Credit = 'Credit',
  Debit = 'Debit',
}

export enum WalletType {
  BankWallet = 'BANK_WALLET',
}

export type BankImagesMap = Record<string, string>;

export interface BankAccount {
  accountId: string;
  nickname: string;
  status: string;
  accountType: string;
  accountSubType: string;
  sortCodeAccountNumber: string;
  servicer: {
    identification: string;
  };
  account: {
    schemeName: string;
    identification: string;
    name: string;
    secondaryIdentification: string;
  }[];
}

export interface BankingConsentData {
  bankId: string;
  accountConsentId: string;
  accountRequestId: string;
  loginUrl: string;
  redirectUrl: string;
  idToken: string;
}
