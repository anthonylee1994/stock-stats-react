import React from 'react';
import { useIntl } from 'umi';
import { ChartContainer } from '../ChartContainer';
import { useStockStore } from '@/hooks/useStockStore';
import ReactApexChart from 'react-apexcharts';
import { Skeleton } from '@chakra-ui/react';

export const PriceDiffStatChart = React.memo(() => {
  const { formatMessage } = useIntl();
  const isLoading = useStockStore((state) => state.loading);
  const priceDiffStats = useStockStore((state) =>
    state.twoDimensionDiff === null
      ? state.priceDiffStats
      : state.priceDiffStats2D.filter(
          (_) => _.two_dimension_diff === state.twoDimensionDiff,
        ),
  );

  return (
    <Skeleton borderRadius="md" isLoaded={!isLoading}>
      <ChartContainer
        title={formatMessage({ id: 'chart.price.diff.stat.title' })}
      >
        <ReactApexChart
          type="boxPlot"
          series={[
            {
              type: 'boxPlot',
              data: priceDiffStats.map((_) => ({
                x: formatMessage({
                  id: `stock.diff.part.period.${_.period}.full`,
                }),
                y: [
                  Number(_.min),
                  Number(_.q1),
                  Number(_.q2),
                  Number(_.q3),
                  Number(_.max),
                ],
              })),
            },
          ]}
          options={{
            chart: {
              type: 'boxPlot',
            },
          }}
        />
      </ChartContainer>
    </Skeleton>
  );
});
