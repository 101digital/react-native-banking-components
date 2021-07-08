import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { BankThemeContext } from '../../../../contexts/theme-context';
import { EmptyBankAccountStyles } from '../../types';

const useMergeStyles = (style?: EmptyBankAccountStyles): EmptyBankAccountStyles => {
  const { theme } = useContext(BankThemeContext);
  const defautStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    messageTextStyle: {
      fontFamily: theme.fonts.medium,
      fontSize: 15,
      color: theme.textColor,
      lineHeight: 23,
      marginTop: 15,
    },
  });
  return defaultsDeep(style, defautStyles);
};

export default useMergeStyles;
