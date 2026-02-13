
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
  isScanning: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  marketType,
  timeframe,
  selectedAssetId,
  isScanning
}) => {
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const BROKER_URL = "https://trade.polariumbroker.com/register?aff=756030&aff_model=revenue&afftrack=";

  return (
    <div className="bg-[#0b0d11] rounded-xl p-4 border border-white/5 space-y-4 shadow-xl relative overflow-hidden">
      
      {/* Mini Recomendação de Corretora */}
      <a 
        href={BROKER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-gradient-to-r from-[#00c076]/10 to-transparent border border-[#00c076]/20 p-3 rounded-lg hover:bg-[#00c076]/20 transition-all group"
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00c076] animate-pulse"></div>
          <span className="text-[8px] font-black text-[#00c076] uppercase tracking-[0.2em]">Corretora Indicada</span>
        </div>
        <p className="text-white text-[10px] font-bold group-hover:text-white transition-colors">
          Opere na <span className="text-[#00c076]">Polarium Broker</span> 
          <svg className="w-3 h-3 inline ml-1 align-text-top" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        </p>
      </a>

      {/* Status da IA e Ativo Atual (Visual apenas) */}
      <section className="space-y-1.5">
        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest block">Varredura de Mercado</label>
        <div className="bg-[#040507] border border-white/5 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-white">{selectedAssetId.replace('_OTC', ' (OTC)')}</span>
            <span className={`text-[7px] font-black px-1.5 py-0.5 rounded-full ${isScanning ? 'bg-blue-500/10 text-blue-400' : 'bg-[#00c076]/10 text-[#00c076]'}`}>
              {isScanning ? 'ANALISANDO' : 'FIXADO'}
            </span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div className={`h-full bg-[#00c076] transition-all duration-300 ${isScanning ? 'w-1/2 animate-pulse' : 'w-full'}`}></div>
          </div>
        </div>
      </section>

      <section className="space-y-1.5">
        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest block">Configurações Fixas</label>
        <div className="space-y-2">
           <div className="bg-[#040507] border border-white/5 py-2 px-3 rounded-lg flex justify-between items-center">
             <span className="text-[8px] font-black text-gray-500 uppercase">Período</span>
             <span className="text-[10px] font-black text-white">{timeframe} (1m)</span>
           </div>
           <div className="bg-[#040507] border border-white/5 py-2 px-3 rounded-lg flex justify-between items-center">
             <span className="text-[8px] font-black text-gray-500 uppercase">Estratégia</span>
             <span className="text-[10px] font-black text-[#00c076]">Sniper v3</span>
           </div>
        </div>
      </section>

      <div className="pt-2">
        <button 
          onClick={() => setIsNewsOpen(true)}
          className="w-full py-3 bg-[#00c076]/10 border border-[#00c076]/20 rounded-xl text-[#00c076] text-[10px] font-black uppercase tracking-widest hover:bg-[#00c076]/20 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
          Calendário Econômico
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
                Eventos do Dia
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
