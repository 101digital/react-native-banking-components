import { Bank, BankPermission } from '@banking-component/core';
import { ReactNode } from 'react';
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ButtonStyles } from 'react-native-theme-component/src/button';

export type DynamicConsentComponentRefs = {
  goBack: () => void;
  currentStep: () => number;
};
export interface ConsentPeriod {
  period: number;
  type: string;
}

export interface ConsentSummaryItem {
  id: string;
  title: string;
  message?: string;
}

export interface ConsentSummary {
  summaryTitle: string;
  summaryMessage?: string;
  items: ConsentSummaryItem[];
  directUrl?: {
    title: string;
    link: string;
  };
}
export interface DynamicConsent {
  companyName: string;
  cdrPolicyLink: string;
  periods: ConsentPeriod[];
  summaries: ConsentSummary[];
}

export type DynamicConsentComponentProps = {
  stepperComponent?: {
    steps?: string[];
    stepDotSize?: number;
    activeColor?: string;
    inActiveColor?: string;
    activeNumberColor?: string;
    inActiveNumberColor?: string;
    style?: StepperComponentStyles;
  };
  periodComponent: {
    recipientId: string;
    companyName: string;
    periods: ConsentPeriod[];
    activeColor?: string;
    style?: PeriodSelectionComponentStyles;
  };
  permissionSelectionComponent: {
    bank: Bank;
    style?: PermissonSelectionComponentStyles;
  };
  consentSummaryComponent: {
    summaries: ConsentSummary[];
    dateFormat?: string;
    onPressedLink?: (link: string) => void;
    style?: ConsentSummaryComponentStyles;
  };
  authoriseComponent: {
    bank: Bank;
    appIcon: ReactNode;
    style?: AuthoriseComponentStyles;
  };
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
  initialPeriod?: ConsentPeriod;
  recipientId: string;
  companyName: string;
  periods: ConsentPeriod[];
  activeColor?: string;
  onNext: (period: ConsentPeriod) => void;
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
  onNext: () => void;
  permissions: BankPermission[];
  onChanged: (permissions: BankPermission[]) => void;
  style?: PermissonSelectionComponentStyles;
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
  itemConsentPermissionStyle?: ItemConsentPermissionStyles;
};

export type ItemConsentPermissionProps = {
  permission: BankPermission;
  value?: boolean;
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

export type ExpandableItemProps = {
  title: string;
  message: string;
  canExpanded: boolean;
  style?: ExpandableItemStyles;
};

export type ExpandableItemStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  titleContainerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
};

export type ConsentSummaryComponentProps = {
  summaries: ConsentSummary[];
  period: ConsentPeriod;
  dateFormat?: string;
  onPressedLink?: (link: string) => void;
  style?: ConsentSummaryComponentStyles;
  onConsented: () => void;
};

export type ConsentSummaryComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  itemContainerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  directLinkTextStyle?: StyleProp<TextStyle>;
  expandableItemStyle?: ExpandableItemStyles;
  consentButtonStyle?: ButtonStyles;
};

export type AuthoriseComponentProps = {
  bank: Bank;
  appIcon: ReactNode;
  onContinue: () => void;
  style?: AuthoriseComponentStyles;
};

export type AuthoriseComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  mainContainerStyle?: StyleProp<ViewStyle>;
  bankContainerStyle?: StyleProp<ViewStyle>;
  bankItemContainerStyle?: StyleProp<ViewStyle>;
  dividerStyle?: StyleProp<ViewStyle>;
  bankImageStyle?: StyleProp<ImageStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  continueButtonStyle?: ButtonStyles;
};
