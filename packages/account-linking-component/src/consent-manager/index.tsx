import { AccountLinkingContext } from '../context/account-linking-context';
import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { isEmpty } from '@banking-component/core';
import { Image, ThemeContext } from 'react-native-theme-component';
import { ArrowRightIcon, images } from '../assets/images';

const ConsentManagerComponent = () => {
  const { getAccountConsents, accountConsents, isLoadingAccountConsents } = useContext(
    AccountLinkingContext
  );
  const { colors, fonts } = useContext(ThemeContext);

  useEffect(() => {
    if (isEmpty(accountConsents)) {
      getAccountConsents();
    }
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
                elevation: 4,
                shadowOffset: { width: 0, height: 2 },
                shadowColor: 'grey',
                shadowOpacity: 0.2,
                shadowRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Image
                source={{ uri: item.aspspInfo.imageUrl }}
                fallbackImage={images.bank}
                style={{
                  width: 60,
                  height: 60,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: fonts.medium,
                  }}
                >
                  {item.aspspInfo.name}
                </Text>
                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    borderRadius: 30,
                    backgroundColor: colors.primaryColor,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'white',
                      fontFamily: fonts.regular,
                    }}
                  >
                    CDR
                  </Text>
                </View>
              </View>
              <ArrowRightIcon size={10} color='grey' />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ConsentManagerComponent;
