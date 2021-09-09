import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { BWarningIcon } from '../../../../assets/images';
import { PermissionComponentStyles } from '../../types';
import useMergeStyles from './styles';

export type PermissionComponentProps = {
  message?: string;
  leftIcon?: ReactNode;
  style?: PermissionComponentStyles;
};

const PermissionComponent = (props: PermissionComponentProps) => {
  const { message, leftIcon, style } = props;
  const styles = useMergeStyles(style);
  return (
    <View style={styles.containerStyle}>
      {leftIcon ?? <BWarningIcon width={20} height={20} color="#FFBB05" />}
      <View style={styles.messageWrapper}>
        <Text style={styles.messageTextStyle}>
          {message ??
            'By continuing you will be redirected to your bank provider to allow access to your account'}
        </Text>
      </View>
    </View>
  );
};

export default PermissionComponent;
