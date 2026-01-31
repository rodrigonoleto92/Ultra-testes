
import React, { useState, useEffect } from 'react';
import { Asset, SignalType, Timeframe, CandleColor } from '../types';

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
  const isBuy = signal === 'BUY';
  const isSell = signal === 'SELL';
  const isAnalyzing = signal === 'ANALYZING';

  return (
    <div className="bg-[#0b0d11] rounded-3xl p-10 h-full border border-white/5 relative overflow-hidden flex flex-col justify-between shadow-2xl">
      {/* Background Decorativo */}
      <div className={`absolute top-0 right-0 w-64 h-64 blur-[120px] opacity-10 rounded-full transition-all duration-1000 ${
        isBuy ? 'bg-[#00c076]' : isSell ? 'bg-[#ff3b3b]' : 'bg-transparent'
      }`}></div>

      <div className="relative z-10 flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter">
              {asset.name}
            </h2>
            {asset.isOtc && <span className="text-[#ffb800] text-[10px] font-black bg-[#ffb800]/10 px-3 py-1 rounded-full border border-[#ffb800]/20">OTC</span>}
          </div>
          <p className="text-gray-500 text-[11px] font-bold uppercase tracking-[0.3em]">Sniper v18 • Polarium Analysis</p>
        </div>

        <div className="text-right">
          <div className="text-white text-3xl font-black tracking-tighter">{probability}%</div>
          <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Assertividade</div>
        </div>
      </div>

      <div className="relative z-10 my-12">
        {(isBuy || isSell) ? (
          <div className={`w-full py-16 rounded-3xl flex flex-col items-center justify-center text-white transition-all duration-500 shadow-2xl ${
            isBuy ? 'bg-[#00c076]' : 'bg-[#ff3b3b]'
          }`}>
             <div className="text-8xl font-black mb-4 animate-bounce">
                {isBuy ? '↑' : '↓'}
             </div>
             <span className="text-4xl font-black uppercase tracking-widest">{isBuy ? 'COMPRA' : 'VENDA'}</span>
             <span className="text-[12px] font-bold opacity-70 uppercase tracking-[0.4em] mt-2">ENTRADA CONFIRMADA</span>
          </div>
        ) : isAnalyzing ? (
          <div className="w-full py-16 rounded-3xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-white">
             <div className="w-12 h-12 border-4 border-t-[#ffb800] border-white/10 rounded-full animate-spin mb-6"></div>
             <span className="text-2xl font-black uppercase tracking-widest text-[#ffb800]">Lendo Ativo...</span>
             <span className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.4em] mt-2">Analisando velas na Polarium</span>
          </div>
        ) : (
          <div className="w-full py-16 rounded-3xl bg-[#040507] border border-white/5 flex flex-col items-center justify-center text-white">
             <div className="flex gap-4 mb-8">
               <div className="bg-[#0b0d11] px-6 py-4 rounded-2xl border border-white/5 text-center min-w-[120px]">
                 <span className="text-[9px] font-black text-gray-500 uppercase block mb-1">Próxima Vela</span>
                 <span className="text-3xl font-black font-mono">{Math.floor(secondsUntilNext / 60)}:{(secondsUntilNext % 60).toString().padStart(2, '0')}</span>
               </div>
               <div className="bg-[#0b0d11] px-6 py-4 rounded-2xl border border-white/5 text-center min-w-[120px]">
                 <span className="text-[9px] font-black text-gray-500 uppercase block mb-1">Gatilho em</span>
                 <span className="text-3xl font-black font-mono text-white/30">{secondsUntilNext - 15 < 0 ? 0 : secondsUntilNext - 15}s</span>
               </div>
             </div>
             <p className="text-gray-600 font-bold uppercase tracking-[0.3em] text-[11px]">Aguardando gatilho estratégico</p>
          </div>
        )}
      </div>

      <div className="relative z-10 space-y-4">
        <div className="bg-[#040507] p-5 rounded-2xl border border-white/5 text-center">
          <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-[10px] mb-2">Instrução de Entrada</p>
          <p className="text-white text-[12px] font-black uppercase">
            {isBuy || isSell ? 'ENTRAR AGORA PARA O FECHAMENTO DA VELA' : 'AGUARDE O SINAL APARECER PARA OPERAR'}
          </p>
        </div>
        
        <div className="flex justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-700"></span>
            <span className="text-[9px] font-bold text-gray-600 uppercase">Estratégia Vela a Vela V18</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
