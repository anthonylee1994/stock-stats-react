import React from 'react';
import { Skeleton, Text } from '@chakra-ui/react';
import { useStockStore } from '@/hooks/useStockStore';

export const Title = React.memo(() => {
  const symbol = useStockStore((state) => state.stock?.symbol);
  const name = useStockStore((state) => state.stock?.name);

  return (
    <Skeleton mb={4} borderRadius="md" isLoaded={Boolean(symbol)}>
      <Text fontWeight="bold" fontSize={{ base: 'xl', md: '2xl' }}>
        {symbol}: {name}
      </Text>
    </Skeleton>
  );
});
