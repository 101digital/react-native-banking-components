import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BalanceStyle } from '../../types';
import mergeStyles from './styles';

export type BalanceComponentProps = {
  balance: string;
  totalBalanceLabel?: string;
  style?: BalanceStyle;
  rightIcon?: ReactNode;
};

const BalanceComponent = (props: BalanceComponentProps) => {
  const { style, totalBalanceLabel, balance, rightIcon } = props;

  const styles = mergeStyles(style);

  return (
    <View style={styles.wrapperStyle}>
      <View style={styles.containerStyle}>
        <View style={innerStyles.leftWrap}>
          <Text style={styles.titleTextStyle}>
            {totalBalanceLabel ?? 'Total Available Balance'}
          </Text>
          <Text style={styles.amountTextStyle}>{balance}</Text>
        </View>
        {rightIcon}
      </View>
    </View>
  );
};

const innerStyles = StyleSheet.create({
  leftWrap: {
    flex: 1,
  },
});

export default React.memo(BalanceComponent);
