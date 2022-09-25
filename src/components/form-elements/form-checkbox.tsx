import { Checkbox, CheckboxProps } from '@chakra-ui/react';
import { INPUT_BORDER_COLOR, PRIMARY_RED_500 } from '../../constants';
import { UseFormRegisterReturn } from 'react-hook-form';

const FormCheckbox = (
  props: CheckboxProps & { register: UseFormRegisterReturn }
) => {
  const { register } = props;
  return (
    <Checkbox
      colorScheme="none"
      ringColor={INPUT_BORDER_COLOR}
      _checked={{
        bgColor: PRIMARY_RED_500,
        color: PRIMARY_RED_500,
        borderRadius: '4px',
        ringColor: PRIMARY_RED_500,
      }}
      borderRadius="4px"
      {...props}
      {...register}
    />
  );
};

export default FormCheckbox;
