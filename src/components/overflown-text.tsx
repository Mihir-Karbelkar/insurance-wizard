import { Box, BoxProps, Tooltip } from '@chakra-ui/react';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';

const OverflownText = ({ children, ...props }: PropsWithChildren<BoxProps>) => {
  const ref = useRef(null);
  const [isOverflown, setIsOverflown] = useState(false);
  useEffect(() => {
    const element = ref.current!;

    // @ts-ignore: Object is possibly 'null'
    setIsOverflown(element.scrollWidth > element.clientWidth);
  }, []);

  return (
    <Tooltip label={children} isDisabled={!isOverflown}>
      <Box position="relative" isTruncated ref={ref} {...props}>
        {children}
      </Box>
    </Tooltip>
  );
};
export default OverflownText;
