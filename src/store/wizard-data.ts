import React from 'react';
import { WizardContextType } from '../types/wizard-data-types';

const WizardDataContext = React.createContext<WizardContextType | null>(null);

export const useWizardDataContext = () => {
  const context = React.useContext(WizardDataContext);
  if (!context) throw Error('Wrapper missing!');
  return context;
};

export default WizardDataContext;
