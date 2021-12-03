import { AccountConsent } from '@banking-component/core';
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type DataSharingListComponentProps = {
  style?: DataSharingListComponentStyles;
};

export type DataSharingListComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  loadingContainerStyle?: StyleProp<ViewStyle>;
  sectionContainerStyle?: StyleProp<ViewStyle>;
  sectionTitleStyle?: StyleProp<TextStyle>;
  listContainerStyle?: StyleProp<ViewStyle>;
  listDividerStyle?: StyleProp<ViewStyle>;
  itemContainerStyle?: StyleProp<ViewStyle>;
  imageContainerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  itemContentContainerStyle?: StyleProp<ViewStyle>;
  itemTitleStyle?: StyleProp<TextStyle>;
  itemPeriodStyle?: StyleProp<TextStyle>;
};

export type DataSharingDetailComponentProps = {
  accountConsent: AccountConsent;
};

export type DataSharingDetailComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
};
