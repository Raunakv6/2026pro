import React from 'react';
import { motion } from 'motion/react';

interface CyberSeparatorProps {
  id: string;
  type?: 'slice' | 'glitch' | 'data';
}

export default function CyberSeparator({ id, type = 'slice' }: CyberSeparatorProps) {
  // Generate random mock memory addresses or codes to display in the terminal style separator
  const systemCode = `SYS_LNK_${id.toUpperCase()}_0x${Math.floor(Math.random() * 8999 + 1000).toString(16)}`;

  if (type === 'slice') {
    return (
      <div className="relative w-full h-12 flex items-center justify-center overflow-hidden pointer-events-none select-none z-10" id={`cyber-sep-${id}`}>
        {/* Sliced polygon path line */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent h-[4px] w-full"
          style={{
            clipPath: 'polygon(0 50%, 20% 50%, 22% 0%, 35% 0%, 37% 100%, 45% 100%, 47% 50%, 75% 50%, 77% 100%, 82% 100%, 84% 0%, 89% 0%, 91% 50%, 100% 50%)',
          }}
        />
        {/* Inner thin highlight line */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent h-[1px] w-full shadow-[0_0_10px_rgba(242,125,38,0.5)]"
          style={{
            clipPath: 'polygon(0 50%, 20% 50%, 22% 0%, 35% 0%, 37% 100%, 45% 100%, 47% 50%, 75% 50%, 77% 100%, 82% 100%, 84% 0%, 89% 0%, 91% 50%, 100% 50%)',
          }}
        />

        {/* Small data HUD indicators in middle */}
        <div className="flex items-center gap-3 px-4 py-1 bg-slate-950 border border-slate-900 rounded-sm font-mono text-[9px] text-slate-500 relative z-20">
          <span className="w-1 h-1 rounded-full bg-orange-500 animate-ping" />
          <span className="tracking-widest text-[8px]">{systemCode}</span>
          <span className="text-[7px] text-orange-500/60 font-bold">// SEC_CUT_OK</span>
        </div>
      </div>
    );
  }

  if (type === 'glitch') {
    return (
      <div className="relative w-full h-16 flex items-center justify-between px-12 overflow-hidden pointer-events-none select-none z-10" id={`cyber-sep-${id}`}>
        {/* Fragmented sliced bars */}
        <div 
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-8 bg-orange-500/5 border-y border-orange-500/10"
          style={{
            clipPath: 'polygon(0 15%, 10% 15%, 12% 85%, 35% 85%, 37% 0%, 55% 0%, 57% 100%, 75% 100%, 77% 20%, 90% 20%, 92% 70%, 100% 70%)'
          }}
        />
        
        {/* Left corner fragment */}
        <div 
          className="w-24 h-4 bg-orange-500/20 border-l border-orange-500"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)'
          }}
        />

        {/* Center decorative HUD node */}
        <div className="flex flex-col items-center gap-0.5 relative z-20 font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-[8px] text-orange-400 font-bold uppercase tracking-widest">WAVE_GUIDE_SHIELD</span>
            <span className="text-[8px] text-slate-600">[ACTIVE]</span>
          </div>
          <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
        </div>

        {/* Right corner fragment */}
        <div 
          className="w-24 h-4 bg-orange-500/20 border-r border-orange-500"
          style={{
            clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)'
          }}
        />
      </div>
    );
  }

  // default type = 'data'
  return (
    <div className="relative w-full h-10 flex items-center justify-center overflow-hidden pointer-events-none select-none z-10" id={`cyber-sep-${id}`}>
      {/* Intricate circuitry looking bar */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-slate-800" />
      
      {/* Clipped floating node */}
      <div 
        className="h-6 w-72 bg-slate-950 border border-slate-850 flex items-center justify-center relative z-10"
        style={{
          clipPath: 'polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)'
        }}
      >
        <span className="font-mono text-[8px] text-slate-500 tracking-[0.25em] uppercase font-bold">
          CONVERGE_ADDR_0x{id.substring(0, 4).toUpperCase()}
        </span>
      </div>

      {/* Floating neon accent squares */}
      <div className="absolute left-1/4 w-1.5 h-1.5 bg-orange-500/50 rotate-45 animate-pulse" />
      <div className="absolute right-1/4 w-1.5 h-1.5 bg-orange-500/50 rotate-45 animate-pulse" />
    </div>
  );
}
