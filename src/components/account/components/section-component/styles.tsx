import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { BankThemeContext } from '../../../../contexts/theme-context';
import { AccountSectionStyle } from '../../types';

const useMergeStyles = (style?: AccountSectionStyle) => {
  const { theme } = useContext(BankThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {
      backgroundColor: '#f7f9fb',
      marginVertical: 20,
    },
    sectionTextStyle: {
      fontFamily: theme.fonts?.medium,
      fontSize: 14,
      color: theme.textColor,
      lineHeight: 21,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
