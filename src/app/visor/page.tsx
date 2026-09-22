'use client';

import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { 
  Activity, 
  Radio, 
  Compass, 
  Maximize2, 
  ChevronRight,
  ShieldAlert,
  ArrowUpRight,
  MapPin,
  X,
  Cpu,
  TrendingUp,
  Download,
  Share2,
  CheckCircle2,
  FileText,
  SlidersHorizontal
} from 'lucide-react';

interface AlertaTerritorial {
  id: string;
  tiempo: string;
  modulo: 'COMERCIO' | 'VIAS' | 'AGRO' | 'HIDRO';
  municipio: string;
  titulo: string;
  descripcion: string;
  nivel: 'CRITICO' | 'ALERTA' | 'INFO';
  lng: number;
  lat: number;
}

const ALERTAS_INICIALES: AlertaTerritorial[] = [
  {
    id: 'ALT-101',
    tiempo: 'HACE 2 MIN',
    modulo: 'VIAS',
    municipio: 'SANTA FE DE ANTIOQUIA',
    titulo: 'PICO DE CONGESTIÓN - TÚNEL DE OCCIDENTE',
    descripcion: 'Aumento del +38% en flujo vehicular sentido Medellín-Santa Fe.',
    nivel: 'ALERTA',
    lng: -75.8281,
    lat: 6.5562
  },
  {
    id: 'ALT-102',
    tiempo: 'HACE 5 MIN',
    modulo: 'HIDRO',
    municipio: 'SOPETRÁN',
    titulo: 'ALERTA DE TURBIDEZ - RÍO CAUCA',
    descripcion: 'Sensor N3 detecta incremento de +24 NTU tras lluvias en cabecera.',
    nivel: 'CRITICO',
    lng: -75.7500,
    lat: 6.5000
  },
  {
    id: 'ALT-103',
    tiempo: 'HACE 12 MIN',
    modulo: 'COMERCIO',
    municipio: 'SAN JERÓNIMO',
    titulo: 'AFLUENCIA TURÍSTICA EN AUMENTO',
    descripcion: 'Proyección de ocupación gastronómica al 85% para fin de semana.',
    nivel: 'INFO',
    lng: -75.7286,
    lat: 6.4433
  },
  {
    id: 'ALT-104',
    tiempo: 'HACE 25 MIN',
    modulo: 'AGRO',
    municipio: 'BURITICÁ',
    titulo: 'MONITOREO NDVI DE CULTIVOS',
    descripcion: 'Estrés hídrico leve detectado en 12 ha del sector Higabra.',
    nivel: 'ALERTA',
    lng: -75.9088,
    lat: 6.7141
  }
];

const COLOR_CAPA = {
  COMERCIO: '#FF9E1B',
  VIAS: '#3B82F6',
  AGRO: '#22C55E',
  HIDRO: '#06B6D4'
};

/* =========================================================================
   COMPONENTE: MODAL DE INFORME COMPLETO (DESPLEGABLE / BOTTOM SHEET EN MÓVIL)
   ========================================================================= */
