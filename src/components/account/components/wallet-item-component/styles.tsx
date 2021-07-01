import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../../contexts/them-context';
import { WalletItemStyle } from '../../types';

const useMergeStyles = (style?: WalletItemStyle) => {
  const { theme } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {
      paddingHorizontal: 7,
      paddingVertical: 18,
      backgroundColor: 'white',
      borderRadius: 10,
      borderColor: '#F5F5F5',
      borderWidth: 1,
      zIndex: 2,
      flexDirection: 'row',
    },
    imageContainerStyle: {
      width: 50,
      height: 45,
      borderWidth: 1,
      borderColor: '#F5F5F5',
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageStyle: {
      width: 32,
      height: 32,
    },
    leftContainerStyle: {
      flex: 1,
      height: 45,
      paddingLeft: 18,
      justifyContent: 'space-between',
    },
    accountNameTextStyle: {
      fontFamily: theme.fonts?.regular,
      fontSize: 14,
      lineHeight: 20,
      color: theme.textColor,
    },
    accountNumberTextStyle: {
      fontSize: 12,
      fontFamily: theme.fonts?.regular,
      color: '#828282',
      lineHeight: 17,
    },
    amountTextStyle: {
      fontFamily: theme.fonts?.bold,
      fontSize: 14,
      lineHeight: 21,
      color: theme.textColor,
    },
    rightContainerStyle: {
      paddingHorizontal: 8,
    },
    primaryContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      justifyContent: 'flex-end',
    },
    primaryTextStyle: {
      fontSize: 12,
      fontFamily: theme.fonts?.regular,
      color: theme.primaryColor,
      lineHeight: 16,
      marginLeft: 5,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
