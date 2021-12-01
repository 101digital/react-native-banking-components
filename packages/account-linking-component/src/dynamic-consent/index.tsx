import { BCheckedIcon, PenIcon } from '../assets/images';
import { BankPermission } from '@banking-component/core';
import React, { forwardRef, useContext, useImperativeHandle, useState } from 'react';
import { Text, Touchable, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import AuthoriseComponent from './components/authorise-component';
import ConsentSummaryComponent from './components/consent-summary-component';
import PeriodSelectionComponent from './components/period-selection-component';
import PermissionSelectionComponent from './components/permission-selection-component';
import StepperComponent from './components/stepper-component';
import useMergeStyles from './styles';
import {
  ConsentPeriod,
  DynamicConsentComponentProps,
  DynamicConsentComponentRefs,
  DynamicConsentComponentStyles,
} from './types';

const DynamicConsentComponent = forwardRef((props: DynamicConsentComponentProps, ref) => {
  const {
    stepperComponent,
    periodComponent,
    permissionSelectionComponent,
    consentSummaryComponent,
    authoriseComponent,
    style,
  } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [period, setPeriod] = useState<ConsentPeriod | undefined>(undefined);
  const [permissions, setPermissions] = useState<BankPermission[]>([]);
  const styles: DynamicConsentComponentStyles = useMergeStyles(style);
  const { i18n, colors } = useContext(ThemeContext);

  useImperativeHandle(
    ref,
    (): DynamicConsentComponentRefs => ({
      goBack,
      currentStep,
    })
  );

  const currentStep = () => activeStep;

  const goBack = () => {
    setActiveStep(activeStep - 1);
  };

  const _renderCatalogItem = (title: string, onPressed: () => void) => {
    return (
      <View style={styles.catalogContainerStyle}>
        <View style={styles.catalogTitleContainerStyle}>
          <Text style={styles.catalogTitleStyle}>{title}</Text>
          <BCheckedIcon color='#009A10' size={15} />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.catalogEditButtonStyle}
          onPress={onPressed}
        >
          <PenIcon color={colors.primaryColor} size={15} />
        </TouchableOpacity>
      </View>
    );
  };

  const getActiveStep = () => {
    switch (activeStep) {
      case 0:
      case 1:
      case 2:
        return 0;
      case 3:
        return 1;
      default:
        return 0;
    }
  };

  return (
    <>
      <StepperComponent activeStep={getActiveStep()} {...stepperComponent} />
      {activeStep === 0 && (
        <>
          <PeriodSelectionComponent
            {...periodComponent}
            initialPeriod={period}
            onNext={(value) => {
              setPeriod(value);
              setActiveStep(1);
            }}
          />
        </>
      )}
      {activeStep === 1 && (
        <>
          {_renderCatalogItem(
            i18n?.t('dynamic_consent_component.lbl_data_accessible_period') ??
              'Data accessible period',
            () => {
              setActiveStep(0);
            }
          )}
          <PermissionSelectionComponent
            permissions={permissions}
            onNext={() => {
              setActiveStep(2);
            }}
            onChanged={setPermissions}
            {...permissionSelectionComponent}
          />
        </>
      )}
      {activeStep === 2 && period && (
        <>
          {_renderCatalogItem(
            i18n?.t('dynamic_consent_component.lbl_data_accessible_period') ??
              'Data accessible period',
            () => {
              setActiveStep(0);
            }
          )}
          {_renderCatalogItem(
            i18n?.t('dynamic_consent_component.lbl_data_we_need') ?? 'Data we need',
            () => {
              setActiveStep(1);
            }
          )}
          <ConsentSummaryComponent
            period={period}
            onConsented={() => setActiveStep(3)}
            {...consentSummaryComponent}
          />
        </>
      )}
      {activeStep === 3 && <AuthoriseComponent onContinue={() => {}} {...authoriseComponent} />}
    </>
  );
});

export default DynamicConsentComponent;
