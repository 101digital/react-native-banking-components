import { ConfirmLinkingComponentStyles } from '../../types';
import { StyleSheet } from 'react-native';
import { defaultsDeep } from '@banking-component/core';
import { ThemeContext } from 'react-native-theme-component';
import { useContext } from 'react';

const useMergeStyle = (style?: ConfirmLinkingComponentStyles): ConfirmLinkingComponentStyles => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles: ConfirmLinkingComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    contentContainerStyle: {
      flex: 1,
      paddingHorizontal: 27,
      alignItems: 'center',
    },
    titleTextStyle: {
      fontSize: 22,
      fontFamily: fonts.bold,
      color: '#0D2050',
      marginTop: 63,
      textAlign: 'center',
    },
    statusIconContainerStyle: {
      width: 100,
      height: 100,
      marginVertical: 45,
    },
    subTitleTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 16,
      lineHeight: 24,
      color: '#0D2050',
      textAlign: 'center',
    },
    messageTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: '#244065',
      textAlign: 'center',
      lineHeight: 21,
      paddingHorizontal: 10,
      marginVertical: 50,
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyle;
