import React, { useState, useContext, ReactNode } from 'react';
import { GroupedWallets } from '@banking-component/core';
import { BottomSheet, ThemeContext, Button } from 'react-native-theme-component';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { CheckedIcon } from '../../assets/images';
import useMergeStyles from './theme';
import { SelectAccountModalStyle } from '../../types';

interface SelectAccountModalProps {
  isVisible: boolean;
  groupedWallet: GroupedWallets;
  selectedGroups: string[];
  applyTitle?: string;
  activeColor?: string;
  inactiveColor?: string;
  checkedIcon?: ReactNode;
  onClose: () => void;
  onApplied: (groups: string[]) => void;
  style?: SelectAccountModalStyle;
}

const SelectAccountModal = (props: SelectAccountModalProps) => {
  const {
    isVisible,
    groupedWallet,
    selectedGroups,
    onClose,
    onApplied,
    style,
    applyTitle,
    inactiveColor,
    activeColor,
    checkedIcon,
  } = props;
  const { colors, i18n } = useContext(ThemeContext);
  const styles: SelectAccountModalStyle = useMergeStyles(style);

  const [_selectedGroups, setSelectedGroups] = useState(selectedGroups);

  const _renderItem = (label: string, isSelected: boolean, onPress: () => void) => {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.itemContainerStyle} onPress={onPress}>
        <View
          style={[
            styles.checkboxContainerStyle,
            {
              backgroundColor: isSelected
                ? activeColor ?? colors.primaryColor
                : inactiveColor ?? 'white',
            },
          ]}
        >
          {checkedIcon ?? <CheckedIcon size={16} color={'white'} />}
        </View>
        <Text style={styles.accountNameStyle}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <BottomSheet isVisible={isVisible} onBackButtonPress={onClose} onBackdropPress={onClose}>
      <FlatList
        keyExtractor={(item) => item.section}
        data={groupedWallet}
        ListHeaderComponent={() => {
          const isSelected = _selectedGroups.length === groupedWallet.length;
          return (
            <View>
              {_renderItem(
                i18n?.t('cash_flow.lbl_all_accounts') ?? 'All Accounts',
                isSelected,
                () => {
                  if (isSelected) {
                    setSelectedGroups([]);
                  } else {
                    setSelectedGroups(groupedWallet.map((gr) => gr.section));
                  }
                }
              )}
              <View style={styles.itemSeparatorStyle} />
            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.itemSeparatorStyle} />}
        renderItem={({ item }) => {
          const isSelected = _selectedGroups.includes(item.section);
          return _renderItem(item.section.trim(), isSelected, () => {
            if (isSelected) {
              setSelectedGroups(_selectedGroups.filter((gr) => gr !== item.section));
            } else {
              setSelectedGroups([..._selectedGroups, item.section]);
            }
          });
        }}
        ListFooterComponent={() => {
          return (
            <Button
              style={
                styles.buttonStyle ?? {
                  primaryContainerStyle: {
                    marginTop: 30,
                  },
                }
              }
              label={applyTitle ?? i18n?.t('cash_flow.btn_apply') ?? 'Apply'}
              onPress={() => onApplied(_selectedGroups)}
            />
          );
        }}
      />
    </BottomSheet>
  );
};

export default SelectAccountModal;
