import React from 'react';
import { useTheme } from '../context/ThemeContext';
import type { AccentColor, ThemeMode } from '../context/ThemeContext';

interface SystemSettingsProps {
  onClose: () => void;
}

const ACCENTS: { key: AccentColor; label: string; hex: string }[] = [
  { key: 'lime',  label: 'Cyber Lime',   hex: '#a8e634' },
  { key: 'amber', label: 'Elec. Amber',  hex: '#f5a623' },
  { key: 'ocean', label: 'Ocean Blue',   hex: '#38bdf8' },
];

export const SystemSettings: React.FC<SystemSettingsProps> = ({ onClose }) => {
  const { mode, accent, setMode, setAccent } = useTheme();

  return (
    <div
      className="fixed inset-0 z-[1800] flex items-center justify-center modal-in"
      onClick={onClose}
    >
      <div
        className="settings-glass settings-in w-[340px] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">⚙</span>
            <div>
              <div className="text-[14px] font-semibold text-white leading-none">System Settings</div>
              <div className="text-[10px] text-white/40 mt-0.5">DevOS Appearance</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/10 transition-all text-[13px]"
          >
            ✕
          </button>
        </div>

        <div className="px-5 py-4 flex flex-col gap-5">
          {/* Appearance Mode */}
          <div>
            <div className="text-[11px] font-semibold text-white/50 uppercase tracking-widest mb-3">Appearance</div>
            <div className="flex gap-2 p-1 rounded-[12px]" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
              {(['clear', 'tinted'] as ThemeMode[]).map(m => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className="flex-1 flex flex-col items-center gap-2 rounded-[10px] py-3 transition-all duration-200"
                  style={mode === m ? {
                    background: 'rgba(255,255,255,0.14)',
                    border: '1px solid rgba(255,255,255,0.22)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                  } : { border: '1px solid transparent' }}
                >
                  {/* Mini preview */}
                  <div className="w-16 h-10 rounded-lg overflow-hidden relative flex-shrink-0"
                    style={{
                      background: m === 'clear'
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)'
                        : `linear-gradient(135deg, rgba(var(--accent-rgb),0.25) 0%, rgba(var(--accent-rgb),0.10) 100%)`,
                      border: '1px solid rgba(255,255,255,0.18)',
                    }}
                  >
                    <div className="absolute inset-x-1 top-1.5 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.25)' }} />
                    <div className="absolute inset-x-2 top-4 h-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
                    <div className="absolute inset-x-3 top-6 h-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.10)' }} />
                    {m === 'tinted' && <div className="absolute inset-0" style={{ background: 'rgba(var(--accent-rgb),0.12)' }} />}
                  </div>
                  <span className="text-[11px] font-medium" style={{ color: mode === m ? 'white' : 'rgba(255,255,255,0.45)' }}>
                    {m === 'clear' ? 'Clear' : 'Tinted'}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-2 text-[10px] text-white/35 leading-relaxed">
              {mode === 'clear'
                ? 'Maximum transparency — wallpaper bleeds through all surfaces.'
                : 'Accent color tints all glass surfaces with a subtle wash.'}
            </div>
          </div>

          {/* Accent Color */}
          <div>
            <div className="text-[11px] font-semibold text-white/50 uppercase tracking-widest mb-3">Accent Color</div>
            <div className="flex gap-2">
              {ACCENTS.map(a => (
                <button
                  key={a.key}
                  onClick={() => setAccent(a.key)}
                  className="flex-1 flex flex-col items-center gap-1.5 rounded-[10px] py-2.5 transition-all duration-200"
                  style={{
                    background: accent === a.key ? `rgba(${a.hex.replace('#','').match(/.{2}/g)!.map(x=>parseInt(x,16)).join(',')},0.18)` : 'rgba(255,255,255,0.04)',
                    border: accent === a.key ? `1px solid ${a.hex}55` : '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-full transition-transform duration-200"
                    style={{
                      background: a.hex,
                      boxShadow: accent === a.key ? `0 0 12px ${a.hex}88` : 'none',
                      transform: accent === a.key ? 'scale(1.15)' : 'scale(1)',
                    }}
                  />
                  <span className="text-[9px] font-medium text-white/50 leading-none text-center">{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Build info */}
          <div className="pt-1 border-t border-white/8 flex items-center justify-between">
            <span className="text-[9px] text-white/20 font-mono"><span className="text-white/40">Dev</span><span style={{ color: '#8da2ba' }}>OS</span> v2.0 · Build 2026.03</span>
            <span className="text-[9px] text-white/20">Tahoe Edition</span>
          </div>
        </div>
      </div>
    </div>
  );
};
