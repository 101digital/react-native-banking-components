import React from 'react';
import { Text, View } from 'react-native';
import { ShareContentComponentStyles } from '../../types';
import useMergeStyles from './styles';

export type ShareContentComponentProps = {
  style?: ShareContentComponentStyles;
  contents?: string[];
  titleLabel?: string;
};

const ShareContentComponent = (props: ShareContentComponentProps) => {
  const { style, contents, titleLabel } = props;
  const styles = useMergeStyles(style);

  const _contents = contents ?? ['Account details', 'Transactions', 'Account balance'];

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleTextStyle}>{titleLabel ?? 'What you will share'}</Text>
      {_contents.map((item, index) => (
        <View key={`${item}-${index}`} style={styles.itemContentContainerStyle}>
          <View style={styles.dotContainerStyle} />
          <Text style={styles.contentTextStyle}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

export default ShareContentComponent;
