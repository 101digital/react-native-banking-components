import { defaultsDeep } from '@banking-component/core';
import { StyleSheet } from 'react-native';
import { DataSharingDetailComponentStyles } from '../types';

const useMergeStyles = (
  style?: DataSharingDetailComponentStyles
): DataSharingDetailComponentStyles => {
  const defaultStyles: DataSharingDetailComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
