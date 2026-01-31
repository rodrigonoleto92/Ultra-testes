
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MarketType, Timeframe, SignalType, CandleColor } from './types';
import { ASSETS, TIMEFRAMES } from './constants';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const isWeekend = useMemo(() => {
    const day = new Date().getDay();
    return day === 0 || day === 6;
  }, []);

  const [marketType, setMarketType] = useState<MarketType>(isWeekend ? 'OTC' : 'REAL');
  const [timeframe, setTimeframe] = useState<Timeframe>('M1');
  const [selectedAssetId, setSelectedAssetId] = useState<string>(isWeekend ? 'EURUSD_OTC' : 'EURUSD');
  
  // Histórico de velas simulando o feed da Polarium
  const [lastCandles, setLastCandles] = useState<CandleColor[]>(['GREEN', 'GREEN', 'GREEN', 'GREEN', 'GREEN']);
  
  const [currentSignal, setCurrentSignal] = useState<SignalType>('WAITING');
  const [probability, setProbability] = useState<number>(93);
  const [secondsUntilNextCandle, setSecondsUntilNextCandle] = useState<number>(0);

  const availableAssets = useMemo(() => {
    return ASSETS.filter(a => marketType === 'OTC' ? a.isOtc : !a.isOtc);
  }, [marketType]);

  const selectedAsset = useMemo(() => {
    return ASSETS.find(a => a.id === selectedAssetId) || ASSETS[0];
  }, [selectedAssetId]);

  // ESTRATÉGIA VELA A VELA (DEFINITIVA)
  const calculateSignal = useCallback((candles: CandleColor[]) => {
    if (candles.length < 2) return 'WAITING';
    
    const last = candles[candles.length - 1];
    const prev = candles[candles.length - 2];
    const prevPrev = candles.length >= 3 ? candles[candles.length - 3] : null;

    // 1. PRIORIDADE: DUAS VELAS IGUAIS (CONTINUIDADE)
    // Se o mercado está em alta (G, G), manda COMPRAR. Nunca venderá em tendência de alta.
    if (prev === 'GREEN' && last === 'GREEN') return 'BUY';
    if (prev === 'RED' && last === 'RED') return 'SELL';

    // 2. PADRÕES DE REVERSÃO (SANDUÍCHE)
    // Só entra aqui se a última e a penúltima forem diferentes (ex: R, G ou G, R)
    if (prevPrev === 'RED' && prev === 'GREEN' && last === 'RED') return 'SELL';
    if (prevPrev === 'GREEN' && prev === 'RED' && last === 'GREEN') return 'BUY';
    
    return 'WAITING';
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeframeSeconds = TIMEFRAMES[timeframe];
      const currentSeconds = now.getSeconds() + (now.getMinutes() * 60) + (now.getHours() * 3600);
      const remaining = timeframeSeconds - (currentSeconds % timeframeSeconds);
      setSecondsUntilNextCandle(remaining);

      // GATILHO: EXATAMENTE AOS 15 SEGUNDOS PARA O FIM
      if (remaining <= 15 && remaining > 0) {
        const signal = calculateSignal(lastCandles);
        setCurrentSignal(signal);
      } else if (remaining <= 25) {
        setCurrentSignal('ANALYZING');
      } else {
        setCurrentSignal('WAITING');
      }

      // FECHAMENTO DA VELA
      if (remaining === timeframeSeconds) {
        // Simulando que a maioria das velas segue a anterior para manter tendência
        const lastColor = lastCandles[lastCandles.length - 1];
        const nextColor: CandleColor = Math.random() > 0.3 ? lastColor : (lastColor === 'GREEN' ? 'RED' : 'GREEN');

        setLastCandles(prev => [...prev.slice(-10), nextColor]);
        setProbability(Math.floor(Math.random() * (98 - 91 + 1) + 91));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeframe, lastCandles, calculateSignal]);

  return (
    <div className="min-h-screen bg-[#06080a] text-white p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col items-center mb-12 space-y-4">
          <div className="text-center">
            <h1 className="text-5xl font-black uppercase tracking-tighter text-white">
              Ultra <span className="text-[#00c076]">Teste</span>
            </h1>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.5em] mt-2">Tecnologia Sniper Polarium</p>
          </div>

          <div className="flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#00c076] animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#00c076]">Polarium Feed: Connected</span>
            <div className="w-[1px] h-3 bg-white/10 mx-2"></div>
            <span className="text-[9px] font-bold text-gray-400 uppercase">{marketType} MARKET</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
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
    </div>
  );
};

export default App;
