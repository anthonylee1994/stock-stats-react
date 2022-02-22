import React from 'react';
import { useStockStore } from '@/hooks/useStockStore';
import { Line } from '@ant-design/plots';
import { ChartContainer } from '../ChartContainer';
import { useIntl } from 'umi';
import { Skeleton } from '@chakra-ui/react';

export const PriceDiffChart = React.memo(() => {
  const { formatMessage } = useIntl();
  const isLoading = useStockStore((state) => state.loading);
  const priceDiffs = useStockStore((state) =>
    state.twoDimensionDiff === null
      ? state.priceDiffs
      : state.priceDiffs2D.filter(
          (_) => _.two_dimension_diff === state.twoDimensionDiff,
        ),
  );

  const config = React.useMemo(
    () =>
      ({
        data: priceDiffs.map((_) => ({
          date: _.date,
          [formatMessage({ id: 'stock.price.diff.label' })]: Number(_.diff),
        })),
        padding: 'auto',
        xField: 'date',
        yField: formatMessage({ id: 'stock.price.diff.label' }),
        slider: {
          start: 0.1,
          end: 0.5,
        },
      } as const),
    [formatMessage, priceDiffs],
  );

  return (
    <Skeleton borderRadius="md" isLoaded={!isLoading}>
      <ChartContainer title={formatMessage({ id: 'chart.price.diff.title' })}>
        <Line {...config} />
      </ChartContainer>
    </Skeleton>
  );
});
