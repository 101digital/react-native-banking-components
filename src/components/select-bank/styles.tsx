import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../contexts/them-context';
import { SelectBankComponentStyles } from './types';

const useMergeStyles = (style?: SelectBankComponentStyles) => {
  const { theme } = useContext(ThemeContext);

  const defaultStyles: SelectBankComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      paddingHorizontal: 15,
      backgroundColor: 'white',
    },
    headingTextStyle: {
      fontSize: 14,
      fontFamily: theme.fonts.regular,
      color: theme.secondTextColor,
      paddingTop: 30,
      paddingBottom: 28,
      lineHeight: 21,
    },
    columWrapperStyle: {
      justifyContent: 'space-between',
    },
    listDivider: {
      height: 20,
    },
    listStyle: {
      marginVertical: 15,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
