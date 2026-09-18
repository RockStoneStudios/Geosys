'use client';
import { useState, useEffect, ReactNode } from 'react';

export function BootLoader(): ReactNode {
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-100 bg-[#0A0A0B] flex flex-col items-center justify-center p-6 select-none transition-opacity duration-500">
      <div className="w-full max-w-sm flex flex-col gap-4">
        <div className="flex justify-between items-center text-[11px] font-mono uppercase tracking-[0.16em] text-[#9A968C]">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF9E1B] animate-blink" />
            INITIALIZING
          </span>
          <span className="text-[#EDEAE3]">{progress}%</span>
        </div>

        <div className="w-full h-1 bg-[rgba(237,234,227,0.11)] relative overflow-hidden">
          <div 
            className="h-full bg-[#FF9E1B] transition-all duration-75 ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>

        <div className="text-[10px] font-mono text-[#5E5B52] uppercase tracking-[0.12em] flex justify-between">
          <span>SYS_VER: 2.4.0</span>
          <span>SEC_CHK: OK</span>
        </div>
      </div>
    </div>
  );
}