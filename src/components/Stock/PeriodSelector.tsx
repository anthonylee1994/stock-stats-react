import React from 'react';
import { Button, ButtonGroup, Skeleton } from '@chakra-ui/react';
import { FormattedMessage } from 'umi';
import { useStockStore } from '@/hooks/useStockStore';
import type { StockPriceTypePeriod } from '@/type';

export const PeriodSelector = React.memo(() => {
  const currentPeriod = useStockStore((state) => state.period);
  const isLoading = useStockStore((state) => state.loading);
  const changePeriod = useStockStore((state) => state.changePeriod);

  return (
    <Skeleton mb={2} borderRadius="md" isLoaded={!isLoading}>
      <ButtonGroup w="full" size="sm" isAttached variant="outline">
        {['daily', 'weekly', 'monthly'].map((period) => (
          <Button
            w="full"
            colorScheme="messenger"
            variant="solid"
            key={period}
            onClick={() => changePeriod(period as StockPriceTypePeriod)}
            isActive={period === currentPeriod}
          >
            <FormattedMessage id={`stock.diff.part.period.${period}.full`} />
          </Button>
        ))}
      </ButtonGroup>
    </Skeleton>
  );
});