function InformeModal({ alerta, onClose }: { alerta: AlertaTerritorial | null; onClose: () => void }) {
  if (!alerta) return null;

  const isCritico = alerta.nivel === 'CRITICO';

  return (
    <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-end bg-[#0A0A0B]/80 backdrop-blur-md transition-all">
      
      {/* Fondo clickeable */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* PANEL / BOTTOM SHEET */}
      <div className="relative w-full lg:max-w-2xl h-[90vh] lg:h-full bg-[#070708] border-t lg:border-t-0 lg:border-l border-[rgba(237,234,227,0.15)] text-[#EDEAE3] shadow-2xl flex flex-col z-10 overflow-hidden font-sans rounded-t-2xl lg:rounded-none">
        
        {/* Barra táctil para deslizar en móviles */}
        <div className="w-12 h-1 bg-[rgba(237,234,227,0.2)] rounded-full mx-auto my-2 lg:hidden" />

        {/* RETÍCULA DE FONDO TÁCTICA */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(237,234,227,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(237,234,227,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

        {/* HEADER DEL INFORME */}
        <div className="p-4 sm:p-6 border-b border-[rgba(237,234,227,0.11)] bg-[#0A0A0B] flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded border ${
              isCritico 
                ? 'bg-red-950/80 border-red-800 text-red-400' 
                : 'bg-amber-950/80 border-amber-800 text-amber-400'
            }`}>
              <ShieldAlert size={20} />
            </div>
            <div>
              <div className="font-mono text-[9px] sm:text-[10px] text-[#FF9E1B] tracking-widest uppercase">
                INFORME TÁCTICO // {alerta.id}
              </div>
              <h2 className="font-extrabold text-sm sm:text-lg tracking-wide uppercase text-[#EDEAE3] line-clamp-1">
                {alerta.titulo}
              </h2>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-[#9A968C] hover:text-[#EDEAE3] hover:bg-[rgba(237,234,227,0.08)] transition-all border border-[rgba(237,234,227,0.11)] rounded"
          >
            <X size={18} />
          </button>
        </div>

        {/* CUERPO PRINCIPAL DEL INFORME */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 relative z-10 font-sans">
          
          {/* METADATOS RÁPIDOS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            <div className="p-2.5 sm:p-3 bg-[#0B0B0D] border border-[rgba(237,234,227,0.08)]">
              <span className="block font-mono text-[9px] text-[#7A776E] uppercase">Ubicación</span>
              <span className="font-mono text-xs font-bold text-[#EDEAE3] flex items-center gap-1 mt-0.5 truncate">
                <MapPin size={12} className="text-[#FF9E1B] shrink-0" /> {alerta.municipio}
              </span>
            </div>

            <div className="p-2.5 sm:p-3 bg-[#0B0B0D] border border-[rgba(237,234,227,0.08)]">
              <span className="block font-mono text-[9px] text-[#7A776E] uppercase">Coordenadas</span>
              <span className="font-mono text-xs font-bold text-[#EDEAE3] mt-0.5 block truncate">
                {alerta.lat}° N, {Math.abs(alerta.lng)}° W
              </span>
            </div>

            <div className="p-2.5 sm:p-3 bg-[#0B0B0D] border border-[rgba(237,234,227,0.08)]">
              <span className="block font-mono text-[9px] text-[#7A776E] uppercase">Módulo</span>
              <span className="font-mono text-xs font-bold text-[#FF9E1B] mt-0.5 block">
                {alerta.modulo}
              </span>
            </div>

            <div className="p-2.5 sm:p-3 bg-[#0B0B0D] border border-[rgba(237,234,227,0.08)]">
              <span className="block font-mono text-[9px] text-[#7A776E] uppercase">Nivel Alerta</span>
              <span className={`font-mono text-xs font-bold mt-0.5 block ${isCritico ? 'text-red-400' : 'text-amber-400'}`}>
                {alerta.nivel}
              </span>
            </div>
          </div>

          {/* DIAGNÓSTICO DETALLADO */}
          <div className="p-3.5 sm:p-4 bg-[#0B0B0D] border border-[rgba(237,234,227,0.11)] space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#FF9E1B]">
              <Activity size={16} />
              <span>DIAGNÓSTICO Y TELEMETRÍA</span>
            </div>
            <p className="text-xs sm:text-sm text-[#9A968C] leading-relaxed">
              {alerta.descripcion} Se registran variaciones atípicas en los sensores instalados en el municipio de {alerta.municipio}. Los algoritmos predictivos estiman una persistencia de la anomalía durante las próximas 4 a 6 horas si no se toman medidas preventivas.
            </p>
          </div>

          {/* METRICAS Y TELEMETRÍA AVANZADA */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#EDEAE3]">
              <Cpu size={16} className="text-[#FF9E1B]" />
              <span>SENSORES Y MODELO IA</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div className="p-3 bg-[#0A0A0B] border border-[rgba(237,234,227,0.08)] flex justify-between items-center">
                <div>
                  <span className="block font-mono text-[10px] text-[#7A776E]">Precisión del Modelo</span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#55C97C]">96.4% Accuracy</span>
                </div>
                <CheckCircle2 size={18} className="text-[#55C97C]" />
              </div>

              <div className="p-3 bg-[#0A0A0B] border border-[rgba(237,234,227,0.08)] flex justify-between items-center">
                <div>
                  <span className="block font-mono text-[10px] text-[#7A776E]">Fuente de Datos</span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#EDEAE3]">IoT + Satélite LiDAR</span>
                </div>
                <FileText size={18} className="text-[#9A968C]" />
              </div>
            </div>
          </div>

          {/* RECOMENDACIÓN ACCIONABLE / PROTOCOLO */}
          <div className="p-3.5 sm:p-4 bg-[#141311] border-l-4 border-[#FF9E1B] space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#FF9E1B]">
              <TrendingUp size={16} />
              <span>PROTOCOLO SUGERIDO DE REACCIÓN</span>
            </div>
            <ul className="text-xs text-[#9A968C] space-y-1.5 list-disc list-inside font-mono">
              <li>Notificar a la Secretaría de Infraestructura / Gestión del Riesgo local.</li>
              <li>Activar desvíos preventivos o cuadrillas de inspección técnica en sitio.</li>
              <li>Ajustar parámetros de predicción comercial para el próximo fin de semana.</li>
            </ul>
          </div>

        </div>

        {/* FOOTER CON ACCIONES */}
        <div className="p-3.5 sm:p-4 border-t border-[rgba(237,234,227,0.11)] bg-[#0A0A0B] flex items-center justify-between gap-2 relative z-10">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => alert('Descargando PDF del informe táctico...')}
              className="px-3 py-2 bg-[#141311] border border-[rgba(237,234,227,0.15)] text-[#EDEAE3] font-mono text-xs font-bold hover:bg-[rgba(237,234,227,0.08)] transition-all flex items-center gap-2"
            >
              <Download size={14} /> <span className="hidden sm:inline">EXPORTAR</span> PDF
            </button>
            <button 
              onClick={() => alert('Enlace del informe copiado')}
              className="p-2 bg-[#141311] border border-[rgba(237,234,227,0.15)] text-[#9A968C] hover:text-[#EDEAE3] transition-all"
              title="Compartir Informe"
            >
              <Share2 size={14} />
            </button>
          </div>

          <button 
            onClick={onClose}
            className="px-4 sm:px-5 py-2 bg-[#FF9E1B] text-[#0A0A0B] font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#EDEAE3] transition-all"
          >
            CERRAR
          </button>
        </div>

      </div>
    </div>
  );
}

/* =========================================================================
   PÁGINA PRINCIPAL: VISOR TÁCTICO RESPONSIVO
   ========================================================================= */
export default function VisorTacticoPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});
  
  // ESTADOS
  const [modalAbierto, setModalAbierto] = useState(false);
  const [capaActiva, setCapaActiva] = useState<string>('TODAS');
  const [alertaSeleccionada, setAlertaSeleccionada] = useState<AlertaTerritorial | null>(ALERTAS_INICIALES[0]);
  const [coordsCursor, setCoordsCursor] = useState({ lat: '6.5562° N', lng: '75.8281° W' });
  const [horaLocal, setHoraLocal] = useState('');

  // 1. Reloj en tiempo real
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setHoraLocal(now.toLocaleTimeString('es-CO', { hour12: false }));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Inicialización de Mapbox
  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-75.8281, 6.5562],
      zoom: 10,
      pitch: 45,
      bearing: -10,
    });

    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl({ showCompass: true, showZoom: true }), 'top-left');

    map.on('mousemove', (e) => {
      setCoordsCursor({
        lat: `${e.lngLat.lat.toFixed(4)}° N`,
        lng: `${Math.abs(e.lngLat.lng).toFixed(4)}° W`
      });
    });

    // Forzar ajuste del mapa al cambiar tamaño de pantalla
    const handleResize = () => map.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      map.remove();
    };
  }, []);

  // 3. Renderizado y filtrado de marcadores
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    const alertasFiltradas = ALERTAS_INICIALES.filter(
      (item) => capaActiva === 'TODAS' || item.modulo === capaActiva
    );

    alertasFiltradas.forEach((alerta) => {
      const isSelected = alertaSeleccionada?.id === alerta.id;
      const colorHex = COLOR_CAPA[alerta.modulo];

      const el = document.createElement('div');
      el.className = 'custom-tactical-marker cursor-pointer group';
      el.innerHTML = `
        <div style="position: relative; display: flex; align-items: center; justify-content: center;">
          <div style="
            width: ${isSelected ? '24px' : '18px'}; 
            height: ${isSelected ? '24px' : '18px'}; 
            background-color: ${colorHex}; 
            border: 2px solid #0A0A0B;
            border-radius: 50%;
            box-shadow: 0 0 12px ${colorHex};
            transition: all 0.3s ease;
          "></div>
          ${isSelected ? `
            <div style="
              position: absolute;
              width: 38px;
              height: 38px;
              border: 1px solid ${colorHex};
              border-radius: 50%;
              animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
            "></div>
          ` : ''}
        </div>
      `;

      el.addEventListener('click', () => {
        setAlertaSeleccionada(alerta);
        map.flyTo({
          center: [alerta.lng, alerta.lat],
          zoom: 12,
          duration: 1500,
          essential: true
        });
      });

      const marker = new mapboxgl.Marker(el)
        .setLngLat([alerta.lng, alerta.lat])
        .addTo(map);

      markersRef.current[alerta.id] = marker;
    });
  }, [capaActiva, alertaSeleccionada]);

  const handleSelectAlerta = (alerta: AlertaTerritorial) => {
    setAlertaSeleccionada(alerta);
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [alerta.lng, alerta.lat],
        zoom: 12,
        duration: 1500,
        essential: true
      });
    }
  };

  const alertasFiltradas = ALERTAS_INICIALES.filter(
    (item) => capaActiva === 'TODAS' || item.modulo === capaActiva
  );

  return (
    <div className="w-full min-h-screen bg-[#0A0A0B] text-[#EDEAE3] font-sans flex flex-col overflow-x-hidden">
      
      {/* 1. BARRA SUPERIOR TÁCTICA */}
      <header className="w-full border-b border-[rgba(237,234,227,0.11)] bg-[#070708] px-3 sm:px-4 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3 z-20">
        <div className="flex items-center justify-between md:justify-start gap-3">
          <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-[#FF9E1B]">
            <span className="w-2 h-2 rounded-full bg-[#FF9E1B] animate-pulse" />
            <span className="font-bold text-[11px] sm:text-xs">GEOSYS // VISOR TÁCTICO v4.2</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-[#9A968C] md:hidden">
            <Radio size={12} className="text-[#55C97C] animate-pulse" />
            <span className="text-[#EDEAE3]">{horaLocal || '12:00:00'}</span>
          </div>
        </div>

        {/* SELECTOR DE CAPAS CON SCROLL HORIZONTAL EN MÓVIL */}
        <div className="flex items-center gap-1 bg-[#0A0A0B] p-1 border border-[rgba(237,234,227,0.11)] overflow-x-auto no-scrollbar max-w-full">
          {['TODAS', 'COMERCIO', 'VIAS', 'AGRO', 'HIDRO'].map((capa) => (
            <button
              key={capa}
              onClick={() => setCapaActiva(capa)}
              className={`px-2.5 py-1 font-mono text-[9px] sm:text-[10px] tracking-wider transition-all uppercase whitespace-nowrap ${
                capaActiva === capa
                  ? 'bg-[#FF9E1B] text-[#0A0A0B] font-bold'
                  : 'text-[#9A968C] hover:text-[#EDEAE3] hover:bg-[rgba(237,234,227,0.05)]'
              }`}
            >
              {capa}
            </button>
          ))}
        </div>

        {/* TELEMETRÍA Y COORDENADAS (SOLO DESKTOP) */}
        <div className="hidden md:flex items-center gap-4 font-mono text-[11px] text-[#9A968C]">
          <div className="flex items-center gap-2 border-r border-[rgba(237,234,227,0.11)] pr-4">
            <Compass size={14} className="text-[#FF9E1B]" />
            <span>{coordsCursor.lat}</span>
            <span>{coordsCursor.lng}</span>
          </div>
          <div className="flex items-center gap-2">
            <Radio size={14} className="text-[#55C97C] animate-pulse" />
            <span className="text-[#EDEAE3]">{horaLocal || '12:00:00'} COT</span>
          </div>
        </div>
      </header>

      {/* 2. ÁREA PRINCIPAL DE TRABAJO */}
      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 relative min-h-[calc(100vh-60px)]">
        
        {/* CONTENEDOR DEL MAPA (55vh en móvil, 8 Cols en Desktop) */}
        <div className="w-full h-[55vh] lg:h-auto lg:col-span-8 bg-[#050506] relative flex flex-col justify-between p-3 sm:p-4 overflow-hidden border-b lg:border-b-0 lg:border-r border-[rgba(237,234,227,0.11)] select-none">
          
          <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />

          {/* RETÍCULA TÁCTICA SOBRE EL MAPA */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(237,234,227,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(237,234,227,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-10" />

          {/* MARCADORES DE ESQUINA */}
          <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#FF9E1B] pointer-events-none z-10" />
          <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#FF9E1B] pointer-events-none z-10" />
          <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#FF9E1B] pointer-events-none z-10" />
          <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#FF9E1B] pointer-events-none z-10" />

          {/* WIDGET SUPERIOR SOBRE EL MAPA */}
          <div className="relative z-10 flex items-center justify-between gap-2 pointer-events-auto">
            <div className="bg-[#0B0B0D]/90 border border-[rgba(237,234,227,0.11)] px-2.5 py-1 font-mono text-[9px] sm:text-[11px] tracking-wider text-[#EDEAE3] flex items-center gap-2 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#55C97C]" />
              <span className="truncate">13 MUNICIPIOS MONITOREADOS</span>
            </div>

            <button 
              onClick={() => {
                if (mapRef.current) {
                  mapRef.current.flyTo({ center: [-75.8281, 6.5562], zoom: 10, pitch: 45 });
                }
              }}
              className="p-1.5 bg-[#0B0B0D]/90 border border-[rgba(237,234,227,0.11)] text-[#9A968C] hover:text-[#EDEAE3] backdrop-blur-sm transition-all"
              title="Restablecer Vista"
            >
              <Maximize2 size={14} />
            </button>
          </div>

          {/* LEYENDA DEL MAPA */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 bg-[#0B0B0D]/90 border border-[rgba(237,234,227,0.11)] p-2 sm:p-3 backdrop-blur-sm pointer-events-auto">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[9px] sm:text-[10px] text-[#9A968C]">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#FF9E1B]" /> COMERCIO
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#3B82F6]" /> VÍAS
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" /> AGRO
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#06B6D4]" /> HIDRÓ.
              </span>
            </div>

            <div className="font-mono text-[9px] text-[#7A776E] hidden sm:block">
              {coordsCursor.lat} {coordsCursor.lng}
            </div>
          </div>
        </div>

        {/* SIDEBAR DE ALERTAS (Abajo en Móvil / Derecha en Desktop) */}
        <div className="flex-1 lg:col-span-4 bg-[#0B0B0D] flex flex-col border-t lg:border-t-0 border-[rgba(237,234,227,0.11)] z-10">
          
          {/* HEADER DEL PANEL */}
          <div className="p-3 sm:p-4 border-b border-[rgba(237,234,227,0.11)] flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-[#EDEAE3] font-bold">
              <ShieldAlert size={16} className="text-[#FF9E1B]" />
              <span>TELEMETRÍA EN VIVO</span>
            </div>
            <span className="font-mono text-[10px] bg-[#2A1E05] text-[#FF9E1B] px-2 py-0.5 border border-[#FF9E1B]/30 font-bold">
              {alertasFiltradas.length} EVENTOS
            </span>
          </div>

          {/* LISTA DE ALERTAS */}
          <div className="flex-1 overflow-y-auto divide-y divide-[rgba(237,234,227,0.08)]">
            {alertasFiltradas.map((alerta) => {
              const isSelected = alertaSeleccionada?.id === alerta.id;
              return (
                <div
                  key={alerta.id}
                  onClick={() => handleSelectAlerta(alerta)}
                  className={`p-3 sm:p-4 cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-[#141311] border-l-4 border-[#FF9E1B]' 
                      : 'hover:bg-[#0E0E10] border-l-4 border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1 font-mono text-[10px]">
                    <span className="text-[#FF9E1B] font-bold tracking-wider">{alerta.tiempo}</span>
                    <span className={`px-1.5 py-0.5 font-semibold ${
                      alerta.nivel === 'CRITICO' 
                        ? 'bg-red-950/80 text-red-400 border border-red-800/50' 
                        : alerta.nivel === 'ALERTA'
                        ? 'bg-amber-950/80 text-amber-400 border border-amber-800/50'
                        : 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50'
                    }`}>
                      {alerta.nivel}
                    </span>
                  </div>

                  <h4 className="font-sans text-xs font-extrabold text-[#EDEAE3] uppercase tracking-wide mb-1 flex items-center gap-1.5">
                    <MapPin size={12} className="text-[#9A968C]" />
                    {alerta.municipio}
                  </h4>

                  <p className="font-sans text-xs text-[#9A968C] font-semibold mb-1.5">
                    {alerta.titulo}
                  </p>

                  <p className="font-mono text-[10px] sm:text-[11px] text-[#7A776E] line-clamp-2 leading-relaxed">
                    {alerta.descripcion}
                  </p>

                  <div className="mt-2 pt-2 border-t border-[rgba(237,234,227,0.05)] flex items-center justify-between font-mono text-[10px] text-[#5E5B52]">
                    <span>{alerta.lat}° N, {Math.abs(alerta.lng)}° W</span>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setAlertaSeleccionada(alerta);
                        setModalAbierto(true);
                      }}
                      className="p-1 hover:text-[#FF9E1B] transition-colors"
                      title="Ver Informe Completo"
                    >
                      <ChevronRight size={16} className={isSelected ? 'text-[#FF9E1B]' : 'text-[#5E5B52]'} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FICHA DETALLADA Y BOTÓN DESPLEGABLE */}
          {alertaSeleccionada && (
            <div className="p-3 sm:p-4 border-t border-[rgba(237,234,227,0.11)] bg-[#070708]">
              <div className="font-mono text-[10px] text-[#FF9E1B] tracking-widest uppercase mb-2 flex items-center justify-between">
                <span>FICHA SELECCIONADA</span>
                <span>ID: {alertaSeleccionada.id}</span>
              </div>

              <button 
                onClick={() => setModalAbierto(true)}
                className="w-full py-2.5 bg-[#FF9E1B] text-[#0A0A0B] font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#EDEAE3] transition-all flex items-center justify-center gap-2"
              >
                <span>DESPLEGAR INFORME COMPLETO</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          )}

        </div>

      </div>

      {/* MODAL / DRAWER LATERAL DESPLEGABLE */}
      <InformeModal 
        alerta={modalAbierto ? alertaSeleccionada : null} 
        onClose={() => setModalAbierto(false)} 
      />

    </div>
  );
}