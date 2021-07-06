import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../../contexts/them-context';
import { SearchBarComponentStyles } from '../../types';

const useMergeStyles = (style?: SearchBarComponentStyles) => {
  const { theme } = useContext(ThemeContext);
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
      fontFamily: theme.fonts.regular,
      fontSize: 14,
      color: '#3C3E4F',
      paddingTop: 0,
      paddingBottom: 0,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
