import { SearchIcon } from '../../../assets/images';
import React, { ReactNode } from 'react';
import { TextInput, View } from 'react-native';
import { SearchBarComponentStyles } from '../../types';

import useMergeStyles from './styles';

export type SearchBarComponentProps = {
  i18n?: any;
  placeholder?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  style?: SearchBarComponentStyles;
  onChangedText: (text: string) => void;
};

const SearchBarComponent = (props: SearchBarComponentProps) => {
  const { placeholder, style, onChangedText, leftIcon, rightIcon, i18n } = props;

  const styles = useMergeStyles(style);

  return (
    <View style={styles.containerStyle}>
      {leftIcon ?? (
        <View style={styles.searchBox}>
          <SearchIcon size={15} />
        </View>
      )}
      <TextInput
        clearButtonMode='while-editing'
        autoCapitalize='none'
        placeholderTextColor='#3C3E4F'
        placeholder={placeholder ?? i18n?.t('select_bank_component.plh_search_bank') ?? 'Search'}
        style={styles.textInputStyle}
        onChangeText={onChangedText}
        returnKeyType='search'
        textAlignVertical='center'
      />
      {rightIcon}
    </View>
  );
};

export default SearchBarComponent;
