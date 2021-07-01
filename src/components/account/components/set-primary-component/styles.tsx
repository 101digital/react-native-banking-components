import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../../contexts/them-context';
import { SetPrimaryComponentStyle } from '../../types';

const useMergeStyles = (style?: SetPrimaryComponentStyle): SetPrimaryComponentStyle => {
  const { theme } = useContext(ThemeContext);
  const defaultStyles: SetPrimaryComponentStyle = StyleSheet.create({
    containerStyle: {
      flexDirection: 'row',
      marginTop: 10,
    },
    checkBoxStyle: {
      backgroundColor: theme.primaryColor,
      padding: 2,
      borderRadius: 2,
      width: 16,
      height: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleTextStyle: {
      fontFamily: theme.fonts.regular,
      fontSize: 16,
      color: 'black',
      lineHeight: 20,
      marginLeft: 8,
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
