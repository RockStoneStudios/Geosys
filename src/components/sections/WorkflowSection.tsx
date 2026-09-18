"use client";

import React from "react";

export interface StepItem {
  number: string;
  title: string;
  details: string[];
}

export interface SourceTag {
  label: string;
}

const STEPS: StepItem[] = [
  {
    number: "01",
    title: "CAPTURA",
    details: ["IMÁGENES - DRONES - FOTOS", "SENSORES - DATOS VIALES"],
  },
  {
    number: "02",
    title: "PROCESAMIENTO",
    details: ["VISIÓN ARTIFICIAL", "NORMALIZACIÓN DE DATOS"],
  },
  {
    number: "03",
    title: "DIAGNÓSTICO",
    details: ["CONTEO FRUTAS - PLAGAS", "ESTRÉS HÍDRICO EN CAMPO"],
  },
  {
    number: "04",
    title: "PREDICCIÓN",
    details: ["FLUJO TURÍSTICO", "DEMANDA Y RIESGOS VIALES"],
  },
  {
    number: "05",
    title: "PERFILAMIENTO",
    details: ["COMPORTAMIENTO COMERCIAL", "PATRONES DE CONSUMO"],
  },
  {
    number: "06",
    title: "DECISIÓN",
    details: ["ESTRATEGIA DE VENTAS", "ÓRDENES DE ACCIÓN TÁCTICA"],
  },
];
const SOURCES: SourceTag[] = [
  { label: "TRÁFICO VÍA AL MAR" },
  { label: "SATELETERÍA & CLIMA" },
  {label : "CANTIDAD DE TURISTAS"},
  { label: "PERFILAMIENTO DE CLIENTES" },
  {label : "PREDICCION DE VENTAS"},
  { label: "CÁMARAS & DRONES" },
  { label: "CAFÉ Y FRUTOS" },
];

export function WorkflowSection() {
  return (
    <>
      <section className="w-full bg-[#070709] text-white py-16 px-6 md:px-12 font-mono select-none">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Título Principal */}
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight uppercase font-sans max-w-5xl">
            NO TE VENDEMOS SOFTWARE, TE VENDEMOS DECISIONES:
INTELIGENCIA EN TIEMPO REAL PARA EL TERRITORIO, EL AGRO Y EL COMERCIO.
          </h2>

          {/* Pipeline principal */}
          <div className="relative pt-6 pb-4">
            {/* Contenedor de la línea y el punto viajero (solo en escritorio) */}
            <div className="hidden md:block absolute top-[82px] left-[8%] right-[8%] h-[1px] z-0">
              {/* Línea punteada de fondo */}
              <div className="w-full h-full border-b border-dashed border-neutral-700/80" />

              {/* Punto Dorado Animado */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2.5 h-2.5 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,1)] animate-ping-pulse traveling-dot" />
            </div>

            {/* Grid de Pasos */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-4 relative z-10">
              {STEPS.map((step) => (
                <div
                  key={step.number}
                  className="flex flex-col items-center text-center space-y-4 group"
                >
                  {/* Título del Paso */}
                  <h3 className="font-bold text-sm tracking-wider text-white uppercase min-h-[20px]">
                    {step.title}
                  </h3>

                  {/* Círculo con Número */}
                  <div className="relative flex items-center justify-center my-2">
                    <div className="w-11 h-11 rounded-full border border-neutral-700/90 bg-[#070709] flex items-center justify-center text-amber-500 font-bold text-xs tracking-wider transition-all duration-300 group-hover:border-amber-500 group-hover:shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                      {step.number}
                    </div>
                  </div>

                  {/* Descripción */}
                  <div className="space-y-1 text-[11px] text-neutral-400 font-medium tracking-wide">
                    {step.details.map((detail, idx) => (
                      <p key={idx} className="uppercase leading-relaxed">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fuentes de Datos (Barra Inferior) */}
          <div className="pt-8 border-t border-neutral-800/60 flex flex-wrap items-center justify-between gap-y-3 text-[11px] text-neutral-400 font-medium tracking-wider uppercase">
            {SOURCES.map((source, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="w-2 h-2 rotate-45 bg-amber-500 inline-block shrink-0 shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
                <span>{source.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animación del Punto Viajero */}
      <style jsx global>{`
        @keyframes travelRight {
          0% {
            left: 0%;
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        .traveling-dot {
          animation: travelRight 6s linear infinite;
        }
      `}</style>
    </>
  );
}

export default WorkflowSection;