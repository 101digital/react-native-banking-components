import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { BankContext } from '../../contexts/bank-context';
import { Button } from 'react-native-theme-component';
import { PermissionComponent, ShareContentComponent } from './components';
import useMergeStyles from './styles';
import { ConsentComponentProps } from './types';

const ConsentComponent = (props: ConsentComponentProps) => {
  const { Root, ShareContent, Permission } = props;
  const bank = Root.props.bank;

  const styles = useMergeStyles(Root?.style);

  const { getConsent } = useContext(BankContext);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.subContainer}>
        <Text style={styles.headingTextStyle}>
          {`${bank.name} will share below data with us when you link your account`}
        </Text>
        <ShareContentComponent style={ShareContent?.style} {...ShareContent?.props} />
        <PermissionComponent
          style={Permission?.style}
          {...Permission?.components}
          {...Permission?.props}
        />
      </View>
      <View style={styles.ctaButtonWrapper}>
        <Button
          label={Root.props.ctaButtonLabel ?? 'CONTINUE'}
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
