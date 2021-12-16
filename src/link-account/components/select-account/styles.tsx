import { defaultsDeep } from '@banking-component/core';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { SelectAccountComponentStyles } from '../../types';

const useMergeStyles = (style?: SelectAccountComponentStyles) => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
    ctaButtonWrapper: {
      width: '100%',
      backgroundColor: 'white',
      shadowColor: '#000028',
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 0,
        height: -10,
      },
      shadowRadius: 5,
      elevation: 5,
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    headingTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 14,
      lineHeight: 21,
      paddingVertical: 30,
      color: '#0D2050',
    },
    loadingWrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    subContainer: {
      flex: 1,
    },
    listStyle: {
      flex: 1,
    },
    listContentStyle: {
      paddingHorizontal: 15,
      paddingBottom: 15,
    },
    listDivider: {
      width: '100%',
      height: 16,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
