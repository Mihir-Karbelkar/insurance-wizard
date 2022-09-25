import {
  Box,
  Container,
  Text,
  Flex,
  Heading,
  Button,
  IconButton,
  Link,
  FormControl,
} from '@chakra-ui/react';
import {
  BOX_SHADOW,
  GHOST_BACKGROUND,
  SITE_SIZES,
  TEXT_GRAY,
} from '../../constants';
import FormPreview from '../form-preview';
import { useWizardDataContext } from '../../store/wizard-data';
import useMultiStep from '../multi-step-component/useMultiStep';
import { useForm, useWatch } from 'react-hook-form';
import { BiChevronLeft } from 'react-icons/bi';
import CustomSlider from '../form-elements/slider';
import { formatAmount } from '../../utils/helpers';
import FormCheckbox from '../form-elements/form-checkbox';
import AvatarIcon from '../icons/avatar';

export type DeductibleFormType = {
  deductible_range: number;
  deductible_t_and_c: boolean;
};

const SUM_INSURED = 2000000;
const DEDUCTIBLE_SLIDER_STEPS = [
  {
    value: 100000,
    label: '₹1L',
  },
  {
    value: 200000,
    label: '₹2L',
  },
  {
    value: 500000,
    label: '₹5L',
  },
];

const DeductibleAmountPage = () => {
  const { setWizardData, wizardData } = useWizardDataContext();
  const { nextStep, previousStep } = useMultiStep();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<DeductibleFormType>({
    defaultValues: {
      deductible_range: wizardData?.deductible_range || 0,
      deductible_t_and_c: wizardData?.deductible_t_and_c || false,
    },
  });
  const deductibleAmount = useWatch({
    control,
    name: 'deductible_range',
  });
  return (
    <Box minH={'100vh'} marginBottom={SITE_SIZES.sticky_bar.height}>
      {' '}
      <form
        onSubmit={handleSubmit((data) => {
          setWizardData({
            ...wizardData,
            ...data,
          });
          nextStep();
        })}
      >
        <Container maxW="82%" mt={'40px'}>
          <Flex justifyContent={'space-between'}>
            <Box flex={2} mr={8}>
              <Flex>
                <Box mr={'24px'}>
                  <IconButton
                    aria-label="left-icon"
                    borderRadius={'50%'}
                    backgroundColor={GHOST_BACKGROUND}
                    width="60px"
                    height={'60px'}
                    onClick={() => previousStep()}
                    icon={<BiChevronLeft fontSize={'40px'} />}
                  />
                </Box>
                <Box>
                  <Heading>Select your deductible amount</Heading>
                  <Text fontSize={'xl'} color={TEXT_GRAY} mt={2}>
                    Select the deductible amount for the policy (or policies)
                    below.
                  </Text>
                  <Text fontSize={'xl'} color={TEXT_GRAY}>
                    (
                    <Link target={'_blank'} textDecor={'underline'}>
                      what is a deductible?
                    </Link>
                    )
                  </Text>
                </Box>
              </Flex>
              <Box
                mt={10}
                backgroundColor="white"
                borderRadius="8px"
                width="100%"
              >
                <Box px={6} py={4} boxShadow={BOX_SHADOW}>
                  <Text fontWeight={'bold'} as="span">
                    {`${wizardData?.plan_type?.name} (${wizardData?.plan_type?.hint})`}{' '}
                  </Text>
                  <Flex alignItems={'center'} mt={2}>
                    <AvatarIcon />{' '}
                    <Text ml={2} fontSize="14px" fontWeight={'bold'}>
                      John Doe
                    </Text>
                  </Flex>
                </Box>
                <Box p={6}>
                  <Text fontSize={'16px'} fontWeight={400}>
                    Sum insured of {formatAmount(SUM_INSURED)} wit a deductible
                    of{' '}
                    <Text as="span" fontWeight={600}>
                      {' '}
                      {formatAmount(deductibleAmount)}
                    </Text>
                  </Text>
                  <Box mt={2}>
                    <CustomSlider<DeductibleFormType>
                      steps={DEDUCTIBLE_SLIDER_STEPS}
                      step={1}
                      min={0}
                      max={500000}
                      name="deductible_range"
                      control={control}
                      formatLabel={(value) => {
                        return (
                          <Box mt={4} fontSize="12px">
                            ₹{(value / 100000).toFixed(2)}L
                          </Box>
                        );
                      }}
                    />
                  </Box>
                </Box>
              </Box>
              <FormControl isInvalid={Boolean(errors?.deductible_t_and_c)}>
                <Box mt={5} display="flex" alignItems={'start'}>
                  <FormCheckbox
                    mt={1}
                    register={register('deductible_t_and_c', {
                      validate: (value) => value,
                    })}
                    isInvalid={Boolean(errors?.deductible_t_and_c)}
                  />
                  <Text ml={2} fontSize={'xl'} color={TEXT_GRAY}>
                    I understand that this insurance will not be utilized until
                    {` ${formatAmount(deductibleAmount)}`} (deductible) is
                    exhausted.
                  </Text>
                </Box>
              </FormControl>
            </Box>
            <Box flex={1}>
              <FormPreview />
            </Box>
          </Flex>
        </Container>
        <Box
          position="fixed"
          width={'100%'}
          bottom={0}
          height={SITE_SIZES.sticky_bar.height}
          alignItems="center"
          backgroundColor="white"
          display={'flex'}
          justifyContent="flex-end"
          dropShadow={`0px -4px 8px 0px #2D3D540F`}
        >
          <Button type="submit" variant={'primary'} mr={5}>
            Next
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default DeductibleAmountPage;
