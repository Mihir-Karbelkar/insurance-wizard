import {
  Box,
  Container,
  Text,
  Flex,
  Heading,
  Button,
  IconButton,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { GHOST_BACKGROUND, SITE_SIZES, TEXT_GRAY_500 } from '../../constants';
import { useWizardDataContext } from '../../store/wizard-data';
import useMultiStep from '../multi-step-component/useMultiStep';
import { BiChevronLeft } from 'react-icons/bi';

const ReviewPage = () => {
  const { wizardData } = useWizardDataContext();
  const { nextStep, previousStep } = useMultiStep();

  return (
    <Box minH={'100vh'} marginBottom={SITE_SIZES.sticky_bar.height}>
      {' '}
      <Container maxW="65%" mt={'40px'}>
        <Flex alignItems={'center'}>
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
            <Heading>Review and confirm payment</Heading>
          </Box>
        </Flex>
        <Box
          w="100%"
          backgroundColor={'white'}
          borderRadius="10px"
          py={4}
          px={8}
          mt={5}
        >
          <Grid
            gap={6}
            templateRows="repeat(5, 1fr)"
            templateColumns="repeat(5, 1fr)"
          >
            <GridItem colSpan={1}>
              <Text color={TEXT_GRAY_500}>Plan selected</Text>
            </GridItem>
            <GridItem colSpan={4}>
              <Text fontWeight={'bold'}>
                {wizardData?.plan_type?.name}{' '}
                {`(${wizardData?.plan_type?.hint})`}
              </Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text color={TEXT_GRAY_500}>Mobile Number</Text>
            </GridItem>
            <GridItem colSpan={4}>{wizardData?.mobile}</GridItem>
            <GridItem colSpan={1}>
              <Text color={TEXT_GRAY_500}>Address line 01</Text>
            </GridItem>
            <GridItem colSpan={4}>{wizardData?.address_line_1}</GridItem>
            <GridItem colSpan={1}>
              <Text color={TEXT_GRAY_500}>Pincode</Text>
            </GridItem>
            <GridItem colSpan={4}>{wizardData?.pincode}</GridItem>
            <GridItem colSpan={1}>
              <Text color={TEXT_GRAY_500}>State</Text>
            </GridItem>
            <GridItem colSpan={4}>{wizardData?.state}</GridItem>
          </Grid>
        </Box>
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
        <Button
          variant={'primary'}
          onClick={() => {
            nextStep();
          }}
          mr={5}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default ReviewPage;
