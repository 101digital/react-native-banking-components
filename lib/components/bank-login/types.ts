import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Bank } from '../../types';

export type BankLoginComponentProps = {
  containerStyle?: StyleProp<ViewStyle>;
  bank: Bank;
  loadingIndicator?: ReactNode;
  onConfirmed: (consentId: string) => void;
};
