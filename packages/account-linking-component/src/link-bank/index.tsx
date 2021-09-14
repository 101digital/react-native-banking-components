import { isEmpty, BankAccount } from '@banking-component/core';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { BankContext } from '../bank-context/bank-context';
import { ThemeContext, Button } from 'react-native-theme-component';
import { AccessInfoComponent, AccountItemComponent, EmptyAccountComponent } from './components';
import useMergeStyles from './styles';
import { LinkBankComponentProps } from './types';

const LinkBankComponent = (props: LinkBankComponentProps) => {
  const { Root, EmptyAccount, AccountItem, AccessInfomation } = props;
  const styles = useMergeStyles(Root?.style);
  const { bank, consentId, headingLabel, onLinkAccount, isLinkingAccount } = Root.props;
  const { accounts, isLoadingAccounts, clearAccounts, clearConsentData } = useContext(BankContext);
  const { colors } = useContext(ThemeContext);
  const [currentAccount, setCurrentAccount] = useState<BankAccount | undefined>(undefined);

  useEffect(() => {
    return () => {
      clearAccounts();
      clearConsentData();
    };
  }, []);

  if (isEmpty(accounts)) {
    if (isLoadingAccounts) {
      return (
        <View style={styles.loadingWrapper}>
          {Root.components?.loadingIndicator ?? <ActivityIndicator color={colors.primaryColor} />}
        </View>
      );
    }
    return (
      <EmptyAccountComponent
        style={EmptyAccount?.style}
        {...EmptyAccount?.props}
        {...EmptyAccount?.components}
      />
    );
  }

  return (
    <View style={styles.containerStyle}>
      <FlatList
        keyExtractor={(acc) => acc.accountId}
        data={accounts}
        style={styles.listStyle}
        contentContainerStyle={styles.listContentStyle}
        renderItem={({ item, index }) => {
          return (
            AccountItem?.component?.renderItem?.(index, item) ?? (
              <AccountItemComponent
                account={item}
                isSelected={currentAccount?.accountId === item.accountId}
                onPressed={(account) => {
                  setCurrentAccount(account);
                }}
                style={AccountItem?.style}
                {...AccountItem?.component}
              />
            )
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.listDivider} />}
        ListHeaderComponent={() => {
          return (
            Root.components?.renderHeading?.() ?? (
              <Text style={styles.headingTextStyle}>
                {headingLabel ??
                  'Select the account to share information with\n101 Digital PTE LTD'}
              </Text>
            )
          );
        }}
        ListFooterComponent={() => {
          return (
            AccessInfomation?.components?.renderContent?.() ?? (
              <AccessInfoComponent style={AccessInfomation?.style} {...AccessInfomation?.props} />
            )
          );
        }}
      />
      <View style={styles.ctaButtonWrapper}>
        <Button
          disabled={!currentAccount}
          isLoading={isLinkingAccount}
          label={Root.props.ctaButtonLabel ?? 'CONTINUE'}
          onPress={() => {
            if (currentAccount) {
              onLinkAccount?.(bank.id, currentAccount?.accountId, consentId);
            }
          }}
        />
      </View>
    </View>
  );
};

export default LinkBankComponent;
