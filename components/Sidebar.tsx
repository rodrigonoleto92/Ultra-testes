
import React from 'react';
import { MarketType, Timeframe, Asset } from '../types';

interface SidebarProps {
  marketType: MarketType;
  setMarketType: (m: MarketType) => void;
  timeframe: Timeframe;
  setTimeframe: (t: Timeframe) => void;
  assets: Asset[];
  selectedAssetId: string;
  setSelectedAssetId: (id: string) => void;
  isWeekend: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  marketType, setMarketType,
  timeframe, setTimeframe,
  assets,
  selectedAssetId, setSelectedAssetId,
  isWeekend
}) => {
  return (
    <div className="glass-panel rounded-[1.2rem] p-6 space-y-7 h-full shadow-2xl bg-[#0d1117] border border-gray-800/40">
      {/* 1. Modalidade */}
      <section className="space-y-3">
        <div className="flex justify-between items-center text-[10px] font-black text-gray-500 uppercase tracking-widest">
          <span>1. Modalidade</span>
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-gray-500 font-bold">AUTO</span>
            <div className="w-8 h-4 bg-[#00c076] rounded-full relative shadow-[0_0_8px_rgba(0,192,118,0.2)]">
              <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#080a0c] rounded-lg border border-gray-800/60">
          <button 
            className="py-2.5 px-3 rounded-md bg-[#00c076]/10 border border-[#00c076]/30 text-[10px] font-black text-[#00c076] shadow-[inset_0_0_10px_rgba(0,192,118,0.05)] transition-all uppercase"
          >
            BINÁRIAS
          </button>
          <button 
            disabled
            className="py-2.5 px-3 rounded-md text-[10px] font-black text-gray-700 cursor-not-allowed uppercase flex items-center justify-center gap-1.5"
          >
            <span className="opacity-40">CRIPTO</span>
            <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
          </button>
        </div>
      </section>

      {/* 2. Ativos */}
      <section className="space-y-3">
        <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
          <span>2. Ativos</span>
        </div>
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#080a0c] rounded-lg border border-gray-800/60">
          <button className="py-2.5 px-3 rounded-md bg-[#1e232d] border border-gray-700/30 text-[10px] font-black text-gray-300">
            MOEDAS
          </button>
          <button disabled className="py-2.5 px-3 rounded-md text-[10px] font-black text-gray-700 cursor-not-allowed opacity-40">
            OUTROS
          </button>
        </div>
        
        <div className="relative group">
          <select 
            value={selectedAssetId}
            onChange={(e) => setSelectedAssetId(e.target.value)}
            className="w-full bg-[#080a0c] border border-gray-800 rounded-lg px-4 py-3.5 text-[11px] font-bold appearance-none focus:outline-none focus:border-[#ffb800]/50 transition-all cursor-pointer tracking-wider"
          >
            {assets.map(asset => (
              <option key={asset.id} value={asset.id} className="bg-[#080a0c] text-white">
                {asset.name}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </section>

      {/* 3. Tipo de Mercado */}
      <section className="space-y-3">
        <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
          <span>3. Tipo de Mercado</span>
        </div>
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#080a0c] rounded-lg border border-gray-800/60">
          <button 
            onClick={() => setMarketType('REAL')}
            disabled={isWeekend}
            className={`py-2.5 px-3 rounded-md text-[10px] font-black transition-all relative ${marketType === 'REAL' ? 'bg-[#1e232d] border border-gray-700/30 text-white' : 'text-gray-600 hover:text-gray-400'} ${isWeekend ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            MERCADO REAL
            {isWeekend && <span className="absolute -top-1 -right-1 bg-red-500 text-[7px] px-1 rounded text-white border border-red-400">FECHADO</span>}
          </button>
          <button 
            onClick={() => setMarketType('OTC')}
            className={`py-2.5 px-3 rounded-md text-[10px] font-black transition-all ${marketType === 'OTC' ? 'border border-[#ffb800] bg-[#ffb800]/5 text-[#ffb800]' : 'text-gray-600 hover:text-gray-400'}`}
          >
            MERCADO OTC
          </button>
        </div>
      </section>

      {/* Timeframe */}
      <section className="space-y-3">
        <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
          <span>Timeframe</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {(['M1', 'M5', 'M15'] as Timeframe[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`py-2.5 rounded-lg text-[10px] font-black border transition-all ${
                timeframe === tf 
                ? 'bg-white text-black border-white shadow-md' 
                : 'bg-[#151921] border-gray-800 text-gray-500 hover:border-gray-600'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </section>

      {/* Footer Info */}
      <div className="pt-6 border-t border-gray-800/40">
        <div className="bg-[#00c076]/5 border border-[#00c076]/20 rounded-xl py-3 px-4 text-center">
          <p className="text-[#00c076] text-[9px] font-black tracking-[0.2em] uppercase">
            SMC SCANNER ATIVO: <span className="font-mono text-[#00ff9d]">00:49</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
