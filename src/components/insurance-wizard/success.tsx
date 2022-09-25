import {
  Box,
  Container,
  Text,
  Flex,
  Heading,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { SITE_SIZES, TEXT_GRAY_500 } from '../../constants';
import { useWizardDataContext } from '../../store/wizard-data';

const SuccessPage = () => {
  const { wizardData } = useWizardDataContext();

  return (
    <Box minH={'100vh'} marginBottom={SITE_SIZES.sticky_bar.height}>
      {' '}
      <Container maxW="65%" mt={'40px'}>
        <Flex alignItems={'center'}>
          <Box>
            <Heading>Congratulations</Heading>
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
                {' '}
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
    </Box>
  );
};

export default SuccessPage;
