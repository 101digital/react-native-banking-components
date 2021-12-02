import { AccountLinkingContext } from '../../context/account-linking-context';
import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { isEmpty } from '@banking-component/core';
import { Image, ThemeContext } from 'react-native-theme-component';
import { ArrowRightIcon, images } from '../../assets/images';

const DataSharingListComponent = () => {
  const { getAccountConsents, accountConsents, isLoadingAccountConsents } = useContext(
    AccountLinkingContext
  );
  const { colors, fonts } = useContext(ThemeContext);

  useEffect(() => {
    getAccountConsents();
  }, []);

  if (isEmpty(accountConsents)) {
    if (isLoadingAccountConsents) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator color={colors.primaryColor} />
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Empty consents</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        keyExtractor={(item) => item.accountConsentId}
        data={accountConsents}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 15,
                paddingHorizontal: 18,
              }}
            >
              <View
                style={{
                  width: 55,
                  height: 50,
                  borderWidth: 1,
                  borderColor: '#F5F5F5',
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={{ uri: item.aspspInfo.imageUrl }}
                  fallbackImage={images.bank}
                  style={{
                    width: 32,
                    height: 32,
                  }}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 15 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: fonts.regular,
                    color: '#244065',
                  }}
                >
                  {item.aspspInfo.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: fonts.regular,
                    color: '#828282',
                    marginTop: 5,
                  }}
                >
                  {item.createdAt}
                </Text>
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
