'use client';

import React from 'react';
import { 
  X, 
  ShieldAlert, 
  MapPin, 
  Activity, 
  Cpu, 
  TrendingUp, 
  Download, 
  Share2, 
  ExternalLink,
  CheckCircle2,
  FileText
} from 'lucide-react';

export interface AlertaTerritorial {
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

interface InformeModalProps {
  alerta: AlertaTerritorial | null;
  onClose: () => void;
}

export function InformeModal({ alerta, onClose }: InformeModalProps) {
  if (!alerta) return null;

  const isCritico = alerta.nivel === 'CRITICO';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-[#0A0A0B]/80 backdrop-blur-md transition-opacity">
      
      {/* Fondo clickeable para cerrar */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* PANEL LATERAL DE INFORME TÁCTICO */}
      <div className="relative w-full max-w-2xl h-full bg-[#070708] border-l border-[rgba(237,234,227,0.15)] text-[#EDEAE3] shadow-2xl flex flex-col z-10 overflow-hidden font-sans">
        
        {/* RETÍCULA DE FONDO TÁCTICA */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(237,234,227,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(237,234,227,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

        {/* HEADER DEL INFORME */}
        <div className="p-6 border-b border-[rgba(237,234,227,0.11)] bg-[#0A0A0B] flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded border ${
              isCritico 
                ? 'bg-red-950/80 border-red-800 text-red-400' 
                : 'bg-amber-950/80 border-amber-800 text-amber-400'
            }`}>
              <ShieldAlert size={20} />
            </div>
            <div>
              <div className="font-mono text-[10px] text-[#FF9E1B] tracking-widest uppercase">
                INFORME TÁCTICO DE CAMPO // ID: {alerta.id}
              </div>
              <h2 className="font-extrabold text-base sm:text-lg tracking-wide uppercase text-[#EDEAE3]">
                {alerta.titulo}
              </h2>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-[#9A968C] hover:text-[#EDEAE3] hover:bg-[rgba(237,234,227,0.08)] transition-all border border-[rgba(237,234,227,0.11)]"
          >
            <X size={18} />
          </button>
        </div>

        {/* CUERPO PRINCIPAL DEL INFORME */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10 font-sans">
          
          {/* METADATOS RÁPIDOS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-[#0B0B0D] border border-[rgba(237,234,227,0.08)]">
              <span className="block font-mono text-[9px] text-[#7A776E] uppercase">Ubicación</span>
              <span className="font-mono text-xs font-bold text-[#EDEAE3] flex items-center gap-1 mt-0.5">
                <MapPin size={12} className="text-[#FF9E1B]" /> {alerta.municipio}
              </span>
            </div>

            <div className="p-3 bg-[#0B0B0D] border border-[rgba(237,234,227,0.08)]">
              <span className="block font-mono text-[9px] text-[#7A776E] uppercase">Coordenadas</span>
              <span className="font-mono text-xs font-bold text-[#EDEAE3] mt-0.5 block">
                {alerta.lat}° N, {Math.abs(alerta.lng)}° W
              </span>
            </div>

            <div className="p-3 bg-[#0B0B0D] border border-[rgba(237,234,227,0.08)]">
              <span className="block font-mono text-[9px] text-[#7A776E] uppercase">Módulo</span>
              <span className="font-mono text-xs font-bold text-[#FF9E1B] mt-0.5 block">
                {alerta.modulo}
              </span>
            </div>

            <div className="p-3 bg-[#0B0B0D] border border-[rgba(237,234,227,0.08)]">
              <span className="block font-mono text-[9px] text-[#7A776E] uppercase">Nivel Alerta</span>
              <span className={`font-mono text-xs font-bold mt-0.5 block ${isCritico ? 'text-red-400' : 'text-amber-400'}`}>
                {alerta.nivel}
              </span>
            </div>
          </div>

          {/* DIAGNÓSTICO DETALLADO */}
          <div className="p-4 bg-[#0B0B0D] border border-[rgba(237,234,227,0.11)] space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#FF9E1B]">
              <Activity size={16} />
              <span>DIAGNÓSTICO Y ANÁLISIS DE TELEMETRÍA</span>
            </div>
            <p className="text-sm text-[#9A968C] leading-relaxed">
              {alerta.descripcion} Se registran variaciones atípicas en los sensores instalados en el municipio de {alerta.municipio}. Los algoritmos predictivos estiman una persistencia de la anomalía durante las próximas 4 a 6 horas si no se toman medidas preventivas.
            </p>
          </div>

          {/* METRICAS Y TELEMETRÍA AVANZADA */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#EDEAE3]">
              <Cpu size={16} className="text-[#FF9E1B]" />
              <span>SENSORES Y MODELO IA APLICADO</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-[#0A0A0B] border border-[rgba(237,234,227,0.08)] flex justify-between items-center">
                <div>
                  <span className="block font-mono text-[10px] text-[#7A776E]">Precisión del Modelo</span>
                  <span className="font-mono text-sm font-bold text-[#55C97C]">96.4% Accuracy</span>
                </div>
                <CheckCircle2 size={18} className="text-[#55C97C]" />
              </div>

              <div className="p-3 bg-[#0A0A0B] border border-[rgba(237,234,227,0.08)] flex justify-between items-center">
                <div>
                  <span className="block font-mono text-[10px] text-[#7A776E]">Fuente de Datos</span>
                  <span className="font-mono text-sm font-bold text-[#EDEAE3]">IoT + Satélite LiDAR</span>
                </div>
                <FileText size={18} className="text-[#9A968C]" />
              </div>
            </div>
          </div>

          {/* RECOMENDACIÓN ACCIONABLE / PROTOCOLO */}
          <div className="p-4 bg-[#141311] border-l-4 border-[#FF9E1B] space-y-2">
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
        <div className="p-4 border-t border-[rgba(237,234,227,0.11)] bg-[#0A0A0B] flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => alert('Descargando PDF del informe táctico...')}
              className="px-3 py-2 bg-[#141311] border border-[rgba(237,234,227,0.15)] text-[#EDEAE3] font-mono text-xs font-bold hover:bg-[rgba(237,234,227,0.08)] transition-all flex items-center gap-2"
            >
              <Download size={14} /> EXPORTAR PDF
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
            className="px-5 py-2 bg-[#FF9E1B] text-[#0A0A0B] font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#EDEAE3] transition-all"
          >
            CERRAR INFORME
          </button>
        </div>

      </div>
    </div>
  );
}