import React from 'react';
import { View, Text } from 'react-native';
import { AccessInfoComponentStyles } from '../../types';
import useMergeStyles from './styles';

export type AccessInfoComponentProps = {
  titleLabel?: string;
  data?: string[];
  style?: AccessInfoComponentStyles;
};

const AccessInfoComponent = (props: AccessInfoComponentProps) => {
  const { titleLabel, data, style } = props;

  const styles = useMergeStyles(style);

  const _infos = data ?? ['Account details', 'Transactions', 'Account balance'];

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleTextStyle}>
        {titleLabel ?? '101 Digital PTE LTD will have access to the below Information'}
      </Text>
      {_infos.map((item, index) => (
        <View key={`${item}-${index}`} style={styles.itemContentContainerStyle}>
          <View style={styles.dotContainerStyle} />
          <Text style={styles.contentTextStyle}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

export default AccessInfoComponent;
