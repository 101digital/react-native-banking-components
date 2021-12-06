import React, { useContext } from 'react';
import { TouchableOpacity, View, Text, FlatList } from 'react-native';
import { Button, ThemeContext } from 'react-native-theme-component';
import { CDRData, ComsumerDataComponentProps, ComsumerDataComponentStyles } from '../../types';
import {
  ConsumerIcon,
  SecurityIcon,
  ControlDataIcon,
  UpDashlineIcon,
  DownDashlineIcon,
  CDRIcon,
  MobileIcon,
  BankIcon,
} from '../../../assets/images';
import ItemCDR from './item-cdr';
import useMergeStyle from './styles';

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

const ConsumerDataComponent = (props: ComsumerDataComponentProps) => {
  const { onNext, cdrData, onCDRPolicyPressed, style } = props;
  const styles: ComsumerDataComponentStyles = useMergeStyle(style);
  const { i18n } = useContext(ThemeContext);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.mainContainerStyle}>
        <Text style={styles.titleTextStyle}>
          {i18n?.t('link_bank_component.lbl_we_using') ?? 'We are using'}{' '}
          <Text style={styles.highlightTitleTextStyle}>
            {i18n?.t('link_bank_component.lbl_open_banking') ?? 'Open Banking'}
          </Text>{' '}
          {i18n?.t('link_bank_component.lbl_to_link_account') ?? 'to link your account'}
        </Text>
        <View style={styles.placeholderContainerStyle}>
          <View style={styles.connectorContainerStyle}>
            <MobileIcon />
          </View>
          <View style={styles.dashlineContainerStyle}>
            <DownDashlineIcon size={36} />
          </View>
          <View style={styles.cdrIconContainerStyle}>
            <CDRIcon width={40} height={56} />
          </View>
          <View style={styles.dashlineContainerStyle}>
            <UpDashlineIcon size={36} />
          </View>
          <View style={styles.connectorContainerStyle}>
            <BankIcon />
          </View>
        </View>
        <FlatList
          keyExtractor={(item) => item.title}
          data={cdrData ?? DEFAULT_CDR_DATA}
          contentContainerStyle={styles.cdrListContainerStyle}
          directionalLockEnabled={true}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <ItemCDR data={item} style={style?.itemCDRStyle} />}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.buttonCDRPolicyStyle}
        onPress={onCDRPolicyPressed}
      >
        <Text style={styles.cdrPolicyTextStyle}>
          {i18n?.t('link_bank_component.btn_view_cdr_policy') ?? 'View our CDR policy'}
        </Text>
      </TouchableOpacity>
      <Button
        label={i18n?.t('link_bank_component.btn_link') ?? 'Link'}
        onPress={onNext}
        style={
          style?.linkButtonStyle ?? {
            primaryContainerStyle: {
              marginHorizontal: 15,
              marginBottom: 10,
            },
          }
        }
      />
    </View>
  );
};

export default ConsumerDataComponent;
