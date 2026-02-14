
import React from 'react';

const Logo: React.FC<{ className?: string, iconOnly?: boolean }> = ({ className = "", iconOnly = false }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#87efac" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
        <path d="M15 42L50 25L85 42" stroke="url(#logoGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 42H80" stroke="url(#logoGrad)" strokeWidth="5" strokeLinecap="round" />
        <rect x="25" y="50" width="7" height="25" fill="url(#logoGrad)" rx="1.5" />
        <rect x="42" y="50" width="7" height="25" fill="url(#logoGrad)" rx="1.5" />
        <rect x="59" y="50" width="7" height="25" fill="url(#logoGrad)" rx="1.5" />
        <path d="M15 82H65" stroke="url(#logoGrad)" strokeWidth="6" strokeLinecap="round" />
        <g transform="translate(62, 45)">
          <path d="M18 12C10 12 10 22 18 22C26 22 26 32 18 32C10 32 10 32 10 32" stroke="url(#logoGrad)" strokeWidth="7" strokeLinecap="round" fill="none" />
          <line x1="18" y1="5" x2="18" y2="39" stroke="url(#logoGrad)" strokeWidth="5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
    {!iconOnly && (
      <div className="flex flex-col -space-y-1">
        <span className="text-2xl md:text-3xl font-black tracking-tighter text-white leading-none uppercase italic">Ultra</span>
        <span className="text-xl md:text-2xl font-light tracking-normal text-white/90 leading-none lowercase">trade</span>
      </div>
    )}
  </div>
);

const Candle: React.FC<{ x: number, y: number, h: number, up?: boolean, opacity?: number }> = ({ x, y, h, up, opacity = 0.3 }) => (
  <g opacity={opacity}>
    <line x1={x + 3} y1={y - 12} x2={x + 3} y2={y + h + 12} stroke={up ? "#00c076" : "#ff3b3b"} strokeWidth="1.5" />
    <rect x={x} y={y} width="7" height={h} fill={up ? "#00c076" : "#ff3b3b"} rx="1.5" />
  </g>
);

const ChartBackground: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none bg-[#080a0c]">
    {/* Camada de Gradiente Base */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00c076]/5 to-transparent"></div>

    {/* Bloco de Gráfico Esquerdo Superior */}
    <div className="absolute -top-10 -left-10 w-[600px] h-[400px] opacity-30 blur-[4px] transform -rotate-12">
      <svg viewBox="0 0 200 150" className="w-full h-full">
        <Candle x={10} y={80} h={20} up={true} />
        <Candle x={20} y={70} h={30} up={true} />
        <Candle x={30} y={50} h={40} up={true} />
        <Candle x={40} y={60} h={20} up={false} />
        <Candle x={50} y={40} h={50} up={true} />
        <Candle x={60} y={30} h={30} up={true} />
        <Candle x={70} y={45} h={15} up={false} />
        <Candle x={80} y={55} h={25} up={false} />
        <Candle x={90} y={40} h={35} up={true} />
        <Candle x={100} y={20} h={40} up={true} />
        <path d="M10 90 Q 50 40, 100 30" stroke="#00c076" strokeWidth="1" fill="none" opacity="0.3" />
      </svg>
    </div>

    {/* Bloco de Gráfico Central Direito */}
    <div className="absolute top-[30%] -right-20 w-[800px] h-[500px] opacity-20 blur-[6px] transform rotate-6">
      <svg viewBox="0 0 200 150" className="w-full h-full">
        <Candle x={120} y={100} h={25} up={false} />
        <Candle x={130} y={115} h={15} up={false} />
        <Candle x={140} y={90} h={40} up={true} />
        <Candle x={150} y={80} h={30} up={true} />
        <Candle x={160} y={60} h={50} up={true} />
        <Candle x={170} y={75} h={20} up={false} />
        <Candle x={180} y={65} h={35} up={true} />
        <Candle x={190} y={50} h={45} up={true} />
      </svg>
    </div>

    {/* Bloco de Gráfico Inferior Esquerdo */}
    <div className="absolute -bottom-20 left-[10%] w-[700px] h-[500px] opacity-25 blur-[5px] transform rotate-3">
      <svg viewBox="0 0 200 150" className="w-full h-full">
        <Candle x={20} y={120} h={15} up={true} />
        <Candle x={30} y={110} h={25} up={true} />
        <Candle x={40} y={90} h={40} up={true} />
        <Candle x={50} y={105} h={20} up={false} />
        <Candle x={60} y={115} h={15} up={false} />
        <Candle x={70} y={95} h={30} up={true} />
        <Candle x={80} y={75} h={45} up={true} />
        <Candle x={90} y={90} h={20} up={false} />
        <Candle x={100} y={70} h={35} up={true} />
      </svg>
    </div>

    {/* Luzes de Fundo (Glow) */}
    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00c076]/10 blur-[150px] rounded-full animate-pulse"></div>
    <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#60a5fa]/10 blur-[180px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>

    {/* Linhas de Grade Ofuscadas */}
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
  </div>
);

