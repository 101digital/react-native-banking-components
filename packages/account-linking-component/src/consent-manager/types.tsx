import { AccountConsent, Wallet } from '@banking-component/core';
import { ConsentSummary, DynamicConsent } from '../types';
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type DataSharingListComponentProps = {
  periodFormat?: string;
  onItemPressed: (data: AccountConsent) => void;
  style?: DataSharingListComponentStyles;
};

export type DataSharingListComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  loadingContainerStyle?: StyleProp<ViewStyle>;
  sectionContainerStyle?: StyleProp<ViewStyle>;
  sectionTitleStyle?: StyleProp<TextStyle>;
  listContainerStyle?: StyleProp<ViewStyle>;
  listDividerStyle?: StyleProp<ViewStyle>;
  itemConsentStyle?: ItemConsentStyles;
};

export type ItemConsentProps = {
  accountConsent: AccountConsent;
  style?: ItemConsentStyles;
  onPressed: () => void;
  dateFormat: string;
};

export type ItemConsentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  imageContainerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  periodStyle?: StyleProp<TextStyle>;
};

export type DataSharingDetailComponentProps = {
  accountConsent: AccountConsent;
  consentData: DynamicConsent;
  wallets: Wallet[];
  style?: DataSharingDetailComponentStyles;
  periodFormat?: string;
  onPressedLink: (link: string) => void;
};

export type DataSharingDetailComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  consentOverviewStyle?: ConsentOverviewStyles;
  keyInformationStyle?: KeyInformationStyles;
  accountsStyle?: AccountsStyles;
  dataSharedStyle?: DataSharedStyles;
  additionalInformationStyle?: AddtionalDataStyles;
};

export type ConsentOverviewProps = {
  dateFormat: string;
  accountConsent: AccountConsent;
  style?: ConsentOverviewStyles;
};

export type ConsentOverviewStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  imageContainerStyle?: StyleProp<ViewStyle>;
  bankImageStyle?: StyleProp<ImageStyle>;
  bankNameStyle?: StyleProp<TextStyle>;
  periodRangeStyle?: StyleProp<TextStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  statusContainerStyle?: StyleProp<ViewStyle>;
  statusTextStyle?: StyleProp<TextStyle>;
};

export type KeyInformationProps = {
  dateFormat: string;
  accountConsent: AccountConsent;
  style?: KeyInformationStyles;
};

export type KeyInformationStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  periodTextStyle?: StyleProp<TextStyle>;
  viewConfirmationTextStyle?: StyleProp<TextStyle>;
};

export type AccountsProps = {
  wallets: Wallet[];
  consentSummary?: ConsentSummary;
  style?: AccountsStyles;
};

export type AccountsStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  accountItemContainerStyle?: StyleProp<ViewStyle>;
  walletNameStyle?: StyleProp<TextStyle>;
  walletNumberStyle?: StyleProp<TextStyle>;
  accessDataContainerStyle?: StyleProp<ViewStyle>;
  accessDataTitleStyle?: StyleProp<TextStyle>;
  accessDataMessageStyle?: StyleProp<TextStyle>;
};

export type AdditionalDataProps = {
  accountConsent: AccountConsent;
  companyName: string;
  companyLink: string;
  onPressedLink: (link: string) => void;
  style?: AddtionalDataStyles;
};

export type AddtionalDataStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  headerContainerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  hiperLinkTextStyle?: StyleProp<TextStyle>;
  cdrContainerStyle?: StyleProp<ViewStyle>;
  cdrContentContainerStyle?: StyleProp<ViewStyle>;
  cdrMessageStyle?: StyleProp<TextStyle>;
  cdrCompanyNameStyle?: StyleProp<TextStyle>;
};

export type DataSharedProps = {
  accountConsent: AccountConsent;
  style?: DataSharedStyles;
};

export type DataSharedStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  listContainerStyle?: StyleProp<ViewStyle>;
  listDividerStyle?: StyleProp<ViewStyle>;
  itemContainerStyle?: StyleProp<ViewStyle>;
  itemHeaderContainerStyle?: StyleProp<ViewStyle>;
  itemTitleTextStyle?: StyleProp<TextStyle>;
  itemShortDesTextStyle?: StyleProp<TextStyle>;
  fullDataTextStyle?: StyleProp<TextStyle>;
};
