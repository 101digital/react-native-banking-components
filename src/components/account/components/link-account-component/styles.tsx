import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { BankThemeContext } from '../../../../contexts/theme-context';
import { LinkAccountStyle } from '../../types';

const useMergeStyles = (style?: LinkAccountStyle) => {
  const { theme } = useContext(BankThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {
      paddingVertical: 17,
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonTextStyle: {
      fontSize: 15,
      fontFamily: theme.fonts.medium,
      lineHeight: 23,
      color: theme.primaryColor,
      marginHorizontal: 8,
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