const App: React.FC = () => {
  const WHATSAPP_URL = "https://wa.me/5563981170612";

  const plans = [
    {
      name: "Plano Semanal",
      price: "37",
      period: "por semana",
      features: [
        "Sinais 24h por dia",
        "IA Sniper v3.0",
        "Leituras Vela a Vela",
        "Mercado Real & OTC",
        "Suporte VIP"
      ],
      highlight: false,
      cta: "Quero Testar Agora"
    },
    {
      name: "Plano Mensal",
      price: "87",
      period: "por mês",
      features: [
        "Sinais 24h por dia",
        "IA Sniper v3.0",
        "Leituras Vela a Vela",
        "Mercado Real & OTC",
        "Acesso ao Grupo VIP",
        "Suporte Prioritário"
      ],
      highlight: false,
      cta: "Assinar Mensal"
    },
    {
      name: "Plano Anual",
      price: "197",
      period: "por ano",
      features: [
        "Sinais 24h por dia",
        "IA Sniper v3.0",
        "Leituras Vela a Vela",
        "Mercado Real & OTC",
        "Setup Exclusivo",
        "Acesso Vitalício (12 meses)",
        "Suporte Individualizado"
      ],
      highlight: true,
      cta: "Melhor Custo-Benefício"
    }
  ];

  return (
    <div className="min-h-screen bg-transparent text-white font-sans selection:bg-[#00c076] selection:text-black scroll-smooth relative">
      <ChartBackground />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#080a0c]/90 backdrop-blur-lg border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Logo />
          <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <a href="#funcionalidades" className="hover:text-white transition-colors">Funcionalidades</a>
            <a href="#precos" className="hover:text-white transition-colors">Preços</a>
          </div>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bg-[#00c076] text-[#080a0c] px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_5px_15px_-5px_rgba(0,192,118,0.4)]">
            Assinar Agora
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-48 pb-20 px-6 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#00c076]/10 rounded-full border border-[#00c076]/20 mb-8 animate-bounce">
          <span className="w-2 h-2 bg-[#00c076] rounded-full animate-pulse"></span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00c076]">Tecnologia Sniper v3.0 Liberada</span>
        </div>

        <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight max-w-4xl tracking-tighter">
          Domine as Binárias com a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c076] to-[#60a5fa]">Inteligência Artificial.</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 font-medium">
          A única IA que realiza leituras precisas vela-a-vela e gera sinais 24 horas por dia em Mercado Real e OTC.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-16">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bg-[#00c076] text-[#080a0c] px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_20px_40px_-10px_rgba(0,192,118,0.4)] hover:scale-105 transition-all">
            Começar a Lucrar Agora
          </a>
          <a href="#funcionalidades" className="bg-white/5 border border-white/10 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
            Ver Funcionalidades
          </a>
        </div>

        {/* Mockup do Dashboard */}
        <div className="w-full max-w-4xl bg-[#0b0d11]/90 backdrop-blur-xl rounded-[40px] border border-white/10 p-6 md:p-10 shadow-2xl relative overflow-hidden group">
          <div className="flex justify-between items-center mb-10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-[#00c076]/20"></div>
            </div>
            <div className="text-[10px] font-black text-gray-700 tracking-[0.3em] uppercase">Ultra Trade AI Console</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
            <div className="bg-[#040507]/80 rounded-3xl p-8 border border-white/5 flex flex-col items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[#00c076]/5 animate-pulse"></div>
               <div className="text-[#00c076] text-5xl font-black mb-3 relative z-10 tracking-widest">↑ COMPRA</div>
               <div className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] relative z-10">Assetividade: 98.4%</div>
            </div>
            <div className="bg-[#040507]/80 rounded-3xl p-8 border border-white/5 flex flex-col justify-center gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-[8px] font-black text-gray-500 uppercase tracking-widest"><span>Volume Market</span><span>85%</span></div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden"><div className="w-[85%] h-full bg-[#00c076]"></div></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[8px] font-black text-gray-500 uppercase tracking-widest"><span>Trend Force</span><span>Média-Alta</span></div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden"><div className="w-[70%] h-full bg-[#60a5fa]"></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section id="funcionalidades" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter">Por que a <span className="text-[#00c076]">Ultra Trade</span>?</h2>
          <p className="text-gray-400 font-medium">A única ferramenta focada 100% em assertividade vela-a-vela.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Leituras em Tempo Real",
              desc: "Análise constante do gráfico para identificar a exata probabilidade da próxima vela ser verde ou vermelha.",
              icon: "M13 10V3L4 14h7v7l9-11h-7z"
            },
            {
              title: "Algoritmo OTC",
              desc: "Nossa IA aprendeu os padrões de OTC das maiores corretoras do mundo para garantir sua meta.",
              icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            },
            {
              title: "Setup Sniper",
              desc: "Sinais filtrados por volume e força, evitando 'gales' desnecessários e protegendo seu capital.",
              icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            }
          ].map((item, i) => (
            <div key={i} className="bg-[#0b0d11]/70 backdrop-blur-lg p-10 rounded-[35px] border border-white/5 hover:border-[#00c076]/40 transition-all group">
              <div className="w-16 h-16 bg-[#00c076]/10 rounded-2xl flex items-center justify-center text-[#00c076] mb-8 group-hover:bg-[#00c076] group-hover:text-black transition-all">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={item.icon}></path></svg>
              </div>
              <h3 className="text-xl font-black mb-4 uppercase tracking-tight">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Preços */}
      <section id="precos" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter">Planos <span className="text-[#00c076]">Disponíveis</span></h2>
            <p className="text-gray-400 font-medium max-w-xl mx-auto">Ative sua licença agora e comece a lucrar em minutos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={`relative bg-[#0b0d11]/90 backdrop-blur-2xl p-10 rounded-[45px] border transition-all hover:scale-[1.02] duration-500 flex flex-col ${
                  plan.highlight ? 'border-[#00c076] shadow-[0_0_80px_rgba(0,192,118,0.2)] z-10 py-16' : 'border-white/10'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#00c076] text-[#080a0c] px-8 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                    Recomendado
                  </div>
                )}
                
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-gray-500 mb-4">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-10">
                  <span className="text-3xl font-bold opacity-30">R$</span>
                  <span className="text-7xl font-black tracking-tighter">{plan.price}</span>
                  <span className="text-gray-500 text-xs font-black uppercase tracking-widest ml-1">{plan.period}</span>
                </div>

                <ul className="space-y-5 mb-14 flex-grow">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-4 text-xs font-bold text-gray-300">
                      <div className="w-5 h-5 bg-[#00c076]/20 rounded-full flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-[#00c076]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      {feat}
                    </li>
                  ))}
                </ul>

                <a 
                  href={WHATSAPP_URL} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-6 rounded-[25px] font-black text-center text-[12px] uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-3 group ${
                    plan.highlight 
                    ? 'bg-[#00c076] text-[#080a0c] shadow-[0_20px_40px_-10px_rgba(0,192,118,0.4)] hover:bg-white hover:text-black' 
                    : 'bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black'
                  }`}
                >
                  {plan.cta}
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 px-6 text-center bg-[#080a0c]/95 backdrop-blur-md relative z-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <Logo className="justify-center mb-12" />
          <h2 className="text-4xl md:text-6xl font-black mb-10 uppercase tracking-tighter leading-tight">Não perca mais tempo. <br/> <span className="text-[#00c076]">Lucre com a IA.</span></h2>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-black px-16 py-7 rounded-[30px] font-black text-sm uppercase tracking-[0.3em] hover:bg-[#00c076] hover:text-[#080a0c] transition-all transform hover:-translate-y-2">
            Adquirir Acesso Agora
          </a>
          
          <div className="mt-32 flex flex-col md:flex-row justify-between items-center gap-10 opacity-50">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.4em]">© 2024 Ultra Trade Pro v3.0</p>
            <div className="flex gap-4">
              <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 border border-white/20 rounded-md">SSL Secured</span>
              <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 border border-white/20 rounded-md">Safe Payment</span>
            </div>
          </div>
          <p className="mt-16 text-[9px] text-gray-700 uppercase tracking-widest leading-relaxed max-w-2xl mx-auto italic">
            O mercado financeiro envolve riscos. Opere sempre com cautela e gerenciamento. Suporte Oficial WhatsApp: 63 98117-0612.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
