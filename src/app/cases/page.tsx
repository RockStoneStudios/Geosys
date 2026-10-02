'use client';

import React, { useState, useMemo } from 'react';
import {
  Building2,
  Store,
  Sprout,
  ArrowRight,
  TrendingUp,
  Users,
  MapPin,
  Clock,
  CheckCircle2,
  Quote,
  Filter,
  BarChart3,
} from 'lucide-react';

/* =========================================================================
   PALETA (misma que usa el resto de la plataforma)
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

type ModuloCaso = 'ALCALDIAS' | 'NEGOCIOS' | 'AGRICULTURA';

interface Caso {
  id: string;
  modulo: ModuloCaso;
  color: string;
  cliente: string;
  ubicacion: string;
  titulo: string;
  resumen: string;
  problema: string;
  solucion: string;
  resultados: { label: string; value: string }[];
  stack: string[];
  duracion: string;
  destacado?: boolean;
}

/* =========================================================================
   DATA DE CASOS (hardcodeada, honesta)
   ========================================================================= */

const CASOS: Caso[] = [
  {
    id: 'CS-001',
    modulo: 'ALCALDIAS',
    color: '#00FF88',
    cliente: 'Alcaldía municipal',
    ubicacion: 'Occidente Antioqueño',
    titulo: 'Predicción de turismo en temporada alta',
    resumen:
      'Modelo predictivo para anticipar la llegada de visitantes a los municipios durante puentes y Semana Santa.',
    problema:
      'La secretaría de turismo no tenía forma de anticipar cuántas personas llegarían, lo que generaba problemas de logística, seguridad y abastecimiento.',
    solucion:
      'Se integraron series históricas, clima, eventos y datos de movilidad en un modelo de forecasting con horizonte de 72 horas.',
    resultados: [
      { label: 'Horizonte', value: '72h' },
      { label: 'Variables', value: '18' },
      { label: 'Cobertura', value: '23 municipios' },
    ],
    stack: ['FastAPI', 'PostgreSQL', 'Scikit-Learn', 'MLflow'],
    duracion: 'Proyecto piloto',
  },
  {
    id: 'CS-002',
    modulo: 'ALCALDIAS',
    color: '#00FF88',
    cliente: 'Gestión del riesgo',
    ubicacion: 'Cuenca del río Cauca',
    titulo: 'Alerta temprana de inundaciones',
    resumen:
      'Sistema de predicción hidrológica que combina precipitación, nivel de ríos y humedad del suelo.',
    problema:
      'Las alertas llegaban tarde y sin nivel de confianza, dificultando la evacuación preventiva.',
    solucion:
      'Modelo de riesgo con datos del IDEAM y sensores locales, con niveles de alerta por vereda y confianza asociada.',
    resultados: [
      { label: 'Anticipación', value: 'Hasta 48h' },
      { label: 'Zonas', value: '12 veredas' },
      { label: 'Alertas', value: 'Por nivel' },
    ],
    stack: ['FastAPI', 'PostGIS', 'Neo4j', 'Ontología'],
    duracion: 'Piloto activo',
  },
  {
    id: 'CS-003',
    modulo: 'NEGOCIOS',
    color: '#3366FF',
    cliente: 'Cadena de restaurantes',
    ubicacion: 'Sopetrán · San Jerónimo',
    titulo: 'Predicción de ventas por sede y temporada',
    resumen:
      'Forecasting semanal para planear inventario, personal y promociones en cada punto de venta.',
    problema:
      'Sobreinventario en temporada baja y desabastecimiento en temporada alta, con margen erosionado.',
    solucion:
      'Modelo de series temporales por producto, sede y día de la semana, con ajuste por clima y eventos locales.',
    resultados: [
      { label: 'Reducción merma', value: '~18%' },
      { label: 'Precisión ref.', value: '>88%' },
      { label: 'Sedes', value: '4' },
    ],
    stack: ['FastAPI', 'PostgreSQL', 'XGBoost', 'MLflow'],
    duracion: 'Implementación',
  },
  {
    id: 'CS-004',
    modulo: 'NEGOCIOS',
    color: '#3366FF',
    cliente: 'Comercio retail',
    ubicacion: 'Occidente Antioqueño',
    titulo: 'Segmentación de clientes y LTV',
    resumen:
      'Clasificación de clientes por comportamiento, valor de vida y propensión de compra.',
    problema:
      'Campañas masivas sin segmentación, con bajo retorno y desgaste de la base de clientes.',
    solucion:
      'Modelo RFM + clustering con KMeans y análisis de canasta para diseñar combos y promociones dirigidas.',
    resultados: [
      { label: 'Segmentos', value: '8' },
      { label: 'Varianza PCA', value: '92%' },
      { label: 'Canales', value: 'POS + Web' },
    ],
    stack: ['Scikit-Learn', 'Pandas', 'PostgreSQL'],
    duracion: 'Implementación',
  },
  {
    id: 'CS-005',
    modulo: 'AGRICULTURA',
    color: '#FFAA00',
    cliente: 'Cultivo de aguacate',
    ubicacion: 'Occidente Antioqueño',
    titulo: 'Conteo automático de árboles por dron',
    resumen:
      'Detección y conteo de árboles de aguacate a partir de imágenes aéreas con YOLO.',
    problema:
      'El conteo manual de árboles era lento, costoso y propenso a error, dificultando la planeación de cosecha.',
    solucion:
      'Pipeline de visión artificial con YOLOv8 + OpenCV para detectar, contar y geolocalizar cada árbol.',
    resultados: [
      { label: 'Precisión ref.', value: '>92%' },
      { label: 'Tiempo', value: 'Minutos' },
      { label: 'Hectáreas', value: 'Escalable' },
    ],
    stack: ['YOLOv8', 'OpenCV', 'FastAPI', 'PostGIS'],
    duracion: 'Piloto',
  },
  {
    id: 'CS-006',
    modulo: 'AGRICULTURA',
    color: '#FFAA00',
    cliente: 'Cultivo de cítricos',
    ubicacion: 'Occidente Antioqueño',
    titulo: 'Detección temprana de plagas',
    resumen:
      'Identificación de plagas y enfermedades foliares con nivel de confianza por hallazgo.',
    problema:
      'Las plagas se detectaban cuando el daño ya era visible, con pérdidas de cosecha evitables.',
    solucion:
      'Modelo de clasificación de imágenes con YOLO + ontología de plagas para conectar hallazgos con tratamiento recomendado.',
    resultados: [
      { label: 'Detección', value: 'Temprana' },
      { label: 'Confianza', value: 'Por hallazgo' },
      { label: 'Cultivos', value: 'Cítricos' },
    ],
    stack: ['YOLOv8', 'Ontología', 'Neo4j'],
    duracion: 'Piloto',
  },
  {
    id: 'CS-007',
    modulo: 'AGRICULTURA',
    color: '#FFAA00',
    cliente: 'Cultivo de café',
    ubicacion: 'Occidente Antioqueño',
    titulo: 'Estimación de cosecha y estrés hídrico',
    resumen:
      'Cálculo del rendimiento esperado y detección de estrés hídrico o nutricional por análisis foliar.',
    problema:
      'Sin estimación temprana de cosecha, la planeación de recolección y venta se hacía a ciegas.',
    solucion:
      'Visión artificial para análisis de color y textura foliar, combinado con conteo de frutos por planta.',
    resultados: [
      { label: 'Rendimiento', value: 'Por hectárea' },
      { label: 'Estrés', value: 'Temprano' },
      { label: 'Cultivos', value: 'Café' },
    ],
    stack: ['OpenCV', 'YOLOv8', 'Scikit-Learn'],
    duracion: 'Piloto',
  },
];

