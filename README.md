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

To add these components to React Native app, install with:

```
yarn add https://github.com/101digital/react-native-banking-components.git
```

This lib also required some dependencies. Ignore any dependency if it already existed in your project.

```
yarn add react-native-snap-carousel
```

```
yarn add lodash
```

```
yarn add moment
```

```
yarn add react-native-modal
```

```
yarn add react-native-svg
```

```
yarn add react-native-webview
```









