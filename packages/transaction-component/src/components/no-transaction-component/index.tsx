import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { BNoTransactionIcon } from '../../assets/images';
import { EmptyTransactionStyle } from '../../types';
import useMergeStyles from './styles';

export type EmptyTransactionProps = {
  emptyIcon?: ReactNode;
  message?: string;
  style?: EmptyTransactionStyle;
};

const EmptyTransactionComponent = (props: EmptyTransactionProps) => {
  const { emptyIcon, message, style } = props;

  const styles: EmptyTransactionStyle = useMergeStyles(style);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.iconStyle}>{emptyIcon ?? <BNoTransactionIcon />}</View>
      <Text style={styles.messageStyle}>{message ?? 'No Transactions Found'}</Text>
    </View>
  );
};

export default EmptyTransactionComponent;
