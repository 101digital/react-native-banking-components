import { defaultsDeep } from '@banking-component/core';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { DynamicConsentComponentStyles } from './types';

const useMergeStyles = (style?: DynamicConsentComponentStyles): DynamicConsentComponentStyles => {
  const { fonts } = useContext(ThemeContext);
  const defaultStyles: DynamicConsentComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
    catalogContainerStyle: {
      height: 60,
      backgroundColor: '#F4F8FB',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(191, 191, 191, 0.2)',
    },
    catalogTitleStyle: {
      fontFamily: fonts.regular,
      fontWeight: '600',
      fontSize: 16,
      color: '#0D2050',
      paddingHorizontal: 15,
    },
    catalogEditButtonStyle: {
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    catalogTitleContainerStyle: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
