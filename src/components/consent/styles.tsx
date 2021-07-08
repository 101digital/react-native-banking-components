import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { BankThemeContext } from '../../contexts/theme-context';
import { ConsentComponentStyles } from './types';

const useMergeStyles = (style?: ConsentComponentStyles) => {
  const { theme } = useContext(BankThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
    ctaButtonWrapper: {
      width: '100%',
      backgroundColor: 'white',
      shadowColor: '#000028',
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 0,
        height: -10,
      },
      shadowRadius: 5,
      elevation: 5,
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    headingTextStyle: {
      fontFamily: theme.fonts.regular,
      fontSize: 14,
      lineHeight: 21,
      paddingHorizontal: 15,
      paddingVertical: 30,
      color: theme.secondTextColor,
    },
    subContainer: {
      flex: 1,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
