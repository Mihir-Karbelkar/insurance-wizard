import React, { Fragment, useState } from 'react';
import WizardDataContext from '../../store/wizard-data';
import { WizardDataType } from '../../types/wizard-data-types';
import DeclarationPage from '../insurance-wizard/declaration';
import DeductibleAmountPage from '../insurance-wizard/deductible-amount';
import PlanDetails from '../insurance-wizard/plan-details';
import ReviewPage from '../insurance-wizard/review';
import SuccessPage from '../insurance-wizard/success';
import MultiStep from '../multi-step-component';

const Wizard = () => {
  const [wizardData, setWizardData] = useState<WizardDataType>({
    email: '',
    mobile: null,
    address_line_1: '',
    address_line_2: '',
    pincode: '',
    state: '',
    deductible_range: 300000,
    deductible_t_and_c: false,
    plan_type: null,
  });
  return (
    <Fragment>
      <WizardDataContext.Provider value={{ wizardData, setWizardData }}>
        <MultiStep startIndex={0} SuccessPage={<SuccessPage />}>
          <PlanDetails />
          <DeductibleAmountPage />
          <DeclarationPage />
          <ReviewPage />
        </MultiStep>
      </WizardDataContext.Provider>
    </Fragment>
  );
};

export default Wizard;
