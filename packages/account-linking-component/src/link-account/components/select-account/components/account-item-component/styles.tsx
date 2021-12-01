import { defaultsDeep } from '@banking-component/core';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { AccountItemComponentStyles } from '../../../../types';

const useMergeStyles = (style?: AccountItemComponentStyles) => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {
      borderRadius: 5,
      paddingVertical: 14,
      paddingHorizontal: 21,
      backgroundColor: '#F7F9FB',
      flexDirection: 'row',
      alignItems: 'center',
    },
    activeContainerStyle: {
      borderWidth: 1,
      borderColor: colors.primaryColor,
    },
    inactiveContainerStyle: {
      borderWidth: 1,
      borderColor: '#E4F2FF',
    },
    accountNameTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 14,
      lineHeight: 21,
      color: '#0D2050',
    },
    accountIdTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 12,
      lineHeight: 18,
      color: '#0D2050',
      marginTop: 5,
    },
    leftWrapper: {
      flex: 1,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
