import type { ThemeConfig } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  } as ThemeConfig,
  colors: {
    chart: {
      bg: '#e4e6eb',
    },
  },
  components: { Button: { baseStyle: { _focus: { boxShadow: 'none' } } } },
});
