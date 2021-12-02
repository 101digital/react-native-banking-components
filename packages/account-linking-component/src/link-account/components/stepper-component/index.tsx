import { TickIcon, CloseIcon } from '../../../assets/images';
import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { Step, StepperComponentProps, StepperComponentStyles } from '../../types';
import useMergeStyles from './styles';

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
  const _activeColor = activeColor ?? colors.primaryColor;
  const _inActiveColor = inActiveColor ?? '#BFBFBF';
  const _activeNumberColor = activeNumberColor ?? '#fff';
  const _inActiveNumberColor = inActiveNumberColor ?? '#000';
  const _dotSize = stepDotSize ?? 30;

  const _getDotContent = (index: number, step: Step) => {
    if ((activeStep === steps.length - 1 || activeStep > index) && step.status !== undefined) {
      return step.status === 'success' ? (
        <TickIcon color={_activeNumberColor} size={15} />
      ) : (
        <CloseIcon color={_activeNumberColor} size={15} />
      );
    }
    return (
      <Text
        style={[
          styles.stepNumberTextStyle,
          { color: activeStep >= index ? _activeNumberColor : _inActiveNumberColor },
        ]}
      >
        {index + 1}
      </Text>
    );
  };

  return (
    <View style={styles.containerStyle}>
      <View style={styles.contentContainerStyle}>
        {steps.map((item, index) => (
          <View key={item.title} style={styles.stepContainerStyle}>
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
                {_getDotContent(index, item)}
              </View>
            </>
            {index === steps.length - 1 ? (
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
        {steps.map((item, index) => (
          <Text
            key={item.title}
            style={[
              styles.titleTextStyle,
              { color: activeStep >= index ? _activeColor : _inActiveColor },
            ]}
          >
            {item.title}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default StepperComponent;
