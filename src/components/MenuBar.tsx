import React, { useEffect, useState, useRef } from 'react';
import { drawLogoS } from '../utils/pixelArt';
import type { WindowId } from '../hooks/useWindowManager';

interface MenuBarProps {
    onOpenWindow: (id: WindowId) => void;
}

const WINDOW_IDS: { id: WindowId; label: string }[] = [
    { id: 'education', label: 'Open Education' },
    { id: 'worklog', label: 'Open Work Log' },
    { id: 'projects', label: 'Open Projects' },
    { id: 'specs', label: 'Open System Specs' },
    { id: 'habitforge', label: 'Open HabitForge' },
];

interface MenuBarProps {
    onOpenWindow: (id: WindowId) => void;
    onShutdown: () => void;
}

export const MenuBar: React.FC<MenuBarProps> = ({ onOpenWindow, onShutdown }) => {
    const logoRef = useRef<HTMLCanvasElement>(null);
    const [clock, setClock] = useState('');
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    useEffect(() => {
        if (logoRef.current) {
            const ctx = logoRef.current.getContext('2d')!;
            drawLogoS(ctx, 18, 18, '#1a1a18');
        }
    }, []);

    useEffect(() => {
        const tick = () => {
            const now = new Date();
            setClock(now.toLocaleDateString('en-US', {
                weekday: 'short', month: 'short', day: 'numeric',
                hour: '2-digit', minute: '2-digit',
            }));
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        const close = () => setOpenMenu(null);
        document.addEventListener('click', close);
        return () => document.removeEventListener('click', close);
    }, []);

    const toggle = (name: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setOpenMenu(prev => prev === name ? null : name);
    };

    const itemBase = 'relative h-full flex items-center px-2.5 text-[12px] font-mono text-[#1a1a18] cursor-pointer hover:bg-black/10 select-none whitespace-nowrap';

    return (
        <header
            className="fixed top-0 left-0 right-0 h-6 menubar-grad border-b border-[#a0a098] flex items-center justify-between z-[900] shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
            style={{ borderBottom: '1px solid #a0a098' }}
        >
            {/* Left side */}
            <nav className="flex items-center h-full">
                {/* Apple/Sujay Logo */}
                <div
                    className={`${itemBase} px-2 ${openMenu === 'apple' ? 'bg-[#2a58c5]' : ''}`}
                    onClick={e => toggle('apple', e)}
                    role="button"
                    aria-haspopup="true"
                    tabIndex={0}
                >
                    <canvas ref={logoRef} width={18} height={18} />
                    {openMenu === 'apple' && (
                        <div
                            className="absolute top-full left-0 min-w-[220px] bg-[#eeeeea]/95 backdrop-blur-sm border border-[#a0a098] rounded-b-lg shadow-xl z-50 overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="px-3.5 py-1.5 text-[10px] font-pixel text-[#787872] bg-black/4 tracking-wider">SujayOS v1.0</div>
                            <div className="h-px bg-[#d4d4cc]" />
                            <a
                                href="mailto:sujayjsx@gmail.com"
                                className="flex items-center gap-2.5 px-3.5 py-1.5 text-[12px] font-mono text-[#1a1a18] hover:bg-[#2a58c5] hover:text-white transition-colors"
                            >
                                <span className="opacity-70">✉</span> sujayjsx@gmail.com
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-2.5 px-3.5 py-1.5 text-[12px] font-mono text-[#1a1a18] hover:bg-[#2a58c5] hover:text-white transition-colors"
                            >
                                <span className="opacity-70">⬇</span> Download Résumé (PDF)
                            </a>
                            <div className="h-px bg-[#d4d4cc]" />
                            <a
                                href="https://github.com/Sujayz22"
                                target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2.5 px-3.5 py-1.5 text-[12px] font-mono text-[#1a1a18] hover:bg-[#2a58c5] hover:text-white transition-colors"
                            >
                                <span className="opacity-70">⌥</span> GitHub
                            </a>
                            <a
                                href="https://in.linkedin.com/in/sujaypandajsx"
                                target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2.5 px-3.5 py-1.5 text-[12px] font-mono text-[#1a1a18] hover:bg-[#2a58c5] hover:text-white transition-colors"
                            >
                                <span className="opacity-70">⌘</span> LinkedIn
                            </a>
                            <div className="h-px bg-[#d4d4cc]" />
                            <div
                                onClick={onShutdown}
                                className="flex items-center gap-2.5 px-3.5 py-1.5 text-[12px] font-mono text-[#1a1a18] hover:bg-[#e74c3c] hover:text-white transition-colors cursor-pointer"
                            >
                                <span className="opacity-70">⏻</span> Shut Down…
                            </div>
                        </div>
                    )}
                </div>

                <div className={`${itemBase} font-bold`}>Finder</div>

                {/* File menu */}
                <div
                    className={`${itemBase} ${openMenu === 'file' ? 'bg-[#2a58c5] text-white' : ''}`}
                    onClick={e => toggle('file', e)}
                >
                    File
                    {openMenu === 'file' && (
                        <div
                            className="absolute top-full left-0 min-w-[200px] bg-[#eeeeea]/95 backdrop-blur-sm border border-[#a0a098] rounded-b-lg shadow-xl z-50 overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            {WINDOW_IDS.map(({ id, label }) => (
                                <div
                                    key={id}
                                    onClick={() => { onOpenWindow(id); setOpenMenu(null); }}
                                    className="flex items-center px-3.5 py-1.5 text-[12px] font-mono text-[#1a1a18] hover:bg-[#2a58c5] hover:text-white transition-colors cursor-pointer"
                                >
                                    {label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={itemBase}>View</div>
                <div className={itemBase}>Help</div>
            </nav>

            {/* Right side */}
            <nav className="flex items-center h-full">
                <div className={`${itemBase} text-[11px]`}>⚡ 97%</div>
                <div className={`${itemBase} text-[11px]`}>▲ Connected</div>
                <div className={`${itemBase} text-[11px] min-w-[140px] justify-center`}>{clock}</div>
            </nav>
        </header>
    );
};
