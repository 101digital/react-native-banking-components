import { defaultsDeep } from '@banking-component/core';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { ItemCDRStyles } from '../types';

const useMergeStyle = (style?: ItemCDRStyles): ItemCDRStyles => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles: ItemCDRStyles = StyleSheet.create({
    containerStyle: {
      paddingVertical: 15,
      paddingHorizontal: 7,
      flexDirection: 'row',
    },
    contentContainerStyle: {
      flex: 1,
      marginLeft: 16,
    },
    titleTextStyle: {
      fontFamily: fonts.regular,
      fontWeight: '600',
      fontSize: 14,
      color: '#0D2050',
      lineHeight: 21,
    },
    descriptionTextStyle: {
      fontSize: 12,
      fontFamily: fonts.regular,
      color: '#0D2050',
      lineHeight: 18,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyle;
