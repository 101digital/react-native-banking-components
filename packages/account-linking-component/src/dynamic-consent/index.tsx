import React, { useState } from 'react';
import PeriodSelectionComponent from './components/period-selection-component';
import PermissionSelectionComponent from './components/permission-selection-component';
import StepperComponent from './components/stepper-component';
import { DynamicConsentComponentProps } from './types';

const DynamicConsentComponent = (props: DynamicConsentComponentProps) => {
  const { bank, companyName, periods } = props;
  const [activeStep, setActiveStep] = useState(0);

  const getActiveStep = () => {
    switch (activeStep) {
      case 0:
      case 1:
        return 0;
      default:
        return 0;
    }
  };

  return (
    <>
      <StepperComponent activeStep={getActiveStep()} />
      {activeStep === 0 && (
        <PeriodSelectionComponent
          companyName={companyName}
          periods={periods}
          recipientId={bank.accreditedDataRecipientId}
          onNext={(period) => {
            setActiveStep(1);
          }}
        />
      )}
      {activeStep === 1 && <PermissionSelectionComponent bank={bank} />}
    </>
  );
};

export default DynamicConsentComponent;
