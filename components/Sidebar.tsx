
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
    <div className="bg-[#0b0d11] rounded-xl p-4 border border-white/5 space-y-4 shadow-xl">
      <section className="space-y-1.5">
        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest block">Ativo</label>
        <select 
          value={selectedAssetId}
          onChange={(e) => setSelectedAssetId(e.target.value)}
          className="w-full bg-[#040507] border border-white/5 rounded-lg px-3 py-2 text-[11px] font-bold appearance-none focus:outline-none text-white cursor-pointer"
        >
          {assets.map(asset => (
            <option key={asset.id} value={asset.id}>{asset.name}</option>
          ))}
        </select>
      </section>

      <section className="space-y-1.5">
        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest block">Mercado</label>
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#040507] rounded-lg">
          <button 
            onClick={() => setMarketType('REAL')}
            disabled={isWeekend}
            className={`py-1.5 rounded-md text-[9px] font-black transition-all ${marketType === 'REAL' ? 'bg-[#1e232d] text-white shadow-md' : 'text-gray-600'} ${isWeekend ? 'opacity-20' : ''}`}
          >
            REAL
          </button>
          <button 
            onClick={() => setMarketType('OTC')}
            className={`py-1.5 rounded-md text-[9px] font-black transition-all ${marketType === 'OTC' ? 'bg-[#ffb800]/20 text-[#ffb800]' : 'text-gray-600'}`}
          >
            OTC
          </button>
        </div>
      </section>

      <section className="space-y-1.5">
        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest block">Timeframe</label>
        <div className="grid grid-cols-3 gap-1.5">
          {(['M1', 'M5', 'M15'] as Timeframe[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`py-2 rounded-lg text-[10px] font-black border transition-all ${
                timeframe === tf 
                ? 'bg-white text-black border-white' 
                : 'bg-[#040507] border-white/5 text-gray-600'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </section>

      <div className="pt-3 border-t border-white/5 flex justify-between items-center text-[8px] font-bold text-gray-700">
        <span>SNIPER MODE</span>
        <span>v2.1</span>
      </div>
    </div>
  );
};

export default Sidebar;
