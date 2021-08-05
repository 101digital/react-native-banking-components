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

To get more details about how to install private repository, can found here: [https://nts.strzibny.name/using-private-github-repositories-with-yarn-and-npm-in-package-json/]

This lib also required some dependencies. Ignore any dependency if it already existed in your project.

- ThemeComponent: Using for base theme styles [https://github.com/101digital/react-native-theme-component]

- React native snap carousel: Using to make card swipe in Transaction component [https://github.com/meliorence/react-native-snap-carousel]

- Moment: Using to format date time [https://github.com/moment/moment]

- React native web view: Login OB bank [https://github.com/react-native-webview/react-native-webview]

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

| Type       | Name & Description                                                                                                                                      |
| :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| styles     | `containerStyle`: styles of main component <br/> `listContainerStyle`: style of list wallets <br/> `listDivider`: styles of divider between wallet item |
| props      | `formatCurrency`: this is <b>required</b> using to format wallet balance                                                                                |
| components | are neat                                                                                                                                                |

### Add component to the config.json file manually

1. Make sure you synced latest local data in `bank-component.json` into `bank-component.json`[https://github.com/101digital/components-data/blob/main/data/bank-component.json]

2. Add the bank-component to `components` tags and replate `[data]` with your values.
   The bank-component have `componentId` is "fc1456e9-5a30-4d02-bed5-8fc3a3367ab3" and it can't be changed.

```
{
...
 "components": [
    {
      "componentId": "fc1456e9-5a30-4d02-bed5-8fc3a3367ab3",
      "name": "BankingService",
      "isRequired": false,
      "config": {
        "walletClient": [data],
        "openBankAispClient": [data],
        "openBankAuthClient": [data]
      }
    }
  ]
...
}
```

3. Check required dependencies of bank-component inside tag `dependencies` in `config.json`. Make sure tag `dependencies` must have enough below data

```
{
...
 "dependencies": [
    { "name": "https://github.com/101digital/react-native-theme-component.git" },
    {
      "name": "react-native-snap-carousel",
      "version": "^3.9.1",
      "typescript": {
        "name": "@types/react-native-snap-carousel",
        "version": "^3.8.3"
      }
    },
    {
      "name": "moment"
    },
    { "name": "react-native-webview", "version": "^10.8.3" }
  ]
...
}
```

If have any item is not existing in `dependencies` of `config.json` file, please find missing one from `src/component.json` and put it to `dependencies`.

4. Place the child component with one template to the Screen

- Example, if you want place `AccountComponent` to `WalletScreen` with `templateId` is "9decef3a-ea46-4f5c-a43b-c3c7e12d46cb". Then if user trigger `onPressViewTransactions` button, and you wanna navigate to `TransactionScreen`

Note that: `templateId` is one of template defined in `src/component.json`. `TransactionScreen` is existing with `route` name is `transaction-screen`

```
{
  ...
  "screens": [
     {
      "screenName": "WalletScreen",
      "route": "wallet-screen",
      "stack": "main-navigator",
      "screenParams": [],
      "components": [
        {
          "componentId": "fc1456e9-5a30-4d02-bed5-8fc3a3367ab3",
          "templateId": "9decef3a-ea46-4f5c-a43b-c3c7e12d46cb",
          "componentName": "AccountComponent",
          "functions": [
            {
              "id": "457fcfb9-5352-46f6-9d2c-e8735b76c2de",
              "name": "onPressViewTransactions",
              "action": {
                "type": "openScreen",
                "route": "transaction-screen"
              }
            }
          ]
        }
      ]
    },
  ]
  ...
}
```
