import React from 'react';
import { useStockStore } from '@/hooks/useStockStore';
import { Column } from '@ant-design/plots';
import { ChartContainer } from '../ChartContainer';
import { useIntl } from 'umi';
import { Skeleton } from '@chakra-ui/react';

export const PriceDiffHistogramChart = React.memo(() => {
  const { formatMessage } = useIntl();
  const priceDiffHistograms = useStockStore((state) =>
    state.twoDimensionDiff === null
      ? state.priceDiffHistograms
      : state.priceDiffHistograms2D.filter(
          (_) => _.two_dimension_diff === state.twoDimensionDiff,
        ),
  );

  const isLoading = useStockStore((state) => state.loading);

  const config = React.useMemo(
    () => ({
      data: priceDiffHistograms.map((_) => ({
        diff: String(_.diff),
        [formatMessage({ id: 'chart.price.diff.histogram.occurrence.count' })]:
          Number(_.count),
      })),
      xField: 'diff',
      yField: formatMessage({
        id: 'chart.price.diff.histogram.occurrence.count',
      }),
    }),
    [formatMessage, priceDiffHistograms],
  );

  return (
    <Skeleton borderRadius="md" isLoaded={!isLoading}>
      <ChartContainer
        title={formatMessage({ id: 'chart.price.diff.histogram.title' })}
      >
        <Column {...config} />
      </ChartContainer>
    </Skeleton>
  );
});
