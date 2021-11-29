import { defaultsDeep } from '@banking-component/core';
import { ExpandableItemProps, ExpandableItemStyles } from '../../types';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { ArrowDownIcon } from '../../../assets/images';

const ExpandableItem = (props: ExpandableItemProps) => {
  const { title, message, canExpanded, style } = props;
  const [isExpanded, setIsExpanded] = useState(!canExpanded);
  const { colors } = useContext(ThemeContext);

  const styles: ExpandableItemStyles = useMergeStyles(style);

  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity
        style={styles.titleContainerStyle}
        activeOpacity={0.9}
        onPress={() => {
          if (canExpanded) {
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <Text style={styles.titleTextStyle}>{title}</Text>
        {canExpanded && (
          <View
            style={{
              transform: [{ rotate: isExpanded ? '180deg' : '0deg' }],
            }}
          >
            <ArrowDownIcon size={10} color={colors.primaryColor} />
          </View>
        )}
      </TouchableOpacity>
      {isExpanded && <Text style={styles.messageTextStyle}>{message}</Text>}
    </View>
  );
};

const useMergeStyles = (style?: ExpandableItemStyles): ExpandableItemStyles => {
  const { fonts } = useContext(ThemeContext);
  const defaultStyles: ExpandableItemStyles = StyleSheet.create({
    containerStyle: {
      paddingVertical: 10,
    },
    titleContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    titleTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 14,
      color: '#0D2050',
      marginRight: 15,
      lineHeight: 24,
    },
    messageTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 12,
      color: '#244065',
      paddingHorizontal: 5,
      marginTop: 15,
      lineHeight: 18,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default ExpandableItem;
