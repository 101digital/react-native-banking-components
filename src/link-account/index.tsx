import { PenIcon, TickIcon } from '../assets/images';
import { BankPermission } from '@banking-component/core';
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import AuthoriseComponent from './components/authorise-component';
import ConsentSummaryComponent from './components/consent-summary-component';
import PeriodSelectionComponent from './components/period-selection-component';
import PermissionSelectionComponent from './components/permission-selection-component';
import StepperComponent from './components/stepper-component';
import useMergeStyles from './styles';
import {
  LinkAccountComponentProps,
  LinkAccountComponentRefs,
  LinkAccountComponentStyles,
  LinkBankStatus,
  ProgressStep,
  Step,
} from './types';
import BankLoginComponent from './components/bank-login';
import ConfirmLinkingComponent from './components/confirm-linking-component';
import SelectAccountComponent from './components/select-account';
import ConsumerDataComponent from './components/consumer-data';
import { AccountLinkingContext } from '../context/account-linking-context';
import { ConsentPeriod } from '../types';

const LinkAccountComponent = forwardRef((componentsProps: LinkAccountComponentProps, ref) => {
  const {
    stepperComponent,
    periodComponent,
    permissionSelectionComponent,
    consentSummaryComponent,
    authoriseComponent,
    bankLoginComponent,
    selectAccountComponent,
    confirmLinkingComponent,
    consumerDataComponent,
    style,
    props,
  } = componentsProps;
  const {
    onLinkAccount,
    onStepChanged,
    bank,
    consentData,
    appIcon,
    onGoToAccount,
    onPressedLink,
  } = props;
  const [activeStep, setActiveStep] = useState<ProgressStep>(ProgressStep.consumerData);
  const [period, setPeriod] = useState<ConsentPeriod | undefined>(undefined);
  const [permissions, setPermissions] = useState<BankPermission[]>([]);
  const [consentId, setConsentId] = useState<string | undefined>(undefined);
  const [linkBankStatus, setLinkBankStatus] = useState<LinkBankStatus>(LinkBankStatus.isLinking);
  const styles: LinkAccountComponentStyles = useMergeStyles(style);
  const { i18n, colors } = useContext(ThemeContext);
  const { getConsent } = useContext(AccountLinkingContext);

  const [steps, setSteps] = useState<Step[]>(
    stepperComponent?.steps ?? [
      {
        title: 'Consent',
        status: 'success',
      },
      {
        title: 'Authorise',
        status: 'success',
      },
      {
        title: 'Confirm',
        status: 'success',
      },
    ]
  );

  useEffect(() => {
    onStepChanged?.(activeStep);
  }, [activeStep]);

  useImperativeHandle(
    ref,
    (): LinkAccountComponentRefs => ({
      goBack,
      currentStep,
      updateLinkBankStatus,
    })
  );

  const updateLinkBankStatus = (status: LinkBankStatus) => {
    let _status: 'success' | 'failed' | undefined = undefined;
    if (status === LinkBankStatus.isSuccess) {
      _status = 'success';
    } else if (status === LinkBankStatus.isFailed) {
      _status = 'failed';
    }
    const _stepsLength = steps.length;
    setSteps(steps.map((s, i) => (i === _stepsLength - 1 ? { ...s, status: _status } : s)));
    setLinkBankStatus(status);
    if (activeStep !== ProgressStep.confirmResult) {
      setActiveStep(ProgressStep.confirmResult);
    }
  };

  const currentStep = () => activeStep;

  const goBack = () => {
    setActiveStep(activeStep - 1);
  };

  const _renderCatalogItem = (title: string, onPressed: () => void) => {
    return (
      <View style={styles.catalogContainerStyle}>
        <View style={styles.catalogTitleContainerStyle}>
          <Text style={styles.catalogTitleStyle}>{title}</Text>
          <TickIcon color='#009A10' size={15} />
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
      case ProgressStep.consumerData:
      case ProgressStep.accessiblePeriod:
      case ProgressStep.permissionRequest:
      case ProgressStep.summaryData:
        return 0;
      case ProgressStep.confirmLogin:
      case ProgressStep.loginBank:
      case ProgressStep.selectAccounts:
        return 1;
      case ProgressStep.confirmResult:
        return 2;
      default:
        return 0;
    }
  };

  return (
    <>
      {activeStep !== ProgressStep.consumerData &&
        activeStep !== ProgressStep.loginBank &&
        activeStep !== ProgressStep.selectAccounts && (
          <StepperComponent steps={steps} activeStep={getActiveStep()} {...stepperComponent} />
        )}
      {activeStep === ProgressStep.consumerData && (
        <ConsumerDataComponent
          onNext={() => {
            setPeriod(undefined);
            setPermissions([]);
            setConsentId(undefined);
            setActiveStep(ProgressStep.accessiblePeriod);
          }}
          onCDRPolicyPressed={() => {
            onPressedLink(consentData.cdrPolicyLink);
          }}
          {...consumerDataComponent}
        />
      )}
      {activeStep === ProgressStep.accessiblePeriod && (
        <>
          <PeriodSelectionComponent
            periods={consentData.consentPeriods}
            recipientId={bank.accreditedDataRecipientId ?? ''}
            companyName={consentData.companyName}
            initialPeriod={period}
            onNext={(value) => {
              setPeriod(value);
              setActiveStep(ProgressStep.permissionRequest);
            }}
            {...periodComponent}
          />
        </>
      )}
      {activeStep === ProgressStep.permissionRequest && (
        <>
          {_renderCatalogItem(
            i18n?.t('link_bank_component.lbl_data_accessible_period') ?? 'Data accessible period',
            () => {
              setActiveStep(ProgressStep.accessiblePeriod);
            }
          )}
          <PermissionSelectionComponent
            bank={bank}
            permissions={permissions}
            onNext={() => {
              setActiveStep(ProgressStep.summaryData);
            }}
            onChanged={setPermissions}
            {...permissionSelectionComponent}
          />
        </>
      )}
      {activeStep === ProgressStep.summaryData && period && (
        <>
          {_renderCatalogItem(
            i18n?.t('link_bank_component.lbl_data_accessible_period') ?? 'Data accessible period',
            () => {
              setActiveStep(ProgressStep.accessiblePeriod);
            }
          )}
          {_renderCatalogItem(
            i18n?.t('link_bank_component.lbl_data_we_need') ?? 'Data we need',
            () => {
              setActiveStep(ProgressStep.permissionRequest);
            }
          )}
          <ConsentSummaryComponent
            summaries={consentData.consentSummaries}
            period={period}
            onConsented={() => setActiveStep(ProgressStep.confirmLogin)}
            onPressedLink={onPressedLink}
            {...consentSummaryComponent}
          />
        </>
      )}
      {activeStep === ProgressStep.confirmLogin && (
        <AuthoriseComponent
          bank={bank}
          appIcon={appIcon}
          onContinue={() => {
            getConsent(bank.id);
            setActiveStep(ProgressStep.loginBank);
          }}
          {...authoriseComponent}
        />
      )}
      {activeStep === ProgressStep.loginBank && (
        <BankLoginComponent
          bank={bank}
          onLinked={(bankId, consentId) => onLinkAccount(bankId, consentId, [])}
          onConfirmed={(_consentId) => {
            setConsentId(_consentId);
            setActiveStep(ProgressStep.selectAccounts);
          }}
          {...bankLoginComponent}
        />
      )}
      {activeStep === ProgressStep.selectAccounts && consentId && (
        <SelectAccountComponent
          bank={bank}
          consentId={consentId}
          companyName={consentData.companyName}
          onLinkAccount={onLinkAccount}
          {...selectAccountComponent}
        />
      )}
      {activeStep === ProgressStep.confirmResult && (
        <ConfirmLinkingComponent
          bank={bank}
          status={linkBankStatus}
          {...confirmLinkingComponent}
          onGoToAccount={onGoToAccount}
        />
      )}
    </>
  );
});

export default LinkAccountComponent;
