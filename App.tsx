
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
  
  // Histórico de velas fechadas
  const [lastCandles, setLastCandles] = useState<CandleColor[]>(['GREEN', 'RED', 'GREEN', 'GREEN', 'RED']);
  // Cor da vela que está correndo agora no gráfico
  const [currentRunningColor, setCurrentRunningColor] = useState<CandleColor>('GREEN');
  
  const [currentSignal, setCurrentSignal] = useState<SignalType>('WAITING');
  const [probability, setProbability] = useState<number>(93);
  const [secondsUntilNextCandle, setSecondsUntilNextCandle] = useState<number>(0);

  const availableAssets = useMemo(() => {
    return ASSETS.filter(a => marketType === 'OTC' ? a.isOtc : !a.isOtc);
  }, [marketType]);

  const selectedAsset = useMemo(() => {
    return ASSETS.find(a => a.id === selectedAssetId) || ASSETS[0];
  }, [selectedAssetId]);

  // ESTRATÉGIA VELA A VELA - Lendo a vela que vai fechar + as anteriores
  const calculateSignal = useCallback((history: CandleColor[], current: CandleColor) => {
    const lastClosed = history[history.length - 1];
    const prevClosed = history[history.length - 2];

    // 1. DUAS VELAS IGUAIS (Continuidade)
    if (lastClosed === 'GREEN' && current === 'GREEN') return 'BUY';
    if (lastClosed === 'RED' && current === 'RED') return 'SELL';

    // 2. PADRÃO SANDUÍCHE (Reversão)
    if (prevClosed === 'RED' && lastClosed === 'GREEN' && current === 'RED') return 'SELL';
    if (prevClosed === 'GREEN' && lastClosed === 'RED' && current === 'GREEN') return 'BUY';
    
    return 'WAITING';
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeframeSeconds = TIMEFRAMES[timeframe];
      const currentSeconds = now.getSeconds() + (now.getMinutes() * 60) + (now.getHours() * 3600);
      const remaining = timeframeSeconds - (currentSeconds % timeframeSeconds);
      
      setSecondsUntilNextCandle(remaining);

      // Simular a cor da vela atual mudando aleatoriamente até os 15s finais
      if (remaining > 15 && remaining % 5 === 0) {
        setCurrentRunningColor(Math.random() > 0.5 ? 'GREEN' : 'RED');
      }

      // GATILHO DEFINITIVO: Entre 1 e 15 segundos para fechar
      if (remaining <= 15 && remaining > 0) {
        const signal = calculateSignal(lastCandles, currentRunningColor);
        setCurrentSignal(signal);
      } else if (remaining <= 25) {
        setCurrentSignal('ANALYZING');
      } else {
        setCurrentSignal('WAITING');
      }

      // FECHAMENTO DA VELA - Move a atual para o histórico
      if (remaining === timeframeSeconds) {
        setLastCandles(prev => [...prev.slice(-10), currentRunningColor]);
        setProbability(Math.floor(Math.random() * (98 - 92 + 1) + 92));
        // Reseta a cor da nova vela que começa
        setCurrentRunningColor(Math.random() > 0.5 ? 'GREEN' : 'RED');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeframe, lastCandles, currentRunningColor, calculateSignal]);

  return (
    <div className="min-h-screen bg-[#06080a] text-white p-4 md:p-6 font-sans flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <header className="flex flex-col items-center mb-6 space-y-3">
          <div className="text-center">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white">
              Ultra <span className="text-[#00c076]">Teste</span>
            </h1>
            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.5em] mt-1">Polarium Intelligence</p>
          </div>

          <div className="flex items-center gap-2 px-5 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00c076] animate-pulse"></span>
            <span className="text-[9px] font-black uppercase tracking-widest text-[#00c076]">Live Polarium Feed</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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
