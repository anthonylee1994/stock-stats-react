export enum StockVoteCategory {
  '神系' = '神系',
  '進攻系' = '進攻系',
  '防守系' = '防守系',
  '價殘系' = '價殘系',
  '鳩炒系' = '鳩炒系',
  '妖系' = '妖系',
  '垃圾系' = '垃圾系',
}

export interface StockVoteCount {
  id: number;
  stock_id: number;
  category: StockVoteCategory;
  count: number;
  created_at: string;
  updated_at: string;
}

export interface StockVote {
  id: number;
  stock_id: number;
  user_id: number;
  category: StockVoteCategory;
  created_at: string;
  updated_at: string;
}

export interface Stock {
  id: number;
  name: string;
  symbol: string;
  created_at: string;
  updated_at: string;
  stock_vote_counts: StockVoteCount[];
  user_vote: StockVote | null;
}

export type StockPriceTypePeriod = 'daily' | 'weekly' | 'monthly';

export interface StockPriceDiff {
  id: number;
  stock_id: number;
  period: StockPriceTypePeriod;
  two_dimension_diff: string | null;
  date: string;
  price: string;
  diff: string;
  created_at: string;
  updated_at: string;
}

export interface StockPriceDiffStat {
  id: number;
  stock_id: number;
  period: StockPriceTypePeriod;
  two_dimension_diff: string | null;
  count: number;
  mean: string | null;
  std: string | null;
  min: string | null;
  q1: string | null;
  q2: string | null;
  q3: string | null;
  max: string | null;
  created_at: string;
  updated_at: string;
}

export interface StockPriceDiffHistogram {
  id: number;
  stock_id: number;
  period: StockPriceTypePeriod;
  two_dimension_diff: string | null;
  diff: number;
  count: number;
  created_at: string;
  updated_at: string;
}
