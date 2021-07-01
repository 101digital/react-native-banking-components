import React, { useContext, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SelectBankComponentProps } from './types';
import useMergeStyles from './styles';
import { BankItemComponent, SearchBarComponent } from './components';
import { filter, isEmpty } from 'lodash';
import { BankContext } from '../../contexts/bank-context';
import { Bank } from '../../types';

const SelectBankComponent = (props: SelectBankComponentProps) => {
  const { Root, SearchBar, BankItem } = props;

  const styles = useMergeStyles(Root?.style);
  const { banks } = useContext(BankContext);
  const _numColumns = Root?.props?.numberColumns ?? 2;
  const [displayBanks, setDisplayBanks] = useState<Bank[]>(banks);

  const handleSearchBank = (key: string) => {
    const result = isEmpty(key)
      ? banks
      : filter(banks, (bank) => bank.name.toLowerCase().includes(key.toLowerCase()));
    setDisplayBanks(result);
  };

  return (
    <View style={styles.containerStyle}>
      {Root?.components?.renderHeading?.() ?? (
        <Text style={styles.headingTextStyle}>
          {Root?.props?.headingLabel ?? 'Please select the banking provider you are\nbanking with'}
        </Text>
      )}
      <SearchBarComponent
        onChangedText={handleSearchBank}
        {...SearchBar?.props}
        {...SearchBar?.components}
      />
      <FlatList
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        data={displayBanks}
        renderItem={({ item, index }) => {
          return (
            BankItem?.components?.renderItem?.(index, item) ?? (
              <BankItemComponent style={BankItem?.style} bank={item} {...BankItem?.props} />
            )
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.listDivider} />}
        numColumns={_numColumns}
        key={_numColumns > 1 ? 'm' : 's'}
        columnWrapperStyle={_numColumns > 1 ? styles.columWrapperStyle : undefined}
        style={styles.listStyle}
        contentContainerStyle={styles.listContentStyle}
      />
    </View>
  );
};

export default SelectBankComponent;
