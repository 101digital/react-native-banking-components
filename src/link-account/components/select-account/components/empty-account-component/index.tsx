import React, { ReactNode, useContext } from 'react';
import { Text, View } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { BNoWalletIcon } from '../../../../../assets/images';
import { EmptyBankAccountStyles } from '../../../../types';
import useMergeStyles from './styles';

export type EmptyAccountComponentProps = {
  placeholderIcon?: ReactNode;
  style?: EmptyBankAccountStyles;
};

const EmptyAccountComponent = (props: EmptyAccountComponentProps) => {
  const { placeholderIcon, style } = props;
  const { i18n } = useContext(ThemeContext);

  const styles = useMergeStyles(style);

  return (
    <View style={styles.containerStyle}>
      {placeholderIcon ?? <BNoWalletIcon size={105} />}
      <Text style={styles.messageTextStyle}>
        {i18n?.t('link_bank_component.msg_empty_account') ?? 'No Accounts Found'}
      </Text>
    </View>
  );
};

export default EmptyAccountComponent;
