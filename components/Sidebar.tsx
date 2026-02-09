
import React, { useState } from 'react';
import { MarketType, Timeframe, Asset } from '../types';
import EconomicCalendar from './EconomicCalendar';

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
  timeframe,
  assets,
  selectedAssetId, setSelectedAssetId,
  isWeekend
}) => {
  const [isNewsOpen, setIsNewsOpen] = useState(false);

  return (
    <div className="bg-[#0b0d11] rounded-xl p-4 border border-white/5 space-y-4 shadow-xl relative">
      <section className="space-y-1.5">
        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest block">Ativo</label>
        <select 
          value={selectedAssetId}
          onChange={(e) => setSelectedAssetId(e.target.value)}
          className="w-full bg-[#040507] border border-white/5 rounded-lg px-3 py-2 text-[11px] font-bold appearance-none focus:outline-none text-white cursor-pointer hover:border-white/10 transition-colors"
        >
          {assets.map(asset => (
            <option key={asset.id} value={asset.id}>{asset.name}</option>
          ))}
        </select>
      </section>

      <section className="space-y-1.5">
        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest block">Mercado</label>
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#040507] rounded-lg border border-white/5">
          <button 
            onClick={() => setMarketType('REAL')}
            disabled={isWeekend}
            className={`py-1.5 rounded-md text-[9px] font-black transition-all ${marketType === 'REAL' ? 'bg-[#1e232d] text-white shadow-md' : 'text-gray-600'} ${isWeekend ? 'opacity-20 cursor-not-allowed' : 'hover:text-gray-400'}`}
          >
            REAL
          </button>
          <button 
            onClick={() => setMarketType('OTC')}
            className={`py-1.5 rounded-md text-[9px] font-black transition-all ${marketType === 'OTC' ? 'bg-[#ffb800]/20 text-[#ffb800] border border-[#ffb800]/10' : 'text-gray-600 hover:text-gray-400'}`}
          >
            OTC
          </button>
        </div>
      </section>

      <section className="space-y-1.5">
        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest block">Timeframe Ativo</label>
        <div className="bg-[#040507] border border-white/5 py-2 px-3 rounded-lg text-center">
          <span className="text-[11px] font-black text-white">{timeframe} (1 Minuto)</span>
        </div>
      </section>

      <div className="pt-2">
        <button 
          onClick={() => setIsNewsOpen(true)}
          className="w-full py-3 bg-[#00c076]/10 border border-[#00c076]/20 rounded-xl text-[#00c076] text-[10px] font-black uppercase tracking-widest hover:bg-[#00c076]/20 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
          Ver Notícias
        </button>
      </div>

      <div className="pt-3 border-t border-white/5 flex justify-between items-center text-[8px] font-bold text-gray-700">
        <span>ULTRA TESTE ENGINE</span>
        <span>v3.0</span>
      </div>

      {isNewsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#0b0d11] w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <h3 className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00c076] animate-pulse"></span>
                Calendário Econômico
              </h3>
              <button 
                onClick={() => setIsNewsOpen(false)}
                className="p-1 hover:bg-white/5 rounded-lg transition-colors text-gray-500 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <EconomicCalendar />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
