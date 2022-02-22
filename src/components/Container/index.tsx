import React from 'react';
import { Container as ContainerBase } from '@chakra-ui/react';

export const Container = React.memo(({ children }) => {
  return (
    <ContainerBase w="full" maxW="4xl" p={4}>
      {children}
    </ContainerBase>
  );
});
