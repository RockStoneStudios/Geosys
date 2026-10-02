'use client';

import React from 'react';
import {
  Target,
  Eye,
  Building2,
  Store,
  Sprout,
  Brain,
  Network,
  Camera,
  ArrowRight,
  CheckCircle2,
  MapPin,
} from 'lucide-react';

/* =========================================================================
   PALETA (misma que usa la página de Stack Tecnológico)
   ========================================================================= */

const colors = {
  bg: '#0A0A0B',
  panelBg: '#0B0B0D',
  border: 'rgba(237,234,227,0.11)',
  accent: '#FF9E1B',
  textMain: '#EDEAE3',
  textMuted: '#9A968C',
  textDark: '#7A776E',
  alerta: '#FF9E1B',
  critico: '#EF4444',
  info: '#55C97C',
};

/* =========================================================================
   TIPOS
   ========================================================================= */

interface ModuloGeosys {
  id: string;
  tag: 'ALCALDIAS' | 'NEGOCIOS' | 'AGRICULTURA';
  nombre: string;
  subtitulo: string;
  color: string;
  descripcion: string;
  funcionalidades: { titulo: string; detalle: string }[];
  metricas: { label: string; value: string }[];
}

/* =========================================================================
   DATA
   ========================================================================= */

const MODULOS_GEOSYS: ModuloGeosys[] = [
  {
    id: 'MOD-01',
    tag: 'ALCALDIAS',
    nombre: 'MÓDULO 1 · ALCALDÍAS',
    subtitulo: 'INTELIGENCIA TERRITORIAL PARA GOBIERNOS LOCALES',
    color: '#00FF88',
    descripcion:
      'Plataforma de analítica predictiva para alcaldías del Occidente Antioqueño. Convierte datos abiertos, históricos y satelitales en decisiones públicas accionables.',
    funcionalidades: [
      { titulo: 'Predicción de turismo', detalle: 'Estima cuántas personas llegarán a cada municipio el fin de semana, con base en clima, eventos y series históricas.' },
      { titulo: 'Predicción de incendios', detalle: 'Modelos de riesgo que combinan temperatura, humedad, viento y vegetación para anticipar focos de incendio.' },
      { titulo: 'Predicción de inundaciones', detalle: 'Análisis hidrológico y de precipitación para alertar zonas vulnerables con antelación.' },
      { titulo: 'Tableros de decisión', detalle: 'Dashboards por municipio con indicadores en tiempo real para secretarías de turismo, riesgo y planeación.' },
    ],
    metricas: [
      { label: 'Municipios', value: '23+' },
      { label: 'Fuentes', value: 'IDEAM · DANE · SAT' },
      { label: 'Horizonte', value: '72h' },
    ],
  },
  {
    id: 'MOD-02',
    tag: 'NEGOCIOS',
    nombre: 'MÓDULO 2 · NEGOCIOS',
    subtitulo: 'BIG DATA Y PREDICCIÓN PARA EMPRESAS',
    color: '#3366FF',
    descripcion:
      'Motor de analítica comercial que transforma los datos operativos de un negocio en predicciones, segmentos y recomendaciones concretas.',
    funcionalidades: [
      { titulo: 'Predicción de ventas', detalle: 'Forecasting por producto, sede y temporada para planear inventario, personal y promociones.' },
      { titulo: 'Clasificación de clientes', detalle: 'Segmentación por comportamiento, valor de vida (LTV) y propensión de compra.' },
      { titulo: 'Análisis de canasta', detalle: 'Detecta qué productos se compran juntos para diseñar combos, cross-selling y layout de local.' },
      { titulo: 'Detección de fugas de ingresos', detalle: 'Identifica patrones anómalos en ventas, descuentos y devoluciones que impactan el margen.' },
    ],
    metricas: [
      { label: 'Modelos', value: 'Forecast · RFM' },
      { label: 'Actualización', value: 'Diaria' },
      { label: 'Canales', value: 'POS · E-commerce' },
    ],
  },
  {
    id: 'MOD-03',
    tag: 'AGRICULTURA',
    nombre: 'MÓDULO 3 · AGRICULTURA',
    subtitulo: 'VISIÓN ARTIFICIAL PARA EL CAMPO',
    color: '#FFAA00',
    descripcion:
      'Visión artificial con OpenCV y YOLO aplicada a cultivos de aguacate, cítricos y café. Del dron o del celular al reporte agronómico en minutos.',
    funcionalidades: [
      { titulo: 'Conteo de cultivos', detalle: 'Detección y conteo automático de árboles y plantas de aguacate, cítricos y café por imagen satelital o aérea.' },
      { titulo: 'Detección de plagas', detalle: 'Identificación temprana de plagas y enfermedades por visión artificial, con nivel de confianza por hallazgo.' },
      { titulo: 'Estimación de cosecha', detalle: 'Cálculo del rendimiento esperado por hectárea a partir del conteo y estado fenológico del cultivo.' },
      { titulo: 'Estrés hídrico y nutricional', detalle: 'Análisis de color y textura foliar para detectar deficiencias hídricas o nutricionales antes de que sean visibles.' },
      { titulo: 'Mapeo de malezas', detalle: 'Segmentación del terreno para aplicar herbicida solo donde se necesita, reduciendo costo y huella ambiental.' },
    ],
    metricas: [
      { label: 'Modelos', value: 'YOLOv8 · OpenCV' },
      { label: 'Cultivos', value: 'Aguacate · Cítricos · Café' },
      { label: 'Precisión ref.', value: '>92%' },
    ],
  },
];

