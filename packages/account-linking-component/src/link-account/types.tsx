import { Bank, BankAccount, BankPermission } from '@banking-component/core';
import { ReactNode } from 'react';
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ButtonStyles } from 'react-native-theme-component/src/button';

export enum ProgressStep {
  accessiblePeriod = 0,
  permissionRequest = 1,
  summaryData = 2,
  confirmLogin = 3,
  loginBank = 4,
  selectAccounts = 5,
  confirmResult = 6,
}

export enum LinkBankStatus {
  isLinking,
  isFailed,
  isSuccess,
}

export type LinkAccountComponentRefs = {
  goBack: () => void;
  currentStep: () => ProgressStep;
  updateLinkBankStatus: (status: LinkBankStatus) => void;
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
  guideLinkAccountLink: string;
  consentPeriods: ConsentPeriod[];
  consentSummaries: ConsentSummary[];
}

export type LinkAccountComponentProps = {
  props: {
    bank: Bank;
    onStepChanged: (step: ProgressStep) => void;
    consentData: DynamicConsent;
    appIcon: ReactNode;
    onLinkAccount: (bankId: string, consentId: string, accountIds: string[]) => void;
  };
  style?: LinkAccountComponentStyles;
  stepperComponent?: {
    steps?: Step[];
    stepDotSize?: number;
    activeColor?: string;
    inActiveColor?: string;
    activeNumberColor?: string;
    inActiveNumberColor?: string;
    style?: StepperComponentStyles;
  };
  periodComponent: {
    activeColor?: string;
    style?: PeriodSelectionComponentStyles;
  };
  permissionSelectionComponent: {
    style?: PermissonSelectionComponentStyles;
  };
  consentSummaryComponent: {
    dateFormat?: string;
    onPressedLink?: (link: string) => void;
    style?: ConsentSummaryComponentStyles;
  };
  authoriseComponent: {
    style?: AuthoriseComponentStyles;
  };
  bankLoginComponent: {
    loadingIndicator?: ReactNode;
  };
  selectAccountComponent: {
    loadingIndicator?: ReactNode;
    renderHeading?: () => React.ReactElement | null;
    style?: SelectAccountComponentStyles;
    emptyAccountsComponent?: {
      style?: EmptyBankAccountStyles;
      placeholderIcon?: ReactNode;
    };
    accountItemComponent?: {
      style?: AccountItemComponentStyles;
      tickIcon?: ReactNode;
      renderItem?: (
        index: number,
        account: BankAccount,
        isSelected: boolean
      ) => React.ReactElement | null;
    };
    accessInfoComponent?: {
      style?: AccessInfoComponentStyles;
      data?: string[];
      renderContent?: () => React.ReactElement | null;
    };
  };
};

export type LinkAccountComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  catalogContainerStyle?: StyleProp<ViewStyle>;
  catalogTitleContainerStyle?: StyleProp<ViewStyle>;
  catalogTitleStyle?: StyleProp<TextStyle>;
  catalogEditButtonStyle?: StyleProp<ViewStyle>;
};

export interface Step {
  title: string;
  status?: 'success' | 'failed';
}

export type StepperComponentProps = {
  activeStep: number;
  steps: Step[];
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

export type BankLoginComponentProps = {
  bank: Bank;
  loadingIndicator?: ReactNode;
  onConfirmed: (consentId: string) => void;
  onLinked: (bankId: string, consentId: string, accountIds?: string[]) => void;
};

export type ConfirmLinkingComponentProps = {
  lastStep: Step;
};

export type SelectAccountComponentProps = {
  bank: Bank;
  consentId: string;
  companyName: string;
  onLinkAccount?: (bankId: string, consentId: string, accountIds: string[]) => void;
  loadingIndicator?: ReactNode;
  renderHeading?: () => React.ReactElement | null;
  style?: SelectAccountComponentStyles;
  emptyAccountsComponent?: {
    style?: EmptyBankAccountStyles;
    placeholderIcon?: ReactNode;
  };
  accountItemComponent?: {
    style?: AccountItemComponentStyles;
    tickIcon?: ReactNode;
    renderItem?: (
      index: number,
      account: BankAccount,
      isSelected: boolean
    ) => React.ReactElement | null;
  };
  accessInfoComponent?: {
    style?: AccessInfoComponentStyles;
    data?: string[];
    renderContent?: () => React.ReactElement | null;
  };
};

export type SelectAccountComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  headingTextStyle?: StyleProp<TextStyle>;
  ctaButtonWrapper?: StyleProp<ViewStyle>;
  listStyle?: StyleProp<ViewStyle>;
  listContentStyle?: StyleProp<ViewStyle>;
  listDivider?: StyleProp<ViewStyle>;
};

export type EmptyBankAccountStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
};

export type AccountItemComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  activeContainerStyle?: StyleProp<ViewStyle>;
  inactiveContainerStyle?: StyleProp<ViewStyle>;
  accountNameTextStyle?: StyleProp<TextStyle>;
  accountIdTextStyle?: StyleProp<TextStyle>;
};

export type AccessInfoComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  dotContainerStyle?: StyleProp<ViewStyle>;
  contentTextStyle?: StyleProp<TextStyle>;
  itemContentContainerStyle?: StyleProp<ViewStyle>;
};
