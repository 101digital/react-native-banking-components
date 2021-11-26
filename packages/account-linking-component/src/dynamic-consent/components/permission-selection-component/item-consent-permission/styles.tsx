import { defaultsDeep } from '@banking-component/core';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { ItemConsentPermissionStyles } from '../../../types';

const useMergeStyles = (style?: ItemConsentPermissionStyles): ItemConsentPermissionStyles => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles: ItemConsentPermissionStyles = StyleSheet.create({
    permissionContainerStyle: {
      borderRadius: 5,
      backgroundColor: 'white',
      elevation: 4,
      shadowOffset: { width: 0, height: 0 },
      shadowColor: 'grey',
      shadowOpacity: 0.2,
      shadowRadius: 5,
      borderWidth: 1,
      borderColor: '#E1E1E1',
    },

    permissionTitleStyle: {
      fontFamily: fonts.regular,
      fontWeight: '600',
      color: '#0D2050',
      flex: 1,
    },
    permissionHeaderStyle: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(191, 191, 191, 0.3)',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 8,
    },
    buttonViewFullStyle: {
      paddingHorizontal: 15,
      marginBottom: 15,
      flexDirection: 'row',
      alignItems: 'center',
    },
    viewFullTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 12,
      color: '#244065',
      marginRight: 15,
    },
    permissionShortDesStyle: {
      fontFamily: fonts.regular,
      fontSize: 12,
      color: '#244065',
      padding: 15,
    },
  });
  return defaultsDeep(style, defaultStyles);
};
export default useMergeStyles;
