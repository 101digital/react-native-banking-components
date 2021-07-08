import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { BankThemeContext } from '../../../../contexts/theme-context';
import { BalanceStyle } from '../../types';

const useMergeStyles = (style?: BalanceStyle) => {
  const { theme } = useContext(BankThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {
      borderWidth: 1,
      borderColor: '#F5F5F5',
      paddingHorizontal: 12,
      paddingVertical: 17,
      borderRadius: 10,
      backgroundColor: 'white',
      flexDirection: 'row',
      marginTop: 10,
    },
    titleTextStyle: {
      fontFamily: theme.fonts?.semiBold,
      fontSize: 12,
      color: theme.textColor,
    },
    amountTextStyle: {
      fontFamily: theme.fonts?.semiBold,
      fontSize: 28,
      color: theme.primaryColor,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
