import { ReactNode } from "react";

export function Footer(): ReactNode{
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0D0D0F] border-t border-[rgba(237,234,227,0.11)] pt-16 pb-8">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#FF9E1B] cut-corner" />
              <span className="font-mono text-sm tracking-[0.18em] font-semibold uppercase text-[#EDEAE3]">
                GEO<span className="text-[#FF9E1B]">SYS</span>
              </span>
            </div>
            <p className="text-sm text-[#9A968C] max-w-sm">
              Plataforma de inteligencia territorial y análisis geoespacial táctico en tiempo real.
            </p>
          </div>

          {/* Nav Column 1 */}
          <div className="flex flex-col gap-3 font-mono text-xs">
            <span className="text-[11px] tracking-[0.16em] text-[#5E5B52] uppercase">SISTEMA</span>
            <a href="#visor" className="text-[#9A968C] hover:text-[#EDEAE3] transition-colors">Visor Táctico</a>
            <a href="#platform" className="text-[#9A968C] hover:text-[#EDEAE3] transition-colors">Módulos</a>
            <a href="#pipeline" className="text-[#9A968C] hover:text-[#EDEAE3] transition-colors">Procesamiento</a>
          </div>

          {/* Nav Column 2 */}
          <div className="flex flex-col gap-3 font-mono text-xs">
            <span className="text-[11px] tracking-[0.16em] text-[#5E5B52] uppercase">LEGAL / SEGURIDAD</span>
            <a href="#" className="text-[#9A968C] hover:text-[#EDEAE3] transition-colors">Privacidad</a>
            <a href="#" className="text-[#9A968C] hover:text-[#EDEAE3] transition-colors">Términos del Servicio</a>
            <a href="#" className="text-[#9A968C] hover:text-[#EDEAE3] transition-colors">Seguridad de Datos</a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[rgba(237,234,227,0.05)] flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono text-[#5E5B52]">
          <span>© {currentYear} GEOSYS INC. TODOS LOS DERECHOS RESERVADOS.</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#55C97C]" />
            <span>SISTEMAS OPERATIVOS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}