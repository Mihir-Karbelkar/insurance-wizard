import { extendTheme } from '@chakra-ui/react';

import type { ComponentStyleConfig } from '@chakra-ui/theme';
import { INPUT_BORDER_COLOR, PRIMARY_RED, PRIMARY_RED_500 } from './constants';

const Button: ComponentStyleConfig = {
  variants: {
    primary: {
      backgroundColor: PRIMARY_RED,
      color: 'white',
      width: '320px',
    },
  },
};

const Checkbox: ComponentStyleConfig = {
  baseStyle: {
    control: {
      height: '24px',
      width: '24px',
      borderColor: INPUT_BORDER_COLOR,
      borderRadius: '4px',
    },
    _checked: {
      borderColor: PRIMARY_RED_500,
    },
  },
};

const theme = extendTheme({
  components: {
    Button,
    Checkbox,
  },
});

export default theme;
