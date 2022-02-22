import React from 'react';
import { Box, Text } from '@chakra-ui/react';

interface Props {
  title: string;
  children: React.ReactNode;
}

export const ChartContainer = React.memo<Props>(({ title, children }) => {
  return (
    <Box mb={4} borderRadius="md" w="full" bg="chart.bg" p={2}>
      <Text
        fontSize={{ base: 'md', md: 'lg' }}
        w="full"
        m={{ base: 1, md: 2 }}
        textAlign="center"
      >
        {title}
      </Text>
      {children}
    </Box>
  );
});
