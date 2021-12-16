import { defaultsDeep } from '@banking-component/core';
import moment from 'moment';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { KeyInformationProps, KeyInformationStyles } from '../types';

const KeyInformation = (props: KeyInformationProps) => {
  const { style, accountConsent, dateFormat } = props;
  const styles: KeyInformationStyles = useMergeStyles(style);
  const { i18n } = useContext(ThemeContext);

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleTextStyle}>
        {i18n?.t('consent_manager.lbl_key_information') ?? 'Key information'}
      </Text>
      <Text style={styles.messageTextStyle}>
        {(
          i18n?.t('consent_manager.lbl_consent_period_time') ??
          'The consent was given on %s1 which will expire on %s2.'
        )
          .replace('%s1', moment(accountConsent.createdAt).format(dateFormat))
          .replace('%s2', moment(accountConsent.expiredAt).format(dateFormat))}
      </Text>
      <Text style={styles.periodTextStyle}>
        {(i18n?.t('consent_manager.lbl_sharing_period') ?? 'Sharing period: %s').replace(
          '%s',
          `${moment(accountConsent.createdAt).format(dateFormat)} - ${moment(
            accountConsent.expiredAt
          ).format(dateFormat)}`
        )}
      </Text>
      <Text style={styles.viewConfirmationTextStyle}>
        {i18n?.t('consent_manager.btn_view_confirmation_consent') ??
          'View your confirmation of consent'}
      </Text>
    </View>
  );
};

const useMergeStyles = (style?: KeyInformationStyles): KeyInformationStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: KeyInformationStyles = StyleSheet.create({
    containerStyle: {
      paddingHorizontal: 16,
    },
    messageTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 12,
      color: '#244065',
      marginVertical: 10,
      lineHeight: 24,
    },
    periodTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 12,
      color: '#244065',
      lineHeight: 24,
    },
    viewConfirmationTextStyle: {
      color: colors.primaryColor,
      marginVertical: 20,
      textDecorationLine: 'underline',
    },
    titleTextStyle: {
      fontFamily: fonts.regular,
      fontWeight: '600',
      color: '#0D2050',
      fontSize: 16,
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default KeyInformation;
