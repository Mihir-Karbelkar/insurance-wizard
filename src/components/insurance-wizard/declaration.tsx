import {
  Box,
  Container,
  Text,
  Flex,
  Heading,
  Button,
  IconButton,
  FormControl,
} from '@chakra-ui/react';
import { GHOST_BACKGROUND, SITE_SIZES, TEXT_GRAY } from '../../constants';
import FormPreview from '../form-preview';
import { useWizardDataContext } from '../../store/wizard-data';
import useMultiStep from '../multi-step-component/useMultiStep';
import { useForm } from 'react-hook-form';
import { BiChevronLeft } from 'react-icons/bi';
import FormCheckbox from '../form-elements/form-checkbox';

enum DeclarationEnum {
  alcolhol_t_and_c = 'alcolhol_t_and_c',
  health_condition_t_and_c = 'health_condition_t_and_c',
  waiting_period_t_and_c = 'waiting_period_t_and_c',
  pre_existing_t_and_c = 'pre_existing_t_and_c',
}

export type DeclarationFormType = Record<DeclarationEnum, boolean>;

const DECLARATIONS: { [t_and_c in DeclarationEnum]: string } = {
  alcolhol_t_and_c: `I hereby declare that none of the proposed members are habitual consumers of alcohol, tobacco, gutka or any recreational drugs.`,
  health_condition_t_and_c: `I hereby declare that all proposed members are in good health and entirely free from any mental pf physical impairements or deformities, disease/condition.`,
  waiting_period_t_and_c: `I have understood that there is 30 days waiting period for all diseases and 2 years on named ailments. (list of named ailements)`,
  pre_existing_t_and_c: `I understand that this policy doesn't cover Pre-existing diseases.`,
};
const DeclarationPage = () => {
  const { setWizardData, wizardData } = useWizardDataContext();
  const { nextStep, previousStep } = useMultiStep();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<DeclarationFormType>({
    defaultValues: {},
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
                  <Heading>Declaration</Heading>
                </Box>
              </Flex>
              {Object.entries(DECLARATIONS).map(
                ([declarationName, declaration]) => (
                  <FormControl
                    isInvalid={Boolean(
                      errors?.[declarationName as DeclarationEnum]
                    )}
                  >
                    <Box mt={5} display="flex" alignItems={'start'}>
                      <FormCheckbox
                        mt={1}
                        register={register(declarationName as DeclarationEnum, {
                          validate: (value) => value,
                        })}
                        isInvalid={Boolean(
                          errors?.[declarationName as DeclarationEnum]
                        )}
                      />
                      <Text ml={2} fontSize={'xl'} color={TEXT_GRAY}>
                        {declaration}
                      </Text>
                    </Box>
                  </FormControl>
                )
              )}
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

export default DeclarationPage;
