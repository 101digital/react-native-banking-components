import { BPlusIcon } from '../../../../assets/images';
import React, { ReactNode, useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { LinkAccountStyle } from '../../types';
import useMergeStyles from './styles';
import { BankThemeContext } from '../../../../contexts/theme-context';

export type LinkAccountComponentProps = {
  onLinkAccountPressed?: () => void;
  addIcon?: ReactNode;
  buttonLabel?: string;
  style?: LinkAccountStyle;
};

const LinkAccountComponent = (props: LinkAccountComponentProps) => {
  const { style, buttonLabel, onLinkAccountPressed, addIcon } = props;
  const { theme } = useContext(BankThemeContext);

  const styles = useMergeStyles(style);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.containerStyle}
      onPress={onLinkAccountPressed}
    >
      {addIcon ?? <BPlusIcon width={20} height={20} color={theme.primaryColor} />}
      <Text style={styles.buttonTextStyle}>{buttonLabel ?? 'Link Bank Account'}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(LinkAccountComponent);
