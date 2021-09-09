import { EmptyWalletThemeProps } from 'lib/components/no-wallet';
import { Wallet } from '@banking-component/core';
import { ReactNode } from 'react';
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type AccountComponentRefs = {
  showActionsSheet: (wallet: Wallet) => void;
  unlinkWallet: (wallet: Wallet) => void;
  setAsPrimary: (wallet: Wallet) => void;
  showRecommandBanner: (wallet: Wallet) => void;
  hideActionSheet: () => void;
};

export type AccountComponentProps = {
  Root: {
    style?: AccountComponentStyle;
    props: {
      formatCurrency: (amount: number, code: string) => string;
      scrollHandler?: {
        onScroll: (...args: any[]) => void;
        scrollEventThrottle: number;
      };
    };
    components?: {
      loadingIndicator?: ReactNode;
      headerTitle?: ReactNode;
    };
  };
  Balance?: {
    style?: BalanceStyle;
    props?: {
      totalBalanceLabel?: string;
    };
    components?: {
      rightIcon?: ReactNode;
    };
  };
  WalletItem?: {
    style?: WalletItemStyle;
    props?: {
      onItemPressed?: (wallet: Wallet) => void;
      primaryLabel?: string;
      bannerStartOffset?: number;
      bannerEndOffset?: number;
    };
    components?: {
      tickIcon?: ReactNode;
      moreIcon?: ReactNode;
      recommandBanner?: (wallet: Wallet) => ReactNode;
      renderItem?: (index: number, item: Wallet) => React.ReactElement | null;
    };
  };
  Section?: {
    style?: AccountSectionStyle;
    components?: {
      renderSection: (title: string) => React.ReactElement | null;
    };
  };
  ActionSheet?: {
    style?: ActionSheetStyle;
    props?: {
      setPrimaryLabel?: string;
      unlinkLabel?: string;
      viewTransactionLabel?: string;
      cancelLabel?: string;
      onSetPrimaryPress?: (wallet: Wallet) => void;
      onUnlinkPress?: (wallet: Wallet) => void;
      onPressViewTransactions?: (wallet: Wallet) => void;
    };
    components?: {
      setPrimaryIcon?: ReactNode;
      unlinkIcon?: ReactNode;
      viewTransactionIcon?: ReactNode;
      cancelIcon?: ReactNode;
    };
  };
  LinkAccountButton?: {
    style?: LinkAccountStyle;
    props?: {
      onLinkAccountPressed?: () => void;
      buttonLabel?: string;
    };
    components?: {
      addIcon?: ReactNode;
    };
  };
  ConfirmUnlinkModal?: {
    props?: {
      disable?: boolean;
      title?: string;
      message?: string;
      cancelButtonLabel?: string;
      confirmButonLabel?: string;
    };
    components?: {
      leftIcon?: ReactNode;
    };
  };
  ConfirmSetPrimaryModal?: {
    props?: {
      disable?: boolean;
      title?: string;
      message?: string;
      cancelButtonLabel?: string;
      confirmButonLabel?: string;
    };
    components?: {
      leftIcon?: ReactNode;
    };
  };
  LinkAccountSuccessModal?: {
    style?: SetPrimaryComponentStyle;
    props?: {
      disable?: boolean;
      title?: string;
      message?: string;
      setPrimaryLabel?: string;
      confirmButonLabel?: string;
    };
    components?: {
      leftIcon?: ReactNode;
      tickIcon?: ReactNode;
      renderSetPrimary?: (
        isSelected: boolean,
        toggleSelect: () => void
      ) => React.ReactElement | null;
    };
  };
  EmptyWallet?: EmptyWalletThemeProps;
};

export type AccountComponentStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  listContainerStyle?: StyleProp<ViewStyle>;
  listDivider?: StyleProp<ViewStyle>;
};

export type BalanceStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  amountTextStyle?: StyleProp<TextStyle>;
};

export type WalletItemStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  imageContainerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  leftContainerStyle?: StyleProp<ViewStyle>;
  rightContainerStyle?: StyleProp<ViewStyle>;
  moreContainerStyle?: StyleProp<ViewStyle>;
  accountNameTextStyle?: StyleProp<TextStyle>;
  accountNumberTextStyle?: StyleProp<TextStyle>;
  amountTextStyle?: StyleProp<TextStyle>;
  primaryContainerStyle?: StyleProp<ViewStyle>;
  primaryTextStyle?: StyleProp<TextStyle>;
};

export type AccountSectionStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  sectionTextStyle?: StyleProp<TextStyle>;
};

export type ActionSheetStyle = {
  modalStyle?: StyleProp<ViewStyle>;
  containerStyles?: StyleProp<ViewStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
  cancelContainerStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  cancelTextStyle?: StyleProp<TextStyle>;
  leftIconContainer?: StyleProp<ViewStyle>;
};

export type LinkAccountStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
};

export type SetPrimaryComponentStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  checkBoxStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
};
