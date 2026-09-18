'use client';
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface EventoTerritorial {
  id: string;
  tiempo: string;
  categoria: 'MIN' | 'COB' | 'VÍA' | 'HID';
  municipio: string;
  titulo: string;
  detalle: string;
  subtexto: string;
  cx: number;
  cy: number;
}

const EVENTOS_INICIALES: EventoTerritorial[] = [
  {
    id: '1',
    tiempo: '0:04:55',
    categoria: 'COB',
    municipio: 'SABANALARGA',
    titulo: 'DEFORESTACIÓN NUEVA',
    detalle: '2.6 HA REMOVIDAS',
    subtexto: 'CONF 0.94',
    cx: 480,
    cy: 230
  },
  {
    id: '2',
    tiempo: '0:04:51',
    categoria: 'HID',
    municipio: 'SANTA FE DE ANTIOQUIA',
    titulo: 'PICO DE TURBIDEZ +36 NTU',
    detalle: 'SENSOR CAUCA-4',
    subtexto: 'CONF 0.90',
    cx: 500,
    cy: 440
  },
  {
    id: '3',
    tiempo: '0:04:20',
    categoria: 'VÍA',
    municipio: 'SAN JERÓNIMO',
    titulo: 'AFECTACIÓN VIAL DETECTADA',
    detalle: 'TROCHA LA HOZ · BORDA INESTABLE',
    subtexto: 'CONF 0.84',
    cx: 600,
    cy: 540
  },
  {
    id: '4',
    tiempo: '0:03:50',
    categoria: 'COB',
    municipio: 'SOPETRÁN',
    titulo: 'VIGOR DE CULTIVO ACTUALIZADO',
    detalle: 'NDVI 0.66 · LOTE LA ESMERALDA',
    subtexto: 'MONITOREO SATELITAL',
    cx: 560,
    cy: 490
  },
  {
    id: '5',
    tiempo: '0:03:12',
    categoria: 'HID',
    municipio: 'LIBORINA',
    titulo: 'MONITOREO DE CAUDAL',
    detalle: '+0.4 M / 6H · ESTACIÓN CAUCA-4',
    subtexto: 'UMBRAL EN VIGILANCIA',
    cx: 480,
    cy: 340
  }
];

const NODOS_SECUNDARIOS = [
  { nombre: 'DABEIBA', cx: 120, cy: 190 },
  { nombre: 'URAMITA', cx: 190, cy: 220 },
  { nombre: 'PEQUE', cx: 280, cy: 210 },
  { nombre: 'FRONTINO', cx: 250, cy: 250 },
  { nombre: 'CAÑASGORDAS', cx: 270, cy: 290 },
  { nombre: 'BURITICÁ', cx: 410, cy: 300 },
  { nombre: 'GIROBA - RÍO', cx: 330, cy: 320 },
  { nombre: 'GIRALDO', cx: 370, cy: 370 },
  { nombre: 'OLAYA', cx: 470, cy: 400 },
  { nombre: 'URRAO', cx: 270, cy: 500 },
  { nombre: 'SALGAR', cx: 330, cy: 650 },
  { nombre: 'CIUDAD BOLÍVAR', cx: 330, cy: 720 },
  { nombre: 'BETANIA', cx: 310, cy: 860 },
  { nombre: 'VENECIA', cx: 390, cy: 800 },
  { nombre: 'HISPANIA', cx: 370, cy: 870 },
  { nombre: 'ANDES', cx: 420, cy: 850 }
];

