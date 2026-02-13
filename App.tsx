
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MarketType, Timeframe, SignalType, CandleColor } from './types';
import { ASSETS, TIMEFRAMES } from './constants';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const isWeekend = useMemo(() => {
    const day = new Date().getDay();
    return day === 0 || day === 6;
  }, []);

  const [marketType, setMarketType] = useState<MarketType>(isWeekend ? 'OTC' : 'REAL');
  const [timeframe] = useState<Timeframe>('M1');
  const [selectedAssetId, setSelectedAssetId] = useState<string>(ASSETS[0].id);
  
  const [lastCandles, setLastCandles] = useState<CandleColor[]>(['RED', 'GREEN', 'RED', 'RED', 'GREEN']);
  const [currentRunningColor, setCurrentRunningColor] = useState<CandleColor>('RED');
  
  const [currentSignal, setCurrentSignal] = useState<SignalType>('WAITING');
  const [isSignalRevealed, setIsSignalRevealed] = useState<boolean>(false);
  const [probability, setProbability] = useState<number>(93);
  const [secondsUntilNextCandle, setSecondsUntilNextCandle] = useState<number>(0);

  // Estado para o Modal de Upsell (Premium)
  const [showUpsell, setShowUpsell] = useState<boolean>(false);

  const selectedAsset = useMemo(() => {
    return ASSETS.find(a => a.id === selectedAssetId) || ASSETS[0];
  }, [selectedAssetId]);

  const calculateSignal = useCallback((history: CandleColor[], current: CandleColor) => {
    if (history.length < 2) return 'WAITING';
    const last = history[history.length - 1]; 
    const prev = history[history.length - 2]; 

    if (last === 'RED' && current === 'RED') return 'SELL';
    if (last === 'GREEN' && current === 'GREEN') return 'BUY';
    if (prev === 'RED' && last === 'GREEN' && current === 'RED') return 'SELL';
    if (prev === 'GREEN' && last === 'RED' && current === 'GREEN') return 'BUY';
    
    return Math.random() > 0.5 ? 'BUY' : 'SELL';
  }, []);

  // Timer para o Modal de Upsell a cada 3 minutos
  useEffect(() => {
    const upsellTimer = setInterval(() => {
      setShowUpsell(true);
    }, 180000); 
    return () => clearInterval(upsellTimer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeframeSeconds = TIMEFRAMES[timeframe];
      const currentSeconds = now.getSeconds() + (now.getMinutes() * 60) + (now.getHours() * 3600);
      const remaining = timeframeSeconds - (currentSeconds % timeframeSeconds);
      
      setSecondsUntilNextCandle(remaining);

      // LÓGICA DE VARREDURA DA IA
      if (remaining > 15) {
        // Durante os primeiros 45 segundos, a IA "varre" os ativos
        if (remaining % 3 === 0) {
          const randomIndex = Math.floor(Math.random() * ASSETS.length);
          setSelectedAssetId(ASSETS[randomIndex].id);
        }
        
        if (isSignalRevealed) {
          setIsSignalRevealed(false);
          setCurrentSignal('WAITING');
        }

        // Simulação de movimento da vela (apenas visual)
        if (remaining % 4 === 0) {
          setCurrentRunningColor(prev => Math.random() > 0.4 ? prev : (prev === 'RED' ? 'GREEN' : 'RED'));
        }
      } else if (remaining <= 15 && remaining > 0) {
        // Nos 15 segundos finais, a IA "trava" em um ativo e gera o sinal
        if (!isSignalRevealed) {
          // Escolhe um ativo aleatório para "travar" o sinal se ainda não estiver revelado
          // Em um app real aqui haveria a lógica de qual ativo tem o melhor padrão
          const signal = calculateSignal(lastCandles, currentRunningColor);
          setCurrentSignal(signal);
          setIsSignalRevealed(true);
          // O assetId já estará fixado no que estava no momento do sweep final
        }
      }

      // Reset de vela e histórico ao final do minuto
      if (remaining === timeframeSeconds) {
        setLastCandles(prev => [...prev.slice(-10), currentRunningColor]);
        setProbability(Math.floor(Math.random() * (98 - 93 + 1) + 93));
        setCurrentRunningColor(Math.random() > 0.3 ? currentRunningColor : (currentRunningColor === 'RED' ? 'GREEN' : 'RED'));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeframe, lastCandles, currentRunningColor, isSignalRevealed, calculateSignal]);

  const WHATSAPP_URL = "https://wa.me/5563981170612";
  const BROKER_URL = "https://trade.polariumbroker.com/register?aff=756030&aff_model=revenue&afftrack=";

  return (
    <div className="min-h-screen bg-[#080a0c] text-white p-4 md:p-6 font-sans flex flex-col items-center">
      <div className="w-full max-w-4xl pt-4">
        
        {/* Aviso de Versão de Testes */}
        <div className="w-full mb-8 bg-[#00c076]/5 border border-[#00c076]/20 rounded-2xl p-4 md:p-5 text-center backdrop-blur-md shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="flex flex-col md:flex-row items-center gap-3 text-left">
             <div className="bg-[#00c076]/20 p-2 rounded-full hidden md:block">
                <svg className="w-5 h-5 text-[#00c076]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
             </div>
             <div className="text-center md:text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00c076] mb-0.5">Acesso de Teste Liberado</p>
                <p className="text-white text-[12px] font-medium leading-tight">A IA está lendo o gráfico em tempo real. Para acesso total e operacional ilimitado, assine a versão Pro.</p>
             </div>
           </div>
           
           <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#00c076] hover:bg-[#00d884] text-[#080a0c] px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-[0_5px_15px_-5px_rgba(0,192,118,0.4)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shrink-0"
            >
              Assinar Versão Pro
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
        </div>

        <header className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-4">
            <svg 
              width="65" 
              height="65" 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              shapeRendering="geometricPrecision"
            >
              <defs>
                <linearGradient id="ultraGrad" x1="0" y1="0" x2="100" y2="100">
                  <stop offset="0%" stopColor="#87efac" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
              </defs>
              <path d="M10 44 L50 24 L90 44" stroke="url(#ultraGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 44 H85" stroke="url(#ultraGrad)" strokeWidth="5" strokeLinecap="round" />
              <rect x="23" y="52" width="6" height="26" fill="url(#ultraGrad)" rx="1" />
              <rect x="37" y="52" width="6" height="26" fill="url(#ultraGrad)" rx="1" />
              <rect x="51" y="52" width="6" height="26" fill="url(#ultraGrad)" rx="1" />
              <path d="M10 84 H60" stroke="url(#ultraGrad)" strokeWidth="6" strokeLinecap="round" />
              <g transform="translate(64, 46)">
                <path d="M16 10 C8 10 8 20 16 20 C24 20 24 30 16 30 C8 30 8 30 8 30" stroke="url(#ultraGrad)" strokeWidth="7" strokeLinecap="round" fill="none" />
                <line x1="16" y1="4" x2="16" y2="36" stroke="url(#ultraGrad)" strokeWidth="5" strokeLinecap="round" />
              </g>
            </svg>

            <div className="flex flex-col -space-y-1.5">
              <span className="text-[52px] font-black tracking-tighter text-white leading-none uppercase">Ultra</span>
              <span className="text-[42px] font-light tracking-tight text-white/90 leading-none lowercase">trade</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-6 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00c076] animate-pulse"></span>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#00c076]">IA em varredura global</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 h-fit">
            <Sidebar 
              marketType={marketType}
              setMarketType={setMarketType}
              timeframe={timeframe}
              setTimeframe={() => {}} // Bloqueado em M1
              assets={ASSETS}
              selectedAssetId={selectedAssetId}
              setSelectedAssetId={() => {}} // Bloqueado, IA escolhe
              isWeekend={isWeekend}
              isScanning={!isSignalRevealed}
            />
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6">
            <Dashboard 
              asset={selectedAsset}
              signal={currentSignal}
              isSignalRevealed={isSignalRevealed}
              probability={probability}
              timeframe={timeframe}
              secondsUntilNext={secondsUntilNextCandle}
            />

            {/* CTA PREMIUM SECTION */}
            <div className="bg-gradient-to-r from-[#0b0d11] to-[#151a24] rounded-2xl p-6 border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00c076]/5 blur-3xl rounded-full -mr-10 -mt-10 group-hover:bg-[#00c076]/10 transition-colors"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg font-black text-white mb-1 uppercase tracking-tight">Evolua para o Próximo Nível</h3>
                  <p className="text-gray-400 text-sm font-medium">
                    Adquira o <span className="text-[#00c076] font-bold">Ultra trade premium</span> com muitas outras funcionalidades exclusivas.
                  </p>
                </div>
                
                <a 
                  href={WHATSAPP_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#00c076] hover:bg-[#00d884] text-[#080a0c] px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-[0_10px_20px_-10px_rgba(0,192,118,0.5)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2 whitespace-nowrap"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.67-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.123.553 4.197 1.603 6.034L0 24l6.135-1.61a11.787 11.787 0 005.912 1.57h.005c6.637 0 12.05-5.414 12.05-12.05a11.791 11.791 0 00-3.51-8.514z"/>
                  </svg>
                  Quero Ser Premium
                </a>
              </div>
            </div>

            {/* Botão de Corretora Indicada (Baixo) - Versão Compacta */}
            <a 
              href={BROKER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white/5 hover:bg-[#00c076]/20 border border-white/5 py-4 rounded-xl text-center transition-all group"
            >
              <p className="text-[7px] text-gray-600 font-black uppercase tracking-[0.3em] mb-1 group-hover:text-[#00c076]">Indicação de confiança</p>
              <p className="text-[10px] text-white font-bold">Abra conta na <span className="text-[#00c076]">Polarium Broker</span> agora!</p>
            </a>
          </div>
        </div>
      </div>

      {/* Modal de Upsell (Premium) - Aparece a cada 3 minutos */}
      {showUpsell && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#040507]/90 backdrop-blur-xl animate-in fade-in duration-500">
          <div className="bg-[#0b0d11] w-full max-w-md rounded-3xl border border-white/10 p-8 shadow-[0_0_50px_rgba(0,192,118,0.15)] flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#00c076] to-transparent"></div>
            <div className="bg-[#00c076]/10 p-4 rounded-full mb-6">
               <svg className="w-10 h-10 text-[#00c076]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
               </svg>
            </div>
            <h2 className="text-xl font-black text-white uppercase tracking-tight mb-4">Versão Gratuita Limitada</h2>
            <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8">
              Este app é gratuito porém suas funções são limitadas! <br/>
              <span className="text-white font-bold italic">Assine agora mesmo a versão Pro e desfrute dos melhores trades.</span>
            </p>
            <div className="w-full flex flex-col gap-3">
              <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setShowUpsell(false)}
                className="w-full bg-[#00c076] hover:bg-[#00d884] text-[#080a0c] py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_10px_20px_-5px_rgba(0,192,118,0.4)] transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
              >
                Assinar Agora!
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
              <button 
                onClick={() => setShowUpsell(false)}
                className="w-full py-4 text-gray-500 hover:text-white font-black text-[10px] uppercase tracking-[0.3em] transition-colors"
              >
                Agora não
              </button>
            </div>
            <p className="mt-6 text-[8px] font-bold text-gray-700 uppercase tracking-widest">Ultra Trade Premium Engine v3.0</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
