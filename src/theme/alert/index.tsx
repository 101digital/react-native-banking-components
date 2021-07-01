import React, { ReactNode, useContext } from 'react';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { BCloseIcon } from '../../assets/images';
import { ThemeContext } from '../../contexts/them-context';
import BankingButton from '../button';

const deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT');

export type AlertModalProps = {
  title: string;
  message?: string;
  isVisible?: boolean;
  children?: ReactNode;
  leftIcon?: ReactNode;
  confirmTitle?: string;
  cancelTitle?: string;
  onConfirmed?: () => void;
  onClose: () => void;
  onCancel?: () => void;
};

const BAlertModal = (props: AlertModalProps) => {
  const {
    title,
    isVisible,
    children,
    onConfirmed,
    onCancel,
    message,
    onClose,
    cancelTitle,
    confirmTitle,
    leftIcon,
  } = props;
  const { theme } = useContext(ThemeContext);
  const {
    containerStyle,
    headerStyle,
    bodyStyle,
    footerStyle,
    backdropOpacity,
    messageStyle,
    titleStyle,
    modalStyle,
    leftIconStyle,
    closeButtonStyle,
    horizontalSpace,
  } = theme.alertTheme;

  const styles = StyleSheet.create({
    spacer: {
      width: horizontalSpace,
    },
    button: {
      flex: 1,
    },
    titleNoIcon: {
      paddingLeft: horizontalSpace,
    },
    titleWithIcon: {
      paddingLeft: 0,
    },
  });

  return (
    <Modal
      deviceHeight={deviceHeight}
      backdropTransitionInTiming={50}
      backdropTransitionOutTiming={50}
      hideModalContentWhileAnimating
      useNativeDriverForBackdrop
      useNativeDriver
      backdropOpacity={backdropOpacity}
      statusBarTranslucent
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible={isVisible}
      style={modalStyle}
    >
      <View style={containerStyle}>
        <View style={headerStyle}>
          {leftIcon && (
            <View style={[leftIconStyle, { paddingLeft: horizontalSpace }]}>{leftIcon}</View>
          )}
          <Text style={[titleStyle, leftIcon ? styles.titleWithIcon : styles.titleNoIcon]}>
            {title}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[closeButtonStyle, { paddingHorizontal: horizontalSpace }]}
            onPress={onClose}
          >
            <BCloseIcon width={15} height={15} />
          </TouchableOpacity>
        </View>
        <View style={[bodyStyle, { paddingHorizontal: horizontalSpace }]}>
          {message && <Text style={messageStyle}>{message}</Text>}
          {children}
        </View>
        <View style={[footerStyle, { marginHorizontal: horizontalSpace }]}>
          {cancelTitle ? (
            <BankingButton
              isPrimary={false}
              style={styles.button}
              label={cancelTitle ?? ''}
              onPress={onCancel}
            />
          ) : (
            <View style={styles.button} />
          )}
          <View style={styles.spacer} />
          <BankingButton style={styles.button} label={confirmTitle ?? ''} onPress={onConfirmed} />
        </View>
      </View>
    </Modal>
  );
};

BAlertModal.defaultProps = {
  isVisible: false,
  confirmTitle: 'OK',
};

export default BAlertModal;
