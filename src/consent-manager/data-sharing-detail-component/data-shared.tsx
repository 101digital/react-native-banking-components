import React, { useContext, useEffect, useState } from 'react';
import { BankPermission, defaultsDeep, isEmpty } from '@banking-component/core';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DataSharedProps, DataSharedStyles } from '../types';
import { ThemeContext } from 'react-native-theme-component';
import { AccountLinkingContext } from '../../context/account-linking-context';
import { ArrowDownIcon } from '../../assets/images';
import HTML from 'react-native-render-html';
const { width } = Dimensions.get('window');

const DataShared = (props: DataSharedProps) => {
  const { accountConsent, style } = props;
  const styles: DataSharedStyles = useMergeStyles(style);
  const { banks, getBanks } = useContext(AccountLinkingContext);
  const [permissions, setPermissions] = useState<BankPermission[]>([]);
  const [activeIndexs, setActiveIndexs] = useState<number[]>([]);
  const { colors, fonts, i18n } = useContext(ThemeContext);

  useEffect(() => {
    if (isEmpty(banks)) {
      getBanks();
    }
  }, [banks]);

  useEffect(() => {
    const _bank = banks.find((b) => b.id === accountConsent.aspspInfo.id);
    if (_bank) {
      setPermissions(_bank.permissions);
    }
  }, [banks, accountConsent]);

  const cleanHTML = (str: string) => {
    return str.replace(/(<([^>]+)>)/gi, '');
  };

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleTextStyle}>
        {i18n?.t('consent_manager.lbl_data_shared') ?? 'Data you’ve shared'}
      </Text>
      <FlatList
        keyExtractor={(item) => item.id}
        data={permissions}
        style={styles.listContainerStyle}
        ItemSeparatorComponent={() => <View style={styles.listDividerStyle} />}
        renderItem={({ item, index }) => {
          const _isActive = activeIndexs.includes(index);
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (_isActive) {
                  setActiveIndexs(activeIndexs.filter((i) => i !== index));
                } else {
                  setActiveIndexs([...activeIndexs, index]);
                }
              }}
              style={styles.itemContainerStyle}
            >
              <View
                style={[
                  styles.itemHeaderContainerStyle,
                  {
                    borderBottomWidth: _isActive ? 1 : 0,
                  },
                ]}
              >
                <Text style={styles.itemTitleTextStyle}>{item.permissionTitle}</Text>
                <View
                  style={{
                    transform: [{ rotate: _isActive ? '180deg' : '0deg' }],
                  }}
                >
                  <ArrowDownIcon size={10} color={colors.primaryColor} />
                </View>
              </View>
              {_isActive && (
                <>
                  <Text style={styles.itemShortDesTextStyle}>
                    {cleanHTML(item.shortDescription)}
                  </Text>
                  {!isEmpty(item.description) && (
                    <>
                      <Text style={styles.fullDataTextStyle}>
                        {i18n?.t('consent_manager.lbl_full_data_list') ?? 'Full data list'}
                      </Text>
                      <HTML
                        contentWidth={width}
                        systemFonts={fonts.regular ? [fonts.regular] : []}
                        source={{ html: item.description }}
                        tagsStyles={{
                          ul: {
                            margin: 0,
                            marginBottom: 15,
                            marginLeft: 10,
                            marginTop: 10,
                          },
                          li: {
                            fontFamily: fonts.regular,
                            fontSize: 12,
                            color: '#244065',
                          },
                          p: {
                            fontFamily: fonts.regular,
                            margin: 2,
                            fontSize: 12,
                            color: '#244065',
                            marginHorizontal: 20,
                          },
                        }}
                      />
                    </>
                  )}
                </>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const useMergeStyles = (style?: DataSharedStyles): DataSharedStyles => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles: DataSharedStyles = StyleSheet.create({
    containerStyle: {
      paddingHorizontal: 16,
      paddingVertical: 20,
      backgroundColor: '#F4F8FB',
    },
    titleTextStyle: {
      fontFamily: fonts.regular,
      fontWeight: '600',
      fontSize: 16,
      color: '#0D2050',
    },
    listContainerStyle: {
      marginTop: 17,
      marginBottom: 10,
    },
    listDividerStyle: {
      height: 15,
    },
    itemContainerStyle: {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#E1E1E1',
      elevation: 4,
      shadowOffset: { width: 0, height: 0 },
      shadowColor: 'grey',
      shadowOpacity: 0.2,
      shadowRadius: 3,
      backgroundColor: 'white',
    },
    itemHeaderContainerStyle: {
      flexDirection: 'row',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderBottomColor: 'rgba(191, 191, 191, 0.3)',
      borderBottomWidth: 1,
      alignItems: 'center',
    },
    itemTitleTextStyle: {
      flex: 1,
      fontFamily: fonts.regular,
      fontWeight: '600',
      fontSize: 12,
      color: '#0D2050',
    },
    itemShortDesTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 12,
      color: '#244065',
      paddingHorizontal: 15,
      paddingVertical: 10,
      lineHeight: 24,
    },
    fullDataTextStyle: {
      fontFamily: fonts.medium,
      color: '#244065',
      fontSize: 12,
      marginHorizontal: 15,
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default DataShared;
