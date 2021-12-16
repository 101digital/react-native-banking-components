import { StyleSheet } from 'react-native';
import { StepperComponentStyles } from '../../types';
import { defaultsDeep } from '@banking-component/core';
import { useContext } from 'react';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (style?: StepperComponentStyles): StepperComponentStyles => {
  const { fonts } = useContext(ThemeContext);
  const defaultStyles: StepperComponentStyles = StyleSheet.create({
    containerStyle: {
      display: 'flex',
      backgroundColor: 'white',
      shadowColor: '#646876',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 3,
      zIndex: 10,
      paddingVertical: 10,
    },
    contentContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    stepContainerStyle: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    lineStyle: {
      flex: 1,
      height: 1,
    },
    titleContainerStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    titleTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 12,
      flex: 1,
      textAlign: 'center',
    },
    stepNumberTextStyle: {
      fontFamily: fonts.bold,
      fontSize: 14,
      textAlign: 'center',
    },
    dotContainerStyle: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
