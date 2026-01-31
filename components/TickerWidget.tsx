
import React, { useEffect, useRef } from 'react';

const TickerWidget: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current && !container.current.querySelector('script')) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbols": [
          { "proName": "FX_IDC:EURUSD", "title": "EUR/USD" },
          { "proName": "FX_IDC:GBPUSD", "title": "GBP/USD" },
          { "proName": "FX_IDC:USDJPY", "title": "USD/JPY" },
          { "proName": "BITSTAMP:BTCUSD", "title": "BTC/USD" },
          { "proName": "BITSTAMP:ETHUSD", "title": "ETH/USD" },
          { "proName": "BITSTAMP:SOLUSD", "title": "SOL/USD" },
          { "proName": "FX_IDC:AUDUSD", "title": "AUD/USD" },
          { "proName": "FX_IDC:USDCAD", "title": "USD/CAD" }
        ],
        "showSymbolLogo": true,
        "colorTheme": "dark",
        "isTransparent": true,
        "displayMode": "adaptive",
        "locale": "br"
      });
      container.current.appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container w-full opacity-80 hover:opacity-100 transition-opacity relative z-50 h-[46px] overflow-hidden" ref={container}>
      <style>
        {`
          .tradingview-widget-copyright, 
          [class*="tradingview-widget-copyright"], 
          #tradingview-copyright {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .tradingview-widget-container {
            height: 46px !important;
          }
        `}
      </style>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TickerWidget;
