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

    // Animate in on open
    useEffect(() => {
        if (win.isOpen) {
            setAnimState('in');
            const t = setTimeout(() => setAnimState('idle'), 430);
            return () => clearTimeout(t);
        }
    }, [win.isOpen]);

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setAnimState('out');
        setTimeout(() => onClose(win.id), 260);
    };

    const handleMinimize = (e: React.MouseEvent) => {
        e.stopPropagation();
        setAnimState('min');
        setTimeout(() => onMinimize(win.id), 480);
    };

    const handleMaximize = (e: React.MouseEvent) => {
        e.stopPropagation();
        onMaximize(win.id);
    };

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        onFocus(win.id);
        dragRef.current = { startX: e.clientX, startY: e.clientY, origLeft: win.x, origTop: win.y };

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

    const titlebarBase = 'h-7 flex items-center px-2 gap-1.5 flex-shrink-0 relative border-b';
    const titlebarStyle = gameStyle
        ? `${titlebarBase} border-game-primary`
        : `${titlebarBase} titlebar-grad border-[#aaa89f] cursor-grab active:cursor-grabbing`;
    const titleBarInlineStyle = gameStyle
        ? { background: 'linear-gradient(90deg, #0a0a1a, #1a0a2e, #0a0a1a)', borderBottomColor: '#00ff88' }
        : {};

    return (
        <div
            role="dialog"
            aria-modal="false"
            aria-label={title}
            className={`absolute flex flex-col bg-[#ececea] border border-[#888880] rounded-lg overflow-hidden ${animClass}`}
            style={{
                left: win.x, top: win.y,
                width: win.width, height: win.height,
                zIndex: win.zIndex,
                boxShadow: '0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.6)',
                minWidth: 320, minHeight: 200,
                willChange: 'transform, opacity',
            }}
            onMouseDown={() => onFocus(win.id)}
        >
            {/* Title bar */}
            <div className={titlebarStyle} style={titleBarInlineStyle} onMouseDown={handleMouseDown}>
                {/* Traffic lights */}
                <div className="flex gap-1.5 items-center flex-shrink-0 group">
                    <button
                        onClick={handleClose}
                        aria-label="Close"
                        className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0342c] flex items-center justify-center text-[7px] text-transparent group-hover:text-black/50 transition-colors hover:scale-110"
                    >✕</button>
                    <button
                        onClick={handleMinimize}
                        aria-label="Minimize"
                        className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d5920a] flex items-center justify-center text-[7px] text-transparent group-hover:text-black/50 transition-colors hover:scale-110"
                    >−</button>
                    <button
                        onClick={handleMaximize}
                        aria-label="Maximize"
                        className="w-3 h-3 rounded-full bg-[#28c840] border border-[#14a62a] flex items-center justify-center text-[7px] text-transparent group-hover:text-black/50 transition-colors hover:scale-110"
                    >+</button>
                </div>

                {/* Title */}
                <div className={`flex-1 text-center text-[12px] font-semibold tracking-tight pointer-events-none font-mono ${gameStyle ? 'text-game-primary' : 'text-[#3a3a36]'}`}>
                    <span className="mr-1">{titleIcon}</span>{title}
                </div>
            </div>

            {/* Content */}
            <div className={`flex-1 overflow-y-auto overflow-x-hidden ${gameStyle ? 'bg-game-bg' : ''}`}>
                {children}
            </div>
        </div>
    );
};
