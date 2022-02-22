import React from 'react';
import { Button, ButtonGroup, Skeleton } from '@chakra-ui/react';
import { useStockStore } from '@/hooks/useStockStore';
import { useIntl } from 'umi';

export const TwoDimensionDiffSelector = React.memo(() => {
  const { formatMessage } = useIntl();
  const isLoading = useStockStore((state) => state.loading);

  const twoDimensionDiffList = useStockStore(
    (state) => state.twoDimensionDiffList,
  );
  const currentTwoDimensionDiff = useStockStore(
    (state) => state.twoDimensionDiff,
  );
  const changeTwoDimensionDiff = useStockStore(
    (state) => state.changeTwoDimensionDiff,
  );

  return (
    <Skeleton mb={2} borderRadius="md" isLoaded={!isLoading}>
      <ButtonGroup
        w="full"
        overflowX="auto"
        size="sm"
        isAttached
        variant="outline"
      >
        {[null, ...twoDimensionDiffList].map((diff) => (
          <Button
            minW={10}
            w="full"
            colorScheme="gray"
            variant="solid"
            key={diff ?? 'all'}
            onClick={() => changeTwoDimensionDiff(diff)}
            isActive={diff === currentTwoDimensionDiff}
          >
            {diff ?? formatMessage({ id: 'common.all' })}
          </Button>
        ))}
      </ButtonGroup>
    </Skeleton>
  );
});
