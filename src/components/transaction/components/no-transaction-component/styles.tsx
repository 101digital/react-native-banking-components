import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { BankThemeContext } from '../../../../contexts/theme-context';
import { EmptyTransactionStyle } from '../../types';

const useMergeStyles = (style?: EmptyTransactionStyle) => {
  const { theme } = useContext(BankThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      alignSelf: 'center',
    },
    messageStyle: {
      fontSize: 15,
      color: theme.textColor,
      lineHeight: 23,
      marginTop: 15,
      fontFamily: theme.fonts?.medium,
    },
    iconStyle: {
      width: 100,
      height: 100,
      alignSelf: 'center',
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
