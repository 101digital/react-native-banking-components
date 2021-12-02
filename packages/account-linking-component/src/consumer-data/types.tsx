import { Bank } from '@banking-component/core';
import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ButtonStyles } from 'react-native-theme-component/src/button';

export type ComsumerDataComponentProps = {
  props: {
    itemCDRStyle?: ItemCDRStyles;
    placeHolderImage?: ReactNode;
    cdrData?: CDRData[];
    onLinkPressed: () => void;
    onCDRPolicyPressed: () => void;
  };
  style?: ComsumerDataComponentStyles;
};

export interface CDRData {
  icon: ReactNode;
  title: string;
  description: string;
}

export type ComsumerDataComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  mainContainerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  highlightTitleTextStyle?: StyleProp<TextStyle>;
  buttonCDRPolicyStyle?: StyleProp<ViewStyle>;
  cdrPolicyTextStyle?: StyleProp<TextStyle>;
  linkButtonStyle?: ButtonStyles;
  cdrListContainerStyle?: StyleProp<ViewStyle>;
  placeholderContainerStyle?: StyleProp<ViewStyle>;
  connectorContainerStyle?: StyleProp<ViewStyle>;
  dashlineContainerStyle?: StyleProp<ViewStyle>;
  cdrIconContainerStyle?: StyleProp<ViewStyle>;
};

export type ItemCDRStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  descriptionTextStyle?: StyleProp<TextStyle>;
};
