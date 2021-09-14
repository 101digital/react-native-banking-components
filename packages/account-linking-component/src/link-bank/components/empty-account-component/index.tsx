import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { BNoWalletIcon } from '../../../assets/no-wallet.icon';
import { EmptyBankAccountStyles } from '../../types';
import useMergeStyles from './styles';

export type EmptyAccountComponentProps = {
  placeholderIcon?: ReactNode;
  messageLabel?: string;
  style?: EmptyBankAccountStyles;
};

const EmptyAccountComponent = (props: EmptyAccountComponentProps) => {
  const { placeholderIcon, messageLabel, style } = props;

  const styles = useMergeStyles(style);

  return (
    <View style={styles.containerStyle}>
      {placeholderIcon ?? <BNoWalletIcon size={105} />}
      <Text style={styles.messageTextStyle}>{messageLabel ?? 'No Accounts Found'}</Text>
    </View>
  );
};

export default EmptyAccountComponent;
