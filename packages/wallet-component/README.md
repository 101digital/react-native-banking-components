# `@banking-component/wallet-component`

Manage wallets

## Features

- Managa wallets linked to account
- Display total balance
- Change primary wallet
- Unlink a wallet

## Installation

Open a Terminal in your project's folder and run the command

```sh
yarn add https://gitpkg.now.sh/101digital/react-native-banking-components/packages/wallet-component
```

If have any issue while installing, can see [Issue While Installing Sub-Component](https://github.com/101digital/react-native-banking-components/blob/master/README.md)

## Quick Start

- Installed [@banking-component/core](/packages/core)
- Installed [react-native-theme-component](https://github.com/101digital/react-native-theme-component.git)
- `WalletService` is initiated should be from `App.ts`

```javascript
import { WalletService } from '@banking-component/wallet-component';

WalletService.instance().initClients({
  walletClient: createAuthorizedApiClient(wallet),
});
```

- Wrapped the app with `WalletProvider`

```javascript
import { WalletProvider } from '@banking-component/wallet-component';

const App = () => {
  return (
    <View>
      <WalletProvider>{/* YOUR APP COMPONENTS */}</WalletProvider>
    </View>
  );
};

export default App;
```

## API Reference

### WalletService

Manage wallet services connect to BE. First of all, you need init `WalletService` soon, should be from `App.ts`

- `getWallets()`: Get all wallets linked to user's account
- `getWalletDetails(walletId: string)`: Get wallet details by `walletId`
- `linkBankAccount(bankId: string, accountId: string, consentId: string)`:Link an account into current wallets
- `unlinkBankWallet(walletId: string)`: Remove wallet by `walletId`
- `setDefaultWallet(walletId: string, isDefaultWallet: bool)`: Set a wallet with `walletId` is primary account or not. If `isDefaultWallet` is `true`, wallet will be set as primary. If `isDefaultWallet` is `false` wallet will set as normal account

### WalletContext

Manage state of wallets.
To access to data, error and function from these contexts, you can use `useContext` inside a React Component

```javascript
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
```

### WalletComponent

- Props, styles and component can be found [here](./src/types.ts)

- Example

```javascript
import { currencyFormatter } from '@/helpers/currency-formatter';
import {
  WalletComponent,
  WalletContext,
  WalletComponentRefs,
} from '@banking-component/wallet-component';
import { AlertModal } from 'react-native-theme-component';
import { ProductContext, RecommandBannerComponent } from 'product-comparison-component';
import { AccountLinkingContext } from '@banking-component/account-linking';

const AccountsScreen = (props: AccountScreenProps) => {
  const { navigation } = props;
  const { wallets, errorUnlinkWallet, errorUpdatePrimary, clearWalletErrors, errorLinkWallet } =
    useContext(WalletContext);
  const { scrollHandler, headerTitleOpacity, navigationBarOpacity } = useCollapsibleHeaderHandler();
  const accountRef = useRef<WalletComponentRefs>();
  const { comparisons } = useContext(ProductContext);
  const { bankImages } = useContext(AccountLinkingContext);

  useEffect(() => {
    if (!isEmpty(comparisons)) {
      for (var c of comparisons) {
        const _wallet = wallets.find((w) => w.walletId === c.walletId);
        if (_wallet) {
          accountRef?.current?.showRecommandBanner(_wallet);
        }
      }
    }
  }, [comparisons.length]);

  const handleAddBankAccountPressed = () => {
    navigation.navigate(Route.SELECT_BANK);
  };

  return (
    <>
      <View style={styles.container}>
        <NavigationBar
          title={i18n.t('account.nav_account')}
          style={{ opacity: navigationBarOpacity }}
        />
        <SafeAreaView style={styles.container}>
          <WalletComponent
            ref={accountRef}
            Root={{
              props: {
                formatCurrency: currencyFormatter,
                scrollHandler: scrollHandler,
                bankImages: bankImages,
              },
              components: {
                headerTitle: (
                  <Animated.View style={{ opacity: headerTitleOpacity }}>
                    <Text variant="h1" ml="m">
                      {i18n.t('account.lbl_my_account')}
                    </Text>
                  </Animated.View>
                ),
              },
            }}
            Balance={{
              style: {
                titleTextStyle: {
                  color: '#4DA0F5',
                },
                amountTextStyle: {
                  fontSize: 35,
                  lineHeight: 53,
                },
              },
            }}
            WalletItem={{
              props: {
                onItemPressed: (wallet) => {
                  accountRef?.current?.showActionsSheet(wallet);
                },
              },
              components: {
                recommandBanner: (wallet) => (
                  <RecommandBannerComponent
                    walletId={wallet.walletId}
                    formatCurrency={(amount) => currencyFormatter(amount, wallet.currencyCode)}
                    onTakeLook={() =>
                      navigation.navigate(Route.SWITCH_AND_SAVE, {
                        walletId: wallet.walletId,
                      })
                    }
                  />
                ),
              },
            }}
            LinkAccountButton={{
              props: {
                onLinkAccountPressed: handleAddBankAccountPressed,
              },
            }}
            EmptyWallet={{
              props: {
                onLinkAccountPressed: handleAddBankAccountPressed,
              },
            }}
            ActionSheet={{
              props: {
                onSetPrimaryPress: (wallet) => {
                  accountRef?.current?.setAsPrimary(wallet);
                },
                onUnlinkPress: (wallet) => {
                  accountRef?.current?.unlinkWallet(wallet);
                },
                onPressViewTransactions: (wallet) => {
                  navigation.navigate(Route.TRANSACTIONS_TAB, { wallet });
                },
              },
            }}
          />
        </SafeAreaView>
      </View>
      <AlertModal
        isVisible={!isEmpty(errorUnlinkWallet?.toString())}
        title={i18n.t('common.lbl_oop')}
        leftIcon={<FailedSvg width={18} height={18} fill="red" />}
        onClose={clearWalletErrors}
        onConfirmed={clearWalletErrors}
        message={errorUnlinkWallet?.toString()}
      />
      <AlertModal
        isVisible={!isEmpty(errorUpdatePrimary?.toString())}
        title={i18n.t('common.lbl_oop')}
        leftIcon={<FailedSvg width={18} height={18} fill="red" />}
        onClose={clearWalletErrors}
        onConfirmed={clearWalletErrors}
        message={errorUpdatePrimary?.toString()}
      />

      <AlertModal
        isVisible={!isEmpty(errorLinkWallet?.toString())}
        title={i18n.t('common.lbl_oop')}
        leftIcon={<FailedSvg width={18} height={18} fill="red" />}
        onClose={clearWalletErrors}
        onConfirmed={clearWalletErrors}
        message={'Account linking was unsuccessful, please try again'}
      />
    </>
  );
};

export default AccountsScreen;

```
