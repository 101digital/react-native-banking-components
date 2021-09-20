import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { AccountLinkingContext } from '../../src/context/account-linking-context';
import { Button } from 'react-native-theme-component';
import { PermissionComponent, ShareContentComponent } from './components';
import useMergeStyles from './styles';
import { ConsentComponentProps } from './types';

const ConsentComponent = (props: ConsentComponentProps) => {
  const { Root, ShareContent, Permission } = props;
  const { bank, i18n, headingLabel } = Root.props;

  const styles = useMergeStyles(Root?.style);

  const { getConsent } = useContext(AccountLinkingContext);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.subContainer}>
        <Text style={styles.headingTextStyle}>
          {(
            headingLabel ??
            i18n?.t('consent_component.msg_share_consent_data') ??
            '%s will share below data with us when you link your account'
          ).replace('%s', bank.name)}
        </Text>
        <ShareContentComponent i18n={i18n} style={ShareContent?.style} {...ShareContent?.props} />
        <PermissionComponent
          style={Permission?.style}
          i18n={i18n}
          {...Permission?.components}
          {...Permission?.props}
        />
      </View>
      <View style={styles.ctaButtonWrapper}>
        <Button
          label={
            Root.props.ctaButtonLabel ??
            i18n?.t('consent_component.btn_continue')?.toUpperCase() ??
            'CONTINUE'
          }
          onPress={() => {
            getConsent(bank.id);
            Root.props.onContinue();
          }}
        />
      </View>
    </View>
  );
};

export default ConsentComponent;
