
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
    <div className="bg-[#0b0d11] rounded-xl p-5 border border-white/5 space-y-5 shadow-xl">
      <section className="space-y-2">
        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Ativo Selecionado</label>
        <div className="relative">
          <select 
            value={selectedAssetId}
            onChange={(e) => setSelectedAssetId(e.target.value)}
            className="w-full bg-[#040507] border border-white/5 rounded-lg px-4 py-3 text-xs font-bold appearance-none focus:outline-none focus:border-[#00c076]/30 transition-all text-white cursor-pointer"
          >
            {assets.map(asset => (
              <option key={asset.id} value={asset.id}>{asset.name}</option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </section>

      <section className="space-y-2">
        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Mercado</label>
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#040507] rounded-lg border border-white/5">
          <button 
            onClick={() => setMarketType('REAL')}
            disabled={isWeekend}
            className={`py-2 rounded-md text-[9px] font-black transition-all ${marketType === 'REAL' ? 'bg-[#1e232d] text-white shadow-md' : 'text-gray-600 hover:text-gray-400'} ${isWeekend ? 'opacity-20 cursor-not-allowed' : ''}`}
          >
            REAL
          </button>
          <button 
            onClick={() => setMarketType('OTC')}
            className={`py-2 rounded-md text-[9px] font-black transition-all ${marketType === 'OTC' ? 'bg-[#ffb800]/10 text-[#ffb800] border border-[#ffb800]/20' : 'text-gray-600 hover:text-gray-400'}`}
          >
            OTC
          </button>
        </div>
      </section>

      <section className="space-y-2">
        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Período</label>
        <div className="grid grid-cols-3 gap-2">
          {(['M1', 'M5', 'M15'] as Timeframe[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`py-2.5 rounded-lg text-[10px] font-black border transition-all ${
                timeframe === tf 
                ? 'bg-white text-black border-white shadow-md' 
                : 'bg-[#040507] border-white/5 text-gray-600 hover:border-white/10'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </section>

      <div className="pt-4 border-t border-white/5">
        <div className="flex items-center justify-between text-[9px] font-bold text-gray-600 uppercase">
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#00c076]"></span>
            Scanner Ativo
          </span>
          <span className="text-gray-800">v1.8.0</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
