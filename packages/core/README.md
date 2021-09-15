# `@banking-component/core`

Core utilities for building banking component

## Features

- Base helper functions
- All object types using for banking component
- `BNoWalletComponent` display placeholder if no wallet linked

## Installation

Open a Terminal in your project's folder and run the command

```sh
yarn add https://gitpkg.now.sh/101digital/react-native-banking-components/packages/core
```

## API References

### BNoWalletComponent

- Props

| Name                 | Description                                              |
| -------------------- | :------------------------------------------------------- |
| message              | Placeholder message, default is `No Bank Account Linked` |
| buttonLabel          | Link bank button label, default is `Link Bank Account`   |
| leftIcon             | Icon of link bank button                                 |
| onLinkAccountPressed | Listen link bank button triggred                         |
| style                | [NoWalletThemeStyles](./src/no-wallet/index.tsx)         |

- Example

```javascript
import { BNoWalletComponent } from '@banking-component/core';
import { View } from 'react-native';

const WalletComponent = () {

  return (
    <View>
      <BNoWalletComponent
        message={'Empty wallets message'}
        buttonLabel={'Add new wallet'}
        onLinkAccountPressed={() => {
           console.log('Ok')
        }}
      />
    </View>
  );
}

export default WalletComponent;
```

### Helper functions

| Name            | Description                                                                                                               |
| --------------- | :------------------------------------------------------------------------------------------------------------------------ |
| defaultsDeep    | Deep merge current Object with Objects                                                                                    |
| isEmpty         | return `true` if Object is `undefined`, `null` or empty values                                                            |
| isNotEmpty      | !`isEmpty`                                                                                                                |
| uniqBy          | invoked for each element in `array` to generate the criterion by which uniqueness is computed                             |
| getUrlParameter | Get query data from key in the URL                                                                                        |
| groupBy         | Group element in array by key                                                                                             |
| chain           | Creates a lodash object that wraps value with explicit method chaining enabled.                                           |
| orderBy         | Sort element in the array by key                                                                                          |
| filter          | Iterates over elements of collection, returning an array of all elements predicate returns truthy for                     |
| union           | Creates an array of unique values, in order, from all of the provided arrays using SameValueZero for equality comparisons |

### Banking Object Types

```javascript
export interface Wallet {
  availableBalance: number;
  currentBalance: number;
  bankAccount: {
    accountId: string;
    accountSubType: string;
    accountHolderName: string;
    accountNumber: string;
    bankCode: string;
    bankLogo?: string;
    bankBranchId?: string;
    countryCode: string;
    internalProductCategory: string;
    productId: string;
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
```
