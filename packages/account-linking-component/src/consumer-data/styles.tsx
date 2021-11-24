import { defaultsDeep } from '@banking-component/core';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { ComsumerDataComponentStyles } from './types';

const useMergeStyle = (style?: ComsumerDataComponentStyles): ComsumerDataComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: ComsumerDataComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      backgroundColor: 'white',
    },
    mainContainerStyle: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 15,
    },
    titleTextStyle: {
      fontSize: 16,
      fontFamily: fonts.medium,
      color: '#0D2050',
      textAlign: 'center',
      paddingVertical: 27,
      paddingHorizontal: 10,
    },
    highlightTitleTextStyle: {
      fontFamily: fonts.regular,
      color: colors.primaryColor,
      fontWeight: '600',
    },
    buttonCDRPolicyStyle: {
      marginBottom: 20,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 5,
    },
    cdrPolicyTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 14,
      textDecorationLine: 'underline',
      color: colors.primaryColor,
    },
    cdrListContainerStyle: {
      marginVertical: 15,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyle;
