import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { BalanceStyle } from '../../types';

const useMergeStyles = (style?: BalanceStyle) => {
  const { fonts, colors } = useContext(ThemeContext);

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
      fontFamily: fonts.semiBold,
      fontSize: 12,
      color: '#094884',
    },
    amountTextStyle: {
      fontFamily: fonts.semiBold,
      fontSize: 28,
      color: colors.primaryColor,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
