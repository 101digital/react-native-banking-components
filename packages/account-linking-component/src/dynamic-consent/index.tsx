import React, { forwardRef, useImperativeHandle, useState } from 'react';
import ConsentSummaryComponent from './components/consent-summary-component';
import PeriodSelectionComponent from './components/period-selection-component';
import PermissionSelectionComponent from './components/permission-selection-component';
import StepperComponent from './components/stepper-component';
import { ConsentPeriod, DynamicConsentComponentProps, DynamicConsentComponentRefs } from './types';

const DynamicConsentComponent = forwardRef((props: DynamicConsentComponentProps, ref) => {
  const {
    stepperComponent,
    periodComponent,
    permissionSelectionComponent,
    consentSummaryComponent,
  } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [period, setPeriod] = useState<ConsentPeriod | undefined>(undefined);

  useImperativeHandle(
    ref,
    (): DynamicConsentComponentRefs => ({
      goBack,
      currentStep,
    })
  );

  const currentStep = () => activeStep;

  const goBack = () => {
    if (activeStep === 2) {
      setPeriod(undefined);
    }
    setActiveStep(activeStep - 1);
  };

  const getActiveStep = () => {
    switch (activeStep) {
      case 0:
      case 1:
      case 2:
        return 0;
      default:
        return activeStep;
    }
  };

  return (
    <>
      <StepperComponent activeStep={getActiveStep()} {...stepperComponent} />
      {activeStep === 0 && (
        <PeriodSelectionComponent
          {...periodComponent}
          onNext={(value) => {
            setPeriod(value);
            setActiveStep(1);
          }}
        />
      )}
      {activeStep === 1 && (
        <PermissionSelectionComponent
          onNext={() => {
            setActiveStep(2);
          }}
          {...permissionSelectionComponent}
        />
      )}
      {activeStep === 2 && period && (
        <ConsentSummaryComponent
          period={period}
          onConsented={() => setActiveStep(3)}
          {...consentSummaryComponent}
        />
      )}
    </>
  );
});

export default DynamicConsentComponent;
