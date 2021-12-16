import { AccountLinkingContext } from '../../context/account-linking-context';
import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, SectionList, Text, View } from 'react-native';
import { isEmpty } from '@banking-component/core';
import { ThemeContext } from 'react-native-theme-component';
import useMergeStyles from './styles';
import { DataSharingListComponentProps, DataSharingListComponentStyles } from '../types';
import ItemConsent from './item-consent';

const DataSharingListComponent = (props: DataSharingListComponentProps) => {
  const { getAccountConsents, accountConsents, isLoadingAccountConsents } = useContext(
    AccountLinkingContext
  );
  const { style, periodFormat, onItemPressed } = props;
  const { colors } = useContext(ThemeContext);
  const styles: DataSharingListComponentStyles = useMergeStyles(style);
  const _dateFormat = periodFormat ?? 'DD MMM YYYY';

  useEffect(() => {
    getAccountConsents();
  }, []);

  if (isEmpty(accountConsents)) {
    if (isLoadingAccountConsents) {
      return (
        <View style={styles.loadingContainerStyle}>
          <ActivityIndicator color={colors.primaryColor} />
        </View>
      );
    }
    return <View />;
  }

  return (
    <View style={styles.containerStyle}>
      <SectionList
        removeClippedSubviews={false}
        keyExtractor={(item) => item.accountConsentId}
        sections={accountConsents}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={styles.listContainerStyle}
        ItemSeparatorComponent={() => <View style={styles.listDividerStyle} />}
        renderItem={({ item }) => {
          return (
            <ItemConsent
              accountConsent={item}
              style={style?.itemConsentStyle}
              onPressed={() => onItemPressed(item)}
              dateFormat={_dateFormat}
            />
          );
        }}
        renderSectionHeader={({ section: { section } }) => {
          return (
            <View style={styles.sectionContainerStyle}>
              <Text style={styles.sectionTitleStyle}>{section}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default DataSharingListComponent;
