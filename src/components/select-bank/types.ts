import { ReactNode } from 'react';
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Bank } from '../../types';

export type SelectBankComponentProps = {
  Root?: {
    style?: SelectBankComponentStyles;
    props?: {
      headingLabel?: string;
      numberColumns?: number;
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
