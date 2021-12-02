import { isEmpty, BankAccount } from '@banking-component/core';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { AccountLinkingContext } from '../../../context/account-linking-context';
import { ThemeContext, Button } from 'react-native-theme-component';
import { AccountItemComponent, EmptyAccountComponent, AccessInfoComponent } from './components';
import useMergeStyles from './styles';
import { SelectAccountComponentProps } from '../../types';

const SelectAccountComponent = (props: SelectAccountComponentProps) => {
  const {
    style,
    bank,
    consentId,
    onLinkAccount,
    loadingIndicator,
    renderHeading,
    companyName,
    emptyAccountsComponent,
    accountItemComponent,
    accessInfoComponent,
  } = props;
  const styles = useMergeStyles(style);
  const { accounts, isLoadingAccounts, clearAccounts } = useContext(AccountLinkingContext);
  const { colors } = useContext(ThemeContext);
  const [currentAccounts, setCurrentAccounts] = useState<BankAccount[]>([]);
  const { i18n } = useContext(ThemeContext);

  useEffect(() => {
    return () => {
      clearAccounts();
    };
  }, []);

  if (isEmpty(accounts)) {
    if (isLoadingAccounts) {
      return (
        <View style={styles.loadingWrapper}>
          {loadingIndicator ?? <ActivityIndicator color={colors.primaryColor} />}
        </View>
      );
    }
    return <EmptyAccountComponent {...emptyAccountsComponent} />;
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
            accountItemComponent?.renderItem?.(index, item, _isSelected) ?? (
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
                {...accountItemComponent}
              />
            )
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.listDivider} />}
        ListHeaderComponent={() => {
          return (
            renderHeading?.() ?? (
              <Text style={styles.headingTextStyle}>
                {(
                  i18n?.t('link_bank_component.lbl_heading') ??
                  'Select the account to share information with\n%s'
                ).replace('%s', companyName)}
              </Text>
            )
          );
        }}
        ListFooterComponent={() => {
          return (
            accessInfoComponent?.renderContent?.() ?? (
              <AccessInfoComponent companyName={companyName} {...accessInfoComponent} />
            )
          );
        }}
      />
      <View style={styles.ctaButtonWrapper}>
        <Button
          disabled={isEmpty(currentAccounts)}
          label={i18n?.t('link_bank_component.btn_continue')?.toUpperCase() ?? 'CONTINUE'}
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

export default SelectAccountComponent;
