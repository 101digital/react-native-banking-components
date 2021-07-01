import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../../contexts/them-context';
import { ActionSheetStyle } from '../../types';

const useMergeStyles = (style?: ActionSheetStyle) => {
  const { theme } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    modalStyle: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    containerStyles: {
      paddingHorizontal: 32,
      paddingTop: 30,
      paddingBottom: 10,
      justifyContent: 'center',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      backgroundColor: 'white',
    },
    buttonContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    },
    buttonTextStyle: {
      fontFamily: theme.fonts.regular,
      fontSize: 16,
      color: 'black',
    },
    cancelContainerStyle: {
      paddingVertical: 10,
      alignItems: 'center',
    },
    cancelTextStyle: {
      fontFamily: theme.fonts.medium,
      fontSize: 16,
      color: 'red',
    },
    leftIconContainer: {
      marginRight: 8,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