/* =========================================================================
   UTILIDADES
   ========================================================================= */

const MODULO_LABEL: Record<ModuloCaso, string> = {
  ALCALDIAS: 'ALCALDÍAS',
  NEGOCIOS: 'NEGOCIOS',
  AGRICULTURA: 'AGRICULTURA',
};

const MODULO_ICON: Record<ModuloCaso, React.ReactNode> = {
  ALCALDIAS: <Building2 size={14} />,
  NEGOCIOS: <Store size={14} />,
  AGRICULTURA: <Sprout size={14} />,
};

/* =========================================================================
   COMPONENTE
   ========================================================================= */

export default function CasosPage() {
  const [filtro, setFiltro] = useState<'TODOS' | ModuloCaso>('TODOS');

  const casosFiltrados = useMemo(() => {
    if (filtro === 'TODOS') return CASOS;
    return CASOS.filter((c) => c.modulo === filtro);
  }, [filtro]);

  const destacado = CASOS[0]; // El primero lo marcamos como destacado
  const casosGrid = casosFiltrados.filter((c) => c.id !== destacado.id || filtro !== 'TODOS');

  return (
    <div className="w-full min-h-screen font-sans" style={{ backgroundColor: colors.bg, color: colors.textMain }}>
      
      {/* ============ HERO ============ */}
      <section
        className="relative border-b pt-10 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ borderColor: colors.border, backgroundColor: colors.bg }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, ${colors.border} 1px, transparent 1px), linear-gradient(to bottom, ${colors.border} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-3 font-mono text-xs tracking-widest uppercase mb-6" style={{ color: colors.textDark }}>
            <span className="w-8 h-[1px]" style={{ backgroundColor: colors.accent }} />
            <span>GEOSYS // CASOS DE USO - V1.0</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 space-y-5">
              <h1 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
                CASOS <br />
                <span className="text-transparent" style={{ WebkitTextStroke: `2px ${colors.accent}` }}>
                  REALES
                </span> <br />
                DEL <br />
                TERRITORIO.
              </h1>

              <p className="text-sm sm:text-base leading-relaxed max-w-xl" style={{ color: colors.textMuted }}>
                Cómo <strong style={{ color: colors.textMain }}>Geosys</strong> se aplica hoy en alcaldías,
                negocios y agricultura del Occidente Antioqueño. Cada caso conecta un problema real con una
                solución de datos, IA o visión artificial.
              </p>

              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] pt-2">
                {[
                  { name: 'ALCALDÍAS', color: '#00FF88', count: CASOS.filter((c) => c.modulo === 'ALCALDIAS').length },
                  { name: 'NEGOCIOS', color: '#3366FF', count: CASOS.filter((c) => c.modulo === 'NEGOCIOS').length },
                  { name: 'AGRICULTURA', color: '#FFAA00', count: CASOS.filter((c) => c.modulo === 'AGRICULTURA').length },
                ].map((m) => (
                  <span
                    key={m.name}
                    className="px-2.5 py-1 border flex items-center gap-1.5"
                    style={{ backgroundColor: colors.panelBg, borderColor: colors.border, color: colors.textMain }}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: m.color, boxShadow: `0 0 12px ${m.color}` }}
                    />
                    {m.name} · {m.count}
                  </span>
                ))}
              </div>
            </div>

            {/* Panel de métricas globales */}
            <div className="lg:col-span-5">
              <div className="p-6 border" style={{ backgroundColor: colors.panelBg, borderColor: colors.border }}>
                <div className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-widest uppercase mb-4 pb-3 border-b" style={{ borderColor: colors.border, color: colors.accent }}>
                  <BarChart3 size={14} />
                  MÉTRICAS AGREGADAS
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Casos', value: String(CASOS.length) },
                    { label: 'Módulos', value: '3' },
                    { label: 'Municipios', value: '23+' },
                    { label: 'Cultivos', value: '3' },
                  ].map((m) => (
                    <div key={m.label} className="p-3 border" style={{ backgroundColor: colors.bg, borderColor: colors.border }}>
                      <div className="font-mono text-[9px] uppercase mb-1" style={{ color: colors.textDark }}>
                        {m.label}
                      </div>
                      <div className="text-xl font-extrabold" style={{ color: colors.accent }}>
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FILTROS ============ */}
      <section className="border-b" style={{ borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center flex-wrap gap-2 font-mono text-xs">
            <span className="flex items-center gap-1.5 mr-2" style={{ color: colors.textDark }}>
              <Filter size={12} /> FILTRAR POR MÓDULO:
            </span>

            {(['TODOS', 'ALCALDIAS', 'NEGOCIOS', 'AGRICULTURA'] as const).map((f) => {
              const active = filtro === f;
              const color =
                f === 'ALCALDIAS' ? '#00FF88' :
                f === 'NEGOCIOS' ? '#3366FF' :
                f === 'AGRICULTURA' ? '#FFAA00' :
                colors.accent;

              return (
                <button
                  key={f}
                  onClick={() => setFiltro(f)}
                  className="px-3 py-1.5 border uppercase tracking-widest font-bold transition-all flex items-center gap-1.5"
                  style={{
                    backgroundColor: active ? color : colors.panelBg,
                    borderColor: active ? color : colors.border,
                    color: active ? colors.bg : colors.textMain,
                  }}
                >
                  {f !== 'TODOS' && MODULO_ICON[f as ModuloCaso]}
                  {f === 'TODOS' ? 'TODOS' : MODULO_LABEL[f as ModuloCaso]}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ CASO DESTACADO ============ */}
      {filtro === 'TODOS' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div
            className="border p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8"
            style={{ backgroundColor: colors.panelBg, borderColor: colors.border }}
          >
            {/* Columna izquierda */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest">
                <span
                  className="px-2 py-0.5 border font-bold flex items-center gap-1"
                  style={{ color: destacado.color, borderColor: destacado.color, backgroundColor: `${destacado.color}15` }}
                >
                  {MODULO_ICON[destacado.modulo]}
                  {MODULO_LABEL[destacado.modulo]}
                </span>
                <span style={{ color: colors.textDark }}>// DESTACADO</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold uppercase leading-tight">
                {destacado.titulo}
              </h2>

              <p className="text-sm sm:text-base leading-relaxed" style={{ color: colors.textMuted }}>
                {destacado.resumen}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 border" style={{ backgroundColor: colors.bg, borderColor: colors.border }}>
                  <div className="font-mono text-[10px] uppercase font-bold mb-2" style={{ color: colors.critico }}>
                    // PROBLEMA
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: colors.textMuted }}>
                    {destacado.problema}
                  </p>
                </div>
                <div className="p-4 border" style={{ backgroundColor: colors.bg, borderColor: colors.border }}>
                  <div className="font-mono text-[10px] uppercase font-bold mb-2" style={{ color: colors.info }}>
                    // SOLUCIÓN
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: colors.textMuted }}>
                    {destacado.solucion}
                  </p>
                </div>
              </div>
            </div>

            {/* Columna derecha */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 border" style={{ backgroundColor: colors.bg, borderColor: colors.border }}>
                <div className="font-mono text-[10px] uppercase font-bold mb-3" style={{ color: colors.accent }}>
                  // RESULTADOS
                </div>
                <div className="space-y-2">
                  {destacado.resultados.map((r) => (
                    <div key={r.label} className="flex justify-between font-mono text-xs">
                      <span style={{ color: colors.textMuted }}>{r.label}</span>
                      <span className="font-bold" style={{ color: destacado.color }}>{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border" style={{ backgroundColor: colors.bg, borderColor: colors.border }}>
                <div className="font-mono text-[10px] uppercase font-bold mb-3" style={{ color: colors.accent }}>
                  // STACK
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {destacado.stack.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-1 border font-mono text-[10px]"
                      style={{ borderColor: colors.border, color: colors.textMain }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 border flex items-center justify-between font-mono text-[10px]" style={{ backgroundColor: colors.bg, borderColor: colors.border }}>
                <span className="flex items-center gap-1.5" style={{ color: colors.textMuted }}>
                  <MapPin size={12} /> {destacado.ubicacion}
                </span>
                <span className="flex items-center gap-1.5" style={{ color: colors.textMuted }}>
                  <Clock size={12} /> {destacado.duracion}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============ GRID DE CASOS ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-8 flex items-end justify-between flex-wrap gap-3">
          <div>
            <div className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: colors.accent }}>
              // {filtro === 'TODOS' ? 'TODOS LOS CASOS' : MODULO_LABEL[filtro]}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase">
              {casosFiltrados.length} {casosFiltrados.length === 1 ? 'CASO' : 'CASOS'}
            </h2>
          </div>
        </div>

        {casosFiltrados.length === 0 ? (
          <div className="p-12 border text-center font-mono text-sm" style={{ borderColor: colors.border, color: colors.textMuted }}>
            No hay casos en este módulo todavía.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {casosFiltrados.map((caso) => (
              <article
                key={caso.id}
                className="border flex flex-col transition-all hover:translate-y-[-2px]"
                style={{ backgroundColor: colors.panelBg, borderColor: colors.border }}
              >
                {/* Header */}
                <div className="p-5 border-b" style={{ borderColor: colors.border }}>
                  <div className="flex items-center justify-between mb-3 font-mono text-[10px]">
                    <span
                      className="px-2 py-0.5 border font-bold flex items-center gap-1"
                      style={{ color: caso.color, borderColor: caso.color, backgroundColor: `${caso.color}15` }}
                    >
                      {MODULO_ICON[caso.modulo]}
                      {MODULO_LABEL[caso.modulo]}
                    </span>
                    <span style={{ color: colors.textDark }}>{caso.id}</span>
                  </div>

                  <h3 className="text-base font-extrabold uppercase leading-tight mb-2" style={{ color: colors.textMain }}>
                    {caso.titulo}
                  </h3>

                  <div className="flex items-center gap-2 font-mono text-[10px]" style={{ color: colors.textDark }}>
                    <MapPin size={10} />
                    <span>{caso.ubicacion}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 space-y-4">
                  <p className="text-xs leading-relaxed" style={{ color: colors.textMuted }}>
                    {caso.resumen}
                  </p>

                  <div className="p-3 border" style={{ backgroundColor: colors.bg, borderColor: colors.border }}>
                    <div className="font-mono text-[9px] uppercase font-bold mb-1.5" style={{ color: colors.critico }}>
                      // PROBLEMA
                    </div>
                    <p className="font-mono text-[10px] leading-relaxed" style={{ color: colors.textMuted }}>
                      {caso.problema}
                    </p>
                  </div>

                  <div className="p-3 border" style={{ backgroundColor: colors.bg, borderColor: colors.border }}>
                    <div className="font-mono text-[9px] uppercase font-bold mb-1.5" style={{ color: colors.info }}>
                      // SOLUCIÓN
                    </div>
                    <p className="font-mono text-[10px] leading-relaxed" style={{ color: colors.textMuted }}>
                      {caso.solucion}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {caso.resultados.map((r) => (
                      <div key={r.label} className="text-center p-2 border" style={{ backgroundColor: colors.bg, borderColor: colors.border }}>
                        <div className="font-mono text-[8px] uppercase mb-0.5" style={{ color: colors.textDark }}>
                          {r.label}
                        </div>
                        <div className="font-mono text-[10px] font-bold" style={{ color: caso.color }}>
                          {r.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t" style={{ borderColor: colors.border, backgroundColor: colors.bg }}>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {caso.stack.map((s) => (
                      <span
                        key={s}
                        className="px-1.5 py-0.5 border font-mono text-[9px]"
                        style={{ borderColor: colors.border, color: colors.textMuted }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between font-mono text-[10px]" style={{ color: colors.textDark }}>
                    <span className="flex items-center gap-1">
                      <Clock size={10} /> {caso.duracion}
                    </span>
                    <span className="flex items-center gap-1 font-bold" style={{ color: colors.accent }}>
                      VER DETALLE <ArrowRight size={10} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div
          className="p-8 sm:p-12 border relative overflow-hidden"
          style={{ backgroundColor: colors.panelBg, borderColor: colors.border }}
        >
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5">
            <div className="font-mono text-xs tracking-widest uppercase" style={{ color: colors.accent }}>
              // ¿TIENES UN CASO QUE RESOLVER?
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-wide leading-tight">
              LLEVA GEOSYS A TU MUNICIPIO, <br />
              NEGOCIO O CULTIVO.
            </h2>
            <p className="text-sm font-sans max-w-xl mx-auto" style={{ color: colors.textMuted }}>
              Cuéntanos tu caso y te mostramos cómo los datos, la IA y la visión artificial pueden
              convertirlo en una decisión medible.
            </p>
            <div className="pt-3 flex flex-wrap items-center justify-center gap-4 font-mono text-xs">
              <button
                onClick={() =>
                  window.open(
                    'https://wa.me/573001234567?text=Hola,%20quiero%20hablar%20sobre%20un%20caso%20para%20Geosys',
                    '_blank'
                  )
                }
                className="px-6 py-3 font-bold uppercase tracking-widest transition-all flex items-center gap-2"
                style={{ backgroundColor: colors.accent, color: colors.bg }}
              >
                HABLAR CON EL EQUIPO <ArrowRight size={16} />
              </button>
              <button
                className="px-6 py-3 font-bold uppercase tracking-widest border transition-all"
                style={{ borderColor: colors.border, color: colors.textMain }}
              >
                VER MÓDULOS
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}