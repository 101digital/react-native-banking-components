# 101D Banking Component

<b>101D Banking Component</b> has 3 Sub-Components

- Wallet Component: manage wallets, change default wallet and unlink a wallet
- Transactions Component: manage the transaction of individual wallets and aggregated wallets
- OB Account Linking Component: contain steps to link a new account to user's wallets

With high UI customizable, you can change the component's style to your styles or override these components.

## Sub-Component Version

| Name                                                                                |                Latest Version                 |
| ----------------------------------------------------------------------------------- | :-------------------------------------------: |
| [@banking-component/core](/packages/core)                                           |           [v1.1.6](/packages/core)            |
| [@banking-component/wallet-component](/packages/wallet-component)                   |     [v1.1.9](/packages/wallet-component)      |
| [@banking-component/transaction-component](/packages/transaction-component)         |   [v1.1.6](/packages/transaction-component)   |
| [@banking-component/account-linking-component](/packages/account-linking-component) | [v1.1.9](/packages/account-linking-component) |

## Issue While Installing Sub-Component

Because the components aren't publish into NPM, so we are using [GitPkg](https://gitpkg.vercel.app) to install sub-component by using `yarn` or `npm install`. After you run installing successfully but can't see version's sub-component is latest, you can run this command in root project

```sh
rm -rf yarn.lock && yarn cache clean && yarn
```

If have error while running `yarn` (like "sha512" or "sha1") you should restart your IDE then re-run above command
