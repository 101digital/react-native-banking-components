import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { BankThemeContext } from '../../../../contexts/theme-context';
import { TransactionPageStyle } from '../../types';

const useMergeStyles = (style?: TransactionPageStyle) => {
  const { theme } = useContext(BankThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    transactionListStyle: {
      paddingBottom: 16,
    },
    dividerStyle: {
      flex: 1,
      height: 1,
      backgroundColor: '#DEDEDE',
      marginHorizontal: 30,
    },
    sectionWrapStyle: {
      margin: 15,
      flexDirection: 'row',
    },
    sectionTextStyle: {
      fontFamily: theme.fonts?.medium,
      fontSize: 13,
      color: theme.textColor,
    },
    sectionText2Style: {
      fontFamily: theme.fonts?.medium,
      fontSize: 10,
      color: theme.textColor,
      lineHeight: 15,
    },
    footerWrap: {
      paddingVertical: 15,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
