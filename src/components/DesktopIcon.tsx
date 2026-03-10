import React, { useEffect, useRef, useState } from 'react';
import { drawDesktopFolder, drawHabitForge } from '../utils/pixelArt';
import { WindowId } from '../hooks/useWindowManager';

interface DesktopIconProps {
    id: WindowId;
    label: string;
    type: 'folder-edu' | 'folder-work' | 'folder-proj' | 'folder-spec' | 'habitforge';
    onOpen: (id: WindowId) => void;
}

const FOLDER_COLORS: Record<string, { color: string; accent: string }> = {
    'folder-edu': { color: '#3a7bd5', accent: '#1a5bbf' },
    'folder-work': { color: '#c47a20', accent: '#a05818' },
    'folder-proj': { color: '#8e44ad', accent: '#6c3291' },
    'folder-spec': { color: '#27ae60', accent: '#1d8049' },
};

export const DesktopIcon: React.FC<DesktopIconProps> = ({ id, label, type, onOpen }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selected, setSelected] = useState(false);
    const [bouncing, setBouncing] = useState(false);
    const lastClickRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d')!;
        if (type === 'habitforge') {
            drawHabitForge(ctx, canvas.width, canvas.height);
        } else {
            const fc = FOLDER_COLORS[type];
            drawDesktopFolder(ctx, canvas.width, canvas.height, fc.color, fc.accent);
        }
    }, [type]);

    const handleClick = () => {
        setSelected(true);
        const now = Date.now();
        const isDouble = now - lastClickRef.current < 450;
        lastClickRef.current = now;
        if (isDouble) {
            setBouncing(true);
            onOpen(id);
            setTimeout(() => { setBouncing(false); setSelected(false); }, 450);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setBouncing(true);
            onOpen(id);
            setTimeout(() => setBouncing(false), 450);
        }
    };

    const isHF = type === 'habitforge';

    return (
        <div
            role="button"
            tabIndex={0}
            aria-label={`${label} — double-click to open`}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className={`flex flex-col items-center w-20 cursor-pointer rounded-lg p-1.5 pb-1 transition-transform select-none
        ${selected ? 'bg-[#2a58c5]/40' : 'hover:bg-white/18 hover:scale-105'}
        ${bouncing ? 'icon-bouncing' : ''}`}
        >
            <canvas
                ref={canvasRef}
                width={isHF ? 64 : 64}
                height={isHF ? 64 : 56}
                className="block"
            />
            <span
                className="mt-1 text-[10px] font-mono text-white text-center leading-tight max-w-[78px] break-words"
                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.6)' }}
            >
                {label}
            </span>
        </div>
    );
};
