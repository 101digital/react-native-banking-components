import { ConfirmLinkingComponentProps } from '../../types';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

const ConfirmLinkingComponent = (props: ConfirmLinkingComponentProps) => {
  const { lastStep } = props;
  return <View>{!lastStep.status ? <ActivityIndicator /> : <Text>{lastStep.status}</Text>}</View>;
};

export default ConfirmLinkingComponent;
