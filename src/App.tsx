import { Box } from '@chakra-ui/react';
import Wizard from './components/wizard/Wizard';
import { BACKGROUND_COLOR, SITE_SIZES } from './constants';

function App() {
  return (
    <Box backgroundColor={BACKGROUND_COLOR}>
      <Box className="navbar" height={SITE_SIZES.navbar.height}></Box>
      <Wizard />
    </Box>
  );
}

export default App;
