import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SelectBankComponentProps } from './types';
import useMergeStyles from './styles';
import { BankItemComponent, SearchBarComponent } from './components';
import { isEmpty, Bank } from '@banking-component/core';
import { AccountLinkingContext } from '../context/account-linking-context';
import { useKeyboard } from './components/keyboard';

const SelectBankComponent = (props: SelectBankComponentProps) => {
  const { Root, SearchBar, BankItem } = props;
  const styles = useMergeStyles(Root?.style);
  const { banks } = useContext(AccountLinkingContext);
  const _numColumns = Root?.props?.numberColumns ?? 2;
  const i18n = Root?.props?.i18n;
  const [displayBanks, setDisplayBanks] = useState<Bank[]>(banks);

  const keyboardHeight = useKeyboard();
  const [padding, setPadding] = useState(0);

  useEffect(() => {
    setPadding(keyboardHeight[0]);
  }, [keyboardHeight]);

  const handleSearchBank = (key: string) => {
    const result = isEmpty(key)
      ? banks
      : banks.filter((bank: Bank) => bank.name.toLowerCase().includes(key.toLowerCase()));
    setDisplayBanks(result);
  };

  return (
    <View style={styles.containerStyle}>
      {Root?.components?.renderHeading?.() ?? (
        <Text style={styles.headingTextStyle}>
          {Root?.props?.headingLabel ??
            i18n?.t('select_bank_component.lbl_heading') ??
            'Please select the banking provider you are\nbanking with'}
        </Text>
      )}
      <SearchBarComponent
        onChangedText={handleSearchBank}
        i18n={i18n}
        {...SearchBar?.props}
        {...SearchBar?.components}
      />
      <FlatList
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps='handled'
        data={displayBanks}
        renderItem={({ item, index }) => {
          return (
            BankItem?.components?.renderItem?.(index, item) ?? (
              <BankItemComponent style={BankItem?.style} bank={item} {...BankItem?.props} />
            )
          );
        }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.listDivider} />}
        numColumns={_numColumns}
        key={_numColumns > 1 ? 'm' : 's'}
        columnWrapperStyle={_numColumns > 1 ? styles.columWrapperStyle : undefined}
        style={styles.listStyle}
        contentContainerStyle={[styles.listContentStyle, { paddingBottom: padding }]}
      />
      <Text style={styles.linkAccountTextStyle}>
        {i18n?.t('select_bank_component.lbl_how_link_account') ?? 'How to link an account?'}{' '}
        <Text onPress={() => Root?.props?.onViewGuide?.()} style={styles.viewGuideButtonStyle}>
          {i18n?.t('select_bank_component.btn_view_guide') ?? 'View here'}
        </Text>
      </Text>
    </View>
  );
};

export default SelectBankComponent;
