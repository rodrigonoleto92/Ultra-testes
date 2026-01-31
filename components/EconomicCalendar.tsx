
import React, { useEffect, useRef } from 'react';

const EconomicCalendar: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Limpa o container antes de renderizar para evitar duplicatas se o modal for reaberto
    if (container.current) {
      container.current.innerHTML = '';
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "colorTheme": "dark",
        "isTransparent": true,
        "locale": "br",
        "countryFilter": "ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu",
        "importanceFilter": "-1,0,1",
        "width": "100%",
        "height": 450
      });
      container.current.appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container w-full rounded-xl overflow-hidden" ref={container}>
      <style>
        {`
          .tradingview-widget-copyright {
            display: none !important;
          }
        `}
      </style>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default EconomicCalendar;
