import { defaultsDeep } from '@banking-component/core';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { ShareContentComponentStyles } from '../../types';

const useMergeStyles = (style?: ShareContentComponentStyles): ShareContentComponentStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: ShareContentComponentStyles = StyleSheet.create({
    containerStyle: {
      marginVertical: 5,
      marginHorizontal: 15,
    },
    dotContainerStyle: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colors.primaryColor,
      marginHorizontal: 10,
    },
    titleTextStyle: {
      color: '#0D2050',
      fontFamily: fonts.medium,
      fontSize: 14,
      marginBottom: 20,
      lineHeight: 21,
    },
    contentTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 14,
      lineHeight: 25,
      color: '#0D2050',
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
