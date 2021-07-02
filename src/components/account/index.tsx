import { isEmpty } from 'lodash';
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
import { ThemeContext } from '../../contexts/them-context';
import { BankContext } from '../../contexts/bank-context';
import { Wallet } from '../../types';
import BAlertModal from '../../theme/alert';
import BNoWalletComponent from '../../theme/no-wallet';
import { BInformationIcon } from '../../assets/images';
import { WalletContext } from '../../contexts/wallet-context';

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
  const { theme } = useContext(ThemeContext);
  const { bankImages } = useContext(BankContext);
  const currencyCode = getDefaultWallet()?.currencyCode ?? 'USD';
  const currentBalance = summary?.currentBalance ?? 0;
  const groupedWallets = getGroupWallets();
  const [selectedWallet, setSelectedWallet] = useState<Wallet | undefined>(undefined);
  const [isShowActionSheet, setShowActionSheet] = useState(false);
  const [isShowUnlink, setShowUnlink] = useState(false);
  const [isShowPrimary, setShowPrimary] = useState(false);
  const [walletWithBanner, setWalletWithBanner] = useState<Wallet | undefined>(undefined);
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
    setWalletWithBanner(wallet);
  };

  const hideActionSheet = () => {
    setSelectedWallet(undefined);
    setShowActionSheet(false);
  };

  const renderSuccessModal = () => {
    return (
      <BAlertModal
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
      </BAlertModal>
    );
  };

  if (isEmpty(wallets)) {
    if (isLoadingWallets) {
      return (
        <View style={styles.loadingWrap}>
          {Root?.components?.loadingIndicator ?? <ActivityIndicator color={theme.primaryColor} />}
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
            extraData={bankImages}
            renderItem={({ item, index }) => {
              const isShowSwitch = item.walletId === walletWithBanner?.walletId;
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
                Section?.props?.renderSection?.(section) ?? (
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
      <BAlertModal
        isVisible={isShowUnlink && !ConfirmUnlinkModal?.props?.disable}
        title={ConfirmUnlinkModal?.props?.title ?? 'Unlink Bank Account'}
        cancelTitle={ConfirmUnlinkModal?.props?.cancelButtonLabel ?? 'Cancel'}
        confirmTitle={ConfirmUnlinkModal?.props?.confirmButonLabel}
        onClose={() => setShowUnlink(false)}
        onCancel={() => setShowUnlink(false)}
        leftIcon={
          ConfirmUnlinkModal?.components?.leftIcon ?? (
            <BInformationIcon width={20} height={20} color={theme.primaryColor} />
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
      <BAlertModal
        isVisible={isShowPrimary && !ConfirmSetPrimaryModal?.props?.disable}
        title={ConfirmSetPrimaryModal?.props?.title ?? 'Confirmation'}
        cancelTitle={ConfirmSetPrimaryModal?.props?.cancelButtonLabel ?? 'Cancel'}
        confirmTitle={ConfirmSetPrimaryModal?.props?.confirmButonLabel}
        onClose={() => setShowPrimary(false)}
        onCancel={() => setShowPrimary(false)}
        leftIcon={
          ConfirmSetPrimaryModal?.components?.leftIcon ?? (
            <BInformationIcon width={20} height={20} color={theme.primaryColor} />
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
