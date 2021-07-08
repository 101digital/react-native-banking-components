import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { BankThemeContext } from '../../../../contexts/theme-context';
import { TransactionItemStyle } from '../../types';

const useMergeStyles = (style?: TransactionItemStyle) => {
  const { theme } = useContext(BankThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {
      flexDirection: 'row',
      borderRadius: 8,
      paddingVertical: 24,
      backgroundColor: 'white',
      paddingHorizontal: 15,
      marginHorizontal: 15,
    },
    leftWrapStyle: {
      flex: 1,
      marginRight: 8,
    },
    rightWrapStyle: {},
    descriptionTextStyle: {
      lineHeight: 20,
      fontFamily: theme.fonts?.medium,
      fontSize: 14,
      color: theme.textColor,
    },
    walletNameTextStyle: {
      fontFamily: theme.fonts?.regular,
      fontSize: 10,
      color: theme.textColor,
    },
    amountTextStyle: {
      lineHeight: 20,
      fontFamily: theme.fonts?.medium,
      fontSize: 14,
      color: theme.textColor,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
