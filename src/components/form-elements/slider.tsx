import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderProps,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';
import { Controller, UseFormReturn, FieldValues, Path } from 'react-hook-form';
import {
  ACCENT_YELLOW_100,
  PRIMARY_RED_200,
  PRIMARY_RED_600,
  TEXT_GRAY_400,
} from '../../constants';

type CustomSliderProps<T extends FieldValues> = {
  control: UseFormReturn<T>['control'];
  name: Path<T>;
  steps: {
    value: number;
    label: string;
  }[];
  formatLabel?: (value: number) => JSX.Element;
} & SliderProps;

const SLIDER_HIDE_THRESHOLD = 10000;

const CustomSlider = <T extends FieldValues>(props: CustomSliderProps<T>) => {
  const { name, control, steps = [], formatLabel, ...rest } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Slider
          {...rest}
          value={value}
          onChange={(val) => {
            onChange(val);
          }}
        >
          {steps.map(
            (step) =>
              Math.abs(step.value - value) > SLIDER_HIDE_THRESHOLD && (
                <SliderMark value={step.value} zIndex={3}>
                  <Box
                    backgroundColor={PRIMARY_RED_600}
                    width="8px"
                    height="8px"
                    borderRadius={'50%'}
                    mt={'-4px'}
                  ></Box>
                  <Box
                    mt={3}
                    marginLeft={'-8px'}
                    fontSize="12px"
                    color={TEXT_GRAY_400}
                  >
                    {step.label}
                  </Box>
                </SliderMark>
              )
          )}
          <SliderMark value={value} marginLeft={'-18px'}>
            {formatLabel ? formatLabel(value) : value}
          </SliderMark>
          <SliderTrack backgroundColor={ACCENT_YELLOW_100}>
            <SliderFilledTrack backgroundColor={PRIMARY_RED_600} />
          </SliderTrack>
          <SliderThumb
            backgroundColor={PRIMARY_RED_600}
            width="24px"
            height="24px"
          >
            <Box
              backgroundColor={PRIMARY_RED_200}
              width="12px"
              height="12px"
              borderRadius={'50%'}
            ></Box>
          </SliderThumb>
        </Slider>
      )}
    />
  );
};

export default CustomSlider;
