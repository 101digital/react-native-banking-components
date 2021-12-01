import { isEmpty, BankAccount } from '@banking-component/core';
import React, { ReactNode, useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { BCheckedIcon } from '../../../../../assets/images';
import { ThemeContext } from 'react-native-theme-component';
import { AccountItemComponentStyles } from '../../../../types';

import useMergeStyles from './styles';

export type AccountItemComponentProps = {
  account: BankAccount;
  isSelected: boolean;
  tickIcon?: ReactNode;
  style?: AccountItemComponentStyles;
  onPressed: (account: BankAccount) => void;
};

const AccountItemComponent = (props: AccountItemComponentProps) => {
  const { account, style, onPressed, isSelected, tickIcon } = props;

  const styles = useMergeStyles(style);
  const { colors } = useContext(ThemeContext);

  const getAccountNumber = () => {
    if (isEmpty(account.account)) {
      return '';
    }
    const identification = account.account[0].identification;
    let sortCode = identification.substring(0, 6);
    const accountNumber = identification.replace(sortCode, '');
    sortCode = `${sortCode.substring(0, 2)}-${sortCode.substring(2, 2)}-${sortCode.substring(
      4,
      2
    )}`;
    return `${sortCode} ${accountNumber}`;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.containerStyle,
        isSelected ? styles.activeContainerStyle : styles.inactiveContainerStyle,
      ]}
      onPress={() => onPressed(account)}
    >
      <View style={styles.leftWrapper}>
        <Text style={styles.accountNameTextStyle}>{`${
          account.nickname
        } - ${account.accountSubType.split(/(?=[A-Z])/).join(' ')}`}</Text>
        <Text style={styles.accountIdTextStyle}>{getAccountNumber()}</Text>
      </View>
      <View>
        {isSelected && (tickIcon ?? <BCheckedIcon size={22} color={colors.primaryColor} />)}
      </View>
    </TouchableOpacity>
  );
};

export default AccountItemComponent;
