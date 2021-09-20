import React from 'react';
import { Text, View } from 'react-native';
import { ShareContentComponentStyles } from '../../types';
import useMergeStyles from './styles';

export type ShareContentComponentProps = {
  i18n?: any;
  style?: ShareContentComponentStyles;
  contents?: string[];
  titleLabel?: string;
};

const ShareContentComponent = (props: ShareContentComponentProps) => {
  const { style, contents, titleLabel, i18n } = props;
  const styles = useMergeStyles(style);

  const _contents = contents ?? [
    i18n?.t('consent_component.lbl_account_details') ?? 'Account details',
    i18n?.t('consent_component.lbl_transactions') ?? 'Transactions',
    i18n?.t('consent_component.lbl_account_balance') ?? 'Account balance',
  ];

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleTextStyle}>
        {titleLabel ?? i18n?.t('consent_component.lbl_what_will_share') ?? 'What you will share'}
      </Text>
      {_contents.map((item, index) => (
        <View key={`${item}-${index}`} style={styles.itemContentContainerStyle}>
          <View style={styles.dotContainerStyle} />
          <Text style={styles.contentTextStyle}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

export default ShareContentComponent;
