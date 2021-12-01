import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import WebView, { WebViewNavigation } from 'react-native-webview';
import styles from './styles';
import { ThemeContext } from 'react-native-theme-component';
import { AccountLinkingContext } from '../../../context/account-linking-context';
import { getUrlParameter } from '@banking-component/core';
import { BankLoginComponentProps } from '../../types';

const BankLoginComponent = (props: BankLoginComponentProps) => {
  const { bank, loadingIndicator, onConfirmed, onLinked } = props;
  const {
    consentData,
    isLoadingConsent,
    confirmConsent,
    getAccounts,
    clearConsentData,
    clearBankErrors,
  } = useContext(AccountLinkingContext);
  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    return () => {
      clearConsentData();
      clearBankErrors();
    };
  }, []);

  if (isLoadingConsent || !consentData) {
    return (
      <View style={styles.loadingWrap}>
        {loadingIndicator ?? <ActivityIndicator color={colors.primaryColor} />}
      </View>
    );
  }

  const handleOnShouldStartLoadWithRequest = (event: WebViewNavigation) => {
    const { url } = event;
    if (consentData && url.startsWith(consentData.redirectUrl)) {
      const code = getUrlParameter(url, 'code');
      confirmConsent(bank.id, consentData.accountRequestId, code).then((consentId) => {
        if (consentId) {
          if (!bank.isInternalVirtualBank) {
            onLinked(bank.id, consentId);
          } else {
            getAccounts(consentId);
            onConfirmed(consentId);
          }
        }
      });
      return false;
    }
    return true;
  };

  return (
    <View style={styles.containerStyle}>
      <WebView
        scalesPageToFit
        incognito
        startInLoadingState
        javaScriptEnabled
        onShouldStartLoadWithRequest={handleOnShouldStartLoadWithRequest}
        source={{ uri: consentData.loginUrl }}
      />
    </View>
  );
};

export default BankLoginComponent;
