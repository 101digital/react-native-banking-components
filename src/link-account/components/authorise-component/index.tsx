import { AuthoriseComponentProps, AuthoriseComponentStyles } from '../../types';
import React, { useContext } from 'react';
import { ScrollView, Text, View } from 'react-native';
import useMergeStyles from './styles';
import { Button, Image, ThemeContext } from 'react-native-theme-component';
import { images } from '../../../assets/images';

const AuthoriseComponent = (props: AuthoriseComponentProps) => {
  const { bank, style, onContinue, appIcon } = props;
  const styles: AuthoriseComponentStyles = useMergeStyles(style);
  const { i18n } = useContext(ThemeContext);

  return (
    <View style={styles.containerStyle}>
      <ScrollView style={styles.mainContainerStyle}>
        <View style={styles.bankContainerStyle}>
          <View style={styles.bankItemContainerStyle}>{appIcon}</View>
          <View style={styles.dividerStyle} />
          <View style={styles.bankItemContainerStyle}>
            <Image
              source={{ uri: bank.imageUrl }}
              fallbackImage={images.bank}
              style={styles.bankImageStyle}
              resizeMode='contain'
            />
          </View>
        </View>
        <Text style={styles.titleTextStyle}>
          {i18n?.t('link_bank_component.lbl_need_to_connect_bank') ??
            'We need to securely connect you with your bank'}
        </Text>
        <Text style={styles.messageTextStyle}>
          {i18n?.t('link_bank_component.msg_continue_connect_bank') ??
            'By selecting “Continue” you will be securely transfered to your bank to authorise Data Sharing.'}
        </Text>
      </ScrollView>
      <Button
        label={i18n?.t('link_bank_component.btn_continue') ?? 'Continue'}
        onPress={onContinue}
        style={
          styles?.continueButtonStyle ?? {
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

export default AuthoriseComponent;
