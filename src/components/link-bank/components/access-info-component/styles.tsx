import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../../contexts/them-context';
import { AccessInfoComponentStyles } from '../../types';

const useMergeStyles = (style?: AccessInfoComponentStyles): AccessInfoComponentStyles => {
  const { theme } = useContext(ThemeContext);
  const defaultStyles: AccessInfoComponentStyles = StyleSheet.create({
    containerStyle: {
      marginTop: 45,
    },
    contentTextStyle: {
      fontFamily: theme.fonts.regular,
      color: theme.secondTextColor,
      fontSize: 14,
      lineHeight: 25,
    },
    titleTextStyle: {
      fontFamily: theme.fonts.regular,
      color: theme.secondTextColor,
      fontSize: 14,
      lineHeight: 21,
      marginBottom: 11,
    },
    dotContainerStyle: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.primaryColor,
      marginHorizontal: 10,
    },
    itemContentContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 10,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
