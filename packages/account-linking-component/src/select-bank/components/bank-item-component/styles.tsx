import { defaultsDeep } from '@banking-component/core';
import { useContext } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { BankItemComponentStyles } from '../../types';
const { width } = Dimensions.get('window');

const useMergeStyles = (style?: BankItemComponentStyles) => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {
      width: (width - 50) / 2,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#E1E1E1',
      alignItems: 'center',
      padding: 8,
    },
    bankImageStyle: {
      width: 43,
      height: 43,
      marginBottom: 2,
    },
    bankNameTextStyle: {
      fontSize: 14,
      fontFamily: fonts.regular,
      lineHeight: 21,
      color: '#3C3E4F',
      textAlign: 'center',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
