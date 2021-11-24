import React, { useContext } from 'react';
import { TouchableOpacity, View, Text, FlatList } from 'react-native';
import { Button, ThemeContext } from 'react-native-theme-component';
import useMergeStyle from './styles';
import { CDRData, ComsumerDataComponentProps, ComsumerDataComponentStyles } from './types';
import {
  ConsumerDataRightIcon,
  ConsumerIcon,
  SecurityIcon,
  ControlDataIcon,
} from '../assets/images';
import ItemCDR from './components/item-cdr';

const DEFAULT_CDR_DATA: CDRData[] = [
  {
    icon: <ConsumerIcon />,
    title: 'Consumer Data Right',
    description: 'CDR is a Australian government and highly regulatored scheme',
  },
  {
    icon: <SecurityIcon />,
    title: 'Securely share your data',
    description: 'One time password (OTP) verification by your bank to authorise data share',
  },
  {
    icon: <ControlDataIcon />,
    title: 'Always be in control of your data',
    description: 'You control what, when, who, and how long you share',
  },
];

const ConsumerDataComponent = ({ style, props }: ComsumerDataComponentProps) => {
  const styles: ComsumerDataComponentStyles = useMergeStyle(style);
  const { bank, onLinkPressed, cdrData } = props;
  const { i18n } = useContext(ThemeContext);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.mainContainerStyle}>
        <Text style={styles.titleTextStyle}>
          {i18n?.t('consumer_data_component.lbl_we_using') ?? 'We are using'}{' '}
          <Text style={styles.highlightTitleTextStyle}>
            {i18n?.t('consumer_data_component.lbl_open_banking') ?? 'Open Banking'}
          </Text>{' '}
          {i18n?.t('consumer_data_component.lbl_to_link_account') ?? 'to link your account'}
        </Text>
        <ConsumerDataRightIcon />
        <FlatList
          keyExtractor={(item) => item.title}
          data={cdrData ?? DEFAULT_CDR_DATA}
          style={styles.cdrListContainerStyle}
          renderItem={({ item }) => <ItemCDR data={item} />}
        />
      </View>
      <TouchableOpacity activeOpacity={0.8} style={styles.buttonCDRPolicyStyle}>
        <Text style={styles.cdrPolicyTextStyle}>
          {i18n?.t('consumer_data_component.btn_view_cdr_policy') ?? 'View our CDR policy'}
        </Text>
      </TouchableOpacity>
      <Button
        label={i18n?.t('consumer_data_component.btn_link') ?? 'Link'}
        onPress={() => onLinkPressed(bank)}
        style={
          style?.linkButtonStyle ?? {
            primaryContainerStyle: {
              marginHorizontal: 15,
            },
          }
        }
      />
    </View>
  );
};

export default ConsumerDataComponent;