export function HeroSection() {
  const [activeLayer, setActiveLayer] = useState<string>('TODAS');
  const [eventos, setEventos] = useState<EventoTerritorial[]>(EVENTOS_INICIALES);
  const [highlightedId, setHighlightedId] = useState<string>(EVENTOS_INICIALES[0].id);
  const [angle, setAngle] = useState(0);

  const layers = ['TODAS', 'MIN', 'COB', 'VÍA', 'HID'];

  useEffect(() => {
    let animationId: number;
    const updateAngle = () => {
      setAngle((prev) => (prev + 0.5) % 360);
      animationId = requestAnimationFrame(updateAngle);
    };
    animationId = requestAnimationFrame(updateAngle);
    return () => cancelAnimationFrame(animationId);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setEventos((prev) => {
        const next = [...prev];
        const last = next.pop();
        if (last) next.unshift(last);
        setHighlightedId(next[0].id);
        return next;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const eventosFiltrados = eventos.filter(
    (item) => activeLayer === 'TODAS' || item.categoria === activeLayer
  );

  const eventoDestacado = eventos.find((e) => e.id === highlightedId) || eventos[0];

  const cx = 500;
  const cy = 460;
  const radius = 460;
  const sweepAngle = 45;

  const startRad = (0 * Math.PI) / 180;
  const endRad = (sweepAngle * Math.PI) / 180;
  const x1 = cx + radius * Math.cos(startRad);
  const y1 = cy + radius * Math.sin(startRad);
  const x2 = cx + radius * Math.cos(endRad);
  const y2 = cy + radius * Math.sin(endRad);

  const radarSectorPath = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;

  return (
    <section className="relative w-full pt-8 pb-16 bg-[#0A0A0B] border-b border-[rgba(237,234,227,0.11)] overflow-hidden">
      {/* Retícula de fondo */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(237,234,227,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(237,234,227,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* GRILLA PRINCIPAL: Sistema de 24 columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-24 gap-8 items-start">
          
          {/* COLUMNA IZQUIERDA: 11 / 24 columnas (Equivalente exacto a 5.5 / 12) */}
          <div className="lg:col-span-11 flex flex-col gap-4">
            <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.16em] uppercase text-[#9A968C]">
              <span className="w-8 h-px bg-[#FF9E1B]" />
              <span>GEOSYS <span className="text-[#FF9E1B]">//</span> PLATAFORMA DE INTELIGENCIA TERRITORIAL – V4.2</span>
            </div>

            {/* TÍTULO */}
            <h1 className="text-5xl sm:text-6xl lg:text-6xl xl:text-[3.9rem] font-black uppercase tracking-tighter text-[#EDEAE3] leading-[0.96] font-sans">
              EL SISTEMA <br />
              OPERATIVO <br />
              DEL <br />
              <span 
                className="inline-block text-transparent"
                style={{
                  WebkitTextStroke: '1.5px #FF9E1B',
                  paintOrder: 'stroke fill'
                }}
              >
                OCCIDENTE
              </span><br />
              ANTIOQUEÑO.
            </h1>

            {/* PÁRRAFO */}
            <p className="text-base text-[#9A968C] max-w-lg leading-relaxed font-normal">
              Visión artificial entrenada en terreno, ingesta satelital masiva y analítica en tiempo real. Una sola plataforma para ver, entender y decidir sobre el territorio — desde el río Cauca hasta el Páramo del Sol.
            </p>

            {/* BOTONES */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#acceso"
                className="group inline-flex items-center gap-3 font-mono text-xs tracking-[0.14em] font-bold uppercase px-6 py-4 bg-[#FF9E1B] text-[#0A0A0B] hover:bg-[#EDEAE3] transition-all"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)'
                }}
              >
                SOLICITAR DEMO
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="#plataforma"
                className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] font-semibold uppercase px-6 py-4 border border-[rgba(237,234,227,0.3)] text-[#EDEAE3] hover:border-[#EDEAE3] hover:bg-[rgba(237,234,227,0.05)] transition-all"
              >
                EXPLORAR LA PLATAFORMA
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 border-t border-[rgba(237,234,227,0.11)] font-mono text-[10.5px] tracking-[0.1em] text-[#5E5B52]">
              <span>SOPETRAN <b className="text-[#9A968C] font-normal">6.5506°N · 75.8281°W</b></span>
              <span>ELEV <b className="text-[#9A968C] font-normal">550 MSNM</b></span>
            </div>
          </div>

          {/* COLUMNA DERECHA: 13 / 24 columnas (Equivalente exacto a 6.5 / 12) */}
          <div className="lg:col-span-13 w-full">
            <div className="relative border border-[rgba(237,234,227,0.11)] bg-[#0B0B0D]">
              <span className="absolute -top-px -left-px w-3.5 h-3.5 border-t border-l border-[#FF9E1B] pointer-events-none" />
              <span className="absolute -top-px -right-px w-3.5 h-3.5 border-t border-r border-[#FF9E1B] pointer-events-none" />
              <span className="absolute -bottom-px -left-px w-3.5 h-3.5 border-b border-l border-[#FF9E1B] pointer-events-none" />
              <span className="absolute -bottom-px -right-px w-3.5 h-3.5 border-b border-r border-[#FF9E1B] pointer-events-none" />

              {/* Header Superior */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 border-b border-[rgba(237,234,227,0.11)] font-mono text-[10.5px] tracking-[0.1em] text-[#9A968C]">
                <div className="flex items-center gap-2 text-[#EDEAE3]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9E1B] animate-pulse" />
                  <span>VISOR TÁCTICO OCC-01</span>
                </div>
                <div className="flex gap-1">
                  {layers.map((lyr) => (
                    <button
                      key={lyr}
                      onClick={() => setActiveLayer(lyr)}
                      className={`font-mono text-[10px] tracking-[0.12em] px-2 py-1 border transition-all ${
                        activeLayer === lyr
                          ? 'bg-[#FF9E1B] border-[#FF9E1B] text-[#0A0A0B] font-semibold'
                          : 'border-[rgba(237,234,227,0.11)] text-[#9A968C] hover:text-[#EDEAE3]'
                      }`}
                    >
                      {lyr}
                    </button>
                  ))}
                </div>
              </div>

              {/* GRID INTERNO: Radar vs Lista */}
              <div className="grid grid-cols-1 md:grid-cols-12 min-h-[440px]">
                
                {/* RADAR CON MAPA */}
                <div className="md:col-span-8 border-b md:border-b-0 md:border-r border-[rgba(237,234,227,0.11)] relative flex items-center justify-center bg-[#070708] overflow-hidden p-3 min-h-[420px]">
                  <svg
                    id="map"
                    viewBox="0 0 1000 920"
                    className="w-full h-full cursor-crosshair block select-none"
                  >
                    <defs>
                      <radialGradient id="radarSweep" cx="0%" cy="0%" r="100%">
                        <stop offset="0%" stopColor="#FF9E1B" stopOpacity="0.4" />
                        <stop offset="60%" stopColor="#FF9E1B" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#FF9E1B" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    <g stroke="rgba(237,234,227,0.04)" strokeWidth="1.2">
                      <line x1="0" y1="180" x2="1000" y2="180" />
                      <line x1="0" y1="360" x2="1000" y2="360" />
                      <line x1="0" y1="540" x2="1000" y2="540" />
                      <line x1="0" y1="720" x2="1000" y2="720" />
                      <line x1="200" y1="0" x2="200" y2="920" />
                      <line x1="400" y1="0" x2="400" y2="920" />
                      <line x1="600" y1="0" x2="600" y2="920" />
                      <line x1="800" y1="0" x2="800" y2="920" />
                    </g>

                    <g fill="#4A473E" fontSize="11" fontFamily="monospace">
                      <text x="10" y="110">-76.35°W</text>
                      <text x="10" y="310">-76.25°W</text>
                      <text x="10" y="510">-76.15°W</text>
                      <text x="10" y="710">-76.05°W</text>
                    </g>

                    <path
                      d="M 50 180 Q 250 80, 500 120 T 920 220 T 850 620 T 580 890 T 250 820 T 50 500 Z"
                      fill="rgba(255,255,255,0.008)"
                      stroke="rgba(237,234,227,0.22)"
                      strokeWidth="2.9"
                    />

                    <path
                      d="M 120 190 Q 250 250, 410 350 T 560 490 T 600 540"
                      fill="none"
                      stroke="rgba(237,234,227,0.4)"
                      strokeDasharray="5 5"
                      strokeWidth="1.9"
                    />

                    <circle cx={cx} cy={cy} r={280} fill="none" stroke="rgba(237,234,227,0.08)" strokeDasharray="4 5" />
                    <circle cx={cx} cy={cy} r={440} fill="none" stroke="rgba(237,234,227,0.12)" />

                    <g transform={`rotate(${angle}, ${cx}, ${cy})`}>
                      <path d={radarSectorPath} fill="url(#radarSweep)" />
                      <line x1={cx} y1={cy} x2={x2} y2={y2} stroke="#FF9E1B" strokeWidth="8.8" strokeOpacity="0.8" />
                    </g>

                    <g fill="#7A776E" fontSize="18" fontFamily="monospace">
                      {NODOS_SECUNDARIOS.map((nodo, idx) => (
                        <g key={idx}>
                          <circle cx={nodo.cx} cy={nodo.cy} r="2.5" fill="#8E8B82" />
                          <text x={nodo.cx + 7} y={nodo.cy + 3}>{nodo.nombre}</text>
                        </g>
                      ))}
                    </g>

                    <g fontFamily="monospace">
                      {EVENTOS_INICIALES.map((muni) => {
                        const isHighlighted = muni.id === eventoDestacado.id;

                        return (
                          <g key={muni.id}>
                            {isHighlighted && (
                              <circle
                                cx={muni.cx}
                                cy={muni.cy}
                                r={15}
                                fill="none"
                                stroke="#FF9E1B"
                                strokeWidth="2.6"
                                className="animate-ping origin-center opacity-75"
                              />
                            )}
                            <circle
                              cx={muni.cx}
                              cy={muni.cy}
                              r={isHighlighted ? 9 : 7}
                              fill={isHighlighted ? '#FF9E1B' : '#EDEAE3'}
                            />
                            <text
                              x={muni.cx + 10}
                              y={muni.cy + 4}
                              fill={isHighlighted ? '#FF9E1B' : '#EDEAE3'}
                              fontSize={isHighlighted ? '20' : '19'}
                              fontWeight="bold"
                            >
                              {muni.municipio}
                            </text>
                          </g>
                        );
                      })}
                    </g>
                  </svg>
                </div>

                {/* LISTA DE EVENTOS */}
                <div className="md:col-span-4 flex flex-col bg-[#0B0B0D]">
                  <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-[rgba(237,234,227,0.11)] font-mono text-[10.5px] tracking-[0.12em] text-[#9A968C]">
                    <span>REGISTRO DE EVENTOS</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[#FF9E1B]">009</span>
                      <span className="flex items-center gap-1 text-[#55C97C]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#55C97C] animate-pulse" />
                        EN VIVO
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 max-h-[420px] overflow-y-auto divide-y divide-[rgba(237,234,227,0.08)]">
                    {eventosFiltrados.map((item) => {
                      const isHighlighted = item.id === highlightedId;

                      return (
                        <div
                          key={item.id}
                          className={`p-3.5 font-mono flex flex-col gap-1 transition-all duration-500 ${
                            isHighlighted
                              ? 'bg-[#2A1E05] border-l-2 border-[#FF9E1B]'
                              : 'bg-transparent'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[#FF9E1B] font-bold">{item.tiempo}</span>
                            <span className="text-[9px] px-1.5 py-0.5 border border-[rgba(237,234,227,0.2)] text-[#9A968C]">
                              {item.categoria}
                            </span>
                          </div>

                          <h4 className="text-sm font-extrabold text-[#EDEAE3] uppercase tracking-wide">
                            {item.municipio}
                          </h4>

                          <p className="text-xs text-[#9A968C] uppercase tracking-wider font-semibold">
                            {item.titulo}
                          </p>

                          <span className="text-[11px] text-[#7A776E]">
                            {item.detalle} · {item.subtexto}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Footer Inferior */}
              <div className="px-4 py-3 border-t border-[rgba(237,234,227,0.11)] font-mono text-[11px] tracking-[0.12em] text-[#5E5B52] flex items-center gap-2.5">
                <span className="w-2 h-2 border border-[#FF9E1B] rotate-45 inline-block" />
                <span>SELECCIONA UN NODO PARA VER SU FICHA — 26 NODOS EN LÍNEA</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}