
import React from 'react';
import { Asset, SignalType, Timeframe } from '../types';

interface DashboardProps {
  asset: Asset;
  signal: SignalType;
  probability: number;
  timeframe: Timeframe;
  secondsUntilNext: number;
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
    <div className="bg-[#0b0d11] rounded-2xl p-6 border border-white/5 relative overflow-hidden flex flex-col shadow-xl min-h-[360px] justify-between">
      {/* Glow Visual de Sinal */}
      <div className={`absolute -top-10 -right-10 w-48 h-48 blur-[80px] opacity-10 rounded-full transition-all duration-1000 ${
        isBuy ? 'bg-[#00c076]' : isSell ? 'bg-[#ff3b3b]' : 'bg-transparent'
      }`}></div>

      <div className="relative z-10 flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">{asset.name}</h2>
            {asset.isOtc && (
              <span className="text-[#ffb800] text-[8px] font-black bg-[#ffb800]/10 px-2 py-0.5 rounded-full border border-[#ffb800]/20">OTC</span>
            )}
          </div>
          <p className="text-gray-500 text-[9px] font-bold uppercase tracking-[0.3em]">Scanner Polarium Sniper</p>
        </div>

        <div className="bg-[#040507] px-4 py-2 rounded-xl border border-white/5 text-center min-w-[100px]">
          <span className="text-[8px] font-black text-gray-500 uppercase block mb-0.5">Vela {timeframe}</span>
          <span className="text-xl font-black font-mono text-white">
            {Math.floor(secondsUntilNext / 60)}:{(secondsUntilNext % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="relative z-10 flex-grow flex flex-col justify-center my-6">
        {(isBuy || isSell) ? (
          <div className={`w-full py-10 rounded-2xl flex flex-col items-center justify-center text-white transition-all shadow-2xl ${
            isBuy ? 'bg-[#00c076]' : 'bg-[#ff3b3b]'
          }`}>
             <div className="text-7xl font-black mb-2 animate-bounce">
                {isBuy ? '↑' : '↓'}
             </div>
             <span className="text-4xl font-black uppercase tracking-widest">{isBuy ? 'COMPRA' : 'VENDA'}</span>
             <span className="text-[9px] font-bold opacity-80 uppercase tracking-[0.4em] mt-1">PRÓXIMA VELA</span>
          </div>
        ) : isAnalyzing ? (
          <div className="w-full py-10 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center">
             <div className="w-8 h-8 border-[3px] border-t-[#ffb800] border-white/10 rounded-full animate-spin mb-4"></div>
             <span className="text-xl font-black uppercase tracking-widest text-[#ffb800]">Analisando...</span>
             <span className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.2em] mt-1">Monitorando feed Polarium</span>
          </div>
        ) : (
          <div className="w-full py-10 rounded-2xl bg-[#040507] border border-white/5 flex flex-col items-center justify-center">
             <div className="flex gap-2 mb-4 opacity-20">
                <div className="w-2 h-4 bg-gray-500 rounded-sm"></div>
                <div className="w-2 h-6 bg-gray-500 rounded-sm"></div>
                <div className="w-2 h-3 bg-gray-500 rounded-sm"></div>
             </div>
             <p className="text-gray-600 font-bold uppercase tracking-[0.3em] text-[10px] text-center">
               AGUARDANDO GATILHO<br/>AOS 15 SEGUNDOS FINAIS
             </p>
          </div>
        )}
      </div>

      <div className="relative z-10 space-y-4">
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
           <span className="text-gray-600">Assertividade Polarium</span>
           <span className="text-[#00c076]">{probability}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#00c076] transition-all duration-1000 shadow-[0_0_10px_rgba(0,192,118,0.3)]" 
            style={{ width: `${probability}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
