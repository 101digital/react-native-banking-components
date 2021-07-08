import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { BankThemeContext } from '../../../../contexts/theme-context';
import { AccountItemComponentStyles } from '../../types';

const useMergeStyles = (style?: AccountItemComponentStyles) => {
  const { theme } = useContext(BankThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {
      borderRadius: 5,
      paddingVertical: 14,
      paddingHorizontal: 21,
      backgroundColor: '#F7F9FB',
      flexDirection: 'row',
      alignItems: 'center',
    },
    activeContainerStyle: {
      borderWidth: 1,
      borderColor: theme.primaryColor,
    },
    inactiveContainerStyle: {
      borderWidth: 1,
      borderColor: '#E4F2FF',
    },
    accountNameTextStyle: {
      fontFamily: theme.fonts.regular,
      fontSize: 14,
      lineHeight: 21,
      color: theme.secondTextColor,
    },
    accountIdTextStyle: {
      fontFamily: theme.fonts.regular,
      fontSize: 12,
      lineHeight: 18,
      color: theme.secondTextColor,
      marginTop: 5,
    },
    leftWrapper: {
      flex: 1,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
