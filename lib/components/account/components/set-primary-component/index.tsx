import { BTickIcon } from '../../../../assets/images';
import React, { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SetPrimaryComponentStyle } from '../../types';
import useMergeStyles from './styles';

export type SetPrimaryComponentProps = {
  isSelected: boolean;
  disabled: boolean;
  style?: SetPrimaryComponentStyle;
  setPrimaryLabel?: string;
  tickIcon?: ReactNode;
  onPressed: () => void;
};

const SetPrimaryComponent = (props: SetPrimaryComponentProps) => {
  const { isSelected, style, setPrimaryLabel, tickIcon, onPressed, disabled } = props;
  const styles = useMergeStyles(style);

  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.containerStyle}
      activeOpacity={1}
      onPress={onPressed}
    >
      <View style={styles.checkBoxStyle}>{isSelected && (tickIcon ?? <BTickIcon />)}</View>
      <Text style={styles.titleTextStyle}>{setPrimaryLabel ?? 'Set as primary'}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(SetPrimaryComponent);
