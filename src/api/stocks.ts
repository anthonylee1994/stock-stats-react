import type {
  Stock,
  StockPriceDiff,
  StockPriceDiffHistogram,
  StockPriceDiffStat,
  StockPriceTypePeriod,
  StockVoteCategory,
} from '@/type';
import type { AxiosResponse } from 'axios';
import { apiClient } from './apiClient';

interface SearchStockParams {
  symbol?: string;
  name?: string;
  page?: number;
  vote_by?: StockVoteCategory;
}

export const searchStocks = async (params: SearchStockParams) => {
  return apiClient.get<SearchStockParams, AxiosResponse<Stock[]>>(`/stocks`, {
    params,
  });
};

export const fetchStock = async (symbol: string) => {
  if (!symbol) {
    return null;
  }

  const listResponse = await searchStocks({ symbol });
  const stockId = listResponse.data[0].id;
  const { data } = await apiClient.get<null, AxiosResponse<Stock>>(
    `/stocks/${stockId}`,
  );
  return data;
};

export const fetchStockPriceDiff = async (
  id: number,
  period: StockPriceTypePeriod,
) => {
  const { data } = await apiClient.get<null, AxiosResponse<StockPriceDiff[]>>(
    `/stocks/${id}/stock_price_diffs`,
    {
      params: { period, three_dimension: true },
    },
  );

  return data;
};

export const fetchStockPriceDiffStats = async (id: number) => {
  const { data } = await apiClient.get<
    null,
    AxiosResponse<StockPriceDiffStat[]>
  >(`/stocks/${id}/stock_price_diff_stats`, {
    params: { three_dimension: true },
  });

  return data;
};

export const fetchStockPriceDiffHistograms = async (
  id: number,
  period: StockPriceTypePeriod,
) => {
  const { data } = await apiClient.get<
    null,
    AxiosResponse<StockPriceDiffHistogram[]>
  >(`/stocks/${id}/stock_price_diff_histograms`, {
    params: { period, three_dimension: true },
  });

  return data;
};
