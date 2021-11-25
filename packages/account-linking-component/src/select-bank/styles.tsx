import { defaultsDeep } from '@banking-component/core';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { SelectBankComponentStyles } from './types';

const useMergeStyles = (style?: SelectBankComponentStyles) => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: SelectBankComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      paddingHorizontal: 15,
      backgroundColor: 'white',
    },
    headingTextStyle: {
      fontSize: 14,
      fontFamily: fonts.regular,
      color: '#0D2050',
      paddingTop: 30,
      paddingBottom: 28,
      lineHeight: 21,
    },
    columWrapperStyle: {
      justifyContent: 'space-between',
    },
    listDivider: {
      height: 20,
    },
    listStyle: {
      marginVertical: 15,
    },
    linkAccountTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: '#0D2050',
      textAlign: 'center',
      marginBottom: 10,
    },
    viewGuideButtonStyle: {
      color: colors.primaryColor,
      textDecorationLine: 'underline',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
