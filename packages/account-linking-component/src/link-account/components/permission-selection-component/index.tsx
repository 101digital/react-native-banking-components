import React, { useContext } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Button, ThemeContext } from 'react-native-theme-component';
import { PermissionSelectionComponentProps, PermissonSelectionComponentStyles } from '../../types';
import ItemConsentPermission from './item-consent-permission';
import useMergeStyles from './styles';

const PermissionSelectionComponent = (props: PermissionSelectionComponentProps) => {
  const { bank, style, onNext, permissions, onChanged } = props;
  const styles: PermissonSelectionComponentStyles = useMergeStyles(style);
  const { i18n } = useContext(ThemeContext);

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.headerTitleStyle}>
        {i18n?.t('link_bank_component.lbl_data_we_need') ?? 'Data we need'}
      </Text>
      <Text style={styles.headerMessageStyle}>
        {i18n?.t('link_bank_component.msg_select_data_to_share') ??
          'Plese select the data you like to share. We use the data to provide you a consolidated view of your money, to provide recomendation, and help you to reconcile your finances.'}
      </Text>
      <FlatList
        keyExtractor={(item) => item.id}
        data={bank.permissions}
        style={styles.permissionListStyle}
        ItemSeparatorComponent={() => <View style={styles.separatorStyle} />}
        renderItem={({ item }) => (
          <ItemConsentPermission
            permission={item}
            value={permissions.includes(item)}
            onValueChanged={(value) => {
              if (value) {
                onChanged([...permissions, item]);
              } else {
                onChanged(permissions.filter((p) => p.id !== item.id));
              }
            }}
            style={styles.itemConsentPermissionStyle}
          />
        )}
      />
      <Button
        onPress={onNext}
        label={i18n?.t('link_bank_component.btn_next') ?? 'Next'}
        disabled={permissions.length !== bank.permissions.length}
        style={{
          primaryContainerStyle: {
            marginHorizontal: 16,
            marginBottom: 10,
          },
        }}
      />
    </View>
  );
};
export default PermissionSelectionComponent;
