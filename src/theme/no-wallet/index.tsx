import React, { ReactNode, useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { BNoWalletIcon, BPlusIcon } from '../../assets/images';
import { ThemeContext } from '../../contexts/them-context';
import { NoWalletThemeStyles } from '../types';
import useMergeStyles from './styles';

export type NoWalletComponentProps = {
  message?: string;
  buttonLabel?: string;
  placeholderIcon?: ReactNode;
  leftIcon?: ReactNode;
  onLinkAccountPressed?: () => void;
  style?: NoWalletThemeStyles;
};

const BNoWalletComponent = (props: NoWalletComponentProps) => {
  const { message, placeholderIcon, leftIcon, style, onLinkAccountPressed, buttonLabel } = props;
  const { theme } = useContext(ThemeContext);

  const styles = useMergeStyles(style);

  return (
    <View style={styles.containerStyle}>
      {placeholderIcon ?? <BNoWalletIcon size={105} />}
      <Text style={styles.messageTextStyle}>{message ?? 'No Bank Account Linked'}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.buttonContainerStyle}
        onPress={onLinkAccountPressed}
      >
        {leftIcon ?? <BPlusIcon width={20} height={20} color={theme.primaryColor} />}
        <Text style={styles.buttonTextStyle}>{buttonLabel ?? 'Link Bank Account'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BNoWalletComponent;
