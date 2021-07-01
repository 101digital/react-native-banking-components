import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../../contexts/them-context';
import { PermissionComponentStyles } from '../../types';

const useMergeStyles = (style?: PermissionComponentStyles) => {
  const { theme } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {
      marginHorizontal: 15,
      marginTop: 23,
      borderWidth: 1,
      borderColor: '#E4F2FF',
      borderRadius: 5,
      backgroundColor: '#F7F9FB',
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    messageTextStyle: {
      fontSize: 12,
      fontFamily: theme.fonts.regular,
      color: 'rgba(13, 32, 80, 0.75)',
      lineHeight: 18,
      marginLeft: 18,
    },
    messageWrapper: {
      flex: 1,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
