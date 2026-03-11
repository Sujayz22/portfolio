import React, { useEffect, useRef, useCallback, useState } from 'react';
import type { WindowId, WindowState } from '../hooks/useWindowManager';

interface WindowProps {
    win: WindowState;
    onClose: (id: WindowId) => void;
    onMinimize: (id: WindowId) => void;
    onMaximize: (id: WindowId) => void;
    onFocus: (id: WindowId) => void;
    onMove: (id: WindowId, x: number, y: number) => void;
    children: React.ReactNode;
    title: string;
    titleIcon: string;
    gameStyle?: boolean;
}

export const Window: React.FC<WindowProps> = ({
    win, onClose, onMinimize, onMaximize, onFocus, onMove, children, title, titleIcon, gameStyle = false,
}) => {
    const dragRef = useRef<{ startX: number; startY: number; origLeft: number; origTop: number } | null>(null);
    const [animState, setAnimState] = useState<'in' | 'out' | 'min' | 'idle'>('in');

    useEffect(() => {
        if (win.isOpen) {
            setAnimState('in');
            const t = setTimeout(() => setAnimState('idle'), 520);
            return () => clearTimeout(t);
        }
    }, [win.isOpen]);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        onFocus(win.id);
        const target = e.target as HTMLElement;
        if (target.closest('button')) return;

        dragRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            origLeft: win.x,
            origTop: win.y,
        };

        const onMouseMove = (ev: MouseEvent) => {
            if (!dragRef.current) return;
            let nx = dragRef.current.origLeft + ev.clientX - dragRef.current.startX;
            let ny = dragRef.current.origTop + ev.clientY - dragRef.current.startY;
            nx = Math.max(0, Math.min(nx, window.innerWidth - 200));
            ny = Math.max(24, Math.min(ny, window.innerHeight - 100));
            onMove(win.id, nx, ny);
        };

        const onMouseUp = () => {
            dragRef.current = null;
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }, [win.id, win.x, win.y, onFocus, onMove]);

    if (!win.isOpen) return null;

    const animClass =
        animState === 'in' ? 'window-open' :
            animState === 'out' ? 'window-close' :
                animState === 'min' ? 'window-minimize' : '';

    const gameGlassBg = gameStyle
        ? 'linear-gradient(135deg, rgba(8,8,20,0.80) 0%, rgba(12,4,28,0.80) 100%)'
        : undefined;

    return (
        <div
            role="dialog"
            aria-modal="false"
            aria-label={title}
            className={`absolute flex flex-col overflow-hidden window-glass ${animClass}`}
            style={{
                left: win.x, top: win.y,
                width: win.width, height: win.height,
                zIndex: win.zIndex,
                minWidth: 340, minHeight: 220,
                willChange: 'transform, opacity',
                background: gameStyle ? gameGlassBg : undefined,
                borderColor: gameStyle ? 'rgba(0,255,136,0.25)' : undefined,
            }}
            onMouseDown={() => onFocus(win.id)}
        >
            {/* Title bar */}
            <div
                className="h-10 border-b flex items-center justify-between px-4 sticky top-0 z-10 cursor-grab active:cursor-grabbing flex-shrink-0"
                onMouseDown={handleMouseDown}
                style={gameStyle ? {
                    background: 'rgba(0,255,136,0.06)',
                    borderBottom: '1px solid rgba(0,255,136,0.18)',
                    borderRadius: 'calc(var(--glass-radius) - 1px) calc(var(--glass-radius) - 1px) 0 0',
                } : {
                    background: 'rgba(20,20,26,0.5)',
                    borderColor: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(16px)'
                }}
            >
                {/* Left: Window actions */}
                <div className="flex gap-2" onMouseDown={e => e.stopPropagation()}>
                    <button
                        onClick={(e) => { e.stopPropagation(); onClose(win.id); }}
                        className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] border border-[#e0342c]/50 flex items-center justify-center text-[7px] text-transparent group-hover:text-black/60 transition-all hover:scale-110 hover:brightness-110 shadow-sm"
                    >✕</button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onMinimize(win.id); }}
                        className="w-3.5 h-3.5 rounded-full bg-[#febc2e] border border-[#d5920a]/50 flex items-center justify-center text-[7px] text-transparent group-hover:text-black/60 transition-all hover:scale-110 hover:brightness-110 shadow-sm"
                    >−</button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onMaximize(win.id); }}
                        className="w-3.5 h-3.5 rounded-full bg-[#28c840] border border-[#14a62a]/50 flex items-center justify-center text-[7px] text-transparent group-hover:text-black/60 transition-all hover:scale-110 hover:brightness-110 shadow-sm"
                    >+</button>
                </div>

                {/* Center: Title */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none"
                    style={{ opacity: 1 }}
                >
                    {titleIcon && <span className="text-[15px]">{titleIcon}</span>}
                    <span
                        className="text-[14px] font-medium tracking-tight"
                        style={{
                            fontFamily: 'Inter, -apple-system, sans-serif',
                            letterSpacing: '-0.01em',
                            color: gameStyle ? 'rgba(0,255,136,0.90)' : 'rgba(255,255,255,0.85)',
                            textShadow: '0 1px 3px rgba(0,0,0,0.4)',
                        }}
                    >
                        {title}
                    </span>
                </div>
            </div>

            {/* Content area */}
            <div className={`flex-1 overflow-y-auto overflow-x-hidden window-glass-content ${gameStyle ? '!bg-transparent' : ''}`}>
                {children}
            </div>
        </div>
    );
};
