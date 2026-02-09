
import React from 'react';
import { Asset, SignalType, Timeframe } from '../types';

interface DashboardProps {
  asset: Asset;
  signal: SignalType;
  isSignalRevealed: boolean;
  probability: number;
  timeframe: Timeframe;
  secondsUntilNext: number;
}

const Dashboard: React.FC<DashboardProps> = ({
  asset,
  signal,
  isSignalRevealed,
  probability,
  timeframe,
  secondsUntilNext,
}) => {
  const isBuy = isSignalRevealed && signal === 'BUY';
  const isSell = isSignalRevealed && signal === 'SELL';
  
  const isNearExpiration = secondsUntilNext <= 15;

  return (
    <div className="bg-[#0b0d11] rounded-2xl p-5 border border-white/5 relative overflow-hidden flex flex-col shadow-xl min-h-[380px] justify-between">
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
          <p className="text-gray-500 text-[8px] font-bold uppercase tracking-[0.25em]">Ultra trade Sniper Engine</p>
        </div>

        <div className="bg-[#040507] px-3 py-1.5 rounded-lg border border-white/5 text-center">
          <span className="text-[7px] font-black text-gray-500 uppercase block leading-tight">Vela Atual</span>
          <span className="text-lg font-black font-mono text-white leading-none">
            {Math.floor(secondsUntilNext / 60)}:{(secondsUntilNext % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="relative z-10 flex-grow flex flex-col justify-center my-4">
        {isSignalRevealed ? (
          <div className={`w-full py-10 rounded-xl flex flex-col items-center justify-center text-white transition-all shadow-2xl animate-in zoom-in duration-300 ${
            isBuy ? 'bg-[#00c076]' : 'bg-[#ff3b3b]'
          }`}>
             <div className="text-6xl font-black mb-1 animate-bounce">
                {isBuy ? '↑' : '↓'}
             </div>
             <span className="text-3xl font-black uppercase tracking-widest">{isBuy ? 'COMPRA' : 'VENDA'}</span>
             <span className="text-[8px] font-bold opacity-80 uppercase tracking-[0.4em] mt-0.5">PARA A PRÓXIMA VELA</span>
          </div>
        ) : (
          <div className="w-full py-12 rounded-2xl bg-[#040507] border border-white/5 flex flex-col items-center justify-center space-y-4 px-6 text-center">
            <div className="bg-white/5 p-4 rounded-full mb-2 animate-pulse">
               <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            
            <div className="max-w-[280px]">
              <p className="text-gray-400 font-bold uppercase tracking-[0.15em] text-[11px] leading-relaxed">
                A IA Sniper está processando os padrões...
              </p>
              <p className="text-[#00c076]/70 font-black uppercase tracking-[0.05em] text-[9px] mt-3 bg-[#00c076]/5 py-2 px-3 rounded-lg border border-[#00c076]/10">
                O sinal aparecerá automaticamente faltando 15 segundos para a expiração da vela.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="w-1.5 h-1.5 bg-[#00c076] rounded-full animate-ping"></span>
              <span className="text-[7px] text-gray-600 font-black uppercase tracking-widest">Monitorando fluxo de ordens</span>
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10 space-y-3">
        <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
           <span className="text-gray-600">Acurácia IA Sniper</span>
           <span className={isSignalRevealed ? 'text-[#00c076]' : 'text-gray-700'}>
             {isSignalRevealed ? `${probability}%` : '--%'}
           </span>
        </div>
        <div className="w-full h-1 bg-gray-900 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#00c076] transition-all duration-1000 shadow-[0_0_10px_rgba(0,192,118,0.3)]" 
            style={{ width: isSignalRevealed ? `${probability}%` : '0%' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
