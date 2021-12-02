import { ConsentSummaryComponentProps, ConsentSummaryComponentStyles } from '../../types';
import moment from 'moment';
import React, { useContext } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, ThemeContext } from 'react-native-theme-component';
import ExpandableItem from './expandable-item';
import useMergeStyles from './styles';

const ConsentSummaryComponent = (props: ConsentSummaryComponentProps) => {
  const { summaries, style, onPressedLink, period, dateFormat, onConsented } = props;
  const styles: ConsentSummaryComponentStyles = useMergeStyles(style);
  const { i18n } = useContext(ThemeContext);

  const getSharingPeriod = () => {
    const _dateFormat = dateFormat ?? 'DD MMM YYYY';
    const currentDate = moment().format(_dateFormat);
    const endDate = moment()
      .add(period.period, period.type === 'month' ? 'M' : 'y')
      .format(_dateFormat);
    return `${currentDate} - ${endDate}`;
  };

  return (
    <View style={styles.containerStyle}>
      <ScrollView style={styles.contentContainerStyle}>
        {summaries?.map((summary, index) => {
          return (
            <View
              style={[
                styles.itemContainerStyle,
                { backgroundColor: index % 2 === 0 ? 'white' : '#F4F8FB' },
              ]}
              key={summary.summaryTitle}
            >
              <Text style={styles.titleTextStyle}>{summary.summaryTitle}</Text>
              {summary.summaryMessage && (
                <Text style={styles.messageTextStyle}>{summary.summaryMessage}</Text>
              )}
              {summary.directUrl && (
                <Text
                  onPress={() => onPressedLink?.(summary.directUrl?.link!)}
                  style={styles.directLinkTextStyle}
                >
                  {summary.directUrl.title}
                </Text>
              )}
              {summary.items?.map((item) => {
                let _message = item.message ?? '';
                if (item.id === 'sharing_period') {
                  _message = getSharingPeriod();
                }
                return (
                  <ExpandableItem
                    key={item.id}
                    title={item.title}
                    message={_message}
                    canExpanded={item.message !== undefined}
                  />
                );
              })}
            </View>
          );
        })}
      </ScrollView>
      <Button
        label={i18n?.t('link_bank_component.btn_consent') ?? 'I consent'}
        onPress={onConsented}
        style={
          styles?.consentButtonStyle ?? {
            primaryContainerStyle: {
              marginHorizontal: 15,
              marginVertical: 10,
            },
          }
        }
      />
    </View>
  );
};

export default ConsentSummaryComponent;
