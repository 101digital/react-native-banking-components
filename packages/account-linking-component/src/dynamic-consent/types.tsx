import { Bank, BankPermission } from '@banking-component/core';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ButtonStyles } from 'react-native-theme-component/src/button';

export type DynamicConsentComponentProps = {
  bank: Bank;
  companyName: string;
  periods: string[];
  style?: DynamicConsentComponentStyles;
};

export type DynamicConsentComponentStyles = {
  containerStyles?: StyleProp<ViewStyle>;
};

export type StepperComponentProps = {
  activeStep: number;
  steps?: string[];
  stepDotSize?: number;
  activeColor?: string;
  inActiveColor?: string;
  activeNumberColor?: string;
  inActiveNumberColor?: string;
  style?: StepperComponentStyles;
};

export type StepperComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  lineStyle?: StyleProp<ViewStyle>;
  stepContainerStyle?: StyleProp<ViewStyle>;
  stepNumberTextStyle?: StyleProp<TextStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  titleContainerStyle?: StyleProp<ViewStyle>;
  dotContainerStyle?: StyleProp<ViewStyle>;
};

export type PeriodSelectionComponentProps = {
  recipientId: string;
  companyName: string;
  periods: string[];
  activeColor?: string;
  onNext: (period: string) => void;
  style?: PeriodSelectionComponentStyles;
};

export type PeriodSelectionComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  headerTitleStyle?: StyleProp<TextStyle>;
  companyContainerStyle?: StyleProp<ViewStyle>;
  companyContentContainerStyle?: StyleProp<ViewStyle>;
  companyNameStyle?: StyleProp<ViewStyle>;
  companyReciepientStyle?: StyleProp<TextStyle>;
  nextButtonStyle?: ButtonStyles;
  dataAccessTitleStyle?: StyleProp<TextStyle>;
  periodContainerStyle?: StyleProp<ViewStyle>;
  periodTextStyle?: StyleProp<TextStyle>;
  periodListStyle?: StyleProp<ViewStyle>;
  separatorStyle?: StyleProp<ViewStyle>;
};

export type PermissionSelectionComponentProps = {
  bank: Bank;
  style?: PermissonSelectionComponentStyles;
  itemConsentPermissionStyle?: ItemConsentPermissionStyles;
};

export type PermissonSelectionComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  headerTitleStyle?: StyleProp<TextStyle>;
  headerMessageStyle?: StyleProp<TextStyle>;
  permissionListStyle?: StyleProp<ViewStyle>;
  separatorStyle?: StyleProp<ViewStyle>;
  buttonNextStyle?: ButtonStyles;
  permissionContainerStyle?: StyleProp<ViewStyle>;
  permissionHeaderStyle?: StyleProp<ViewStyle>;
  permissionTitleStyle?: StyleProp<TextStyle>;
  permissionShortDesStyle?: StyleProp<TextStyle>;
  buttonViewFullStyle?: StyleProp<ViewStyle>;
  viewFullTextStyle?: StyleProp<TextStyle>;
};

export type ItemConsentPermissionProps = {
  permission: BankPermission;
  onValueChanged: (isSelected: boolean) => void;
  style?: ItemConsentPermissionStyles;
};

export type ItemConsentPermissionStyles = {
  permissionContainerStyle?: StyleProp<ViewStyle>;
  permissionTitleStyle?: StyleProp<TextStyle>;
  permissionShortDesStyle?: StyleProp<TextStyle>;
  permissionDesStyle?: StyleProp<TextStyle>;
  buttonViewFullStyle?: StyleProp<ViewStyle>;
  viewFullTextStyle?: StyleProp<TextStyle>;
  permissionHeaderStyle?: StyleProp<ViewStyle>;
};
