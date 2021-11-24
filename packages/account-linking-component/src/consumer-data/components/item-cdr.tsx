import React from 'react';
import { Text, View } from 'react-native';
import { ItemCDRStyles, CDRData } from '../types';
import useMergeStyle from './styles';

export type ItemCDRProps = {
  data: CDRData;
  style?: ItemCDRStyles;
};

const ItemCDR = (props: ItemCDRProps) => {
  const { data, style } = props;
  const styles: ItemCDRStyles = useMergeStyle(style);
  return (
    <View style={styles.containerStyle}>
      {data.icon}
      <View style={styles.contentContainerStyle}>
        <Text style={styles.titleTextStyle}>{data.title}</Text>
        <Text style={styles.descriptionTextStyle}>{data.description}</Text>
      </View>
    </View>
  );
};

export default ItemCDR;
