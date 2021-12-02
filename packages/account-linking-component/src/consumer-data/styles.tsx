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
    placeholderContainerStyle: {
      flexDirection: 'row',
      marginHorizontal: '25%',
      marginVertical: 10,
    },
    connectorContainerStyle: {
      width: 45,
      height: 45,
      borderWidth: 1,
      borderColor: '#E1E1E1',
      borderRadius: 3,
      elevation: 4,
      shadowOffset: { width: 0, height: 0 },
      shadowColor: 'grey',
      shadowOpacity: 0.2,
      shadowRadius: 3,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 5,
    },
    dashlineContainerStyle: {
      marginTop: 32,
    },
    cdrIconContainerStyle: {
      marginTop: 32,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyle;
