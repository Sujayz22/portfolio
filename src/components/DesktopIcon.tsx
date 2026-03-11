import React, { useState } from 'react';
import type { WindowId } from '../hooks/useWindowManager';

interface DesktopIconProps {
    id: WindowId;
    label: string;
    type: 'folder-edu' | 'folder-work' | 'folder-proj' | 'folder-spec' | 'habitforge';
    onOpen: (id: WindowId) => void;
}

// Tahoe tinted folder definitions — color + emoji overlay
const FOLDER_CONFIG: Record<string, { color: string; glow: string; emoji: string; shadow: string }> = {
    'folder-edu': {
        color: 'linear-gradient(145deg, #2d7be8, #1a56c0)',
        glow: 'rgba(45,123,232,0.55)',
        emoji: '🎓',
        shadow: '0 8px 24px rgba(45,123,232,0.5)',
    },
    'folder-work': {
        color: 'linear-gradient(145deg, #f5a623, #d4830a)',
        glow: 'rgba(245,166,35,0.55)',
        emoji: '💼',
        shadow: '0 8px 24px rgba(245,166,35,0.5)',
    },
    'folder-proj': {
        color: 'linear-gradient(145deg, #9b59b6, #7d3c98)',
        glow: 'rgba(155,89,182,0.55)',
        emoji: '🗂',
        shadow: '0 8px 24px rgba(155,89,182,0.5)',
    },
    'folder-spec': {
        color: 'linear-gradient(145deg, #27ae60, #1a8a48)',
        glow: 'rgba(39,174,96,0.55)',
        emoji: '⚙',
        shadow: '0 8px 24px rgba(39,174,96,0.5)',
    },
    'habitforge': {
        color: 'linear-gradient(145deg, #a8e634, #72b822)',
        glow: 'rgba(168,230,52,0.60)',
        emoji: '🎮',
        shadow: '0 8px 24px rgba(168,230,52,0.55)',
    },
};

// SVG folder shape — Tahoe style with tab
const FolderShape: React.FC<{ gradient: string; shadow: string; glow: string }> = ({ gradient, shadow, glow }) => (
    <div className="relative" style={{ width: 64, height: 56 }}>
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-xl blur-md opacity-50" style={{ background: glow, transform: 'translate(1px, 4px) scale(0.9)' }} />
        {/* Folder tab */}
        <div className="absolute top-0 left-2 w-16 h-4 rounded-t-[5px]"
            style={{ background: gradient, opacity: 0.85, width: 26, height: 8, top: 0, left: 4 }} />
        {/* Folder body */}
        <div className="absolute rounded-[10px] rounded-tl-none"
            style={{
                background: gradient,
                top: 6, left: 0, right: 0, bottom: 0,
                boxShadow: `${shadow}, inset 0 1px 0 rgba(255,255,255,0.30), inset 0 -1px 0 rgba(0,0,0,0.15)`,
            }}
        />
        {/* Inner glass highlight */}
        <div className="absolute rounded-t-[6px]"
            style={{
                top: 8, left: 1, right: 1, height: 16,
                background: 'linear-gradient(180deg, rgba(255,255,255,0.28) 0%, transparent 100%)',
            }}
        />
    </div>
);

export const DesktopIcon: React.FC<DesktopIconProps> = ({ id, label, type, onOpen }) => {
    const [selected, setSelected] = useState(false);
    const [bouncing, setBouncing] = useState(false);
    const lastClickRef = React.useRef<number>(0);

    const cfg = FOLDER_CONFIG[type];

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

    return (
        <div
            role="button"
            tabIndex={0}
            aria-label={`${label} — double-click to open`}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className={`tahoe-folder flex flex-col items-center w-[76px] cursor-pointer rounded-xl p-1.5 pb-1 select-none transition-all duration-200
                ${selected ? 'bg-white/20 backdrop-blur-sm' : 'hover:bg-white/10 hover:backdrop-blur-sm'}
                ${bouncing ? 'icon-bouncing' : ''}`}
        >
            <div className="relative flex items-center justify-center" style={{ width: 64, height: 56 }}>
                <FolderShape gradient={cfg.color} shadow={cfg.shadow} glow={cfg.glow} />
                {/* Emoji overlay — centered on folder body */}
                <div className="absolute inset-0 flex items-center justify-center" style={{ paddingTop: 6 }}>
                    <span className="text-[22px] leading-none select-none drop-shadow-sm">{cfg.emoji}</span>
                </div>
            </div>

            {/* Label */}
            <span
                className="mt-1.5 text-[11px] font-medium text-white text-center leading-tight max-w-[74px] break-words px-1 rounded"
                style={{
                    fontFamily: 'Inter, -apple-system, sans-serif',
                    textShadow: '0 1px 4px rgba(0,0,0,0.85), 0 0 8px rgba(0,0,0,0.7)',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.35,
                }}
            >
                {label}
            </span>
        </div>
    );
};
