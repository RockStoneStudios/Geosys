"use client";

import React from "react";

export interface MetricItem {
  id: string;
  value: string | number;
  label: string;
}

const DEFAULT_METRICS: MetricItem[] = [
  // Módulo 1: Territorio & Vías
  { id: "tourists", value: "+18.400", label: "TURISTAS EST. FIN DE SEMANA" },
  { id: "fire_risk", value: "MEDIO-ALTO", label: "RIESGO INCENDIO FORESTAL" },
  { id: "road_status", value: "FLUIDO", label: "ESTADO VÍA AL MAR" },
  
  // Módulo 2: Inteligencia de Negocios
  { id: "business_boost", value: "+32%", label: "INCREMENTO VENTAS SUGERIDO" },
  { id: "promo_window", value: "VIERNES 18:00", label: "VENTANA ÓPTIMA PROMOCIONES" },

  // Módulo 3: Agro & Visión Artificial
  { id: "crop_yield", value: "98.2%", label: "PRECISIÓN CONTEO FRUTALES" },
  { id: "plague_alert", value: "2 FOCOS", label: "DETECCIÓN PRECOZ DE PLAGAS" },
  { id: "roi_est", value: "$4.2M/HA", label: "ESTIMACIÓN RETORNO COSECHA" },
];

interface MetricsBarProps {
  metrics?: MetricItem[];
  speed?: number; // segundos por vuelta
  pauseOnHover?: boolean;
  className?: string;
}

export function MetricsBar({
  metrics = DEFAULT_METRICS,
  speed = 25,
  pauseOnHover = true,
  className = "",
}: MetricsBarProps) {
  // Duplicamos la lista para generar el efecto de loop infinito sin huecos
  const displayMetrics = [...metrics, ...metrics];

  return (
    <>
      <section
        className={`w-full bg-[#050507] border-y border-neutral-800/80 py-3 font-mono text-xs overflow-hidden select-none relative ${className}`}
      >
        <div
          className={`flex w-max metrics-marquee ${
            pauseOnHover ? "hover:[animation-play-state:paused]" : ""
          }`}
          style={{
            animationDuration: `${speed}s`,
          }}
        >
          {displayMetrics.map((metric, index) => (
            <div
              key={`${metric.id}-${index}`}
              className="flex items-center space-x-2.5 px-6 border-r border-neutral-800/80 whitespace-nowrap shrink-0"
            >
              <span className="font-bold text-amber-500 text-sm md:text-base tracking-tight drop-shadow-[0_0_8px_rgba(245,158,11,0.25)]">
                {metric.value}
              </span>
              <span className="text-neutral-400 font-medium tracking-wider text-[11px] uppercase">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Inyectamos los keyframes directamente para que no dependa de globals.css ni tailwind.config */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .metrics-marquee {
          display: flex;
          animation-name: marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </>
  );
}

export default MetricsBar;