
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
    <div className="bg-[#0b0d11] rounded-2xl p-7 border border-white/5 space-y-8 shadow-2xl">
      <section className="space-y-4">
        <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest block">Ativo Polarium</label>
        <div className="relative">
          <select 
            value={selectedAssetId}
            onChange={(e) => setSelectedAssetId(e.target.value)}
            className="w-full bg-[#040507] border border-white/5 rounded-xl px-5 py-4 text-xs font-bold appearance-none focus:outline-none focus:border-[#00c076]/30 transition-all text-white"
          >
            {assets.map(asset => (
              <option key={asset.id} value={asset.id}>{asset.name}</option>
            ))}
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest block">Tipo de Mercado</label>
        <div className="grid grid-cols-2 gap-3 p-1 bg-[#040507] rounded-xl border border-white/5">
          <button 
            onClick={() => setMarketType('REAL')}
            disabled={isWeekend}
            className={`py-3 rounded-lg text-[10px] font-black transition-all ${marketType === 'REAL' ? 'bg-[#1e232d] text-white shadow-lg' : 'text-gray-600 hover:text-gray-400'} ${isWeekend ? 'opacity-20' : ''}`}
          >
            REAL
          </button>
          <button 
            onClick={() => setMarketType('OTC')}
            className={`py-3 rounded-lg text-[10px] font-black transition-all ${marketType === 'OTC' ? 'bg-[#ffb800]/10 text-[#ffb800] border border-[#ffb800]/20' : 'text-gray-600 hover:text-gray-400'}`}
          >
            OTC
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest block">Timeframe</label>
        <div className="grid grid-cols-3 gap-3">
          {(['M1', 'M5', 'M15'] as Timeframe[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`py-4 rounded-xl text-[11px] font-black border transition-all ${
                timeframe === tf 
                ? 'bg-white text-black border-white shadow-xl' 
                : 'bg-[#040507] border-white/5 text-gray-600 hover:border-white/10'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </section>

      <div className="pt-6 border-t border-white/5">
        <div className="flex items-center justify-between text-[10px] font-bold text-gray-600 uppercase">
          <span>SMC Scanner</span>
          <span className="text-[#00c076]">Ativo</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
