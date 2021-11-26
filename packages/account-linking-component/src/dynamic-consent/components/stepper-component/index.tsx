import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { StepperComponentProps, StepperComponentStyles } from '../../types';
import useMergeStyles from './styles';
const DEFAULT_STEPS = ['Consent', 'Authorise', 'Confirm'];

const StepperComponent = (props: StepperComponentProps) => {
  const {
    steps,
    style,
    activeColor,
    inActiveColor,
    activeStep,
    activeNumberColor,
    stepDotSize,
    inActiveNumberColor,
  } = props;
  const styles: StepperComponentStyles = useMergeStyles(style);
  const { colors } = useContext(ThemeContext);
  const _steps = steps ?? DEFAULT_STEPS;
  const _activeColor = activeColor ?? colors.primaryColor;
  const _inActiveColor = inActiveColor ?? '#BFBFBF';
  const _activeNumberColor = activeNumberColor ?? '#fff';
  const _inActiveNumberColor = inActiveNumberColor ?? '#000';
  const _dotSize = stepDotSize ?? 30;

  return (
    <View style={styles.containerStyle}>
      <View style={styles.contentContainerStyle}>
        {_steps.map((item, index) => (
          <View key={item} style={styles.stepContainerStyle}>
            {index === 0 ? (
              <View style={{ flex: 1 }} />
            ) : (
              <View
                style={[
                  styles.lineStyle,
                  { backgroundColor: activeStep >= index ? _activeColor : _inActiveColor },
                ]}
              />
            )}
            <>
              <View
                style={[
                  styles.dotContainerStyle,
                  {
                    width: _dotSize,
                    height: _dotSize,
                    borderRadius: _dotSize / 2,
                    backgroundColor: activeStep >= index ? _activeColor : 'white',
                    borderWidth: activeStep >= index ? 0 : 1,
                    borderColor: activeStep >= index ? _activeColor : _inActiveColor,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.stepNumberTextStyle,
                    { color: activeStep >= index ? _activeNumberColor : _inActiveNumberColor },
                  ]}
                >
                  {index + 1}
                </Text>
              </View>
            </>
            {index === _steps.length - 1 ? (
              <View style={{ flex: 1 }} />
            ) : (
              <View
                style={[
                  styles.lineStyle,
                  { backgroundColor: activeStep > index ? _activeColor : _inActiveColor },
                ]}
              />
            )}
          </View>
        ))}
      </View>
      <View style={styles.titleContainerStyle}>
        {_steps.map((item, index) => (
          <Text
            key={item}
            style={[
              styles.titleTextStyle,
              { color: activeStep >= index ? _activeColor : _inActiveColor },
            ]}
          >
            {item}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default StepperComponent;
