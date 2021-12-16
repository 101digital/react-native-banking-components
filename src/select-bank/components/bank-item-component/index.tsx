import React from 'react';
import { TouchableOpacity, Text, Keyboard } from 'react-native';
import { images } from '../../../assets/images';
import { Image } from 'react-native-theme-component';
import { Bank } from '@banking-component/core';
import { BankItemComponentStyles } from '../../types';
import useMergeStyles from './styles';

export type BankItemComponentProps = {
  bank: Bank;
  style?: BankItemComponentStyles;
  onPressedBank?: (bank: Bank) => void;
};

const BankItemComponent = (props: BankItemComponentProps) => {
  const { bank, style, onPressedBank } = props;
  const styles = useMergeStyles(style);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.containerStyle}
      onPress={() => {
        Keyboard.dismiss();
        onPressedBank?.(bank);
      }}
    >
      <Image
        source={{ uri: bank.imageUrl }}
        fallbackImage={images.bank}
        style={styles.bankImageStyle}
      />
      <Text style={styles.bankNameTextStyle}>{bank.name}</Text>
    </TouchableOpacity>
  );
};

export default BankItemComponent;
