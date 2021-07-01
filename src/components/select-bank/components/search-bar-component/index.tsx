import React, { ReactNode } from 'react';
import { TextInput, View } from 'react-native';
import { SearchBarComponentStyles } from '../../types';

import useMergeStyles from './styles';

export type SearchBarComponentProps = {
  placeholder?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  style?: SearchBarComponentStyles;
  onChangedText: (text: string) => void;
};

const SearchBarComponent = (props: SearchBarComponentProps) => {
  const { placeholder, style, onChangedText, leftIcon, rightIcon } = props;

  const styles = useMergeStyles(style);
  return (
    <View style={styles.containerStyle}>
      {leftIcon}
      <TextInput
        clearButtonMode="while-editing"
        autoCapitalize="none"
        placeholderTextColor="#3C3E4F"
        placeholder={placeholder ?? 'Search'}
        style={styles.textInputStyle}
        onChangeText={onChangedText}
        returnKeyType="search"
      />
      {rightIcon}
    </View>
  );
};

export default SearchBarComponent;
