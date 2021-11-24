import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Bank, BankAccount } from '@banking-component/core';

export type LinkBankComponentProps = {
  Root: {
    style?: LinkBankComponentStyles;
    props: {
      i18n?: any;
      headingLabel?: string;
      bank: Bank;
      consentId: string;
      ctaButtonLabel?: string;
      onLinkAccount?: (
        bankId: string,
        consentId: string,
        accountIds: string[]
      ) => void;
      isLinkingAccount?: boolean;
    };
    components?: {
      loadingIndicator?: ReactNode;
      renderHeading?: () => React.ReactElement | null;
    };
  };
  EmptyAccount?: {
    style?: EmptyBankAccountStyles;
    props?: {
      messageLabel?: string;
    };
    components?: {
      placeholderIcon?: ReactNode;
    };
  };
  AccountItem?: {
    style?: AccountItemComponentStyles;
    component?: {
      tickIcon?: ReactNode;
      renderItem?: (
        index: number,
        account: BankAccount,
        isSelected: boolean
      ) => React.ReactElement | null;
    };
  };
  AccessInfomation?: {
    style?: AccessInfoComponentStyles;
    props?: {
      titleLabel?: string;
      data?: string[];
    };
    components?: {
      renderContent?: () => React.ReactElement | null;
    };
  };
};

export type LinkBankComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  headingTextStyle?: StyleProp<TextStyle>;
  ctaButtonWrapper?: StyleProp<ViewStyle>;
  listStyle?: StyleProp<ViewStyle>;
  listContentStyle?: StyleProp<ViewStyle>;
  listDivider?: StyleProp<ViewStyle>;
};

export type EmptyBankAccountStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
};

export type AccountItemComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  activeContainerStyle?: StyleProp<ViewStyle>;
  inactiveContainerStyle?: StyleProp<ViewStyle>;
  accountNameTextStyle?: StyleProp<TextStyle>;
  accountIdTextStyle?: StyleProp<TextStyle>;
};

export type AccessInfoComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  dotContainerStyle?: StyleProp<ViewStyle>;
  contentTextStyle?: StyleProp<TextStyle>;
  itemContentContainerStyle?: StyleProp<ViewStyle>;
};


