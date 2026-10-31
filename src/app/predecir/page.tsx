
"use client";
import { useState, useEffect } from "react";
const API_URL = "http://127.0.0.1:8000";

export default function ModuloTuristico() {
  const [fecha, setFecha] = useState("2026-11-04");
  const [form, setForm] = useState({ anio: 2026, mes: 11, festivos: 2, temporada: 1 });
  const [modo, setModo] = useState<"diario"|"mensual">("diario");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [hora, setHora] = useState("");

  useEffect(() => {
    setHora(new Date().toLocaleTimeString());
    const i = setInterval(() => setHora(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(i);
  }, []);

  const predecir = async () => {
    setLoading(true);
    try {
      const res = await fetch(modo==="diario" ? `${API_URL}/predecir-diario?fecha=${fecha}` : `${API_URL}/predecir`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: modo==="mensual" ? JSON.stringify({ anio: form.anio, mes: form.mes, cant_festivos_mes: form.festivos, temporada_alta: form.temporada }) : undefined,
      });
      setData(await res.json());
    } catch(e){ alert("Prende FastAPI puerto 8000"); }
    setLoading(false);
  };

  useEffect(()=>{ predecir(); }, []);

  const diario = data?.resumen_diario_real || data?.resumen_fin_semana;
  const maxVal = diario ? Math.max(diario.santa_fe||1, diario.san_jeronimo||1, diario.sopetran||1) : 1;

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Anton&display=swap'); .font-display{font-family:'Anton',sans-serif} .font-mono{font-family:'JetBrains Mono',monospace} .grid-bg{background-image:linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);background-size:40px 40px}`}</style>
      
      <header className="h-[64px] border-b border-white/10 flex items-center justify-between px-6 bg-black">
        <div className="flex items-center gap-10">
          <div className="font-mono font-bold text-sm tracking-widest">GEOSYS</div>
          <nav className="hidden md:flex gap-6 font-mono text-[11px] tracking-[0.2em] text-white/50"><span className="text-white">VISOR</span></nav>
        </div>
        <span className="font-mono text-[10px] text-white/40">{hora}</span>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] min-h-[calc(100vh-64px)]">
        <div className="relative p-6 md:p-10 grid-bg border-r border-white/10">
          <h1 className="font-display text-[54px] md:text-[68px] leading-[0.9] uppercase"><span className="text-white">PREDICCION</span><br /><span className="text-[#FF9F0A]">DE FLUJO</span><br /><span className="text-white">TURISTICO.</span></h1>
          
          <div className="mt-6 flex gap-2 font-mono text-[11px]">
            <button onClick={()=>setModo("diario")} className={`px-4 py-2 border ${modo==="diario"?"bg-[#FF9F0A] text-black border-[#FF9F0A]":"border-white/20 text-white/60"}`}>DIARIO - FECHA EXACTA</button>
            <button onClick={()=>setModo("mensual")} className={`px-4 py-2 border ${modo==="mensual"?"bg-[#FF9F0A] text-black border-[#FF9F0A]":"border-white/20 text-white/60"}`}>MENSUAL - PUENTE</button>
          </div>

          <div className="mt-4 border border-white/10 bg-[#111]/80 backdrop-blur p-5">
            {modo==="diario" ? (
              <div className="bg-black border border-white/10 p-3">
                <label className="font-mono text-[9px] text-white/40 block mb-2">FECHA - PRUEBA 04/11/2026 MIERCOLES</label>
                <input type="date" value={fecha} onChange={(e)=>setFecha(e.target.value)} className="w-full bg-transparent font-mono text-sm text-white outline-none" />
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-3">
                <input type="number" value={form.anio} onChange={(e)=>setForm({...form, anio:+e.target.value})} className="bg-black border border-white/10 p-3 font-mono text-sm" />
                <input type="number" value={form.mes} onChange={(e)=>setForm({...form, mes:+e.target.value})} className="bg-black border border-white/10 p-3 font-mono text-sm" />
                <input type="number" value={form.festivos} onChange={(e)=>setForm({...form, festivos:+e.target.value})} className="bg-black border border-white/10 p-3 font-mono text-sm" />
                <select value={form.temporada} onChange={(e)=>setForm({...form, temporada:+e.target.value})} className="bg-black border border-white/10 p-3 font-mono text-sm"><option value={1}>TEMP ALTA</option><option value={0}>TEMP BAJA</option></select>
              </div>
            )}
            <button onClick={predecir} disabled={loading} className="mt-4 w-full bg-[#FF9F0A] text-black font-mono font-bold text-[12px] tracking-[0.2em] py-4">{loading ? "CALCULANDO..." : "EJECUTAR PREDICCION ->"}</button>
          </div>

          {data && (
            <div className="mt-6">
              {modo==="diario" && (
                <div className={`mb-4 p-3 border-l-2 font-mono text-[11px] ${data.color_semaforo==="gray"?"bg-zinc-800 border-zinc-500 text-zinc-300": data.color_semaforo==="yellow" ? "bg-yellow-900/20 border-yellow-500 text-yellow-400" : "bg-green-900/20 border-green-500 text-green-400"}`}>
                  {data.dia} {data.fecha} - {data.tipo_dia} - FACTOR {data.factor}x - {data.es_festivo?"FESTIVO":"LABORAL"} - {data.pct_pernocta*100}% PERNOCTAN
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white text-black p-4 border-l-4 border-[#FF9F0A]">
                  <div className="font-mono text-[9px] opacity-60">TURISTAS {modo==="diario" && data?.tipo_dia==="DIA LABORAL" ? "PERNOCTAN (REAL)" : "DIA / PUENTE"}</div>
                  <div className="font-display text-[32px] leading-none mt-1">{(data.resumen_diario_real?.pernoctan ?? data.resumen_fin_semana?.total_turistas).toLocaleString("es-CO")}</div>
                  {modo==="diario" && <div className="font-mono text-[9px] mt-1 opacity-60">Transito total: {data.turistas_transito_total?.toLocaleString()} personas</div>}
                </div>
                <div className="bg-[#111] border border-white/10 p-4">
                  <div className="font-mono text-[9px] text-white/40">AUTOS DIA</div>
                  <div className="font-display text-[26px] mt-1">{(data.autos_dia ?? data.resumen_fin_semana?.autos).toLocaleString()}</div>
                </div>
                <div className="bg-black border border-white/10 p-4">
                  <div className="font-mono text-[9px] text-white/40">TPDM BASE</div>
                  <div className="font-mono text-[16px] font-bold mt-1">{Number(data.prediccion_tpdm || 0).toLocaleString()}</div>
                  <div className="font-mono text-[8px] text-white/30 mt-1">CAT I PROMEDIO MES</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-[#0a0a0a] flex flex-col p-6">
          {data && diario && (
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between mb-6">
                <div className="font-mono text-[10px] text-white/50">DISTRIBUCION {modo==="diario" ? data.fecha : `${form.mes}/${form.anio}`} {data.tipo_dia && `- ${data.tipo_dia}`}</div>
                <div className={`font-mono text-[9px] px-2 py-1 border ${data.color_semaforo==="gray"?"bg-zinc-800 text-zinc-300": data.color_semaforo==="yellow"?"bg-yellow-900/20 text-yellow-400 border-yellow-500/30":"bg-green-900/20 text-green-400 border-green-500/30"}`}>{data.tipo_dia || "PUENTE"}</div>
              </div>
              <div className="flex flex-col gap-5 justify-center flex-1">
                {[
                  {label:"SANTA FE 57%", val: diario.santa_fe, color:"bg-[#FF9F0A]"},
                  {label:"SAN JERONIMO 22%", val: diario.san_jeronimo, color:"bg-white"},
                  {label:"SOPETRAN 17%", val: diario.sopetran, color:"bg-white/60"},
                ].map(r=>(
                  <div key={r.label}>
                    <div className="flex justify-between font-mono text-[10px] mb-1.5"><span className="text-white/70">{r.label}</span><span className="text-[#FF9F0A]">{Number(r.val).toLocaleString()} TUR</span></div>
                    <div className="h-[22px] w-full bg-white/5 border border-white/10"><div className={`h-full ${r.color}`} style={{width:(r.val/maxVal)*100+"%"}}></div></div>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-black border border-white/10 font-mono text-[10px] leading-relaxed text-white/60">
                <b className="text-white">EXPLICACION:</b> {data.tipo_dia==="DIA LABORAL" ? `Un miercoles como ${data.fecha} el 65% del trafico son trabajadores locales que no pernoctan. De los ${data.turistas_transito_total} que pasan el peaje, solo ${data.turistas_pernoctan} se quedan a dormir. Por eso antes te daba 27k y ahora te da 3k real.` : `Dia festivo: ${data.pct_pernocta*100}% del trafico se queda. Total transito ${data.turistas_transito_total}, pernoctan ${data.turistas_pernoctan}.`}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
