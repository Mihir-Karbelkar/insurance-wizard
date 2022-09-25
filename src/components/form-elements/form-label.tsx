import { Text, TextProps } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { TEXT_GRAY } from '../../constants';

const FormLabel = (props: PropsWithChildren<TextProps>) => {
  const { children, ...rest } = props;
  return (
    <Text mb={2} as="span" fontSize={'14px'} color={TEXT_GRAY} {...rest}>
      {children}
    </Text>
  );
};

export default FormLabel;
