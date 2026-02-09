
export type MarketType = 'REAL' | 'OTC';
export type Timeframe = 'M1'; // Somente M1 disponível
export type CandleColor = 'GREEN' | 'RED';
export type SignalType = 'BUY' | 'SELL' | 'WAITING' | 'ANALYZING';

export interface Asset {
  id: string;
  name: string;
  isOtc: boolean;
}

export interface TradingState {
  marketType: MarketType;
  timeframe: Timeframe;
  selectedAsset: string;
  currentSignal: SignalType;
  probability: number;
  lastCandles: CandleColor[];
  timeRemaining: number;
}
