"use client";

import { useEffect, useState } from "react";


export function TacticalVisor() {
  const [angle, setAngle] = useState(0);

  // Animación continua del haz de radar
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setAngle((prev) => (prev + 0.6) % 360);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Parámetros para el abanico en radio de 50 grados
  const cx = 500;
  const cy = 460;
  const radius = 450;
  const sweepAngle = 50;

  const startRad = (0 * Math.PI) / 180;
  const endRad = (sweepAngle * Math.PI) / 180;
  const x1 = cx + radius * Math.cos(startRad);
  const y1 = cy + radius * Math.sin(startRad);
  const x2 = cx + radius * Math.cos(endRad);
  const y2 = cy + radius * Math.sin(endRad);

  const radarSectorPath = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;

  return (
    <div className="relative w-full h-full min-h-[380px] bg-[#070708] overflow-hidden flex items-center justify-center">
      <svg
        viewBox="0 0 1000 920"
        className="w-full h-full cursor-crosshair block select-none"
      >
        <defs>
          {/* Degradado del Haz Anaranjado */}
          <radialGradient id="radarSweep" cx="0%" cy="0%" r="100%">
            <stop offset="0%" stopColor="#FF9E1B" stopOpacity="0.4" />
            <stop offset="75%" stopColor="#FF9E1B" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#FF9E1B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Retícula Táctica de Fondo */}
        <g stroke="rgba(237,234,227,0.04)" strokeWidth="1">
          <line x1="0" y1="230" x2="1000" y2="230" />
          <line x1="0" y1="460" x2="1000" y2="460" />
          <line x1="0" y1="690" x2="1000" y2="690" />
          <line x1="250" y1="0" x2="250" y2="920" />
          <line x1="500" y1="0" x2="500" y2="920" />
          <line x1="750" y1="0" x2="750" y2="920" />
        </g>

        {/* Anillos de Cobertura */}
        <circle cx={cx} cy={cy} r={160} fill="none" stroke="rgba(237,234,227,0.08)" strokeDasharray="4 4" />
        <circle cx={cx} cy={cy} r={320} fill="none" stroke="rgba(237,234,227,0.08)" strokeDasharray="4 4" />
        <circle cx={cx} cy={cy} r={440} fill="none" stroke="rgba(237,234,227,0.12)" />

        {/* HAZ EN ROTACIÓN */}
        <g transform={`rotate(${angle}, ${cx}, ${cy})`}>
          <path d={radarSectorPath} fill="url(#radarSweep)" />
          <line x1={cx} y1={cy} x2={x2} y2={y2} stroke="#FF9E1B" strokeWidth="1.5" strokeOpacity="0.75" />
        </g>

        {/* Nodos del Territorio */}
        <g className="font-mono text-[11px]">
          {/* Sabanalarga */}
          <circle cx="580" cy="310" r="4" fill="#FF9E1B" />
          <text x="592" y="314" fill="#EDEAE3" fontSize="11" fontFamily="monospace" fontWeight="bold">SABANALARGA</text>

          {/* Santa Fe */}
          <circle cx="480" cy="450" r="3" fill="#EDEAE3" />
          <text x="492" y="454" fill="#9A968C" fontSize="10" fontFamily="monospace">SANTA FE</text>

          {/* Sopetrán */}
          <circle cx="540" cy="470" r="3" fill="#EDEAE3" />
          <text x="552" y="474" fill="#9A968C" fontSize="10" fontFamily="monospace">SOPETRÁN</text>

          {/* Giraldo */}
          <circle cx="420" cy="380" r="3" fill="#EDEAE3" />
          <text x="432" y="384" fill="#9A968C" fontSize="10" fontFamily="monospace">GIRALDO</text>
        </g>
      </svg>
    </div>
  );
}