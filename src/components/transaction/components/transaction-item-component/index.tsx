import React, { useContext } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { WalletContext } from '../../../../contexts/wallet-context';
import { CreditDebitIndicator, Transaction } from '../../../../types';
import { TransactionItemStyle } from '../../types';
import useMergStyles from './styles';

export interface TransactionItemProps {
  transaction: Transaction;
  isFromAggregated?: boolean;
  style?: TransactionItemStyle;
  formatCurrency: (amount: number, code: string) => string;
  onItemPress?: () => void;
}

const TransactionItemComponent = (props: TransactionItemProps) => {
  const { transaction, isFromAggregated, style, formatCurrency, onItemPress } = props;

  const styles = useMergStyles(style);

  const getTargetWalletId = () => {
    if (isFromAggregated) {
      if (transaction.creditDebitIndicator === CreditDebitIndicator.Credit) {
        return transaction.destinationAccount.walletId;
      } else {
        return transaction.sourceAccount.walletId;
      }
    }
    return undefined;
  };

  const formattedAmount = formatCurrency(transaction.amount.amount, transaction.amount.currency);
  const { getWalletDetail } = useContext(WalletContext);
  const targetWallet = getWalletDetail(getTargetWalletId());

  const creditOrDebit =
    transaction.creditDebitIndicator === CreditDebitIndicator.Credit ? '+' : '-';

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.containerStyle} onPress={onItemPress}>
      <View style={styles.leftWrapStyle}>
        <Text style={styles.descriptionTextStyle}>{transaction.description}</Text>
        {targetWallet && (
          <Text style={styles.walletNameTextStyle}>
            {`${targetWallet.walletName} (${targetWallet.bankAccount?.bankBranchId ?? ''} ${
              targetWallet.bankAccount.accountNumber
            })`}
          </Text>
        )}
      </View>
      <View style={styles.rightWrapStyle}>
        <Text style={styles.amountTextStyle}>{`${creditOrDebit}${formattedAmount}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionItemComponent;
