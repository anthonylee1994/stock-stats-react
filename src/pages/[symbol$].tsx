import React from 'react';
import { useParams } from 'umi';
import { useStockStore } from '@/hooks/useStockStore';
import { Container } from '@/components/Container';
import { Stock } from '@/components/Stock';

const StockPage = React.memo(() => {
  const { symbol = '0001.HK' } = useParams<{ symbol: string }>();
  const fetchStock = useStockStore((state) => state.fetch);

  React.useEffect(() => {
    fetchStock(symbol);
  }, [fetchStock, symbol]);

  return (
    <Container>
      <Stock.Title />
      <Stock.PeriodSelector />
      <Stock.TwoDimensionDiffSelector />
      <Stock.PriceDiffChart />
      <Stock.PriceDiffStatChart />
      <Stock.PriceDiffHistogramChart />
    </Container>
  );
});

export default StockPage;
