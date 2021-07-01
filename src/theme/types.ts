import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type BankingButtonStyleProps = {
  primaryContainer?: StyleProp<ViewStyle>;
  secondaryContainer?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  secondLabelStyle?: StyleProp<TextStyle>;
  loadingContainer?: StyleProp<ViewStyle>;
  disableOpacity?: number;
  loadingIndicator?: ReactNode;
  indicatorColor?: string;
};

export type BankingFontProps = {
  regular?: string;
  medium?: string;
  bold?: string;
  semiBold?: string;
};

export type BankingAlertModalStyleProps = {
  modalStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  bodyStyle?: StyleProp<ViewStyle>;
  messageStyle?: StyleProp<TextStyle>;
  footerStyle?: StyleProp<ViewStyle>;
  backdropOpacity?: number;
  leftIconStyle?: StyleProp<ViewStyle>;
  closeButtonStyle?: StyleProp<ViewStyle>;
  horizontalSpace?: number;
};

export type BankingThemeProps = {
  primaryColor: string;
  textColor: string;
  secondTextColor?: string;
  buttonTheme: BankingButtonStyleProps;
  fonts: BankingFontProps;
  alertTheme: BankingAlertModalStyleProps;
};

export type EmptyWalletThemeProps = {
  style?: NoWalletThemeStyles;
  props: {
    message?: string;
    buttonLabel?: string;
    onLinkAccountPressed?: () => void;
  };
  components?: {
    placeholderIcon?: ReactNode;
    leftIcon?: ReactNode;
  };
};

export type NoWalletThemeStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
};
