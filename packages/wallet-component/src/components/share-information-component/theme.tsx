import { StyleSheet } from 'react-native';
import { ShareInformationComponentStyle } from '.';
import { defaultsDeep } from '@banking-component/core';
import { ThemeContext } from 'react-native-theme-component';
import { useContext } from 'react';

const useMergeStyle = (style?: ShareInformationComponentStyle): ShareInformationComponentStyle => {
  const { fonts } = useContext(ThemeContext);
  const defaultStyles: ShareInformationComponentStyle = StyleSheet.create({
    containerStyle: {
      flex: 1,
      backgroundColor: 'white',
    },
    mainContainerStyle: {
      paddingHorizontal: 15,
      paddingVertical: 5,
    },
    sectionTextStyle: {
      fontSize: 14,
      fontFamily: fonts.medium,
      paddingBottom: 10,
      paddingTop: 15,
      color: '#0D2050',
    },
    applyContainerStyle: {
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
      flexDirection: 'row',
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyle;
