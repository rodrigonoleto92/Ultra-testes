
import React, { useState, useEffect, useMemo } from 'react';
import { Asset, SignalType, Timeframe, CandleColor } from '../types';
import { GoogleGenAI } from "@google/genai";

interface DashboardProps {
  asset: Asset;
  signal: SignalType;
  probability: number;
  timeframe: Timeframe;
  secondsUntilNext: number;
  lastCandles: CandleColor[];
}

const Dashboard: React.FC<DashboardProps> = ({
  asset,
  signal,
  probability,
  timeframe,
  secondsUntilNext,
  lastCandles
}) => {
  const [justification, setJustification] = useState<string>("Processando análise técnica...");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const isBuy = signal === 'BUY';
  const isSell = signal === 'SELL';
  const isWaiting = signal === 'WAITING';

  // Calculate the time specifically until the 15s "Signal Pop-up" window
  const secondsToSignal = useMemo(() => {
    return Math.max(0, secondsUntilNext - 15);
  }, [secondsUntilNext]);

  const now = new Date();
  const nextCandleTime = new Date(now.getTime() + secondsUntilNext * 1000);
  const timeStr = (date: Date) => date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  useEffect(() => {
    if (!isWaiting && !isGenerating) {
      const fetchJustification = async () => {
        setIsGenerating(true);
        try {
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          const prompt = `Trader OB Profissional: Justifique tecnicamente um sinal de ${isBuy ? 'COMPRA' : 'VENDA'} para ${asset.name} (${timeframe}). Estratégia vela-a-vela. 1 frase direta e elegante.`;

          const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: { temperature: 0.6 }
          });

          setJustification(response.text || "Sinal validado pelo algoritmo de fluxo.");
        } catch (error) {
          setJustification(isBuy ? "Continuidade de fluxo detectada em zona de suporte." : "Exaustão de preço identificada na região vendedora.");
        } finally {
          setIsGenerating(false);
        }
      };
      fetchJustification();
    } else if (isWaiting) {
      setJustification("Aguardando confirmação do padrão candle-a-candle...");
    }
  }, [signal, asset.name, timeframe, isWaiting]);

  return (
    <div className="glass-panel rounded-[1rem] p-6 h-full space-y-5 shadow-2xl relative overflow-hidden bg-[#0d1117] border border-gray-800/30">
      {/* Dynamic Background Glow */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-1000 z-0 opacity-10 ${
        isBuy ? 'bg-[#00c076]' : isSell ? 'bg-[#ff3b3b]' : 'bg-transparent'
      }`}></div>

      {/* Header Info */}
      <div className="flex justify-between items-center relative z-20">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-[#1e232d] px-2 py-0.5 rounded text-[8px] font-black uppercase text-gray-400 border border-gray-800/50">SNIPER ALGORITHM</span>
            <span className="text-gray-600 text-[9px] font-black uppercase tracking-widest">FREE ACCESS</span>
          </div>
          <div className="flex items-baseline gap-2">
            <h1 className="text-4xl font-black tracking-tight text-white uppercase leading-none">
              {asset.name}
            </h1>
            {asset.isOtc && <span className="text-gray-500 font-black text-2xl opacity-20 ml-0.5">OTC</span>}
          </div>
          <div className="flex gap-1.5 pt-0.5">
            <span className="px-2 py-0.5 rounded-[3px] text-[7px] font-black bg-[#00c076]/10 border border-[#00c076]/20 text-[#00c076] tracking-widest uppercase">Vela a Vela</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Sniper countdown helper */}
          {!isWaiting && (
            <div className="bg-[#ff3b3b]/10 px-3 py-1.5 rounded-lg border border-[#ff3b3b]/20 flex flex-col items-center">
              <span className="text-[7px] font-black text-[#ff3b3b] uppercase tracking-tighter">Expiração</span>
              <span className="text-[12px] font-mono font-black text-[#ff3b3b]">{secondsUntilNext}s</span>
            </div>
          )}
          <div className="bg-[#00c076]/10 px-4 py-1.5 rounded-lg border border-[#00c076]/20 shadow-sm backdrop-blur-md text-center">
             <span className="text-[7px] font-black text-[#00c076] uppercase tracking-tighter block">Assertividade</span>
             <span className="text-[#00c076] text-[12px] font-black uppercase tracking-widest">{probability}%</span>
          </div>
        </div>
      </div>

      {/* Signal Display Area - COMPACT & SLIM */}
      <div className="relative h-24 flex items-center justify-center rounded-[0.6rem] overflow-hidden group border border-gray-800/40 bg-[#080a0c] z-20 transition-all duration-500">
        {!isWaiting ? (
          <div className={`w-full h-full flex items-center justify-between px-10 text-white transition-all duration-700 ${
            isBuy ? 'buy-gradient shadow-[inset_0_0_20px_rgba(0,192,118,0.2)]' : 'sell-gradient shadow-[inset_0_0_20px_rgba(255,59,59,0.2)]'
          }`}>
            <div className="flex items-center gap-4">
              <span className="text-4xl font-black drop-shadow-lg">
                {isBuy ? '↑' : '↓'}
              </span>
              <span className="text-lg font-black uppercase tracking-[0.3em] drop-shadow-md">{isBuy ? 'Comprar' : 'Vender'}</span>
            </div>
            
            <div className="bg-black/20 p-2 rounded border border-white/10 text-center min-w-[60px]">
               <span className="text-[8px] font-black uppercase block opacity-70">Ação</span>
               <span className="text-[10px] font-bold">FECHAMENTO</span>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-between px-10 relative">
             <div className="text-left space-y-0.5">
               <span className="text-gray-600 font-black uppercase tracking-[0.2em] text-[8px] block">Próximo Sinal</span>
               <p className="text-[14px] font-mono text-white/40 uppercase">Aguardando...</p>
             </div>

             {/* 15 Seconds Sniper Counter */}
             <div className="flex items-center gap-4">
               <div className="flex flex-col items-center justify-center bg-[#ffb800]/5 border border-[#ffb800]/20 rounded-lg p-2 min-w-[80px] shadow-[0_0_15px_rgba(255,184,0,0.05)]">
                 <span className="text-[7px] font-black text-[#ffb800] uppercase tracking-widest block mb-0.5">Tempo p/ Sinal</span>
                 <div className="flex items-baseline gap-1">
                   <span className="text-2xl font-black font-mono text-[#ffb800] leading-none">{secondsToSignal}</span>
                   <span className="text-[8px] font-black text-[#ffb800] uppercase">seg</span>
                 </div>
               </div>

               <div className="flex flex-col items-end">
                 <span className="text-gray-600 font-black uppercase tracking-[0.2em] text-[8px] block mb-1">Próxima Vela</span>
                 <div className="flex gap-1">
                   <span className="text-xl font-black font-mono text-white/30 leading-none">{secondsUntilNext}</span>
                   <span className="text-[9px] font-black text-white/20 uppercase self-end mb-0.5">S</span>
                 </div>
               </div>
             </div>
          </div>
        )}
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-4 relative z-20">
        <div className="bg-[#080a0c]/80 p-3 rounded-[0.5rem] border border-gray-800/40 text-center">
          <p className="text-[7px] font-black text-gray-500 uppercase tracking-widest mb-0.5">Abertura Vela</p>
          <p className="text-xl font-black font-mono text-gray-300">{timeStr(now)}</p>
        </div>
        <div className="bg-[#080a0c]/80 p-3 rounded-[0.5rem] border border-gray-800/40 text-center">
          <p className="text-[7px] font-black text-gray-500 uppercase tracking-widest mb-0.5">Fechamento</p>
          <p className="text-xl font-black font-mono text-gray-300">{timeStr(nextCandleTime)}</p>
        </div>
      </div>

      {/* Pressure Bar */}
      <div className="space-y-2 pt-1 relative z-20">
        <div className="flex justify-between text-[7px] font-black uppercase tracking-widest text-gray-600 px-1">
          <span>Força Compradora</span>
          <span>Força Vendedora</span>
        </div>
        <div className="h-1 w-full bg-[#080a0c] rounded-full overflow-hidden flex border border-gray-800/20">
          <div className="h-full bg-[#00c076] transition-all duration-1000" style={{ width: `${55 + Math.sin(Date.now()/2000)*5}%` }}></div>
          <div className="h-full bg-[#ff3b3b] transition-all duration-1000" style={{ width: `${45 - Math.sin(Date.now()/2000)*5}%` }}></div>
        </div>
      </div>

      {/* Analyst Justification */}
      <div className="bg-[#080a0c]/30 rounded-[0.6rem] p-3 border border-gray-800/30 relative z-20">
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className={`w-1 h-1 rounded-full ${isWaiting ? 'bg-gray-600' : isBuy ? 'bg-[#00c076]' : 'bg-[#ff3b3b]'} shadow-lg`}></div>
          <h3 className="text-[7px] font-black uppercase text-gray-500 tracking-widest">Feedback Analítico</h3>
        </div>
        <div className="min-h-[24px] flex items-center">
          {isGenerating ? (
             <div className="flex gap-1">
               <div className="w-1 h-1 bg-gray-700 rounded-full animate-bounce"></div>
               <div className="w-1 h-1 bg-gray-700 rounded-full animate-bounce delay-75"></div>
               <div className="w-1 h-1 bg-gray-700 rounded-full animate-bounce delay-150"></div>
             </div>
          ) : (
            <p className="text-gray-400 italic text-[11px] leading-tight font-medium opacity-80">
              "{justification}"
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
