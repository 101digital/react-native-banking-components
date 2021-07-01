import React, { useContext } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import { ThemeContext } from '../../contexts/them-context';

export type ButtonStyleProps = {
  label: string;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  isPrimary?: boolean;
} & TouchableOpacityProps;

const BButton = (props: ButtonStyleProps) => {
  const { label, isLoading, style, textStyle, disabled, isPrimary, ...restProps } = props;
  const { theme } = useContext(ThemeContext);
  const {
    primaryContainer,
    secondaryContainer,
    labelStyle,
    loadingContainer,
    disableOpacity,
    loadingIndicator,
    indicatorColor,
    secondLabelStyle,
  } = theme.buttonTheme;

  const opacity = isLoading || disabled ? disableOpacity : 1.0;

  return (
    <TouchableOpacity
      style={[
        isPrimary ? primaryContainer : secondaryContainer,
        style,
        {
          opacity,
        },
      ]}
      activeOpacity={0.8}
      disabled={isLoading || disabled}
      {...restProps}
    >
      {isLoading && (
        <View style={loadingContainer}>
          {loadingIndicator ?? <ActivityIndicator color={indicatorColor} />}
        </View>
      )}
      <Text style={[isPrimary ? labelStyle : secondLabelStyle, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

BButton.defaultProps = {
  isLoading: false,
  disabled: false,
  isPrimary: true,
};

export default BButton;
