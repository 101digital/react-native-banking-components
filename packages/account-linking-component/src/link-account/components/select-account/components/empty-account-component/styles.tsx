import { defaultsDeep } from '@banking-component/core';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { EmptyBankAccountStyles } from '../../../../types';

const useMergeStyles = (style?: EmptyBankAccountStyles): EmptyBankAccountStyles => {
  const { fonts } = useContext(ThemeContext);
  const defautStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    messageTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 15,
      color: '#094884',
      lineHeight: 23,
      marginTop: 15,
    },
  });
  return defaultsDeep(style, defautStyles);
};

export default useMergeStyles;
