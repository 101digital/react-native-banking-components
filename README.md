# react-native-banking-components

<b>react-native-banking-component</b> is a set of components implement banking flow that designed by 101 Digital. There are 3 main components:

- Account: manage wallets, change default wallet and unlink a wallet `AccountComponent`
- Transactions: manage the transaction of individual wallets and aggregated wallets `TransactionComponent`
- OB account linking : contain steps to link a new account to user's wallets (`SelectBankComponent`, `ConsentComponent`, `BankLoginComponent`, `LinkBankComponent`)

With high UI customizable, you can change the component's style to your styles or override these components.

## Features

- Provide all functions to work with `wallet-service`, `banking-auth-service`, `banking-aisp-service`.
- Access to wallets data, transactions data, and banking data (contain loading state, error state) from wherever in React native app.
- Customize component's styles
- Customize component's props
- Provide Callback function to the app

## Installation

To add these components to React Native app, run this command:

```
yarn add git+ssh://git@github.com/101digital/react-native-banking-components.git
```

Make sure you have permission to access this repository

This lib also required some dependencies. Ignore any dependency if it already existed in your project.

- Lodash: Using to deep merge styles

```
yarn add lodash
```

- React native snap carousel: Using to make card swipe in Transaction component

```
yarn add react-native-snap-carousel
```

- Moment: Using to format date time

```
yarn add moment
```

- React native modal: Smooth transaction for modal

```
yarn add react-native-modal
```

- React native svg: render svg element

```
yarn add react-native-svg
```

- React native web view: Login OB bank

```
yarn add react-native-webview
```

We're done! Now you can run your project.

## Quick start

### Initial component

Since <b>react-native-banking-components</b> have funtions to connect with API, we have to init `BankingService` with app's client before using. Also, wrap your app with `BankComponentProvider` to connect to Context API

1. Import react-native-banking-components

```javascript
import { BankComponentProvider, BankingService } from 'react-native-banking-components';
```

2. Init `BankingService`

```javascript
BankingService.getInstance().initClients({
  walletClient: appWalletApiClient,
  openBankAispClient: appBankAispApiClient,
  openBankAuthClient: appBankAuthClient,
});
```

3. Wrap with `BankComponentProvider` and init themes.

```javascript
const App = () => {
  return (
    <View>
      <BankComponentProvider
        theme={{
          primaryColor: appPrimaryColor, // default is #0073F0
          textColor: appPrimaryTextColor, // default is black
          secondTextColor: appSecondTextColor, // default is #0D2050
          fonts: {
            regular: appFontRegular, // default is system
            medium: appFontMedium, // default is system
            bold: appFontBold, // default is system
            semiBold: appFontSemiBold, // default is system
          },
        }}
      >
        {/* YOUR APP COMPONENTS */}
      </BankComponentProvider>
    </View>
  );
};

export default App;
```

### Access to Context data and function

This component provides 3 main contexts: `WalletContext`, `TransactionContext` and `BankContext`

To access to data, error and function from these contexts, you can use `useContext` inside a React Component.

```javascript
import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native'
import { WalletContext } from 'react-native-banking-components';

const AccountScreen = () => {
  const { wallets, fetchWallets } = useContext(WalletContext);

  useEffect(() => {
    fetchWallets();
  }, [])

  return (
  <View>
    <Text>{wallets.length}<Text>
  </View>
  );
};
```

### Use component inside screen

You can place components as a React Node inside your React Native screen. All styles, props are provided by default, you can customize them also. There are some required props, you need provide them if components request

Styles, props, components you can find them in API reference

```javascript
import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { currencyFormatter } from '@/helpers/currency-formatter';
import { AccountComponent } from 'react-native-banking-components';

const AccountScreen = () => {
  return (
    <View styles={styles.container}>
      {/* Your component */}
      <AccountComponent
        Root={{
          props: {
            formatCurrency: currencyFormatter,
          },
        }}
      />
      {/* Your component */}
    </View>
  );
};
```

## API reference

### `AccountComponent`

- Root

| Type  | Name & Description  |
| :------------ |:---------------|
| styles     | `containerStyle`: styles of main component <br/> `listContainerStyle`: style of list wallets <br/> `listDivider`: styles of divider between wallet item|
| props| `formatCurrency`: this is <b>required</b> using to format wallet balance         | 
| components| are neat        |

















