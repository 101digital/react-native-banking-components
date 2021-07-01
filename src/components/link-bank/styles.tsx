import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../contexts/them-context';
import { LinkBankComponentStyles } from './types';

const useMergeStyles = (style?: LinkBankComponentStyles) => {
  const { theme } = useContext(ThemeContext);

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
      paddingTop: 15,
    },
    headingTextStyle: {
      fontFamily: theme.fonts.regular,
      fontSize: 14,
      lineHeight: 21,
      paddingVertical: 30,
      color: theme.secondTextColor,
    },
    loadingWrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    subContainer: {
      flex: 1,
    },
    listStyle: {
      flex: 1,
    },
    listContentStyle: {
      paddingHorizontal: 15,
    },
    listDivider: {
      width: '100%',
      height: 16,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
