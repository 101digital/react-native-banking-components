# `@banking-component/account-linking-component`

OB Link bank account flow

## Features

- Search and select bank
- Allow permissions
- Login OB bank
- Select account to link

## Installation

Open a Terminal in your project's folder and run the command

```sh
yarn add https://gitpkg.now.sh/101digital/react-native-banking-components/packages/account-linking-component
```

- Installed [@banking-component/core](/packages/core)
- Installed [react-native-theme-component](https://github.com/101digital/react-native-theme-component.git)
- Installed [react-native-webview](https://github.com/react-native-webview/react-native-webview)

If have any issue while installing, can see [Issue While Installing Sub-Component](https://github.com/101digital/react-native-banking-components/blob/master/README.md)

## Quick Start

- `AccountLinkingService` is initiated should be from `App.ts`

```javascript
import { AccountLinkingService } from '@banking-component/account-linking-component';

AccountLinkingService.instance().initClients({
  openBankAispClient: createAuthorizedApiClient(openBankAisp), // Your Axios authorized client with Open Bank Aisp Url
  openBankAuthClient: createAuthorizedApiClient(openBankAuth), // Your Axios authorized client Open Bank Auth Url
});
```

- Wrapped the app with `AccountLinkingProvider`

```javascript
import { AccountLinkingProvider } from '@banking-component/transaction-component';

const App = () => {
  return (
    <View>
      <AccountLinkingProvider>
        {/* YOUR APP COMPONENTS */}
      </AccountLinkingProvider>
    </View>
  );
};

export default App;
```

### Assets And Multiple Languages

- All icons, images and texts are provided by default. You can use your custom by passing them as a props inside each component

- In order to do multiple languages, you need to pass `i18n` (`i18n` should be configurated in the app level) into `ConsentComponent`, `LinkBankComponent`, `SelectBankComponent`, as a root props. And then, you have to copy and paste all attributes of `consent_component`, `link_bank_component`, `select_bank_component` in [texts](account-linking-component-data.json) into your app locale file. You can also change text value, but DON'T change the key.

- Example

```javascript
const TestScreen = () => {
  return (
    <View>
      <ConsentComponent
        Root={{
          props: {
            i18n: i18n,
          },
        }}
      />
      <LinkBankComponent
        Root={{
          props: {
            i18n: i18n,
          },
        }}
      />
      <SelectBankComponent
        Root={{
          props: {
            i18n: i18n,
          },
        }}
      />
    </View>
  );
};

export default TestScreen;
```

## API Reference

### AccountLinkingService

Manage open bank services connect to BE. First of all, you need init `AccountLinkingService` soon, should be from `App.ts`

List of functions:

- `getBanks(searchText?: string)`: get all banks or search bank by keyword
- `requestConsent(bankId: string)`: get consent data by bankId
- `confirmConsent(bankId: string, accountRequestId: string, consentCode: string)`: confirm consent data after login
- `fetchBankAccounts(consentId: string)`: fetch bank accounts by consentId

### AccountLinkingContext

```javascript
export interface AccountLinkingContextData {
  banks: Bank[]; // all banks
  bankImages: BankImagesMap; // bank images with bank code
  isLoadingBanks: boolean;
  errorLoadBanks?: Error;
  getBanks: () => void;
  getConsent: (bankId: string) => void;
  isLoadingConsent: boolean;
  errorLoadConsent?: Error;
  consentData?: BankingConsentData;
  clearConsentData: () => void;
  confirmConsent: (
    bankId: string,
    accountRequestId: string,
    code: string
  ) => Promise<string | undefined>;
  isConfirmingConsent: boolean;
  errorConfirmConsent?: Error;
  isLoadingAccounts: boolean;
  accounts: BankAccount[];
  getAccounts: (consentId: string) => void;
  errorLoadAccounts?: Error;
  clearBankErrors: () => void;
  clearAccounts: () => void;
}
```

### SelectBankComponent

Select bank to login

- Props, styles and component can be found [here](./src/select-bank/types.ts)

- Example

```javascript
import { SelectBankComponent } from '@banking-component/account-linking';

const SelectBankScreen = ({ navigation }: SelectBankScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <SelectBankComponent
        SearchBar={{
          components: {
            leftIcon: (
              <Box marginRight="s" marginLeft="sm">
                <SearchSvg width={15} height={15} />
              </Box>
            ),
          },
        }}
        BankItem={{
          props: {
            onPressedBank: (bank) =>
              navigation.navigate(Route.CONSENT, { bank }),
          },
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default SelectBankScreen;
```

### BankLoginComponent

Login bank and get consent code

- Props, styles and component can be found [here](./src/bank-login/types.ts)

- Example

```javascript
import {
  BankLoginComponent,
  AccountLinkingContext,
} from '@banking-component/account-linking';
import { Bank } from '@banking-component/core';
import { AlertModal } from 'react-native-theme-component';

export type BankLoginParams = {
  bank: Bank,
};

const BankLoginScreen = ({ route, navigation }: BankLoginScreenProps) => {
  const { bank } = route.params;
  const { errorConfirmConsent, errorLoadConsent, clearBankErrors } = useContext(
    AccountLinkingContext
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <BankLoginComponent
          bank={bank}
          onConfirmed={(consentId) =>
            navigation.replace(Route.LINK_BANK_ACCOUNT, { bank, consentId })
          }
        />
      </SafeAreaView>
      <AlertModal
        isVisible={!isEmpty(errorLoadConsent?.toString())}
        title={i18n.t('common.lbl_oop')}
        leftIcon={<FailedSvg width={18} height={18} fill="red" />}
        onClose={clearBankErrors}
        onConfirmed={clearBankErrors}
        message={errorLoadConsent?.toString()}
      />
      <AlertModal
        isVisible={!isEmpty(errorConfirmConsent?.toString())}
        title={i18n.t('common.lbl_oop')}
        leftIcon={<FailedSvg width={18} height={18} fill="red" />}
        onClose={clearBankErrors}
        onConfirmed={clearBankErrors}
        message={errorConfirmConsent?.toString()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default BankLoginScreen;
```

### ConsentComponent

Allow permission to access bank data

- Props, styles and component can be found [here](./src/consent/types.ts)

- Example

```javascript
import { ConsentComponent } from '@banking-component/account-linking';
import { Bank } from '@banking-component/core';

export type ConsentScreenParams = {
  bank: Bank,
};

const ConsentScreen = ({ navigation, route }: ConsentScreenProps) => {
  const { bank } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <ConsentComponent
        Root={{
          props: {
            bank: bank,
            onContinue: () => navigation.navigate(Route.BANK_LOGIN, { bank }),
          },
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default ConsentScreen;
```

### LinkBankComponent

Select an account and link

- Props, styles and component can be found [here](./src/link-bank/types.ts)

- Example

```javascript
import { AlertModal } from 'react-native-theme-component';
import {
  AccountLinkingContext,
  LinkBankComponent,
} from '@banking-component/account-linking';
import { Bank } from '@banking-component/core';
import { WalletContext } from '@banking-component/wallet-component';

export type LinkBankAccountScreenParams = {
  bank: Bank,
  consentId: string,
};

const LinkBankAccountScreen = ({
  route,
  navigation,
}: LinkBankAccountScreenProps) => {
  const { bank, consentId } = route.params;
  const { isLinkingWallet, linkWallet } = useContext(WalletContext);
  const { errorLoadAccounts, clearBankErrors } = useContext(
    AccountLinkingContext
  );

  useEffect(() => {
    Keyboard.dismiss();
  }, [consentId]);

  useEffect(() => {
    if (isLinkingWallet) {
      navigation.navigate(Route.ACCOUNTS_TAB); // navigate back to account scrren
    }
  }, [isLinkingWallet]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <LinkBankComponent
          Root={{
            props: {
              bank: bank,
              consentId: consentId,
              onLinkAccount: linkWallet,
            },
          }}
        />
      </SafeAreaView>
      <AlertModal
        isVisible={!isEmpty(errorLoadAccounts?.toString())}
        title={i18n.t('common.lbl_oop')}
        onConfirmed={clearBankErrors}
        leftIcon={<FailedSvg width={18} height={18} fill="red" />}
        onClose={clearBankErrors}
        message={errorLoadAccounts?.toString()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default LinkBankAccountScreen;
```
