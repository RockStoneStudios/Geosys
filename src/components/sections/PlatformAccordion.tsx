'use client';
import { useState, ReactNode } from 'react';

interface ModuleMetadata {
  label: string;
  value: string;
}

interface ModuleItem {
  id: string;
  code: string;
  category: string;
  title: string;
  description: string;
  metadata?: ModuleMetadata[];
  status?: string;
  specs: string[];
}

const MODULES: ModuleItem[] = [
  {
    id: 'mod-1',
    code: '/01',
    category: 'GEOPORTAL UNIFICADO',
    title: 'INTELIGENCIA TERRITORIAL Y RIESGOS',
    description:
      'Un mapa, toda la verdad del territorio. Correlaciona proyección de flujos turísticos en fines de semana, sensores hídricos e imágenes satelitales para alertas tempranas de incendios e inundaciones.',
    status: 'EN PRODUCCIÓN',
    metadata: [
      { label: 'PROYECCIÓN', value: 'MAGNA-SIRGAS / ORIGEN NACIONAL' },
      { label: 'ZONAS', value: 'OCCIDENTE ANTIOQUEÑO · 4 CAPAS' },
    ],
    specs: ['PREDICCIÓN DE TURISMO', 'ALERTAS DE INCENDIOS', 'TELEMETRÍA SATELITAL'],
  },
  {
    id: 'mod-2',
    code: '/02',
    category: 'SME ANALYTICS ENGINE',
    title: 'ANALÍTICA DE NEGOCIOS Y VENTAS',
    description: 'Motor de maximización de ganancias para comercios locales. Perfildado automático de clientes, detección de horas pico y temporización de ofertas según la afluencia turística proyectada.',
    status: 'OPTIMIZADO',
    metadata: [
      { label: 'MODELO', value: 'PREDICCIÓN DE DEMANDA EN TIEMPO REAL' },
      { label: 'ALCANCE', value: 'COMERCIO HORECA Y SERVICIOS' },
    ],
    specs: ['CLASIFICACIÓN DE CLIENTES', 'MAPA DE HORAS PICO', 'PROMOCIONES AUTOMÁTICAS'],
  },
  {
    id: 'mod-3',
    code: '/03',
    category: 'DETECCIÓN Y CLASIFICACIÓN AGRO',
    title: 'AGRO-ANALYTICS Y VISIÓN ARTIFICIAL',
    description: 'Redes neuronales entrenadas en terreno para cultivos de cítricos, café y mango. Diagnóstico foliar de plagas, conteo inteligente de frutos y proyección de rentabilidad en cosechas.',
    status: 'ACTIVO',
    metadata: [
      { label: 'VISIÓN ARTIFICIAL', value: 'YOLOV8 / EFFICIENTNET' },
      { label: 'CULTIVOS', value: 'CÍTRICOS · CAFÉ · MANGO' },
    ],
    specs: ['DIAGNOSTICO DE PLAGAS', 'ESTIMACIÓN DE COSECHA', 'PROYECCIÓN FINANCIERA'],
  },
];

export function PlatformAccordion(): ReactNode {
  const [openId, setOpenId] = useState<string>('mod-1');

  return (
    <section id="platform" className="w-full py-20 bg-[#070708] border-b border-[#1C1C1F] text-[#EDEAE3]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-12">
        {/* Título Estilo Palantir UI */}
        <div className="max-w-4xl">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none text-white font-sans">
            Construida para los problemas más difíciles del territorio.
          </h2>
        </div>

        {/* Lista de Módulos (Accordion) */}
        <div className="flex flex-col border-t border-[#1C1C1F]">
          {MODULES.map((mod) => {
            const isOpen = openId === mod.id;
            return (
              <div
                key={mod.id}
                className="border-b border-[#1C1C1F] transition-colors duration-150 bg-[#070708]"
              >
                {/* Header / Botón Accordion */}
                <button
                  onClick={() => setOpenId(isOpen ? '' : mod.id)}
                  type="button"
                  className="w-full py-7 px-2 text-left flex justify-between items-center gap-6 focus:outline-none group"
                >
                  <div className="flex items-center gap-6 sm:gap-12">
                    <span className="font-mono text-xs font-semibold text-[#FF9E1B] tracking-widest">
                      {mod.code}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-wider uppercase font-sans group-hover:text-[#FF9E1B] transition-colors">
                      {mod.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="hidden md:inline-block font-mono text-[10px] tracking-[0.2em] text-[#7A776E] uppercase">
                      {mod.category}
                    </span>
                    <span className="font-mono text-xl text-[#FF9E1B]">
                      {isOpen ? '—' : '+'}
                    </span>
                  </div>
                </button>

                {/* Contenido Expandido */}
                {isOpen && (
                  <div className="px-2 pb-8 pt-2 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Descripción Principal */}
                    <div className="lg:col-span-6 space-y-4">
                      <p className="text-sm text-[#9A968C] leading-relaxed font-sans">
                        {mod.description}
                      </p>
                      
                      {/* Badge Tags / Specs */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {mod.specs.map((spec) => (
                          <span
                            key={spec}
                            className="font-mono text-[9px] tracking-[0.14em] text-[#EDEAE3] bg-[#121214] px-2.5 py-1 border border-[#26262A] uppercase"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Metadata Lateral (Panel Estilo Telemetría) */}
                    <div className="lg:col-span-6 font-mono text-[11px] uppercase tracking-wider space-y-2 lg:pl-12 border-t lg:border-t-0 border-[#1C1C1F] pt-4 lg:pt-0">
                      {mod.metadata?.map((meta) => (
                        <div key={meta.label} className="flex items-center gap-4">
                          <span className="text-[#5A574F] w-28 shrink-0">{meta.label}</span>
                          <span className="text-[#C4C0B5]">{meta.value}</span>
                        </div>
                      ))}
                      {mod.status && (
                        <div className="flex items-center gap-4 pt-1">
                          <span className="text-[#5A574F] w-28 shrink-0">ESTADO</span>
                          <span className="inline-block px-2 py-0.5 border border-[#1E4D2B] bg-[#0A1F11] text-[#4ADE80] text-[10px]">
                            {mod.status}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}