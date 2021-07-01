import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../contexts/them-context';
import { NoWalletThemeStyles } from '../types';

const useMergeStyles = (style?: NoWalletThemeStyles) => {
  const { theme } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
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
    buttonTextStyle: {
      fontSize: 15,
      fontFamily: theme.fonts.medium,
      lineHeight: 23,
      color: theme.primaryColor,
      marginHorizontal: 8,
    },
    buttonContainerStyle: {
      paddingVertical: 17,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
