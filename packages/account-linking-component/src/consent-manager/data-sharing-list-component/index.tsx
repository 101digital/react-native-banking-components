import { AccountLinkingContext } from '../../context/account-linking-context';
import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, SectionList, Text, TouchableOpacity, View } from 'react-native';
import { isEmpty } from '@banking-component/core';
import { Image, ThemeContext } from 'react-native-theme-component';
import { ArrowRightIcon, images } from '../../assets/images';
import useMergeStyles from './styles';
import { DataSharingListComponentProps, DataSharingListComponentStyles } from '../types';
import moment from 'moment';

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
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.itemContainerStyle}
              onPress={() => onItemPressed(item)}
            >
              <View style={styles.imageContainerStyle}>
                <Image
                  source={{ uri: item.aspspInfo.imageUrl }}
                  fallbackImage={images.bank}
                  style={styles.imageStyle}
                />
              </View>
              <View style={styles.itemContentContainerStyle}>
                <Text style={styles.itemTitleStyle}>{item.aspspInfo.name}</Text>
                <Text style={styles.itemPeriodStyle}>
                  {`${moment(item.createdAt).format(_dateFormat)} - ${moment(item.expiredAt).format(
                    _dateFormat
                  )}`}
                </Text>
              </View>
              <ArrowRightIcon size={13} color='rgba(13, 32, 80, 0.5)' />
            </TouchableOpacity>
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
