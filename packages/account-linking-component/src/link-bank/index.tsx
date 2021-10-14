import { isEmpty, BankAccount } from '@banking-component/core';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { AccountLinkingContext } from '../context/account-linking-context';
import { ThemeContext, Button } from 'react-native-theme-component';
import { AccessInfoComponent, AccountItemComponent, EmptyAccountComponent } from './components';
import useMergeStyles from './styles';
import { LinkBankComponentProps } from './types';

const LinkBankComponent = (props: LinkBankComponentProps) => {
  const { Root, EmptyAccount, AccountItem, AccessInfomation } = props;
  const styles = useMergeStyles(Root?.style);
  const { bank, consentId, headingLabel, onLinkAccount, isLinkingAccount, i18n } = Root.props;
  const { accounts, isLoadingAccounts, clearAccounts } = useContext(AccountLinkingContext);
  const { colors } = useContext(ThemeContext);
  const [currentAccounts, setCurrentAccounts] = useState<BankAccount[]>([]);

  useEffect(() => {
    return () => {
      clearAccounts();
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
        i18n={i18n}
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
          const _isSelected = currentAccounts.includes(item);
          return (
            AccountItem?.component?.renderItem?.(index, item, _isSelected) ?? (
              <AccountItemComponent
                account={item}
                isSelected={_isSelected}
                onPressed={(account) => {
                  if (_isSelected) {
                    setCurrentAccounts(
                      currentAccounts.filter((acc) => acc.accountId !== item.accountId)
                    );
                  } else {
                    setCurrentAccounts([...currentAccounts, account]);
                  }
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
                  i18n?.t('link_bank_component.lbl_heading') ??
                  'Select the account to share information with\n101 Digital PTE LTD'}
              </Text>
            )
          );
        }}
        ListFooterComponent={() => {
          return (
            AccessInfomation?.components?.renderContent?.() ?? (
              <AccessInfoComponent
                i18n={i18n}
                style={AccessInfomation?.style}
                {...AccessInfomation?.props}
              />
            )
          );
        }}
      />
      <View style={styles.ctaButtonWrapper}>
        <Button
          disabled={isEmpty(currentAccounts)}
          isLoading={isLinkingAccount}
          label={
            Root.props.ctaButtonLabel ??
            i18n?.t('link_bank_component.btn_continue')?.toUpperCase() ??
            'CONTINUE'
          }
          onPress={() => {
            if (!isEmpty(currentAccounts)) {
              onLinkAccount?.(
                bank.id,
                consentId,
                currentAccounts.map((acc) => acc.accountId)
              );
            }
          }}
        />
      </View>
    </View>
  );
};

export default LinkBankComponent;
