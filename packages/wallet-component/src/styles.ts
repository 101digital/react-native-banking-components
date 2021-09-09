import { defaultsDeep } from '@banking-component/core';
import { StyleSheet } from 'react-native';
import { AccountComponentStyle } from './types';

const useMergeStyles = (style?: AccountComponentStyle) => {
  const defaultStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
    listContainerStyle: {
      paddingHorizontal: 16,
    },
    listDivider: {
      height: 10,
      width: '100%',
    },
    loadingWrap: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
