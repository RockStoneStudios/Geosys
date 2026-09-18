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
  { label: "SATÉLITE & CLIMA" },
  { label: "CANTIDAD DE TURISTAS" },
  { label: "PERFILAMIENTO DE CLIENTES" },
  { label: "PREDICCIÓN DE VENTAS" },
  { label: "CÁMARAS & DRONES" },
  { label: "CAFÉ Y FRUTOS" },
];

export function WorkflowSection() {
  return (
    <>
      <section className="w-full bg-[#070709] text-white py-16 px-5 md:px-12 font-mono select-none">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Título Principal */}
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight leading-tight uppercase font-sans max-w-5xl">
            NO TE VENDEMOS SOFTWARE, TE VENDEMOS DECISIONES:{" "}
            <span className="text-amber-500">INTELIGENCIA EN TIEMPO REAL</span> PARA EL TERRITORIO, EL AGRO Y EL COMERCIO.
          </h2>

          {/* Pipeline principal */}
          <div className="relative pt-2 pb-4">
            
            {/* Grid de Pasos */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-10 md:gap-4 relative z-10">
              
              {/* Línea horizontal + Punto viajero (ESCRITORIO) - Alineado perfectamente a los círculos */}
              <div className="hidden md:block absolute bottom-[22px] left-[8%] right-[8%] h-[1px] z-0">
                <div className="w-full h-full border-b border-dashed border-neutral-700/80" />
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2.5 h-2.5 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,1)] traveling-dot-horizontal" />
              </div>

              {/* Línea vertical + Punto viajero (MÓVIL) */}
              <div className="block md:hidden absolute top-6 bottom-6 left-[23px] w-[1px] z-0">
                <div className="w-full h-full border-l border-dashed border-neutral-700/80" />
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-2.5 h-2.5 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,1)] traveling-dot-vertical" />
              </div>

              {STEPS.map((step) => (
                <div
                  key={step.number}
                  className="flex flex-row md:flex-col items-start md:items-center text-left md:text-center space-x-4 md:space-x-0 group"
                >
                  {/* Textos (Títulos y detalles) */}
                  <div className="flex-1 space-y-1.5 md:space-y-3 order-2 md:order-1 pt-1 md:pt-0 md:pb-6">
                    <h3 className="font-bold text-sm tracking-wider text-white uppercase min-h-0 md:min-h-[20px]">
                      {step.title}
                    </h3>

                    <div className="space-y-1 text-[11px] text-neutral-400 font-medium tracking-wide">
                      {step.details.map((detail, idx) => (
                        <p key={idx} className="uppercase leading-relaxed">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Círculo con Número (Order 1 en móvil, Order 2 en escritorio) */}
                  <div className="relative flex items-center justify-center shrink-0 order-1 md:order-2 z-10">
                    <div className="w-12 h-12 md:w-11 md:h-11 rounded-full border border-neutral-700/90 bg-[#070709] flex items-center justify-center text-amber-500 font-bold text-xs tracking-wider transition-all duration-300 group-hover:border-amber-500 group-hover:shadow-[0_0_12px_rgba(245,158,11,0.4)]">
                      {step.number}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fuentes de Datos (Barra Inferior) */}
          <div className="pt-8 border-t border-neutral-800/80">
            <p className="text-[10px] text-neutral-500 tracking-widest uppercase mb-4 font-sans font-semibold">
              // FUENTES DE DATOS E INSUMOS DEL SISTEMA
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:flex lg:flex-wrap lg:justify-between gap-3 text-[11px] text-neutral-300 font-medium tracking-wider uppercase">
              {SOURCES.map((source, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2.5 bg-neutral-900/50 md:bg-transparent border border-neutral-800/60 md:border-none px-3 py-2 md:p-0 rounded-md"
                >
                  <span className="w-2 h-2 rotate-45 bg-amber-500 inline-block shrink-0 shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
                  <span className="truncate">{source.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Animaciones de los Puntos Viajeros */}
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

        @keyframes travelDown {
          0% {
            top: 0%;
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }

        .traveling-dot-horizontal {
          animation: travelRight 6s linear infinite;
        }

        .traveling-dot-vertical {
          animation: travelDown 6s linear infinite;
        }
      `}</style>
    </>
  );
}

export default WorkflowSection;