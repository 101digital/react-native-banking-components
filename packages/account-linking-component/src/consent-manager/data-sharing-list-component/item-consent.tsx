import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image, ThemeContext } from 'react-native-theme-component';
import { ItemConsentProps, ItemConsentStyles } from '../types';
import { ArrowRightIcon, images } from '../../assets/images';
import moment from 'moment';
import { defaultsDeep } from '@banking-component/core';

const ItemConsent = (props: ItemConsentProps) => {
  const { accountConsent, style, onPressed, dateFormat } = props;
  const styles: ItemConsentStyles = useMergeStyles(style);

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.containerStyle} onPress={onPressed}>
      <View style={styles.imageContainerStyle}>
        <Image
          source={{ uri: accountConsent.aspspInfo.imageUrl }}
          fallbackImage={images.bank}
          style={styles.imageStyle}
        />
      </View>
      <View style={styles.contentContainerStyle}>
        <Text style={styles.titleStyle}>{accountConsent.aspspInfo.name}</Text>
        <Text style={styles.periodStyle}>
          {`${moment(accountConsent.createdAt).format(dateFormat)} - ${moment(
            accountConsent.expiredAt
          ).format(dateFormat)}`}
        </Text>
      </View>
      <ArrowRightIcon size={13} color='rgba(13, 32, 80, 0.5)' />
    </TouchableOpacity>
  );
};

const useMergeStyles = (style?: ItemConsentStyles): ItemConsentStyles => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles: ItemConsentStyles = StyleSheet.create({
    containerStyle: {
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 18,
    },
    imageContainerStyle: {
      width: 55,
      height: 50,
      borderWidth: 1,
      borderColor: '#F5F5F5',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageStyle: {
      width: 32,
      height: 32,
    },
    contentContainerStyle: {
      flex: 1,
      marginLeft: 15,
    },
    titleStyle: {
      fontSize: 14,
      fontFamily: fonts.regular,
      color: '#244065',
    },
    periodStyle: {
      fontSize: 12,
      fontFamily: fonts.regular,
      color: '#828282',
      marginTop: 5,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default ItemConsent;
