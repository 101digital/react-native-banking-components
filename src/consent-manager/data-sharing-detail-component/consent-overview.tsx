import { defaultsDeep } from '@banking-component/core';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image, ThemeContext } from 'react-native-theme-component';
import { ConsentOverviewProps, ConsentOverviewStyles } from '../types';
import { images } from '../../assets/images';
import moment from 'moment';

const ConsentOverview = (props: ConsentOverviewProps) => {
  const { style, accountConsent, dateFormat } = props;
  const styles: ConsentOverviewStyles = useMergeStyles(style);
  const { i18n } = useContext(ThemeContext);

  const isActive = moment(accountConsent.expiredAt).isAfter(moment());
  const statusBackground = isActive ? '#05944F' : '#F2F2F2';

  return (
    <View style={styles.containerStyle}>
      <View style={styles.imageContainerStyle}>
        <Image
          source={{ uri: accountConsent.aspspInfo.imageUrl }}
          fallbackImage={images.bank}
          style={styles.bankImageStyle}
        />
      </View>
      <View style={styles.contentContainerStyle}>
        <Text style={styles.bankNameStyle}>{accountConsent.aspspInfo.name}</Text>
        <Text style={styles.periodRangeStyle}>{`${moment(accountConsent.createdAt).format(
          dateFormat
        )} - ${moment(accountConsent.expiredAt).format(dateFormat)}`}</Text>
      </View>
      <View style={[styles.statusContainerStyle, { backgroundColor: statusBackground }]}>
        <Text style={styles.statusTextStyle}>
          {isActive
            ? i18n?.t('consent_manager.lbl_active') ?? 'Active'
            : i18n?.t('consent_manager.lbl_expired') ?? 'Expired'}
        </Text>
      </View>
    </View>
  );
};

const useMergeStyles = (style?: ConsentOverviewStyles): ConsentOverviewStyles => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles: ConsentOverviewStyles = StyleSheet.create({
    containerStyle: {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#E1E1E1',
      paddingHorizontal: 15,
      paddingVertical: 20,
      marginHorizontal: 22,
      marginVertical: 20,
      elevation: 4,
      shadowOffset: { width: 0, height: 0 },
      shadowColor: 'grey',
      shadowOpacity: 0.2,
      shadowRadius: 3,
      backgroundColor: 'white',
      flexDirection: 'row',
    },
    imageContainerStyle: {
      width: 55,
      height: 50,
      borderWidth: 1,
      backgroundColor: 'white',
      borderColor: '#F5F5F5',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bankImageStyle: {
      width: 32,
      height: 32,
    },
    contentContainerStyle: {
      flex: 1,
      marginHorizontal: 10,
      alignSelf: 'center',
    },
    bankNameStyle: {
      fontSize: 16,
      color: '#094884',
      fontFamily: fonts.regular,
      fontWeight: '600',
      lineHeight: 24,
    },
    periodRangeStyle: {
      fontFamily: fonts.regular,
      fontSize: 12,
      color: '#244065',
      marginTop: 2,
    },
    statusContainerStyle: {
      paddingHorizontal: 5,
      height: 16,
      borderRadius: 8,
      marginTop: 12,
      justifyContent: 'center',
    },
    statusTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 10,
      color: 'white',
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default ConsentOverview;
