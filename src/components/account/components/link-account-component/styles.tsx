import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../../contexts/them-context';
import { LinkAccountStyle } from '../../types';

const useMergeStyles = (style?: LinkAccountStyle) => {
  const { theme } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {
      paddingVertical: 17,
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonTextStyle: {
      fontSize: 15,
      fontFamily: theme.fonts.medium,
      lineHeight: 23,
      color: theme.primaryColor,
      marginHorizontal: 8,
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
