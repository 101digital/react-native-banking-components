import { BankPermission } from '@banking-component/core';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import AuthoriseComponent from './components/authorise-component';
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
    authoriseComponent,
  } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [period, setPeriod] = useState<ConsentPeriod | undefined>(undefined);
  const [permissions, setPermissions] = useState<BankPermission[]>([]);

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
        <PeriodSelectionComponent
          {...periodComponent}
          initialPeriod={period}
          onNext={(value) => {
            setPeriod(value);
            setActiveStep(1);
          }}
        />
      )}
      {activeStep === 1 && (
        <PermissionSelectionComponent
          permissions={permissions}
          onNext={() => {
            setActiveStep(2);
          }}
          onChanged={setPermissions}
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
      {activeStep === 3 && <AuthoriseComponent onContinue={() => {}} {...authoriseComponent} />}
    </>
  );
});

export default DynamicConsentComponent;
