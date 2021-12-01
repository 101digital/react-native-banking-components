import { defaultsDeep } from '@banking-component/core';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { PermissonSelectionComponentStyles } from '../../types';

const useMergeStyles = (
  style?: PermissonSelectionComponentStyles
): PermissonSelectionComponentStyles => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles: PermissonSelectionComponentStyles = StyleSheet.create({
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
      marginBottom: 10,
    },
    headerMessageStyle: {
      paddingHorizontal: 16,
      fontFamily: fonts.regular,
      fontSize: 12,
      color: '#244065',
    },
    permissionListStyle: {
      paddingHorizontal: 23,
      marginVertical: 15,
      flex: 1,
    },
    separatorStyle: {
      height: 25,
    },
  });
  return defaultsDeep(style, defaultStyles);
};
export default useMergeStyles;
