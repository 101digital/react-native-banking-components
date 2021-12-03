import { defaultsDeep } from '@banking-component/core';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { DataSharingListComponentStyles } from '../types';

const useMergeStyles = (style?: DataSharingListComponentStyles): DataSharingListComponentStyles => {
  const { fonts } = useContext(ThemeContext);
  const defaultStyles: DataSharingListComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      backgroundColor: '#F6F8FA',
    },
    loadingContainerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sectionContainerStyle: {
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    sectionTitleStyle: {
      fontFamily: fonts.regular,
      fontWeight: '600',
      fontSize: 12,
      color: '#0D2050',
    },
    listDividerStyle: {
      height: 1,
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
