
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
    <div className="bg-[#0b0d11] rounded-2xl p-5 border border-white/5 relative overflow-hidden flex flex-col shadow-xl min-h-[340px] justify-between">
      {/* Glow Visual de Sinal */}
      <div className={`absolute -top-10 -right-10 w-48 h-48 blur-[80px] opacity-10 rounded-full transition-all duration-1000 ${
        isBuy ? 'bg-[#00c076]' : isSell ? 'bg-[#ff3b3b]' : 'bg-transparent'
      }`}></div>

      <div className="relative z-10 flex justify-between items-center mb-2">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">{asset.name}</h2>
            {asset.isOtc && (
              <span className="text-[#ffb800] text-[8px] font-black bg-[#ffb800]/10 px-2 py-0.5 rounded-full border border-[#ffb800]/20">OTC</span>
            )}
          </div>
          <p className="text-gray-500 text-[8px] font-bold uppercase tracking-[0.25em]">Polarium Sniper Feed</p>
        </div>

        <div className="bg-[#040507] px-3 py-1.5 rounded-lg border border-white/5 text-center">
          <span className="text-[7px] font-black text-gray-500 uppercase block leading-tight">Expiração {timeframe}</span>
          <span className="text-lg font-black font-mono text-white leading-none">
            {Math.floor(secondsUntilNext / 60)}:{(secondsUntilNext % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="relative z-10 flex-grow flex flex-col justify-center my-3">
        {(isBuy || isSell) ? (
          <div className={`w-full py-8 rounded-xl flex flex-col items-center justify-center text-white transition-all shadow-2xl ${
            isBuy ? 'bg-[#00c076]' : 'bg-[#ff3b3b]'
          }`}>
             <div className="text-6xl font-black mb-1 animate-bounce">
                {isBuy ? '↑' : '↓'}
             </div>
             <span className="text-3xl font-black uppercase tracking-widest">{isBuy ? 'COMPRA' : 'VENDA'}</span>
             <span className="text-[8px] font-bold opacity-80 uppercase tracking-[0.4em] mt-0.5">PRÓXIMA VELA</span>
          </div>
        ) : isAnalyzing ? (
          <div className="w-full py-8 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center">
             <div className="w-7 h-7 border-[3px] border-t-[#ffb800] border-white/10 rounded-full animate-spin mb-3"></div>
             <span className="text-lg font-black uppercase tracking-widest text-[#ffb800]">Analisando...</span>
             <span className="text-[8px] font-bold text-gray-600 uppercase tracking-[0.2em] mt-0.5">Processando Padrão</span>
          </div>
        ) : (
          <div className="w-full py-8 rounded-xl bg-[#040507] border border-white/5 flex flex-col items-center justify-center">
             <p className="text-gray-600 font-bold uppercase tracking-[0.25em] text-[9px] text-center">
               AGUARDANDO GATILHO<br/>NO FINAL DA VELA
             </p>
          </div>
        )}
      </div>

      <div className="relative z-10 space-y-3">
        <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
           <span className="text-gray-600">Confiança do Sinal</span>
           <span className="text-[#00c076]">{probability}%</span>
        </div>
        <div className="w-full h-1 bg-gray-900 rounded-full overflow-hidden">
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
