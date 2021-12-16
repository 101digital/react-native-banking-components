import { ReactNode } from 'react';
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Bank } from '@banking-component/core';

export type SelectBankComponentProps = {
  Root?: {
    style?: SelectBankComponentStyles;
    props?: {
      i18n?: any;
      headingLabel?: string;
      numberColumns?: number;
      onViewGuide?: () => void
    };
    components?: {
      renderHeading?: () => React.ReactElement | null;
    };
  };
  SearchBar?: {
    style?: SearchBarComponentStyles;
    props?: {
      placeholder?: string;
    };
    components?: {
      leftIcon?: ReactNode;
      rightIcon?: ReactNode;
    };
  };
  BankItem?: {
    style?: BankItemComponentStyles;
    props?: {
      onPressedBank?: (bank: Bank) => void;
    };
    components?: {
      renderItem?: (index: number, item: Bank) => React.ReactElement | null;
    };
  };
};

export type SelectBankComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  headingTextStyle?: StyleProp<TextStyle>;
  columWrapperStyle?: StyleProp<ViewStyle>;
  listStyle?: StyleProp<ViewStyle>;
  listContentStyle?: StyleProp<ViewStyle>;
  listDivider?: StyleProp<ViewStyle>;
  linkAccountTextStyle?: StyleProp<TextStyle>
  viewGuideButtonStyle?: StyleProp<TextStyle>
};

export type SearchBarComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
};

export type BankItemComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  bankImageStyle?: StyleProp<ImageStyle>;
  bankNameTextStyle?: StyleProp<TextStyle>;
};
