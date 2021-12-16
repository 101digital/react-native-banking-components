import { defaultsDeep } from '@banking-component/core';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { SearchBarComponentStyles } from '../../types';

const useMergeStyles = (style?: SearchBarComponentStyles) => {
  const { fonts } = useContext(ThemeContext);
  const defaultStyles = StyleSheet.create({
    containerStyle: {
      flexDirection: 'row',
      height: 40,
      backgroundColor: '#EEEEEF',
      paddingHorizontal: 5,
      borderRadius: 10,
      alignItems: 'center',
    },
    textInputStyle: {
      flex: 1,
      fontFamily: fonts.regular,
      fontSize: 14,
      color: '#3C3E4F',
      paddingTop: 0,
      paddingBottom: 0,
    },
    searchBox: {
      marginRight: 8,
      marginLeft: 10,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
