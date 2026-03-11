import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'clear' | 'tinted';
export type AccentColor = 'lime' | 'amber' | 'ocean';

interface ThemeContextValue {
  mode: ThemeMode;
  accent: AccentColor;
  setMode: (m: ThemeMode) => void;
  setAccent: (a: AccentColor) => void;
}

const ACCENT_VALUES: Record<AccentColor, { hex: string; glow: string; rgb: string }> = {
  lime:  { hex: '#a8e634', glow: 'rgba(168,230,52,0.45)',  rgb: '168,230,52' },
  amber: { hex: '#f5a623', glow: 'rgba(245,166,35,0.45)',  rgb: '245,166,35' },
  ocean: { hex: '#38bdf8', glow: 'rgba(56,189,248,0.45)',  rgb: '56,189,248' },
};

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'clear',
  accent: 'lime',
  setMode: () => {},
  setAccent: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('clear');
  const [accent, setAccent] = useState<AccentColor>('lime');

  useEffect(() => {
    const root = document.documentElement;
    const av = ACCENT_VALUES[accent];
    root.style.setProperty('--accent', av.hex);
    root.style.setProperty('--accent-glow', av.glow);
    root.style.setProperty('--accent-rgb', av.rgb);
    
    if (mode === 'tinted') {
      root.classList.add('tinted-mode');
    } else {
      root.classList.remove('tinted-mode');
    }
  }, [mode, accent]);

  return (
    <ThemeContext.Provider value={{ mode, accent, setMode, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
