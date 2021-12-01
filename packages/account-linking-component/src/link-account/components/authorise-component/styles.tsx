import { defaultsDeep } from '@banking-component/core';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { AuthoriseComponentStyles } from '../../types';

const useMergeStyles = (style?: AuthoriseComponentStyles): AuthoriseComponentStyles => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles: AuthoriseComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
    mainContainerStyle: {
      flex: 1,
      paddingHorizontal: 25,
    },
    bankContainerStyle: {
      flexDirection: 'row',
      marginTop: 60,
      marginBottom: 40,
      alignItems: 'center',
    },
    bankItemContainerStyle: {
      flex: 1,
      height: 100,
      elevation: 4,
      shadowOffset: { width: 0, height: 2 },
      shadowColor: 'grey',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#E1E1E1',
      backgroundColor: 'white',
    },
    dividerStyle: {
      width: 33,
      height: 1,
      backgroundColor: '#E1E1E1',
      marginHorizontal: 5,
    },
    bankImageStyle: {
      width: '50%',
      height: '50%',
    },
    titleTextStyle: {
      fontFamily: fonts.regular,
      fontWeight: '600',
      color: '#0D2050',
      fontSize: 18,
      lineHeight: 27,
      textAlign: 'center',
    },
    messageTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 12,
      color: '#244065',
      lineHeight: 18,
      marginVertical: 28,
      marginHorizontal: 20,
      textAlign: 'center',
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
