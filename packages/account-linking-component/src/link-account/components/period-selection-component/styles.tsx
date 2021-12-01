import { defaultsDeep } from '@banking-component/core';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { PeriodSelectionComponentStyles } from '../../types';

const useMergeStyles = (style?: PeriodSelectionComponentStyles): PeriodSelectionComponentStyles => {
  const { fonts } = useContext(ThemeContext);
  const defaultStyles: PeriodSelectionComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
    headerTitleStyle: {
      fontSize: 16,
      fontFamily: fonts.regular,
      fontWeight: '600',
      color: '#0D2050',
      paddingHorizontal: 16,
      marginTop: 28,
      marginBottom: 20,
    },
    companyContainerStyle: {
      marginHorizontal: 22,
      borderRadius: 5,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#E1E1E1',
      paddingHorizontal: 20,
      paddingVertical: 10,
      elevation: 4,
      shadowOffset: { width: 0, height: 2 },
      shadowColor: 'grey',
      shadowOpacity: 0.2,
      shadowRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    companyContentContainerStyle: {
      flex: 1,
      marginLeft: 17,
    },
    companyReciepientStyle: {
      fontSize: 10,
      fontFamily: fonts.regular,
      color: '#244065',
    },
    companyNameStyle: {
      fontFamily: fonts.regular,
      fontWeight: '600',
      color: '#244065',
      fontSize: 12,
      marginTop: 7,
      marginBottom: 2,
    },
    dataAccessTitleStyle: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: '#0D2050',
      paddingHorizontal: 16,
      marginTop: 33,
      marginBottom: 20,
    },
    periodContainerStyle: {
      aspectRatio: 0.88,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#E1E1E1',
      borderRadius: 5,
      elevation: 4,
      shadowOffset: { width: 0, height: 2 },
      shadowColor: 'grey',
      shadowOpacity: 0.2,
      shadowRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    periodTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 12,
      color: '#244065',
      marginTop: 15,
    },
    periodListStyle: {
      marginHorizontal: 16,
    },
    separatorStyle: {
      width: 15,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
