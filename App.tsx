
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MarketType, Timeframe, SignalType, CandleColor } from './types';
import { ASSETS, TIMEFRAMES } from './constants';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  // Check if it's weekend (Saturday = 6, Sunday = 0)
  const isWeekend = useMemo(() => {
    const day = new Date().getDay();
    return day === 0 || day === 6;
  }, []);

  const [marketType, setMarketType] = useState<MarketType>(isWeekend ? 'OTC' : 'REAL');
  const [timeframe, setTimeframe] = useState<Timeframe>('M1');
  const [selectedAssetId, setSelectedAssetId] = useState<string>(isWeekend ? 'EURUSD_OTC' : 'EURUSD');
  const [lastCandles, setLastCandles] = useState<CandleColor[]>(['GREEN', 'RED', 'GREEN', 'RED']);
  const [currentSignal, setCurrentSignal] = useState<SignalType>('WAITING');
  const [probability, setProbability] = useState<number>(90);
  const [secondsUntilNextCandle, setSecondsUntilNextCandle] = useState<number>(0);

  // Filter assets based on market type
  const availableAssets = useMemo(() => {
    return ASSETS.filter(a => marketType === 'OTC' ? a.isOtc : !a.isOtc);
  }, [marketType]);

  const selectedAsset = useMemo(() => {
    return ASSETS.find(a => a.id === selectedAssetId) || ASSETS[0];
  }, [selectedAssetId]);

  // Handle asset switch when market changes
  useEffect(() => {
    const firstCompatible = availableAssets[0];
    if (firstCompatible) {
      setSelectedAssetId(firstCompatible.id);
    }
  }, [marketType, availableAssets]);

  const calculateSignal = useCallback((candles: CandleColor[]) => {
    if (candles.length < 2) return 'WAITING';
    const last = candles[candles.length - 1];
    const prev = candles[candles.length - 2];
    const prevPrev = candles.length >= 3 ? candles[candles.length - 3] : null;

    // Estratégia vela a vela
    if (prevPrev === 'RED' && prev === 'GREEN' && last === 'RED') return 'SELL';
    if (prevPrev === 'GREEN' && prev === 'RED' && last === 'GREEN') return 'BUY';
    if (prev === 'RED' && last === 'RED') return 'SELL';
    if (prev === 'GREEN' && last === 'GREEN') return 'BUY';
    return 'WAITING';
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeframeSeconds = TIMEFRAMES[timeframe];
      const currentSeconds = now.getSeconds() + (now.getMinutes() * 60) + (now.getHours() * 3600);
      const remaining = timeframeSeconds - (currentSeconds % timeframeSeconds);
      setSecondsUntilNextCandle(remaining);

      // Sinal aparece faltando 15 segundos
      if (remaining <= 15) {
        const signal = calculateSignal(lastCandles);
        setCurrentSignal(signal);
      } else {
        setCurrentSignal('WAITING');
      }

      // Nova vela
      if (remaining === timeframeSeconds) {
        const nextColor: CandleColor = Math.random() > 0.45 ? 'GREEN' : 'RED';
        setLastCandles(prev => [...prev.slice(-4), nextColor]);
        setProbability(Math.floor(Math.random() * (98 - 85 + 1) + 85));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeframe, lastCandles, calculateSignal]);

  return (
    <div className="min-h-screen bg-[#080a0c] text-white p-4 md:p-8 font-sans">
      {/* Top Header Section */}
      <div className="flex flex-col items-center mb-10 space-y-4">
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white drop-shadow-md">Ultra Teste</h1>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em] mt-1">sinais limitados</p>
        </div>

        <div className={`flex items-center gap-3 px-8 py-3 rounded-full border ${marketType === 'OTC' ? 'border-[#ffb800]/30 bg-[#ffb800]/5 text-[#ffb800]' : 'border-[#00c076]/30 bg-[#00c076]/5 text-[#00c076]'} text-[10px] font-black uppercase tracking-widest shadow-2xl backdrop-blur-sm`}>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${marketType === 'OTC' ? 'bg-[#ffb800]' : 'bg-[#00c076]'} animate-pulse`}></span>
            <span>Mercado {marketType}</span>
          </div>
          <div className="w-[1px] h-3 bg-white/10 mx-1"></div>
          <span className="opacity-80">
            {marketType === 'REAL' && isWeekend ? 'FECHADO AOS FINAIS DE SEMANA' : 'STATUS: OPERACIONAL'}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 h-fit">
          <Sidebar 
            marketType={marketType}
            setMarketType={setMarketType}
            timeframe={timeframe}
            setTimeframe={setTimeframe}
            assets={availableAssets}
            selectedAssetId={selectedAssetId}
            setSelectedAssetId={setSelectedAssetId}
            isWeekend={isWeekend}
          />
        </div>

        <div className="lg:col-span-8">
          <Dashboard 
            asset={selectedAsset}
            signal={currentSignal}
            probability={probability}
            timeframe={timeframe}
            secondsUntilNext={secondsUntilNextCandle}
            lastCandles={lastCandles}
          />
        </div>
      </div>
    </div>
  );
};

export default App;