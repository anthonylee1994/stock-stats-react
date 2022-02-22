import {
  fetchStock,
  fetchStockPriceDiff,
  fetchStockPriceDiffHistograms,
  fetchStockPriceDiffStats,
  searchStocks,
} from '@/api/stocks';
import type {
  Stock,
  StockPriceDiff,
  StockPriceDiffHistogram,
  StockPriceDiffStat,
  StockPriceTypePeriod,
} from '@/type';
import create from 'zustand';
import { uniq } from 'lodash';

interface StockStore {
  loading: boolean;
  searching: boolean;
  searchedStocks: Stock[];
  stock: Stock | null;
  period: StockPriceTypePeriod;
  twoDimensionDiffList: string[];
  twoDimensionDiff: string | null;
  priceDiffs: StockPriceDiff[];
  priceDiffs2D: StockPriceDiff[];
  priceDiffStats: StockPriceDiffStat[];
  priceDiffStats2D: StockPriceDiffStat[];
  priceDiffHistograms: StockPriceDiffHistogram[];
  priceDiffHistograms2D: StockPriceDiffHistogram[];
  searchStocks: (symbol?: string, name?: string) => void;
  changeTwoDimensionDiff: (twoDimensionDiff: string | null) => void;
  changePeriod: (period: StockPriceTypePeriod) => void;
  fetch: (symbol: string) => void;
  refetch: () => void;
  fetchPriceDiffs: () => void;
  fetchPriceDiffStats: () => void;
  fetchPriceDiffHistograms: () => void;
}

export const useStockStore = create<StockStore>((set, get) => ({
  loading: false,
  searching: false,
  stock: null,
  searchedStocks: [],
  period: 'daily',
  twoDimensionDiffList: [],
  twoDimensionDiff: null,
  priceDiffs: [],
  priceDiffs2D: [],
  priceDiffStats: [],
  priceDiffStats2D: [],
  priceDiffHistograms: [],
  priceDiffHistograms2D: [],
  async searchStocks(symbol, name) {
    set({ searching: true });
    const stocks = await searchStocks({ symbol, name, page: 1 });
    set({ searchedStocks: stocks.data, searching: false });
  },
  async fetch(symbol: string) {
    set({ loading: true });
    const stock = await fetchStock(symbol);
    set({ stock });

    const { fetchPriceDiffs, fetchPriceDiffStats, fetchPriceDiffHistograms } =
      get();
    await Promise.all([
      fetchPriceDiffs(),
      fetchPriceDiffStats(),
      fetchPriceDiffHistograms(),
    ]);
    set({ loading: false });
  },
  refetch() {
    const { fetch, stock } = get();
    if (stock) {
      fetch(stock.symbol);
    }
  },
  changeTwoDimensionDiff(twoDimensionDiff) {
    set({ twoDimensionDiff });
    get().refetch();
  },
  changePeriod(period: StockPriceTypePeriod) {
    set({ period });
    get().refetch();
  },
  async fetchPriceDiffs() {
    const { stock, period } = get();
    if (!stock) {
      return;
    }

    const { id } = stock;
    const priceDiffs = await fetchStockPriceDiff(id, period);

    const oneDimension = priceDiffs
      .filter((_) => _.two_dimension_diff === null)
      .sort((a, b) => a.date.localeCompare(b.date));

    const twoDimension = priceDiffs
      .filter((_) => _.two_dimension_diff !== null)
      .sort((a, b) => a.date.localeCompare(b.date));

    set({
      priceDiffs: oneDimension,
      priceDiffs2D: twoDimension,
      twoDimensionDiffList: uniq(
        twoDimension
          .map((_) => _.two_dimension_diff)
          .sort((a, b) => Number(a) - Number(b)),
      ) as string[],
    });
  },
  async fetchPriceDiffStats() {
    const { stock } = get();
    if (!stock) {
      return;
    }

    const { id } = stock;
    const priceDiffStats = await fetchStockPriceDiffStats(id);

    const oneDimension = priceDiffStats.filter(
      (_) => _.two_dimension_diff === null,
    );

    const twoDimension = priceDiffStats.filter(
      (_) => _.two_dimension_diff !== null,
    );

    set({ priceDiffStats: oneDimension, priceDiffStats2D: twoDimension });
  },
  async fetchPriceDiffHistograms() {
    const { stock, period } = get();
    if (!stock) {
      return;
    }

    const { id } = stock;
    const priceDiffHistograms = await fetchStockPriceDiffHistograms(id, period);

    const oneDimension = priceDiffHistograms
      .filter((_) => _.two_dimension_diff === null)
      .sort((a, b) => a.diff - b.diff);

    const twoDimension = priceDiffHistograms
      .filter((_) => _.two_dimension_diff !== null)
      .sort((a, b) => a.diff - b.diff);

    set({
      priceDiffHistograms: oneDimension,
      priceDiffHistograms2D: twoDimension,
    });
  },
}));
