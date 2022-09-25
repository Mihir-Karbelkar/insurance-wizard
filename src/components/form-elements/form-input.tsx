import { Input, InputProps } from '@chakra-ui/react';
import { INPUT_BORDER_COLOR } from '../../constants';
import { UseFormRegisterReturn } from 'react-hook-form';

const FormInput = (props: InputProps & { register: UseFormRegisterReturn }) => {
  const { register } = props;
  return <Input borderColor={INPUT_BORDER_COLOR} {...props} {...register} />;
};

export default FormInput;
