import { defaultsDeep } from '@banking-component/core';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { ItemCDRStyles, CDRData } from '../../types';

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

const useMergeStyle = (style?: ItemCDRStyles): ItemCDRStyles => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles: ItemCDRStyles = StyleSheet.create({
    containerStyle: {
      paddingVertical: 15,
      paddingHorizontal: 7,
      flexDirection: 'row',
    },
    contentContainerStyle: {
      marginLeft: 16,
    },
    titleTextStyle: {
      fontFamily: fonts.regular,
      fontWeight: '600',
      fontSize: 14,
      color: '#0D2050',
      lineHeight: 21,
    },
    descriptionTextStyle: {
      fontSize: 12,
      fontFamily: fonts.regular,
      color: '#0D2050',
      lineHeight: 18,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default ItemCDR;
