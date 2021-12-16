import { defaultsDeep } from '@banking-component/core';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { AccountsProps, AccountsStyles } from '../types';
import { ArrowDownIcon } from '../../assets/images';
import { ConsentSummaryItem } from '../../types';

const Accounts = (props: AccountsProps) => {
  const { wallets, style, consentSummary } = props;
  const styles: AccountsStyles = useMergeStyles(style);
  const [isShowFull, setIsShowFull] = useState(false);
  const { colors, i18n } = useContext(ThemeContext);
  const [accessFrequency, setAccessFrequency] = useState<ConsentSummaryItem | undefined>(undefined);

  useEffect(() => {
    if (consentSummary) {
      setAccessFrequency(consentSummary.items.find((i) => i.id === 'access_frequency'));
    }
  }, [consentSummary]);

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleTextStyle}>
        {i18n?.t('consent_manager.lbl_accounts') ?? 'Accounts'}
      </Text>
      {wallets.map((w) => {
        return (
          <View key={w.walletId} style={styles.accountItemContainerStyle}>
            <Text style={styles.walletNameStyle}>{w.walletName}</Text>
            <Text style={styles.walletNumberStyle}>
              {`${w.bankAccount?.bankBranchId ?? ''} ${w.bankAccount.accountNumber}`.trim()}
            </Text>
          </View>
        );
      })}
      {accessFrequency && (
        <>
          <TouchableOpacity
            onPress={() => setIsShowFull(!isShowFull)}
            activeOpacity={0.8}
            style={styles.accessDataContainerStyle}
          >
            <Text style={styles.accessDataTitleStyle}>{accessFrequency.title}</Text>
            <View
              style={{
                transform: [{ rotate: isShowFull ? '180deg' : '0deg' }],
              }}
            >
              <ArrowDownIcon size={10} color={colors.primaryColor} />
            </View>
          </TouchableOpacity>
          {isShowFull && (
            <Text style={styles.accessDataMessageStyle}>{accessFrequency.message}</Text>
          )}
        </>
      )}
    </View>
  );
};

const useMergeStyles = (style?: AccountsStyles): AccountsStyles => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles: AccountsStyles = StyleSheet.create({
    containerStyle: {
      paddingHorizontal: 16,
      paddingBottom: 10,
    },
    titleTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 16,
      color: '#0D2050',
    },
    accountItemContainerStyle: {
      marginHorizontal: 2,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(191, 191, 191, 0.2)',
      paddingVertical: 15,
    },
    walletNameStyle: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: '#244065',
    },
    walletNumberStyle: {
      fontFamily: fonts.regular,
      fontSize: 10,
      color: '#244065',
      marginTop: 4,
    },
    accessDataContainerStyle: {
      flexDirection: 'row',
      marginTop: 20,
      alignItems: 'center',
      marginBottom: 10,
    },
    accessDataTitleStyle: {
      fontFamily: fonts.medium,
      fontSize: 14,
      color: '#0D2050',
      marginRight: 15,
    },
    accessDataMessageStyle: {
      fontFamily: fonts.regular,
      fontSize: 12,
      color: '#244065',
      marginBottom: 10,
      paddingHorizontal: 2,
      lineHeight: 24,
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default Accounts;
