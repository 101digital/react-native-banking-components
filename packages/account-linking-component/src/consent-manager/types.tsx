import { AccountConsent } from '@banking-component/core';
import { ImageStyle, StyleProp, ViewStyle } from 'react-native';

export type DataSharingListComponentProps = {};

export type DataSharingListComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  itemContainerStyle?: StyleProp<ViewStyle>;
  imageContainerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  itemContentContainerStyle?: StyleProp<ViewStyle>;
};

export type DataSharingDetailComponentProps = {
  accountConsent: AccountConsent;
};

export type DataSharingDetailComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
};
