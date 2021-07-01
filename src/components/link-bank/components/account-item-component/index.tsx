import { isEmpty } from 'lodash';
import React, { ReactNode, useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { BCheckedIcon } from '../../../../assets/checked.icon';
import { ThemeContext } from '../../../../contexts/them-context';
import { BankAccount } from '../../../../types';
import { AccountItemComponentStyles } from '../../types';

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
  const { theme } = useContext(ThemeContext);

  const getAccountNumber = () => {
    if (isEmpty(account.account)) {
      return '';
    }
    const identification = account.account[0].identification;
    let sortCode = identification.substr(0, 6);
    const accountNumber = identification.replace(sortCode, '');
    sortCode = `${sortCode.substr(0, 2)}-${sortCode.substr(2, 2)}-${sortCode.substr(4, 2)}`;
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
        <Text style={styles.accountNameTextStyle}>{`${account.nickname} - ${account.accountSubType
          .split(/(?=[A-Z])/)
          .join(' ')}`}</Text>
        <Text style={styles.accountIdTextStyle}>{getAccountNumber()}</Text>
      </View>
      <View>
        {isSelected && (tickIcon ?? <BCheckedIcon size={22} color={theme.primaryColor} />)}
      </View>
    </TouchableOpacity>
  );
};

export default AccountItemComponent;
