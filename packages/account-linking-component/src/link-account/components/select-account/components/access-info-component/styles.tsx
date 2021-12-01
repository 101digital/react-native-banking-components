import { defaultsDeep } from '@banking-component/core';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { AccessInfoComponentStyles } from '../../../../types';

const useMergeStyles = (style?: AccessInfoComponentStyles): AccessInfoComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);
  const defaultStyles: AccessInfoComponentStyles = StyleSheet.create({
    containerStyle: {
      marginTop: 45,
    },
    contentTextStyle: {
      fontFamily: fonts.regular,
      color: '#0D2050',
      fontSize: 14,
      lineHeight: 25,
    },
    titleTextStyle: {
      fontFamily: fonts.regular,
      color: '#0D2050',
      fontSize: 14,
      lineHeight: 21,
      marginBottom: 11,
    },
    dotContainerStyle: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colors.primaryColor,
      marginHorizontal: 10,
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
