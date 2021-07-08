import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import WebView, { WebViewNavigation } from 'react-native-webview';
import { BankLoginComponentProps } from './types';
import styles from './styles';
import { BankThemeContext } from '../../contexts/theme-context';
import { BankContext } from '../../contexts/bank-context';

const BankLoginComponent = (props: BankLoginComponentProps) => {
  const { containerStyle, bank, loadingIndicator, onConfirmed } = props;
  const { consentData, isLoadingConsent, confirmConsent, getAccounts } = useContext(BankContext);
  const { theme } = useContext(BankThemeContext);

  if (isLoadingConsent || !consentData) {
    return (
      <View style={styles.loadingWrap}>
        {loadingIndicator ?? <ActivityIndicator color={theme.primaryColor} />}
      </View>
    );
  }

  const handleOnShouldStartLoadWithRequest = (event: WebViewNavigation) => {
    const { url } = event;
    if (consentData && url.startsWith(consentData.redirectUrl)) {
      const code = getUrlParameter(url, 'code');
      confirmConsent(bank.id, consentData.accountRequestId, code).then((consentId) => {
        if (consentId) {
          getAccounts(consentId);
          onConfirmed(consentId);
        }
      });
      return false;
    }
    return true;
  };

  const getUrlParameter = (url: string, name: string) => {
    name = name.replace(/\\[[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(url);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  return (
    <View style={[styles.containerStyle, containerStyle]}>
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
