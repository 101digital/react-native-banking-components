import { defaultsDeep } from '@banking-component/core';
import { ConsentSummaryComponentStyles } from '../../types';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (style?: ConsentSummaryComponentStyles): ConsentSummaryComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);
  const defaultStyles: ConsentSummaryComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      paddingVertical: 5,
    },
    contentContainerStyle: {
      flex: 1,
    },
    titleTextStyle: {
      fontSize: 16,
      fontFamily: fonts.regular,
      fontWeight: '600',
      color: '#0D2050',
      marginBottom: 10,
      lineHeight: 25,
    },
    messageTextStyle: {
      fontFamily: fonts.regular,
      color: '#244065',
      fontSize: 12,
      lineHeight: 18,
      paddingHorizontal: 2,
      marginBottom: 5,
    },
    itemContainerStyle: {
      paddingHorizontal: 15,
      paddingVertical: 20,
    },
    directLinkTextStyle: {
      color: colors.primaryColor,
      fontFamily: fonts.regular,
      textDecorationLine: 'underline',
      fontSize: 12,
      paddingVertical: 5,
      paddingHorizontal: 2,
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
