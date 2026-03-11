import React, { useEffect, useState } from 'react';
import type { WindowId } from '../hooks/useWindowManager';

const WINDOW_IDS: { id: WindowId; label: string; icon: string }[] = [
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'worklog',   label: 'Work Log',  icon: '💼' },
    { id: 'projects',  label: 'Projects',  icon: '🗂' },
    { id: 'specs',     label: 'System Specs', icon: '⚙' },
    { id: 'habitforge', label: 'HabitForge', icon: '🎮' },
];

interface MenuBarProps {
    onOpenWindow: (id: WindowId) => void;
    onShutdown: () => void;
    onOpenSpotlight: () => void;
    onOpenSettings: () => void;
}

export const MenuBar: React.FC<MenuBarProps> = ({ onOpenWindow, onShutdown, onOpenSpotlight, onOpenSettings }) => {
    const [clock, setClock] = useState('');
    const [openMenu, setOpenMenu] = useState<string | null>(null);

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

    const itemBase = 'relative h-full flex items-center px-3 cursor-pointer select-none transition-all duration-100 rounded-[6px] mx-0.5 menubar-item-text';
    const itemActive = 'bg-white/15 backdrop-blur-sm';

    return (
        <header
            className="menubar-invisible fixed top-0 left-0 right-0 h-7 flex items-center justify-between z-[900] px-1"
        >
            {/* Left side */}
            <nav className="flex items-center h-full gap-0.5">
                {/* Apple/DevOS Logo */}
                <div
                    className={`${itemBase} px-2.5 ${openMenu === 'apple' ? itemActive : ''}`}
                    onClick={e => toggle('apple', e)}
                    role="button"
                    aria-haspopup="true"
                    tabIndex={0}
                >
                    <img src="/logo.png" alt="Logo" className="w-[18px] h-[18px] object-contain drop-shadow-md brightness-110" />
                    {openMenu === 'apple' && (
                        <div
                            className="glass-dropdown absolute top-[calc(100%+6px)] left-0 min-w-[230px] z-50 overflow-hidden py-1.5"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="px-3.5 py-1 text-[10px] font-semibold tracking-widest uppercase">
                                <span className="text-white/40">Dev</span><span style={{ color: '#8da2ba' }}>OS</span> <span className="text-white/20">v2.0</span>
                            </div>
                            <div className="h-px mx-3 bg-white/10 my-1" />
                            <a
                                href="mailto:sujayjsx@gmail.com"
                                className="glass-dropdown-item flex items-center gap-2.5 cursor-pointer"
                            >
                                <span className="opacity-60">✉</span> sujayjsx@gmail.com
                            </a>
                            <a
                                href="#"
                                className="glass-dropdown-item flex items-center gap-2.5 cursor-pointer"
                            >
                                <span className="opacity-60">⬇</span> Download Résumé (PDF)
                            </a>
                            <div className="h-px mx-3 bg-white/10 my-1" />
                            <a
                                href="https://github.com/Sujayz22"
                                target="_blank" rel="noopener noreferrer"
                                className="glass-dropdown-item flex items-center gap-2.5"
                            >
                                <span className="opacity-60">⌥</span> GitHub
                            </a>
                            <a
                                href="https://in.linkedin.com/in/sujaypandajsx"
                                target="_blank" rel="noopener noreferrer"
                                className="glass-dropdown-item flex items-center gap-2.5"
                            >
                                <span className="opacity-60">⌘</span> LinkedIn
                            </a>
                            <div className="h-px mx-3 bg-white/10 my-1" />
                            <div
                                onClick={onShutdown}
                                className="glass-dropdown-item flex items-center gap-2.5 cursor-pointer hover:!bg-red-500/30 hover:!text-red-200"
                            >
                                <span className="opacity-60">⏻</span> Shut Down…
                            </div>
                        </div>
                    )}
                </div>

                <div className={`${itemBase} font-semibold`}>Finder</div>

                {/* File menu */}
                <div
                    className={`${itemBase} ${openMenu === 'file' ? itemActive : ''}`}
                    onClick={e => toggle('file', e)}
                >
                    File
                    {openMenu === 'file' && (
                        <div
                            className="glass-dropdown absolute top-[calc(100%+6px)] left-0 min-w-[200px] z-50 overflow-hidden py-1.5"
                            onClick={e => e.stopPropagation()}
                        >
                            {WINDOW_IDS.map(({ id, label, icon }) => (
                                <div
                                    key={id}
                                    onClick={() => { onOpenWindow(id); setOpenMenu(null); }}
                                    className="glass-dropdown-item flex items-center gap-2.5 cursor-pointer"
                                >
                                    <span>{icon}</span> {label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={itemBase}>View</div>
                <div className={itemBase}>Help</div>
            </nav>

            {/* Right side */}
            <nav className="flex items-center h-full gap-0.5">
                {/* CMD+K Spotlight pill */}
                <button
                    onClick={onOpenSpotlight}
                    className="flex items-center gap-1.5 h-[22px] px-2.5 rounded-full cursor-pointer transition-all duration-150 hover:bg-white/15 menubar-item-text text-[11px]"
                    style={{ border: '1px solid rgba(255,255,255,0.15)' }}
                >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="M21 21l-4.35-4.35" strokeLinecap="round"/>
                    </svg>
                    <span className="text-white/70">⌘K</span>
                </button>

                <div className={`${itemBase} text-[11px]`}>⚡ 97%</div>
                <div className={`${itemBase} text-[11px]`}>▲ Connected</div>

                {/* Clock */}
                <div className={`${itemBase} text-[11px] min-w-[145px] justify-center`}>{clock}</div>

                {/* Settings gear */}
                <button
                    onClick={onOpenSettings}
                    className={`${itemBase} text-[13px] hover:rotate-45 transition-transform duration-300`}
                    aria-label="System Settings"
                >
                    ⚙
                </button>
            </nav>
        </header>
    );
};
