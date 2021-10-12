import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Bank } from '@banking-component/core';

export type BankLoginComponentProps = {
  containerStyle?: StyleProp<ViewStyle>;
  bank: Bank;
  loadingIndicator?: ReactNode;
  onConfirmed: (consentId: string) => void;
  onLinked: (bankId: string, consentId: string) => void;
};
