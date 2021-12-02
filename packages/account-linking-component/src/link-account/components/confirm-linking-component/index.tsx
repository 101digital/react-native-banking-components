import {
  ConfirmLinkingComponentProps,
  ConfirmLinkingComponentStyles,
  LinkBankStatus,
} from '../../types';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Button, ThemeContext } from 'react-native-theme-component';
import useMergeStyle from './styles';
import { SuccessIcon, FailedIcon } from '../../../assets/images';

const ConfirmLinkingComponent = (props: ConfirmLinkingComponentProps) => {
  const [status, setStatus] = useState<LinkBankStatus>(LinkBankStatus.isLinking);
  const { bank, style, successIcon, failedIcon } = props;
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
    return status === LinkBankStatus.isSuccess ? 'Success!' : 'Failed!';
  };

  const getIcon = () => {
    return status === LinkBankStatus.isSuccess
      ? successIcon ?? <SuccessIcon />
      : failedIcon ?? <FailedIcon />;
  };

  const getSubTitle = () => {
    return status === LinkBankStatus.isSuccess
      ? `Your ${bank.name} account successfully linked.`
      : `Your ${bank.name} account linking failed.`;
  };

  const getMessage = () => {
    return status === LinkBankStatus.isSuccess
      ? 'You can manage the Consent by going to Settings > Manage Data Sharing.'
      : 'You can retry Account Linking by going to  Accounts > Link Account.';
  };

  return (
    <View style={styles.containerStyle}>
      <View style={styles.containerStyle}>
        <Text style={styles.titleTextStyle}>{getTitle()}</Text>
        <View style={styles.statusIconContainerStyle}>{getIcon()}</View>
        <Text style={styles.subTitleTextStyle}>{getSubTitle()}</Text>
        <Text style={styles.messageTextStyle}>{getMessage()}</Text>
      </View>
      <Button
        label='Go to Accounts'
        style={{
          primaryContainerStyle: {
            width: '100%',
            marginHorizontal: 15,
          },
        }}
      />
    </View>
  );
};

export default ConfirmLinkingComponent;
