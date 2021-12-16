import {
  ConfirmLinkingComponentProps,
  ConfirmLinkingComponentStyles,
  LinkBankStatus,
} from '../../types';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Text, View } from 'react-native';
import { Button, ThemeContext } from 'react-native-theme-component';
import useMergeStyle from './styles';
import { SuccessIcon, FailedIcon } from '../../../assets/images';
const { width } = Dimensions.get('window');

const ConfirmLinkingComponent = (props: ConfirmLinkingComponentProps) => {
  const [status, setStatus] = useState<LinkBankStatus>(LinkBankStatus.isLinking);
  const { bank, style, successIcon, failedIcon, onGoToAccount } = props;
  const { colors, i18n } = useContext(ThemeContext);
  const styles: ConfirmLinkingComponentStyles = useMergeStyle(style);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  if (status === LinkBankStatus.isLinking) {
    return (
      <View style={styles.containerStyle}>
        <ActivityIndicator color={colors.primaryColor} />
      </View>
    );
  }

  const getTitle = () => {
    return status === LinkBankStatus.isSuccess
      ? i18n?.t('link_bank_component.lbl_success') ?? 'Success!'
      : i18n?.t('link_bank_component.lbl_failed') ?? 'Failed!';
  };

  const getIcon = () => {
    return status === LinkBankStatus.isSuccess
      ? successIcon ?? <SuccessIcon />
      : failedIcon ?? <FailedIcon />;
  };

  const getSubTitle = () => {
    return status === LinkBankStatus.isSuccess
      ? (
          i18n?.t('link_bank_component.lbl_link_bank_success') ??
          'Your %s account successfully linked.'
        ).replace('%s', bank.name)
      : (
          i18n?.t('link_bank_component.lbl_link_bank_failed') ?? 'Your %s account linking failed.'
        ).replace('%s', bank.name);
  };

  const getMessage = () => {
    return status === LinkBankStatus.isSuccess
      ? i18n?.t('link_bank_component.msg_link_bank_success') ??
          'You can manage the Consent by going to Settings > Manage Data Sharing.'
      : i18n?.t('link_bank_component.msg_link_bank_failed') ??
          'You can retry Account Linking by going to  Accounts > Link Account.';
  };

  return (
    <View style={styles.containerStyle}>
      <View style={styles.contentContainerStyle}>
        <Text style={styles.titleTextStyle}>{getTitle()}</Text>
        <View style={styles.statusIconContainerStyle}>{getIcon()}</View>
        <Text style={styles.subTitleTextStyle}>{getSubTitle()}</Text>
        <Text style={styles.messageTextStyle}>{getMessage()}</Text>
      </View>
      <Button
        label={i18n?.t('link_bank_component.btn_go_to_account') ?? 'Go to Accounts'}
        onPress={onGoToAccount}
        style={{
          primaryContainerStyle: {
            width: width - 30,
            marginVertical: 10,
          },
        }}
      />
    </View>
  );
};

export default ConfirmLinkingComponent;
