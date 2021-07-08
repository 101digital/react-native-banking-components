import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { BankThemeContext } from '../../../../contexts/theme-context';
import { ShareContentComponentStyles } from '../../types';

const useMergeStyles = (style?: ShareContentComponentStyles): ShareContentComponentStyles => {
  const { theme } = useContext(BankThemeContext);

  const defaultStyles: ShareContentComponentStyles = StyleSheet.create({
    containerStyle: {
      marginVertical: 5,
      marginHorizontal: 15,
    },
    dotContainerStyle: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.primaryColor,
      marginHorizontal: 10,
    },
    titleTextStyle: {
      color: theme.secondTextColor,
      fontFamily: theme.fonts.medium,
      fontSize: 14,
      marginBottom: 20,
      lineHeight: 21,
    },
    contentTextStyle: {
      fontFamily: theme.fonts.regular,
      fontSize: 14,
      lineHeight: 25,
      color: theme.secondTextColor,
    },
    itemContentContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 10,
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
