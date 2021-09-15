# `@banking-component/wallet-component`

Manage wallets

## Features

- Managa wallets linked to account
- Display total balance
- Change primary account
- Unlink accout

## Installation

Open a Terminal in your project's folder and run the command

```sh
yarn add https://gitpkg.now.sh/101digital/react-native-banking-components/packages/wallet-component
```

If have any issue while installing, can see [Issue While Installing Sub-Component](https://github.com/101digital/react-native-banking-components/blob/master/README.md)

## API Reference

### WalletService

Manage wallet services connect to BE

| Name                 | Description                                              |
| -------------------- | :------------------------------------------------------- |
| message              | Placeholder message, default is `No Bank Account Linked` |
| buttonLabel          | Link bank button label, default is `Link Bank Account`   |
| leftIcon             | Icon of link bank button                                 |
| onLinkAccountPressed | Listen link bank button triggred                         |
| style                | [NoWalletThemeStyles](./src/no-wallet/index.tsx)         |
