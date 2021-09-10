import React, { forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import { ActivityIndicator, SectionList, View } from 'react-native';
import useMergeStyles from './styles';
import { AccountComponentProps, AccountComponentRefs } from './types';
import {
  ActionSheetComponent,
  BalanceComponent,
  LinkAccountComponent,
  SelectionComponent,
  SetPrimaryComponent,
  WalletItemComponent,
} from './components';
import { Wallet, isEmpty, BNoWalletComponent, uniqBy } from '@banking-component/core';
import { BInformationIcon } from './assets/images';
import { WalletContext } from '../src/context/wallet-context';
import { ThemeContext, AlertModal } from 'react-native-theme-component';

const AccountComponent = forwardRef((props: AccountComponentProps, ref) => {
  const {
    Root,
    Balance,
    Section,
    WalletItem,
    ActionSheet,
    LinkAccountButton,
    ConfirmSetPrimaryModal,
    ConfirmUnlinkModal,
    EmptyWallet,
    LinkAccountSuccessModal,
  } = props;
  const containerStyle = Root?.style;
  const { formatCurrency, scrollHandler } = Root.props;
  const styles = useMergeStyles(containerStyle);
  const {
    summary,
    getDefaultWallet,
    getGroupWallets,
    deleteWallet,
    setPrimaryWallet,
    wallets,
    isLoadingWallets,
    linkedWallet,
    isLinkingWallet,
    clearLinkedWallet,
    fetchWallets,
  } = useContext(WalletContext);
  const { colors } = useContext(ThemeContext);
  const currencyCode = getDefaultWallet()?.currencyCode ?? 'USD';
  const currentBalance = summary?.currentBalance ?? 0;
  const groupedWallets = getGroupWallets();
  const [selectedWallet, setSelectedWallet] = useState<Wallet | undefined>(undefined);
  const [isShowActionSheet, setShowActionSheet] = useState(false);
  const [isShowUnlink, setShowUnlink] = useState(false);
  const [isShowPrimary, setShowPrimary] = useState(false);
  const [walletWithBanners, setWalletWithBanners] = useState<Wallet[]>([]);
  const [isSelectedPrimary, setSelectedPrimary] = useState(false);

  useEffect(() => {
    if (!linkedWallet) {
      setTimeout(() => {
        setSelectedPrimary(true);
      }, 500);
    }
  }, [linkedWallet]);

  useImperativeHandle(
    ref,
    (): AccountComponentRefs => ({
      showActionsSheet,
      unlinkWallet,
      setAsPrimary,
      showRecommandBanner,
      hideActionSheet,
    })
  );

  const showActionsSheet = (wallet: Wallet) => {
    setSelectedWallet(wallet);
    setShowActionSheet(true);
  };

  const unlinkWallet = (wallet: Wallet) => {
    setSelectedWallet(wallet);
    setTimeout(() => {
      setShowUnlink(true);
    }, 500);
  };

  const setAsPrimary = (wallet: Wallet) => {
    setSelectedWallet(wallet);
    setTimeout(() => {
      setShowPrimary(true);
    }, 500);
  };

  const showRecommandBanner = (wallet: Wallet) => {
    walletWithBanners.push(wallet);
    setWalletWithBanners(uniqBy(walletWithBanners, 'walletId'));
  };

  const hideActionSheet = () => {
    setSelectedWallet(undefined);
    setShowActionSheet(false);
  };

  const renderSuccessModal = () => {
    return (
      <AlertModal
        isVisible={
          !isLinkingWallet && linkedWallet !== undefined && !ConfirmSetPrimaryModal?.props?.disable
        }
        title={LinkAccountSuccessModal?.props?.title ?? 'Account Added Succefully'}
        confirmTitle={LinkAccountSuccessModal?.props?.confirmButonLabel ?? 'Continue'}
        onClose={() => {
          clearLinkedWallet();
          fetchWallets();
        }}
        message={
          LinkAccountSuccessModal?.props?.message ??
          'Your bank account is successfully linked to your profile.'
        }
        onConfirmed={() => {
          if (isSelectedPrimary) {
            const wallet = linkedWallet;
            if (wallet) {
              setPrimaryWallet(wallet.walletId);
            }
          } else {
            clearLinkedWallet();
            fetchWallets();
          }
        }}
      >
        {LinkAccountSuccessModal?.components?.renderSetPrimary?.(isSelectedPrimary, () => {
          setSelectedPrimary(!isSelectedPrimary);
        }) ?? (
          <SetPrimaryComponent
            isSelected={isSelectedPrimary}
            disabled={isEmpty(wallets)}
            style={LinkAccountSuccessModal?.style}
            onPressed={() => setSelectedPrimary(!isSelectedPrimary)}
            {...LinkAccountSuccessModal?.props}
            {...LinkAccountSuccessModal?.components}
          />
        )}
      </AlertModal>
    );
  };

  if (isEmpty(wallets)) {
    if (isLoadingWallets) {
      return (
        <View style={styles.loadingWrap}>
          {Root?.components?.loadingIndicator ?? <ActivityIndicator color={colors.primaryColor} />}
        </View>
      );
    }
    return (
      <>
        <View style={styles.listContainerStyle}>{Root.components?.headerTitle}</View>
        <BNoWalletComponent
          style={EmptyWallet?.style}
          {...EmptyWallet?.props}
          {...EmptyWallet?.components}
        />
        {renderSuccessModal()}
      </>
    );
  }

  return (
    <>
      <View style={styles.containerStyle}>
        {groupedWallets && (
          <SectionList
            {...scrollHandler}
            sections={groupedWallets}
            style={styles.listContainerStyle}
            keyExtractor={(item) => item.walletId}
            extraData={Root.props.bankImages}
            renderItem={({ item, index }) => {
              const isShowSwitch =
                walletWithBanners.find((w) => w.walletId === item.walletId) !== undefined;
              return (
                WalletItem?.components?.renderItem?.(index, item) ?? (
                  <WalletItemComponent
                    wallet={item}
                    isShowSwitch={isShowSwitch}
                    style={WalletItem?.style}
                    formatCurrency={formatCurrency}
                    {...WalletItem?.props}
                    {...WalletItem?.components}
                  />
                )
              );
            }}
            ItemSeparatorComponent={() => <View style={styles.listDivider} />}
            ListHeaderComponent={
              <View>
                {Root.components?.headerTitle}
                <BalanceComponent
                  balance={formatCurrency(currentBalance, currencyCode)}
                  style={Balance?.style}
                  {...Balance?.props}
                  {...Balance?.components}
                />
              </View>
            }
            ListFooterComponent={() => (
              <LinkAccountComponent
                style={LinkAccountButton?.style}
                {...LinkAccountButton?.props}
                {...LinkAccountButton?.components}
              />
            )}
            renderSectionHeader={({ section: { section } }) => {
              return (
                Section?.components?.renderSection?.(section) ?? (
                  <SelectionComponent title={section} style={Section?.style} />
                )
              );
            }}
          />
        )}
      </View>
      <ActionSheetComponent
        isVisible={isShowActionSheet}
        wallet={selectedWallet}
        onCancelPress={hideActionSheet}
        style={ActionSheet?.style}
        {...ActionSheet?.props}
        {...ActionSheet?.components}
      />
      <AlertModal
        isVisible={isShowUnlink && !ConfirmUnlinkModal?.props?.disable}
        title={ConfirmUnlinkModal?.props?.title ?? 'Unlink Bank Account'}
        cancelTitle={ConfirmUnlinkModal?.props?.cancelButtonLabel ?? 'Cancel'}
        confirmTitle={ConfirmUnlinkModal?.props?.confirmButonLabel}
        onClose={() => setShowUnlink(false)}
        onCancel={() => setShowUnlink(false)}
        leftIcon={
          ConfirmUnlinkModal?.components?.leftIcon ?? (
            <BInformationIcon width={20} height={20} color={colors.primaryColor} />
          )
        }
        message={
          ConfirmUnlinkModal?.props?.message ??
          'Are you sure? once unlinked, you cannot undo this action.'
        }
        onConfirmed={() => {
          const wallet = selectedWallet;
          setShowUnlink(false);
          if (wallet) {
            deleteWallet(wallet);
          }
          setSelectedWallet(undefined);
        }}
      />
      <AlertModal
        isVisible={isShowPrimary && !ConfirmSetPrimaryModal?.props?.disable}
        title={ConfirmSetPrimaryModal?.props?.title ?? 'Confirmation'}
        cancelTitle={ConfirmSetPrimaryModal?.props?.cancelButtonLabel ?? 'Cancel'}
        confirmTitle={ConfirmSetPrimaryModal?.props?.confirmButonLabel}
        onClose={() => setShowPrimary(false)}
        onCancel={() => setShowPrimary(false)}
        leftIcon={
          ConfirmSetPrimaryModal?.components?.leftIcon ?? (
            <BInformationIcon width={20} height={20} color={colors.primaryColor} />
          )
        }
        message={(
          ConfirmSetPrimaryModal?.props?.message ??
          'Are you sure you want to set %s as the primary account?.'
        ).replace('%s', selectedWallet?.walletName ?? '')}
        onConfirmed={() => {
          const wallet = selectedWallet;
          setShowPrimary(false);
          if (wallet) {
            setPrimaryWallet(wallet.walletId);
          }
          setSelectedWallet(undefined);
        }}
      />
      {renderSuccessModal()}
    </>
  );
});

export default AccountComponent;
