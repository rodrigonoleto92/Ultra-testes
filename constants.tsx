
import { Asset } from './types';

export const ASSETS: Asset[] = [
  { id: 'EURUSD', name: 'EUR/USD', isOtc: false },
  { id: 'GBPUSD', name: 'GBP/USD', isOtc: false },
  { id: 'USDJPY', name: 'USD/JPY', isOtc: false },
  { id: 'AUDCAD', name: 'AUD/CAD', isOtc: false },
  { id: 'EURGBP', name: 'EUR/GBP', isOtc: false },
  { id: 'EURUSD_OTC', name: 'EUR/USD (OTC)', isOtc: true },
  { id: 'GBPUSD_OTC', name: 'GBP/USD (OTC)', isOtc: true },
  { id: 'USDJPY_OTC', name: 'USD/JPY (OTC)', isOtc: true },
  { id: 'AUDCAD_OTC', name: 'AUD/CAD (OTC)', isOtc: true },
  { id: 'EURGBP_OTC', name: 'EUR/GBP (OTC)', isOtc: true },
];

export const TIMEFRAMES = {
  M1: 60
};
