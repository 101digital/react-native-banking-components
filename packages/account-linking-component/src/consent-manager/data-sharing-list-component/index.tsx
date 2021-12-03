import { AccountLinkingContext } from '../../context/account-linking-context';
import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { isEmpty } from '@banking-component/core';
import { Image, ThemeContext } from 'react-native-theme-component';
import { ArrowRightIcon, images } from '../../assets/images';
import useMergeStyles from './styles';
import { DataSharingListComponentProps, DataSharingListComponentStyles } from '../types';

const DataSharingListComponent = (props: DataSharingListComponentProps) => {
  const { getAccountConsents, accountConsents, isLoadingAccountConsents } = useContext(
    AccountLinkingContext
  );
  const { colors } = useContext(ThemeContext);
  const styles: DataSharingListComponentStyles = useMergeStyles(props.style);

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
      <FlatList
        keyExtractor={(item) => item.accountConsentId}
        data={accountConsents}
        style={styles.listContainerStyle}
        ItemSeparatorComponent={() => <View style={styles.listDividerStyle} />}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity activeOpacity={0.8} style={styles.itemContainerStyle}>
              <View style={styles.imageContainerStyle}>
                <Image
                  source={{ uri: item.aspspInfo.imageUrl }}
                  fallbackImage={images.bank}
                  style={styles.imageStyle}
                />
              </View>
              <View style={styles.itemContentContainerStyle}>
                <Text style={styles.itemTitleStyle}>{item.aspspInfo.name}</Text>
                <Text style={styles.itemPeriodStyle}>{item.createdAt}</Text>
              </View>
              <ArrowRightIcon size={13} color='rgba(13, 32, 80, 0.5)' />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default DataSharingListComponent;
