import { Wallet } from '@banking-component/core';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { DataSharingDetailComponentProps, DataSharingDetailComponentStyles } from '../types';
import Accounts from './accounts';
import AdditionalInformation from './additional-information';
import ConsentOverview from './consent-overview';
import DataShared from './data-shared';
import KeyInformation from './key-information';
import useMergeStyles from './styles';

const DataSharingDetailComponent = (props: DataSharingDetailComponentProps) => {
  const { accountConsent, wallets, periodFormat, style, consentData, onPressedLink } = props;
  const [bankWallets, setBankWallets] = useState<Wallet[]>([]);
  const _dateFormat = periodFormat ?? 'DD MMM YYYY';
  const styles: DataSharingDetailComponentStyles = useMergeStyles(style);

  useEffect(() => {
    getWalletByBank();
  }, [wallets, accountConsent]);

  const getWalletByBank = () => {
    setBankWallets(wallets.filter((w) => w.bankAccount.bankCode === accountConsent.aspspInfo.id));
  };

  return (
    <ScrollView style={styles.containerStyle}>
      <ConsentOverview
        dateFormat={_dateFormat}
        accountConsent={accountConsent}
        style={style?.consentOverviewStyle}
      />
      <KeyInformation
        accountConsent={accountConsent}
        dateFormat={_dateFormat}
        style={style?.keyInformationStyle}
      />
      <Accounts
        wallets={bankWallets}
        consentSummary={consentData.consentSummaries.find((cs) => cs.id === 'key_ìnformation')}
        style={style?.accountsStyle}
      />
      <DataShared accountConsent={accountConsent} style={style?.dataSharedStyle} />
      <AdditionalInformation
        accountConsent={accountConsent}
        companyName={consentData.companyName}
        companyLink={consentData.companyLink}
        style={style?.additionalInformationStyle}
        onPressedLink={onPressedLink}
      />
    </ScrollView>
  );
};

export default DataSharingDetailComponent;
