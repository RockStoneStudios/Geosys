"use client";

import React from "react";
import Image from "next/image";

export interface DeploymentTag {
  municipality: string;
  focus: string;
}

const DEPLOYMENTS: DeploymentTag[] = [
  { municipality: "SANTA FE", focus: "PATRIMONIO Y FLUJO TURÍSTICO" },
  { municipality: "SOPETRÁN", focus: "PERFILAMIENTO COMERCIAL & EVENTOS" },
  { municipality: "ANDES", focus: "TRAZABILIDAD CAFETERA" },
  { municipality: "DABEIBA", focus: "CORREDOR VÍA AL MAR" },
  { municipality: "URRAO", focus: "VIGILANCIA DEL PÁRAMO DEL SOL" },
];

export function FieldCasesSection() {
  return (
    <section className="w-full bg-[#070709] text-white py-16 px-5 md:px-12 font-mono select-none">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Título Principal */}
        <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none uppercase font-sans max-w-5xl">
          EN EL TERRENO, NO EN LA DIAPOSITIVA.
        </h2>

        {/* Layout Bento-Grid (3 Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Card Principal Izquierda (Perfilamiento Comercial & Turismo - designer.png) */}
          <div className="lg:col-span-7 bg-[#0d0d10] border border-neutral-800/80 rounded-sm flex flex-col justify-between overflow-hidden group">
            
            {/* Aspect Ratio con designer.png */}
            <div className="relative w-full h-[280px] sm:h-[360px] bg-neutral-900 overflow-hidden">
              <Image
                src="/designer.png"
                alt="Perfilamiento Comercial y Inteligencia Territorial"
                fill
                priority
                className="object-cover object-center grayscale contrast-125 opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-transparent to-transparent opacity-90" />
            </div>

            {/* Contenido del Caso Principal (Turismo & Comercio) */}
            <div className="p-6 md:p-8 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <p className="text-[11px] text-amber-500 font-semibold tracking-widest uppercase">
                  TURISMO & COMERCIO LOCAL — CASO PRINCIPAL
                </p>
                
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight uppercase font-sans text-white leading-tight">
                  EL COMPORTAMIENTO COMERCIAL Y FLUJO TURÍSTICO SE ANTICIPAN.
                </h3>

                <p className="text-xs md:text-sm text-neutral-400 font-sans leading-relaxed pt-1">
                  Análisis predictivo sobre patrones de consumo, densidad de visitantes y afluencia en fechas clave para municipios de la subregión. Datos en tiempo real que optimizan estrategias de ventas y decisiones de expansión comercial.
                </p>
              </div>

              {/* Métricas / KPIs en la base */}
              <div className="pt-6 border-t border-neutral-800/70 grid grid-cols-3 gap-2 sm:gap-4 text-left">
                <div>
                  <span className="block text-2xl sm:text-3xl font-bold text-amber-500 font-sans">
                    +42%
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-wider font-mono">
                    PRECISIÓN EN AFLUENCIA
                  </span>
                </div>

                <div>
                  <span className="block text-2xl sm:text-3xl font-bold text-amber-500 font-sans">
                    120+
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-wider font-mono">
                    COMERCIOS PERFILADOS
                  </span>
                </div>

                <div>
                  <span className="block text-2xl sm:text-3xl font-bold text-amber-500 font-sans">
                    24/7
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-wider font-mono">
                    INTELIGENCIA EN TIEMPO REAL
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Columna Derecha (2 Cards Secundarias) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Card 1: Infraestructura y Vías (tunel.jpg) */}
            <div className="bg-[#0d0d10] border border-neutral-800/80 rounded-sm overflow-hidden grid grid-cols-1 sm:grid-cols-12 flex-1 group">
              <div className="relative sm:col-span-5 h-[200px] sm:h-auto min-h-[180px] bg-neutral-900">
                <Image
                  src="/tunel.jpg"
                  alt="Monitoreo Vial e Infraestructura"
                  fill
                  className="object-cover object-center filter hue-rotate-60 contrast-125 opacity-75 transition-all duration-500 group-hover:scale-105 group-hover:opacity-95"
                />
                <div className="absolute inset-0 bg-emerald-950/40 mix-blend-multiply" />
              </div>

              <div className="sm:col-span-7 p-5 sm:p-6 flex flex-col justify-center space-y-2">
                <p className="text-[10px] text-amber-500 font-semibold tracking-widest uppercase">
                  INFRAESTRUCTURA & VÍAS
                </p>
                
                <h3 className="text-xl sm:text-2xl font-black tracking-tight uppercase font-sans text-white leading-tight">
                  MONITOREO DE TRÁFICO Y RIESGO VIAL.
                </h3>

                <p className="text-xs text-neutral-400 font-sans leading-relaxed pt-1">
                  Sensores viales y visión artificial sobre el corredor Vía al Mar y túneles. Conteo vehicular, congestión y alertas preventivas.
                </p>
              </div>
            </div>

            {/* Card 2: Agro de Precisión (drones.jpg) */}
            <div className="bg-[#0d0d10] border border-neutral-800/80 rounded-sm overflow-hidden grid grid-cols-1 sm:grid-cols-12 flex-1 group">
              <div className="relative sm:col-span-5 h-[200px] sm:h-auto min-h-[180px] bg-neutral-900">
                <Image
                  src="/drones.jpg"
                  alt="Agro de Precisión con Drones"
                  fill
                  className="object-cover object-center filter hue-rotate-180 contrast-125 opacity-75 transition-all duration-500 group-hover:scale-105 group-hover:opacity-95"
                />
                <div className="absolute inset-0 bg-cyan-950/40 mix-blend-multiply" />
              </div>

              <div className="sm:col-span-7 p-5 sm:p-6 flex flex-col justify-center space-y-2">
                <p className="text-[10px] text-amber-500 font-semibold tracking-widest uppercase">
                  AGRO DE PRECISIÓN
                </p>
                
                <h3 className="text-xl sm:text-2xl font-black tracking-tight uppercase font-sans text-white leading-tight">
                  VIGOR POR LOTE, COSECHA POR MAPA.
                </h3>

                <p className="text-xs text-neutral-400 font-sans leading-relaxed pt-1">
                  Fotogrametría y sensores sobre cultivos de café y frutar. Generación de mapas de estrés hídrico y detección de plagas con drones.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Footer de Municipios y Despliegues */}
        <div className="pt-6 border-t border-neutral-800/80">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-[11px] text-neutral-400">
            
            <div className="flex items-center space-x-2 text-neutral-500 font-semibold tracking-widest shrink-0">
              <span>MÁS DESPLIEGUES</span>
              <span className="text-amber-500">→</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap lg:items-center gap-y-3 gap-x-6 text-neutral-300">
              {DEPLOYMENTS.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 tracking-wider">
                  <span className="font-bold text-white font-sans">{item.municipality}</span>
                  <span className="text-neutral-600">—</span>
                  <span className="text-neutral-400 text-[10px] uppercase">{item.focus}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default FieldCasesSection;