import { StyleSheet } from 'react-native';
import { DynamicConsentComponentStyles } from './types';
import { defaultsDeep } from '@banking-component/core';

const useMergeStyles = (style?: DynamicConsentComponentStyles): DynamicConsentComponentStyles => {
  const defaultStyles: DynamicConsentComponentStyles = StyleSheet.create({
    containerStyles: {
      flex: 1,
      backgroundColor: 'white',
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
