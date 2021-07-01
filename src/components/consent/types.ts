import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Bank } from '../../types';

export type ConsentComponentProps = {
  Root: {
    style?: ConsentComponentStyles;
    props: {
      headingLabel?: string;
      ctaButtonLabel?: string;
      bank: Bank;
      onContinue: () => void;
    };
  };
  ShareContent?: {
    style?: ShareContentComponentStyles;
    props?: {
      titleLabel?: string;
      contents?: string[];
    };
  };
  Permission?: {
    style?: PermissionComponentStyles;
    props?: {
      message?: string;
    };
    components?: {
      leftIcon?: ReactNode;
    };
  };
};

export type ConsentComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  headingTextStyle?: StyleProp<TextStyle>;
  ctaButtonWrapper?: StyleProp<ViewStyle>;
};

export type ShareContentComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  dotContainerStyle?: StyleProp<ViewStyle>;
  contentTextStyle?: StyleProp<TextStyle>;
  itemContentContainerStyle?: StyleProp<ViewStyle>;
};

export type PermissionComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
};
