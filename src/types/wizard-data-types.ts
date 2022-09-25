import { Dispatch, SetStateAction } from 'react';
import { DeductibleFormType } from '../components/insurance-wizard/deductible-amount';
import { PlanDetailsFormType } from '../components/insurance-wizard/plan-details';

export type WizardDataType = PlanDetailsFormType & DeductibleFormType;

export type WizardContextType = {
  wizardData: WizardDataType;
  setWizardData: Dispatch<SetStateAction<WizardDataType>>;
};
