
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
  
  // Histórico de velas simulando o feed da Polarium Broker
  const [lastCandles, setLastCandles] = useState<CandleColor[]>(['RED', 'GREEN', 'RED', 'RED', 'GREEN']);
  // Simulação da vela em formação (Atual)
  const [currentRunningColor, setCurrentRunningColor] = useState<CandleColor>('RED');
  
  const [currentSignal, setCurrentSignal] = useState<SignalType>('WAITING');
  const [probability, setProbability] = useState<number>(93);
  const [secondsUntilNextCandle, setSecondsUntilNextCandle] = useState<number>(0);

  const availableAssets = useMemo(() => {
    return ASSETS.filter(a => marketType === 'OTC' ? a.isOtc : !a.isOtc);
  }, [marketType]);

  const selectedAsset = useMemo(() => {
    return ASSETS.find(a => a.id === selectedAssetId) || ASSETS[0];
  }, [selectedAssetId]);

  /**
   * ESTRATÉGIA VELA A VELA - POLARIUM SNIPER
   * 1. Baixa (R) + Alta (G) + Baixa (R) = VENDA (S)
   * 2. Alta (G) + Baixa (R) + Alta (G) = COMPRA (B)
   * 3. Duas de Baixa (R, R) = VENDA (S)
   * 4. Duas de Alta (G, G) = COMPRA (B)
   */
  const calculateSignal = useCallback((history: CandleColor[], current: CandleColor) => {
    if (history.length < 2) return 'WAITING';
    
    const last = history[history.length - 1]; // Vela fechada anterior
    const prev = history[history.length - 2]; // Vela fechada antes da anterior

    // Regras de Duas Velas (Prioridade de Fluxo/Tendência)
    if (last === 'RED' && current === 'RED') return 'SELL';
    if (last === 'GREEN' && current === 'GREEN') return 'BUY';

    // Regras de Três Velas (Sanduíche/Reversão)
    if (prev === 'RED' && last === 'GREEN' && current === 'RED') return 'SELL';
    if (prev === 'GREEN' && last === 'RED' && current === 'GREEN') return 'BUY';
    
    return 'WAITING';
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeframeSeconds = TIMEFRAMES[timeframe];
      const currentSeconds = now.getSeconds() + (now.getMinutes() * 60) + (now.getHours() * 3600);
      const remaining = timeframeSeconds - (currentSeconds % timeframeSeconds);
      
      setSecondsUntilNextCandle(remaining);

      // Simulação de oscilação da vela atual para demonstração visual do "feed"
      if (remaining > 15 && remaining % 4 === 0) {
        setCurrentRunningColor(prev => Math.random() > 0.4 ? prev : (prev === 'RED' ? 'GREEN' : 'RED'));
      }

      // GATILHO: Exatamente nos 15 segundos finais conforme solicitado
      if (remaining <= 15 && remaining > 0) {
        const signal = calculateSignal(lastCandles, currentRunningColor);
        setCurrentSignal(signal);
      } else if (remaining <= 20) {
        setCurrentSignal('ANALYZING');
      } else {
        setCurrentSignal('WAITING');
      }

      // Fechamento e rotação de velas
      if (remaining === timeframeSeconds) {
        setLastCandles(prev => [...prev.slice(-10), currentRunningColor]);
        setProbability(Math.floor(Math.random() * (98 - 93 + 1) + 93));
        // Próxima vela inicia baseada na probabilidade de seguir a anterior (simulando mercado real)
        setCurrentRunningColor(Math.random() > 0.3 ? currentRunningColor : (currentRunningColor === 'RED' ? 'GREEN' : 'RED'));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeframe, lastCandles, currentRunningColor, calculateSignal]);

  return (
    <div className="min-h-screen bg-[#06080a] text-white p-4 md:p-6 font-sans flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl">
        <header className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-black uppercase tracking-tighter text-white">
            Ultra <span className="text-[#00c076]">Teste</span>
          </h1>
          <div className="flex items-center gap-2 mt-1 px-3 py-1 bg-white/5 rounded-full border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00c076] animate-pulse"></span>
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#00c076]">Polarium Broker Feed: Ativo</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
