import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/utils/theme';
import './index.css';
import AppBar from '@/components/AppBar';

const Layout = React.memo(({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <AppBar />
      <React.Fragment>{children}</React.Fragment>
    </ChakraProvider>
  );
});

export default Layout;
