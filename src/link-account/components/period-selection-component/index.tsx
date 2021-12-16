import { CalendarIcon, CDRIcon } from '../../../assets/images';
import React, { useContext, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, ThemeContext } from 'react-native-theme-component';
import {
  ConsentPeriod,
  PeriodSelectionComponentProps,
  PeriodSelectionComponentStyles,
} from '../../types';
import useMergeStyles from './styles';

const { width } = Dimensions.get('window');

const PeriodSelectionComponent = (props: PeriodSelectionComponentProps) => {
  const { recipientId, companyName, periods, activeColor, style, onNext, initialPeriod } = props;
  const styles: PeriodSelectionComponentStyles = useMergeStyles(style);
  const { i18n, colors } = useContext(ThemeContext);
  const [period, setPeriod] = useState<ConsentPeriod | undefined>(initialPeriod);
  const _listPadding =
    StyleSheet.flatten(styles.periodListStyle).marginHorizontal?.toString() ?? '16';
  const _separatorWidth = StyleSheet.flatten(styles.separatorStyle).width?.toString() ?? '15';
  const _activeColor = activeColor ?? 'white';
  const _itemWidth = (width - parseInt(_listPadding) * 2 - parseInt(_separatorWidth) * 2) / 3;

  const _renderPeriodItem = (_period: ConsentPeriod) => {
    const _isSelected = period === _period;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.periodContainerStyle,
          { backgroundColor: _isSelected ? colors.primaryColor : 'white', width: _itemWidth },
        ]}
        onPress={() => setPeriod(_period)}
      >
        <CalendarIcon color={_isSelected ? _activeColor : colors.primaryColor} />
        <Text style={[styles.periodTextStyle, { color: _isSelected ? _activeColor : '#244065' }]}>
          {`${_period.period} ${_period.type}${_period.period > 1 ? 's' : ''}`}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.headerTitleStyle}>
        {i18n?.t('link_bank_component.lbl_data_accessible_period') ?? 'Data accessible period'}
      </Text>
      <View style={styles.companyContainerStyle}>
        <CDRIcon />
        <View style={styles.companyContentContainerStyle}>
          <Text style={styles.companyReciepientStyle}>
            {i18n?.t('link_bank_component.lbl_consumer_data_recipient') ??
              'Accredited Consumer Data Right Recipient'}
          </Text>
          <Text style={styles.companyNameStyle}>{companyName}</Text>
          <Text style={styles.companyReciepientStyle}>
            {(
              i18n?.t('link_bank_component.lbl_recipient_id') ?? 'Accredited Data Recipient: %s'
            ).replace('%s', recipientId)}
          </Text>
        </View>
      </View>
      <Text style={styles.dataAccessTitleStyle}>
        {i18n?.t('link_bank_component.lbl_data_can_accessed') ?? 'Data can be accessed'}
      </Text>
      <FlatList
        keyExtractor={(item) => item.period.toString()}
        data={periods}
        horizontal
        style={styles.periodListStyle}
        ItemSeparatorComponent={() => <View style={styles.separatorStyle} />}
        renderItem={({ item }) => _renderPeriodItem(item)}
      />
      <Button
        label={i18n?.t('link_bank_component.btn_next') ?? 'Next'}
        onPress={() => onNext(period!)}
        disabled={!period}
        style={
          style?.nextButtonStyle ?? {
            primaryContainerStyle: {
              marginHorizontal: 16,
              marginBottom: 10,
            },
          }
        }
      />
    </View>
  );
};

export default PeriodSelectionComponent;
