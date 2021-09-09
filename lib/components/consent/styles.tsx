import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { ConsentComponentStyles } from './types';

const useMergeStyles = (style?: ConsentComponentStyles) => {
  const { fonts } = useContext(ThemeContext);

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
      fontFamily: fonts.regular,
      fontSize: 14,
      lineHeight: 21,
      paddingHorizontal: 15,
      paddingVertical: 30,
      color: '#0D2050',
    },
    subContainer: {
      flex: 1,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
