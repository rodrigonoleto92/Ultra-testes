
import React from 'react';
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
}) => {
  const isBuy = signal === 'BUY';
  const isSell = signal === 'SELL';
  const isAnalyzing = signal === 'ANALYZING';

  return (
    <div className="bg-[#0b0d11] rounded-2xl p-6 h-full border border-white/5 relative overflow-hidden flex flex-col shadow-xl">
      {/* Background Decorativo */}
      <div className={`absolute top-0 right-0 w-48 h-48 blur-[100px] opacity-10 rounded-full transition-all duration-1000 ${
        isBuy ? 'bg-[#00c076]' : isSell ? 'bg-[#ff3b3b]' : 'bg-transparent'
      }`}></div>

      <div className="relative z-10 flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
              {asset.name}
            </h2>
            {asset.isOtc && <span className="text-[#ffb800] text-[8px] font-black bg-[#ffb800]/10 px-2 py-0.5 rounded-full border border-[#ffb800]/20">OTC</span>}
          </div>
          <p className="text-gray-500 text-[9px] font-bold uppercase tracking-[0.3em]">Análise Vela a Vela Sniper</p>
        </div>

        <div className="text-right">
          <div className="text-white text-2xl font-black tracking-tighter leading-none">{probability}%</div>
          <div className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Sucesso</div>
        </div>
      </div>

      <div className="relative z-10 my-6 flex-grow flex flex-col justify-center">
        {(isBuy || isSell) ? (
          <div className={`w-full py-10 rounded-2xl flex flex-col items-center justify-center text-white transition-all duration-500 shadow-2xl ${
            isBuy ? 'bg-[#00c076]' : 'bg-[#ff3b3b]'
          }`}>
             <div className="text-7xl font-black mb-2 animate-bounce">
                {isBuy ? '↑' : '↓'}
             </div>
             <span className="text-3xl font-black uppercase tracking-widest">{isBuy ? 'COMPRA' : 'VENDA'}</span>
             <span className="text-[10px] font-bold opacity-80 uppercase tracking-[0.4em] mt-1">SINAL CONFIRMADO</span>
          </div>
        ) : isAnalyzing ? (
          <div className="w-full py-10 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-white">
             <div className="w-8 h-8 border-[3px] border-t-[#ffb800] border-white/10 rounded-full animate-spin mb-4"></div>
             <span className="text-xl font-black uppercase tracking-widest text-[#ffb800]">Sincronizando...</span>
             <span className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.3em] mt-1">Lendo fluxo de ordens</span>
          </div>
        ) : (
          <div className="w-full py-10 rounded-2xl bg-[#040507] border border-white/5 flex flex-col items-center justify-center text-white">
             <div className="flex gap-3 mb-6">
               <div className="bg-[#0b0d11] px-4 py-3 rounded-xl border border-white/5 text-center min-w-[100px]">
                 <span className="text-[8px] font-black text-gray-500 uppercase block mb-0.5">Vela</span>
                 <span className="text-xl font-black font-mono">{Math.floor(secondsUntilNext / 60)}:{(secondsUntilNext % 60).toString().padStart(2, '0')}</span>
               </div>
               <div className="bg-[#0b0d11] px-4 py-3 rounded-xl border border-white/5 text-center min-w-[100px]">
                 <span className="text-[8px] font-black text-gray-500 uppercase block mb-0.5">Gatilho</span>
                 <span className="text-xl font-black font-mono text-[#00c076]/40">{secondsUntilNext - 15 < 0 ? 0 : secondsUntilNext - 15}s</span>
               </div>
             </div>
             <p className="text-gray-600 font-bold uppercase tracking-[0.3em] text-[9px]">Aguardando zona de operação</p>
          </div>
        )}
      </div>

      <div className="relative z-10 space-y-3 mt-auto">
        <div className="bg-[#040507] p-4 rounded-xl border border-white/5 text-center">
          <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[8px] mb-1">Status da Operação</p>
          <p className="text-white text-[10px] font-black uppercase">
            {isBuy || isSell ? 'EXECUTAR PARA A PRÓXIMA VELA AGORA' : 'MONITORANDO GATILHOS DA POLARIUM'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
