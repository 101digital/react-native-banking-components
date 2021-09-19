import React, { ReactNode, useContext } from 'react';
import { Dimensions, Platform, SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';
import { BRoundedCloseIcon, BRoundedTickIcon, BTransactionIcon } from '../../assets/images';
import { Wallet } from '@banking-component/core';
import { ActionSheetStyle } from '../../types';
import useMergeStyles from './styles';
import { ThemeContext } from 'react-native-theme-component';

const deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT');

export type ActionSheetComponentProps = {
  wallet?: Wallet;
  isVisible?: boolean;
  style?: ActionSheetStyle;
  setPrimaryLabel?: string;
  unlinkLabel?: string;
  viewTransactionLabel?: string;
  cancelLabel?: string;
  setPrimaryIcon?: ReactNode;
  unlinkIcon?: ReactNode;
  viewTransactionIcon?: ReactNode;
  cancelIcon?: ReactNode;
  onSetPrimaryPress?: (wallet: Wallet) => void;
  onUnlinkPress?: (wallet: Wallet) => void;
  onPressViewTransactions?: (wallet: Wallet) => void;
  onCancelPress?: () => void;
};

const ActionSheetComponent = (props: ActionSheetComponentProps) => {
  const {
    wallet,
    isVisible,
    style,
    setPrimaryIcon,
    unlinkIcon,
    setPrimaryLabel,
    unlinkLabel,
    cancelLabel,
    cancelIcon,
    viewTransactionIcon,
    viewTransactionLabel,
    onSetPrimaryPress,
    onUnlinkPress,
    onCancelPress,
    onPressViewTransactions,
  } = props;
  const styles = useMergeStyles(style);
  const { i18n } = useContext(ThemeContext);

  return (
    <Modal
      deviceHeight={deviceHeight}
      backdropTransitionInTiming={50}
      backdropTransitionOutTiming={50}
      hideModalContentWhileAnimating
      useNativeDriverForBackdrop
      useNativeDriver
      backdropOpacity={0.5}
      statusBarTranslucent
      isVisible={isVisible && wallet !== undefined}
      style={styles.modalStyle}
      onBackButtonPress={onCancelPress}
      onBackdropPress={onCancelPress}
    >
      <SafeAreaView style={styles.containerStyles}>
        {wallet !== undefined ? (
          <View style={styles.containerStyles}>
            {!wallet.isDefaultWallet && (
              <TouchableOpacity
                style={styles.buttonContainerStyle}
                activeOpacity={0.8}
                onPress={() => {
                  onCancelPress?.();
                  onSetPrimaryPress?.(wallet);
                }}
              >
                <View style={styles.leftIconContainer}>
                  {setPrimaryIcon ?? <BRoundedTickIcon width={20} height={20} />}
                </View>
                <Text style={styles.buttonTextStyle}>
                  {setPrimaryLabel ??
                    i18n?.t('wallet_component.btn_set_primary') ??
                    'Set as primary account'}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.buttonContainerStyle}
              activeOpacity={0.8}
              onPress={() => {
                onCancelPress?.();
                onUnlinkPress?.(wallet);
              }}
            >
              <View style={styles.leftIconContainer}>
                {unlinkIcon ?? <BRoundedCloseIcon width={20} height={20} />}
              </View>
              <Text style={styles.buttonTextStyle}>
                {unlinkLabel ??
                  i18n?.t('wallet_component.btn_unlink_account') ??
                  'Unlink bank account'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainerStyle}
              activeOpacity={0.8}
              onPress={() => {
                onCancelPress?.();
                onPressViewTransactions?.(wallet);
              }}
            >
              <View style={styles.leftIconContainer}>
                {viewTransactionIcon ?? <BTransactionIcon width={20} height={20} />}
              </View>
              <Text style={styles.buttonTextStyle}>
                {viewTransactionLabel ??
                  i18n?.t('wallet_component.btn_view_transaction') ??
                  'View transactions'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelContainerStyle}
              activeOpacity={0.8}
              onPress={onCancelPress}
            >
              {cancelIcon}
              <Text style={styles.cancelTextStyle}>
                {cancelLabel ?? i18n?.t('wallet_component.btn_cancel')?.toUpperCase() ?? 'CANCEL'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View />
        )}
      </SafeAreaView>
    </Modal>
  );
};

ActionSheetComponent.defaultProps = {
  isVisible: false,
};

export default React.memo(ActionSheetComponent);
