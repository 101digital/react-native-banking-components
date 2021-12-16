import { defaultsDeep, isEmpty } from '@banking-component/core';
import { ItemConsentPermissionProps, ItemConsentPermissionStyles } from '../../types';
import React, { useContext, useState } from 'react';
import { View, Switch, Dimensions, TouchableOpacity, Text, StyleSheet } from 'react-native';
import HTML from 'react-native-render-html';
import { ThemeContext } from 'react-native-theme-component';
import { ArrowDownIcon } from '../../../assets/images';

const { width } = Dimensions.get('window');

const ItemConsentPermission = (props: ItemConsentPermissionProps) => {
  const { permission, onValueChanged, style, value } = props;
  const [isSelected, setSelected] = useState(value);
  const [isShowFull, setShowFull] = useState(false);
  const { colors, fonts, i18n } = useContext(ThemeContext);
  const styles: ItemConsentPermissionStyles = useMergeStyles(style);

  const cleanHTML = (str: string) => {
    return str.replace(/(<([^>]+)>)/gi, '');
  };

  function rgbToHex(color: string) {
    const a = color.replace(/[^\d,]/g, '').split(',');
    return '#' + ((1 << 24) + (+a[0] << 16) + (+a[1] << 8) + +a[2]).toString(16).slice(1);
  }

  const addAlpha = (color: string, opacity: number) => {
    if (!color.startsWith('#')) {
      color = rgbToHex(color);
    }
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
  };

  return (
    <View style={styles.permissionContainerStyle}>
      <View style={styles.permissionHeaderStyle}>
        <Text style={styles.permissionTitleStyle}>{permission.permissionTitle}</Text>
        <Switch
          trackColor={{ false: 'grey', true: colors.primaryColor }}
          thumbColor={'white'}
          ios_backgroundColor={addAlpha(colors.primaryColor ?? '#E2E2E2', 0.2)}
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          onValueChange={(value) => {
            setSelected(value);
            onValueChanged(value);
          }}
          value={isSelected}
        />
      </View>
      <Text style={styles.permissionShortDesStyle}>{cleanHTML(permission.shortDescription)}</Text>
      {!isEmpty(permission.description) && (
        <TouchableOpacity
          style={styles.buttonViewFullStyle}
          activeOpacity={0.8}
          onPress={() => setShowFull(!isShowFull)}
        >
          <Text style={styles.viewFullTextStyle}>
            {i18n?.t('link_bank_component.btn_show_full_list_data') ?? 'Show full data list'}
          </Text>
          <View
            style={{
              transform: [{ rotate: isShowFull ? '180deg' : '0deg' }],
            }}
          >
            <ArrowDownIcon size={10} color={colors.primaryColor} />
          </View>
        </TouchableOpacity>
      )}
      {isShowFull && (
        <HTML
          contentWidth={width}
          systemFonts={fonts.regular ? [fonts.regular] : []}
          source={{ html: permission.description }}
          tagsStyles={{
            ul: {
              margin: 0,
              marginBottom: 15,
              marginLeft: 10,
            },
            li: {
              fontFamily: fonts.regular,
              fontSize: 12,
              color: '#244065',
            },
            p: {
              fontFamily: fonts.regular,
              margin: 2,
              fontSize: 12,
              color: '#244065',
            },
          }}
        />
      )}
    </View>
  );
};

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

export default ItemConsentPermission;
