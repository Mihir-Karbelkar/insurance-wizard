import {
  Box,
  Container,
  Text,
  Flex,
  Heading,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Stack,
  Button,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import {
  BOX_SHADOW,
  PLAN_OPTIONS,
  SECONDARY_GRAY_100,
  SITE_SIZES,
  TEXT_GRAY,
  TEXT_GRAY_500,
} from '../../constants';
import FormLabel from '../form-elements/form-label';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import FormInput from '../form-elements/form-input';
import FormPreview from '../form-preview';
import { useWizardDataContext } from '../../store/wizard-data';
import useMultiStep from '../multi-step-component/useMultiStep';
import { useForm } from 'react-hook-form';
import FormSelect from '../form-elements/form-select';
import { FormatOptionLabelMeta } from 'react-select';
import { formatAmount } from '../../utils/helpers';

export type PlanDetailsFormType = {
  email: string;
  mobile: number | null;
  address_line_1: string;
  address_line_2: string;
  pincode: string;
  state: string;
  plan_type: {
    name: string;
    hint: string;
    value: string;
    data: {
      price: number;
      icon: JSX.Element;
      label: string;
    } | null;
  } | null;
};

const formatOptionLabel = (
  data: unknown,
  context: FormatOptionLabelMeta<unknown>
) => {
  const option = data as PlanDetailsFormType['plan_type'];

  return context.context === 'value' ? (
    <Box>
      <Text as="span" color={TEXT_GRAY_500} fontWeight="600" fontSize="16px">
        {option?.name}
      </Text>
      <Text as="span" color={TEXT_GRAY_500} fontSize="16px" ml={1}>
        ({option?.hint})
      </Text>
    </Box>
  ) : (
    <Box boxShadow={BOX_SHADOW} pb={2}>
      <Box p={2}>
        <Text as="span" color={TEXT_GRAY_500} fontWeight="600" fontSize="12px">
          {option?.name}
        </Text>
        <Text as="span" color={TEXT_GRAY_500} fontSize="12px" ml={1}>
          {option?.hint ? `(${option?.hint})` : null}
        </Text>
      </Box>
      <Box
        display={'flex'}
        justifyContent="space-between"
        mt={2}
        _hover={{ backgroundColor: SECONDARY_GRAY_100 }}
        p={2}
        cursor="pointer"
      >
        <Box display={'flex'} alignItems="center">
          {option?.data?.icon}
          <Text as="span" fontSize={'14px'} ml={2} fontWeight="600">
            {option?.data?.label}
          </Text>
        </Box>
        <Box fontWeight={'600'} fontSize={'14px'}>
          {formatAmount(option?.data?.price as number)}
        </Box>
      </Box>
    </Box>
  );
};

const PlanDetails = () => {
  const { setWizardData, wizardData } = useWizardDataContext();
  const { nextStep } = useMultiStep();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PlanDetailsFormType>({
    defaultValues: {
      ...wizardData,
    },
  });
  return (
    <Box marginBottom={SITE_SIZES.sticky_bar.height}>
      {' '}
      <form
        onSubmit={handleSubmit((data) => {
          setWizardData({ ...wizardData, ...data });
          nextStep();
        })}
      >
        <Container maxW="82%" mt={'40px'}>
          <Flex justifyContent={'space-between'}>
            <Box flex={2} mr={8}>
              <Heading>Choose your plan</Heading>
              <Text fontSize={'xl'} color={TEXT_GRAY} mt={2}>
                Hello Anisha,
              </Text>
              <Text fontSize={'xl'} color={TEXT_GRAY}>
                Increase yours and your family's health insurance cover by ₹20
                lakhs with Super top-up!
              </Text>
              <Accordion
                mt={8}
                backgroundColor={'white'}
                borderRadius="10px"
                allowToggle
                defaultIndex={0}
              >
                <AccordionItem>
                  <AccordionButton boxShadow={BOX_SHADOW}>
                    <Box flex="1" textAlign="left" py={2}>
                      <Text fontWeight={'bold'} as="span">
                        {' '}
                        Plan details
                      </Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pt={6}>
                    <FormControl isInvalid={Boolean(errors?.plan_type)}>
                      <FormLabel>Your plan type</FormLabel>
                      <Box w="70%">
                        <FormSelect<PlanDetailsFormType>
                          name="plan_type"
                          control={control}
                          options={PLAN_OPTIONS}
                          isMulti={false}
                          formatOptionLabel={formatOptionLabel}
                          menuPortalTarget={document.body}
                          isSearchable={false}
                          placeholder="Select your plan"
                          rules={{ required: 'Plan is required' }}
                          isInvalid={Boolean(errors?.plan_type)}
                        />
                      </Box>
                      <FormErrorMessage>
                        {errors?.plan_type?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              <Accordion
                mt={5}
                mb={5}
                backgroundColor={'white'}
                borderRadius="10px"
                allowToggle
                defaultIndex={0}
              >
                <AccordionItem>
                  <AccordionButton boxShadow={BOX_SHADOW}>
                    <Box flex="1" textAlign="left" py={2}>
                      <Text fontWeight={'bold'} as="span">
                        {' '}
                        Basic details
                      </Text>{' '}
                      (required)
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pt={6}>
                    <Stack spacing={'20px'}>
                      <Flex justifyContent={'space-between'}>
                        <Box w="48%">
                          <FormControl isInvalid={Boolean(errors?.email)}>
                            <FormLabel display={'flex'} alignItems="center">
                              Personal email address{' '}
                              <Box
                                ml={4}
                                fontSize="20px"
                                as={IoMdInformationCircleOutline}
                              />
                            </FormLabel>
                            <FormInput
                              placeholder="Enter"
                              register={register('email', {
                                required: 'Email is required',
                                pattern: {
                                  value:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: 'Invalid email address',
                                },
                              })}
                            />
                            <FormErrorMessage>
                              {errors?.email?.message}
                            </FormErrorMessage>
                          </FormControl>
                        </Box>
                        <Box w="48%">
                          <FormControl isInvalid={Boolean(errors?.mobile)}>
                            <FormLabel display={'flex'} alignItems="center">
                              Mobile
                            </FormLabel>
                            <FormInput
                              placeholder="Enter"
                              register={register('mobile', {
                                required: 'Mobile is required',
                              })}
                            />
                            <FormErrorMessage>
                              {errors?.mobile?.message}
                            </FormErrorMessage>
                          </FormControl>
                        </Box>
                      </Flex>
                      <Flex justifyContent={'space-between'}>
                        <Box w="48%">
                          <FormControl
                            isInvalid={Boolean(errors?.address_line_1)}
                          >
                            <FormLabel display={'flex'} alignItems="center">
                              Address line 01
                            </FormLabel>
                            <FormInput
                              placeholder="Enter"
                              register={register('address_line_1', {
                                required: 'Address line 1 is required',
                              })}
                            />
                            <FormErrorMessage>
                              {errors?.address_line_1?.message}
                            </FormErrorMessage>
                          </FormControl>
                        </Box>
                        <Box w="48%">
                          <FormLabel display={'flex'} alignItems="center">
                            Address line 02
                          </FormLabel>
                          <FormInput
                            placeholder="Enter"
                            register={register('address_line_2')}
                          />
                        </Box>
                      </Flex>{' '}
                      <Flex justifyContent={'space-between'}>
                        <Box w="48%">
                          <FormControl isInvalid={Boolean(errors?.pincode)}>
                            <FormLabel display={'flex'} alignItems="center">
                              Pincode{' '}
                            </FormLabel>
                            <FormInput
                              placeholder="Enter"
                              register={register('pincode', {
                                required: 'Pincode is required',
                              })}
                            />
                            <FormErrorMessage>
                              {errors?.pincode?.message}
                            </FormErrorMessage>
                          </FormControl>
                        </Box>
                        <Box w="48%">
                          <FormControl isInvalid={Boolean(errors?.state)}>
                            <FormLabel display={'flex'} alignItems="center">
                              State
                            </FormLabel>
                            <FormInput
                              placeholder="Enter"
                              register={register('state', {
                                required: 'State is required',
                              })}
                            />
                            <FormErrorMessage>
                              {errors?.state?.message}
                            </FormErrorMessage>
                          </FormControl>
                        </Box>
                      </Flex>
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
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
          zIndex={5}
        >
          <Button type="submit" variant={'primary'} mr={5}>
            Next
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default PlanDetails;
