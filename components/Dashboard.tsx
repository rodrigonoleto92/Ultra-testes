
import React from 'react';
import { Asset, SignalType, Timeframe } from '../types';

interface DashboardProps {
  asset: Asset;
  signal: SignalType;
  isSignalRevealed: boolean;
  probability: number;
  timeframe: Timeframe;
  secondsUntilNext: number;
  isOperatingTime: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({
  asset,
  signal,
  isSignalRevealed,
  probability,
  timeframe,
  secondsUntilNext,
  isOperatingTime
}) => {
  const isBuy = isSignalRevealed && signal === 'BUY';
  const isSell = isSignalRevealed && signal === 'SELL';

  if (!isOperatingTime) {
    return (
      <div className="bg-[#0b0d11] rounded-2xl p-8 border border-white/5 relative overflow-hidden flex flex-col shadow-xl min-h-[380px] items-center justify-center text-center">
        <div className="bg-red-500/10 p-5 rounded-full mb-6 border border-red-500/20">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        
        <h2 className="text-xl font-black text-white uppercase tracking-tight mb-2">IA EM MODO DE ESPERA</h2>
        <p className="text-gray-400 text-sm font-medium max-w-[280px] mb-8 leading-relaxed">
          A inteligência artificial Ultra trade só realiza leituras nos seguintes horários pré-definidos:
        </p>

        <div className="grid grid-cols-1 gap-3 w-full max-w-[240px]">
          <div className="bg-[#040507] p-3 rounded-xl border border-white/5 flex justify-between items-center group hover:border-[#00c076]/30 transition-colors">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Manhã</span>
            <span className="text-[11px] font-black text-white group-hover:text-[#00c076]">09:00 - 09:30</span>
          </div>
          <div className="bg-[#040507] p-3 rounded-xl border border-white/5 flex justify-between items-center group hover:border-[#00c076]/30 transition-colors">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Tarde</span>
            <span className="text-[11px] font-black text-white group-hover:text-[#00c076]">14:00 - 14:30</span>
          </div>
          <div className="bg-[#040507] p-3 rounded-xl border border-white/5 flex justify-between items-center group hover:border-[#00c076]/30 transition-colors">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Noite</span>
            <span className="text-[11px] font-black text-white group-hover:text-[#00c076]">20:00 - 20:30</span>
          </div>
        </div>
        
        <p className="mt-8 text-[8px] font-black text-[#00c076] uppercase tracking-[0.4em] opacity-50">Pronto para a próxima sessão</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0b0d11] rounded-2xl p-5 border border-white/5 relative overflow-hidden flex flex-col shadow-xl min-h-[380px] justify-between transition-all duration-500">
      {/* Glow Visual de Sinal */}
      <div className={`absolute -top-10 -right-10 w-48 h-48 blur-[80px] opacity-10 rounded-full transition-all duration-1000 ${
        isBuy ? 'bg-[#00c076]' : isSell ? 'bg-[#ff3b3b]' : 'bg-transparent'
      }`}></div>

      <div className="relative z-10 flex justify-between items-center mb-2">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h2 className={`text-2xl font-black text-white uppercase tracking-tighter leading-none transition-all duration-300 ${!isSignalRevealed ? 'opacity-50 blur-[1px]' : 'opacity-100'}`}>
              {asset.name}
            </h2>
            {asset.isOtc && (
              <span className="text-[#ffb800] text-[8px] font-black bg-[#ffb800]/10 px-2 py-0.5 rounded-full border border-[#ffb800]/20">OTC</span>
            )}
          </div>
          <p className="text-gray-500 text-[8px] font-bold uppercase tracking-[0.25em]">Varredura Ultra trade em tempo real</p>
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
            <div className="relative">
               <div className="bg-white/5 p-4 rounded-full mb-2 animate-pulse">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
               </div>
               <div className="absolute top-0 left-0 w-full h-full border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
            
            <div className="max-w-[320px]">
              <p className="text-blue-400 font-black uppercase tracking-[0.2em] text-[10px] mb-2">IA SNIPER EM VARREDURA GLOBAL</p>
              <p className="text-gray-400 font-bold uppercase tracking-[0.1em] text-[11px] leading-relaxed">
                Analisando padrões em mais de 10 pares Real/OTC simultaneamente...
              </p>
              <p className="text-[#00c076]/70 font-black uppercase tracking-[0.05em] text-[9px] mt-4 bg-[#00c076]/5 py-2 px-3 rounded-lg border border-[#00c076]/10 inline-block">
                O melhor sinal será fixado em {secondsUntilNext - 15}s
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10 space-y-3">
        <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
           <span className="text-gray-600">Confirmação de Algoritmo</span>
           <span className={isSignalRevealed ? 'text-[#00c076]' : 'text-blue-400 animate-pulse'}>
             {isSignalRevealed ? `${probability}%` : 'VARRENDO...'}
           </span>
        </div>
        <div className="w-full h-1 bg-gray-900 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${isSignalRevealed ? 'bg-[#00c076] shadow-[0_0_10px_rgba(0,192,118,0.3)]' : 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]'}`} 
            style={{ width: isSignalRevealed ? `${probability}%` : '30%' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
