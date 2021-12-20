# 101D Banking Component

<b>101D Banking Component</b> has 4 Sub-Components

- Wallet Component: manage wallets, change default wallet and unlink a wallet
- Transactions Component: manage the transaction of individual wallets and aggregated wallets
- Cashflow Component: manage cashflow of linked wallets
- Account Linking Component: contain steps to link a new account to user's wallets

With high UI customizable, you can change the component's style to your styles or override these components.

## Sub-Component Version

| Name                                                                                                    | Latest Version                                                     |
| ------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| [@banking-component/core](https://github.com/101digital/banking-component-core)                         | [v1.1.17](https://github.com/101digital/banking-component-core)    |
| [@banking-component/wallet-component](https://github.com/101digital/wallet-component)                   | [v1.1.47](https://github.com/101digital/wallet-component)          |
| [@banking-component/transaction-component](https://github.com/101digital/transaction-component)         | [v1.1.17](https://github.com/101digital/transaction-component)     |
| [@banking-component/account-linking-component](https://github.com/101digital/account-linking-component) | [v1.1.52](https://github.com/101digital/account-linking-component) |
| [@banking-component/cashflow-component](https://github.com/101digital/cashflow-component)               | [v1.1.13](https://github.com/101digital/cashflow-component)        |

## Issue While Installing Sub-Component

Because the components aren't publish into NPM, so we are using [GitPkg](https://gitpkg.vercel.app) to install sub-component by using `yarn` or `npm install`. After you run installing successfully but can't see version's sub-component is latest, you can run this command in root project

```sh
rm -rf yarn.lock && yarn cache clean && yarn
```

If have error while running `yarn` (like "sha512" or "sha1") you should restart your IDE then re-run above command

## How to submodule work

https://github.blog/2016-02-01-working-with-submodules/
