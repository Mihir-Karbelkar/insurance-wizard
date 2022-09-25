import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  MultiStepPropType,
  MultiStepValuesType,
} from '../../types/multi-step-types';
import MultiStepContext from './MultiStepContext';
import { PRIMARY_RED, SECONDARY_GRAY } from '../../constants';

const MultiStep: React.FC<React.PropsWithChildren<MultiStepPropType>> = (
  props
) => {
  const {
    startIndex,
    children,
    paginationStyles,
    paginationBoxWidth = 40,
    paginationArrowWidth = 40,
    allowAllPages = true,
    SuccessPage,
  } = props;
  const [currentStep, setCurrentStep] = useState<number>(startIndex);
  const componentChildren = React.Children.toArray(children);
  const stepCount = componentChildren.length;
  const [pagesAllowed, setPagesAllowed] = useState<boolean[]>(
    Array.from({ length: stepCount }, () => allowAllPages)
  );
  const [showSuccessPage, setSuccessPage] = useState<boolean>(false);

  useEffect(() => {
    const tempPagesVisited = [...pagesAllowed];
    tempPagesVisited[startIndex] = true;
    setPagesAllowed(tempPagesVisited);
  }, [startIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const tempPagesVisited = [...pagesAllowed];
    tempPagesVisited[currentStep] = true;
    setPagesAllowed(tempPagesVisited);
  }, [currentStep]); // eslint-disable-line react-hooks/exhaustive-deps

  const nextStep = () => {
    if (currentStep < stepCount - 1) {
      allowPage(currentStep + 1);
      setCurrentStep(currentStep + 1);
    } else {
      if (SuccessPage) {
        setCurrentStep(currentStep + 1);
        setSuccessPage(true);
      }
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      allowPage(currentStep - 1);
      setCurrentStep(currentStep - 1);
    }
  };

  const jumptToStep = (index: number) => {
    if (pagesAllowed?.[index])
      if (index >= 0 && index < stepCount) {
        setCurrentStep(index);
      }
  };

  const allowPage = (index: number) => {
    const tempPagesVisited = [...pagesAllowed];
    tempPagesVisited[index] = true;
    setPagesAllowed(tempPagesVisited);
  };

  const multiStepValue: MultiStepValuesType = {
    previousStep,
    nextStep,
    currentStep,
    jumptToStep,
    stepCount,
    allowPage,
    pagesAllowed,
  };

  return (
    <MultiStepContext.Provider value={multiStepValue}>
      {showSuccessPage ? (
        <Box
          width={'100%'}
          className={'stepper-scrollbar'}
          style={{ ...paginationStyles }}
        >
          <MultiStepPagination
            currentStep={currentStep}
            stepCount={stepCount}
            arrowWidth={paginationArrowWidth}
            boxWidth={paginationBoxWidth}
          />
          {SuccessPage}
        </Box>
      ) : (
        <>
          <Box
            width={'100%'}
            className={'stepper-scrollbar'}
            style={{ ...paginationStyles }}
          >
            <MultiStepPagination
              currentStep={currentStep}
              stepCount={stepCount}
              arrowWidth={paginationArrowWidth}
              boxWidth={paginationBoxWidth}
            />
          </Box>
          {componentChildren?.[currentStep]}
        </>
      )}
    </MultiStepContext.Provider>
  );
};

type MultiStepPaginationProps = {
  currentStep: number;
  stepCount: number;
  boxWidth?: number;
  arrowWidth?: number;
};

const MultiStepPagination = (props: MultiStepPaginationProps) => {
  const { currentStep, stepCount } = props;

  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        minW={'fit-content'}
      >
        {Array.from({ length: stepCount }, (_, index) => index).map((step) => {
          return (
            <Box
              backgroundColor={
                step <= currentStep ? PRIMARY_RED : SECONDARY_GRAY
              }
              height={'8px'}
              width={`calc(${100 / stepCount}% - 12px)`}
            ></Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default MultiStep;
