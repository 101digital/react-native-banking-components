import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../../contexts/them-context';
import { DotStyle } from '../../types';

const useMergeStyles = (style?: DotStyle) => {
  const { theme } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    dot: {
      width: 19,
      height: 3,
      borderRadius: 3,
      margin: 3,
      backgroundColor: theme.primaryColor,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
