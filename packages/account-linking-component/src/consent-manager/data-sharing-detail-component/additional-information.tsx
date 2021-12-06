import { defaultsDeep } from '@banking-component/core';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { AdditionalDataProps, AddtionalDataStyles } from '../types';
import { ArrowDownIcon, CDRIcon } from '../../assets/images';

const AdditionalInformation = (props: AdditionalDataProps) => {
  const { accountConsent, style, companyName, onPressedLink, companyLink } = props;
  const [isShowFull, setIsShowFull] = useState(false);
  const { colors, i18n } = useContext(ThemeContext);
  const styles: AddtionalDataStyles = useMergeStyles(style);

  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.headerContainerStyle}
        onPress={() => setIsShowFull(!isShowFull)}
      >
        <Text style={styles.titleTextStyle}>
          {i18n?.t('consent_manager.lbl_additional_information') ?? 'Additional information'}
        </Text>
        <View
          style={{
            transform: [{ rotate: isShowFull ? '180deg' : '0deg' }],
          }}
        >
          <ArrowDownIcon size={10} color={colors.primaryColor} />
        </View>
      </TouchableOpacity>
      {isShowFull && (
        <>
          <Text style={styles.messageTextStyle}>
            {(
              i18n?.t('consent_manager.msg_additional_information') ??
              '%s is a accredited data recepient, you can check more details '
            ).replace('%s', companyName)}
            <Text onPress={() => onPressedLink(companyLink)} style={styles.hiperLinkTextStyle}>{`${
              i18n?.t('consent_manager.btn_here') ?? 'here'
            }.`}</Text>
          </Text>
          <View style={styles.cdrContainerStyle}>
            <CDRIcon />
            <View style={styles.cdrContentContainerStyle}>
              <Text style={styles.cdrMessageStyle}>
                {i18n?.t('consent_manager.lbl_consumer_data_recipient') ??
                  'Accredited Consumer Data Right Recipient'}
              </Text>
              <Text style={styles.cdrCompanyNameStyle}>{companyName}</Text>
              <Text style={styles.cdrMessageStyle}>
                {(
                  i18n?.t('consent_manager.lbl_recipient_id') ?? 'Accredited Data Recipeint: %s'
                ).replace('%s', accountConsent.aspspInfo.accreditedDataRecipientId ?? '')}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const useMergeStyles = (style?: AddtionalDataStyles): AddtionalDataStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: AddtionalDataStyles = StyleSheet.create({
    containerStyle: {
      paddingHorizontal: 16,
      paddingVertical: 20,
    },
    headerContainerStyle: {
      flexDirection: 'row',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    titleTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 16,
      fontWeight: '600',
      color: '#0D2050',
    },
    messageTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 12,
      color: '#244065',
      lineHeight: 24,
    },
    hiperLinkTextStyle: {
      color: colors.primaryColor,
      textDecorationLine: 'underline',
    },
    cdrContainerStyle: {
      marginHorizontal: 5,
      marginVertical: 15,
      borderWidth: 1,
      borderColor: '#E1E1E1',
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    cdrContentContainerStyle: {
      flex: 1,
      marginLeft: 17,
    },
    cdrMessageStyle: {
      fontFamily: fonts.regular,
      fontSize: 10,
      color: '#244065',
    },
    cdrCompanyNameStyle: {
      fontFamily: fonts.regular,
      fontWeight: '600',
      fontSize: 12,
      color: '#244065',
      marginVertical: 5,
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default AdditionalInformation;