/* =========================================================================
   COMPONENTE
   ========================================================================= */

export default function MisionVisionGeosys() {
  return (
    <section
      className="w-full font-sans border-b"
      style={{ backgroundColor: colors.bg, color: colors.textMain, borderColor: colors.border }}
    >
      {/* ============ MISIÓN Y VISIÓN ============ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b" style={{ borderColor: colors.border }}>
        <div className="mb-10">
          <div className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: colors.accent }}>
            // IDENTIDAD GEOSYS
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase">
            MISIÓN Y VISIÓN
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* MISIÓN */}
          <div className="p-6 sm:p-8 border relative" style={{ backgroundColor: colors.panelBg, borderColor: colors.border }}>
            <div className="flex items-center gap-3 mb-5 pb-4 border-b" style={{ borderColor: colors.border }}>
              <div
                className="w-10 h-10 border flex items-center justify-center"
                style={{ borderColor: colors.accent, color: colors.accent }}
              >
                <Target size={20} />
              </div>
              <div>
                <span className="font-mono text-[10px] tracking-widest uppercase block" style={{ color: colors.textDark }}>
                  // 01
                </span>
                <h3 className="text-xl font-extrabold uppercase" style={{ color: colors.textMain }}>
                  Misión
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: colors.textMuted }}>
              En <strong style={{ color: colors.textMain }}>Geosys</strong> convertimos datos dispersos en
              decisiones concretas. Ayudamos a <strong style={{ color: colors.textMain }}>alcaldías,
              negocios y agricultores</strong> del Occidente Antioqueño a anticipar lo que viene —
              turismo, incendios, ventas, plagas — usando analítica avanzada, inteligencia artificial y
              visión artificial.
            </p>

            <ul className="space-y-2.5 font-mono text-xs" style={{ color: colors.textMuted }}>
              {[
                'Datos abiertos + satelitales + operativos en una sola capa',
                'Modelos predictivos aplicados al territorio real',
                'Decisiones públicas y privadas basadas en evidencia',
                'Tecnología accesible para municipios y pymes',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 size={14} style={{ color: colors.accent }} className="shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* VISIÓN */}
          <div className="p-6 sm:p-8 border relative" style={{ backgroundColor: colors.panelBg, borderColor: colors.border }}>
            <div className="flex items-center gap-3 mb-5 pb-4 border-b" style={{ borderColor: colors.border }}>
              <div
                className="w-10 h-10 border flex items-center justify-center"
                style={{ borderColor: colors.accent, color: colors.accent }}
              >
                <Eye size={20} />
              </div>
              <div>
                <span className="font-mono text-[10px] tracking-widest uppercase block" style={{ color: colors.textDark }}>
                  // 02
                </span>
                <h3 className="text-xl font-extrabold uppercase" style={{ color: colors.textMain }}>
                  Visión
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: colors.textMuted }}>
              Ser la <strong style={{ color: colors.textMain }}>plataforma de inteligencia territorial
              de referencia</strong> en Colombia: un solo ecosistema donde gobiernos, empresas y campo
              consulten, predigan y actúen con la misma base de conocimiento, en tiempo real y con
              trazabilidad total.
            </p>

            <ul className="space-y-2.5 font-mono text-xs" style={{ color: colors.textMuted }}>
              {[
                'Cobertura nacional desde el Occidente Antioqueño',
                'Ontología computacional unificando todos los dominios',
                'IA y visión artificial como servicios estándar',
                'Ecosistema abierto para alcaldías, empresas y agro',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 size={14} style={{ color: colors.accent }} className="shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ============ MÓDULOS ============ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b" style={{ borderColor: colors.border }}>
        <div className="mb-10">
          <div className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: colors.accent }}>
            // ARQUITECTURA FUNCIONAL
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase">
            TRES MÓDULOS, UN SOLO CEREBRO
          </h2>
          <p className="text-sm mt-2 max-w-3xl" style={{ color: colors.textMuted }}>
            Geosys se organiza en tres módulos verticales que comparten la misma capa de datos,
            ontología e inteligencia artificial.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {MODULOS_GEOSYS.map((mod) => (
            <div
              key={mod.id}
              className="p-6 border flex flex-col"
              style={{ backgroundColor: colors.panelBg, borderColor: colors.border }}
            >
              {/* Encabezado del módulo */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b" style={{ borderColor: colors.border }}>
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: mod.color, boxShadow: `0 0 12px ${mod.color}` }}
                  />
                  <span className="font-mono text-[10px] font-bold tracking-widest" style={{ color: mod.color }}>
                    {mod.tag}
                  </span>
                </div>
                <span className="font-mono text-[10px]" style={{ color: colors.textDark }}>
                  {mod.id}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-extrabold uppercase mb-1" style={{ color: colors.textMain }}>
                {mod.nombre}
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-widest mb-4" style={{ color: colors.textDark }}>
                {mod.subtitulo}
              </p>

              <p className="text-xs leading-relaxed mb-5" style={{ color: colors.textMuted }}>
                {mod.descripcion}
              </p>

              {/* Funcionalidades */}
              <div className="space-y-3 mb-6 flex-1">
                {mod.funcionalidades.map((f) => (
                  <div
                    key={f.titulo}
                    className="p-3 border"
                    style={{ backgroundColor: colors.bg, borderColor: colors.border }}
                  >
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} style={{ color: mod.color }} className="shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-xs uppercase mb-0.5" style={{ color: colors.textMain }}>
                          {f.titulo}
                        </div>
                        <div className="font-mono text-[10px] leading-relaxed" style={{ color: colors.textMuted }}>
                          {f.detalle}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Métricas */}
              <div className="pt-4 border-t grid grid-cols-3 gap-2 font-mono text-[10px]" style={{ borderColor: colors.border }}>
                {mod.metricas.map((m) => (
                  <div key={m.label} className="text-center">
                    <div className="uppercase mb-0.5" style={{ color: colors.textDark }}>
                      {m.label}
                    </div>
                    <div className="font-bold" style={{ color: mod.color }}>
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============ CAPA TRANSVERSAL ============ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <div className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: colors.accent }}>
            // CAPA TRANSVERSAL
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase">
            LO QUE UNE A LOS TRES MÓDULOS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Brain size={20} />,
              titulo: 'Inteligencia Artificial',
              color: '#FF00FF',
              detalle:
                'Modelos supervisados y no supervisados que aprenden del histórico y se actualizan con cada nuevo dato territorial.',
            },
            {
              icon: <Camera size={20} />,
              titulo: 'Visión Artificial',
              color: '#FFAA00',
              detalle:
                'OpenCV y YOLO procesando imágenes satelitales, aéreas y de campo para detectar, contar y clasificar sobre el terreno.',
            },
            {
              icon: <Network size={20} />,
              titulo: 'Ontología Computacional',
              color: '#FF0055',
              detalle:
                'Un modelo semántico común (OWL/RDF) que conecta municipios, cultivos, negocios y eventos en un mismo grafo de conocimiento.',
            },
          ].map((capa) => (
            <div
              key={capa.titulo}
              className="p-6 border"
              style={{ backgroundColor: colors.panelBg, borderColor: colors.border }}
            >
              <div
                className="w-10 h-10 border flex items-center justify-center mb-4"
                style={{ borderColor: capa.color, color: capa.color }}
              >
                {capa.icon}
              </div>
              <h3 className="text-base font-extrabold uppercase mb-2" style={{ color: colors.textMain }}>
                {capa.titulo}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: colors.textMuted }}>
                {capa.detalle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}