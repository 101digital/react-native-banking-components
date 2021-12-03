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
    itemContainerStyle: {
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 18,
    },
    imageContainerStyle: {
      width: 55,
      height: 50,
      borderWidth: 1,
      borderColor: '#F5F5F5',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageStyle: {
      width: 32,
      height: 32,
    },
    itemContentContainerStyle: {
      flex: 1,
      marginLeft: 15,
    },
    itemTitleStyle: {
      fontSize: 14,
      fontFamily: fonts.regular,
      color: '#244065',
    },
    itemPeriodStyle: {
      fontSize: 12,
      fontFamily: fonts.regular,
      color: '#828282',
      marginTop: 5,
    },
    listDividerStyle: {
      height: 1,
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
