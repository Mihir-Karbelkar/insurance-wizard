import { Box, BoxProps, Heading } from '@chakra-ui/react';
import { BOX_SHADOW, TEXT_GRAY_500 } from '../constants';
import { useWizardDataContext } from '../store/wizard-data';
import FormLabel from './form-elements/form-label';
import OverflownText from './overflown-text';

type FormPreviewProps = {
  containerProps?: BoxProps;
};

const FormPreview = (props: FormPreviewProps) => {
  const { containerProps } = props;
  const { wizardData } = useWizardDataContext();
  return (
    <Box
      backgroundColor={'white'}
      width={'100%'}
      borderRadius={'10px'}
      {...containerProps}
    >
      <Box p={4} textAlign={'center'} boxShadow={BOX_SHADOW}>
        <Heading fontSize={'2xl'} fontWeight="normal" color={TEXT_GRAY_500}>
          {' '}
          Form Preview
        </Heading>
      </Box>
      <Box px={'32px'} py={2}>
        <Box display={'flex'} justifyContent="space-between">
          <FormLabel flex={1}>Personal email address</FormLabel>
          <FormLabel flex={1} color={TEXT_GRAY_500}>
            <OverflownText>{wizardData?.email || '-'}</OverflownText>{' '}
          </FormLabel>
        </Box>
        <Box display={'flex'} justifyContent="space-between">
          <FormLabel flex={1}>Mobile number</FormLabel>
          <FormLabel flex={1} color={TEXT_GRAY_500}>
            {wizardData?.mobile || '-'}
          </FormLabel>
        </Box>{' '}
        <Box display={'flex'} justifyContent="space-between">
          <FormLabel flex={1}>Address line 01</FormLabel>
          <FormLabel flex={1} color={TEXT_GRAY_500}>
            <OverflownText>{wizardData?.address_line_1 || '-'}</OverflownText>
          </FormLabel>
        </Box>{' '}
        <Box display={'flex'} justifyContent="space-between">
          <FormLabel flex={1}>Address line 02</FormLabel>
          <FormLabel flex={1} color={TEXT_GRAY_500}>
            <OverflownText>{wizardData?.address_line_2 || '-'}</OverflownText>
          </FormLabel>
        </Box>{' '}
        <Box display={'flex'} justifyContent="space-between">
          <FormLabel flex={1}>Pincode</FormLabel>
          <FormLabel flex={1} color={TEXT_GRAY_500}>
            {wizardData?.pincode || '-'}
          </FormLabel>
        </Box>{' '}
        <Box display={'flex'} justifyContent="space-between">
          <FormLabel flex={1}>State</FormLabel>
          <FormLabel flex={1} color={TEXT_GRAY_500} maxW="200px">
            <OverflownText>{wizardData?.state || '-'}</OverflownText>
          </FormLabel>
        </Box>
      </Box>
    </Box>
  );
};

export default FormPreview;
