import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { AccessInfoComponentStyles } from '../../../../types';
import useMergeStyles from './styles';

export type AccessInfoComponentProps = {
  companyName: string;
  data?: string[];
  style?: AccessInfoComponentStyles;
};

const AccessInfoComponent = (props: AccessInfoComponentProps) => {
  const { companyName, data, style } = props;
  const { i18n } = useContext(ThemeContext);

  const styles = useMergeStyles(style);

  const _infos = data ?? [
    i18n?.t('link_bank_component.lbl_account_details') ?? 'Account details',
    i18n?.t('link_bank_component.lbl_transactions') ?? 'Transactions',
    i18n?.t('link_bank_component.lbl_account_balance') ?? 'Account balance',
  ];

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleTextStyle}>
        {(
          i18n?.t('link_bank_component.lbl_access_info') ??
          '%s will have access to the below Information'
        ).replace('%s', companyName)}
      </Text>
      {_infos.map((item, index) => (
        <View key={`${item}-${index}`} style={styles.itemContentContainerStyle}>
          <View style={styles.dotContainerStyle} />
          <Text style={styles.contentTextStyle}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

export default AccessInfoComponent;
