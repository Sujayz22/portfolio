import React from 'react';
import type { WindowId } from '../hooks/useWindowManager';

interface DockItemConfig {
    window: WindowId;
    tooltip: string;
    emoji: string;
    bg: string;    // gradient
    shadow: string;
}

const DOCK_ITEMS: DockItemConfig[] = [
    {
        window: 'education', tooltip: 'Education',
        emoji: '🎓',
        bg: 'linear-gradient(145deg, #1a56c0, #2d7be8)',
        shadow: 'rgba(45,123,232,0.55)',
    },
    {
        window: 'projects', tooltip: 'Projects',
        emoji: '🗂',
        bg: 'linear-gradient(145deg, #7d3c98, #9b59b6)',
        shadow: 'rgba(155,89,182,0.55)',
    },
    {
        window: 'specs', tooltip: 'System Specs',
        emoji: '⚙',
        bg: 'linear-gradient(145deg, #1a8a48, #27ae60)',
        shadow: 'rgba(39,174,96,0.55)',
    },
    {
        window: 'worklog', tooltip: 'Work Log',
        emoji: '💼',
        bg: 'linear-gradient(145deg, #d4830a, #f5a623)',
        shadow: 'rgba(245,166,35,0.55)',
    },
];

const HABITFORGE: DockItemConfig = {
    window: 'habitforge', tooltip: 'HabitForge',
    emoji: '🎮',
    bg: 'linear-gradient(145deg, #72b822, #a8e634)',
    shadow: 'rgba(168,230,52,0.60)',
};

interface MacOSDockIconProps {
    item: DockItemConfig;
    isOpen: boolean;
    onClick: () => void;
}

const MacOSDockIcon = React.forwardRef<HTMLDivElement, MacOSDockIconProps>(
    ({ item, isOpen, onClick }, ref) => (
    <div
        ref={ref}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick()}
        className="mac-dock-item relative flex flex-col items-center justify-end cursor-pointer group pb-2 px-1"
        aria-label={item.tooltip}
    >
        {/* Icon body */}
        <div
            className="mac-dock-icon-body w-14 h-14 rounded-[16px] flex items-center justify-center text-[30px] select-none relative overflow-hidden"
            style={{
                background: item.bg,
                boxShadow: `0 6px 20px ${item.shadow}, 0 2px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.30)`,
            }}
        >
            {/* Inner glass highlight */}
            <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-[14px]"
                style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.28) 0%, transparent 100%)' }} />
            <span className="relative z-10 leading-none">{item.emoji}</span>
        </div>

        {/* Open dot */}
        {isOpen && (
            <div className="w-1 h-1 rounded-full mt-1 flex-shrink-0"
                style={{ background: 'var(--accent)', boxShadow: '0 0 4px var(--accent-glow)' }} />
        )}

        {/* Tooltip */}
        <div
            className="dock-tooltip absolute bottom-full left-1/2 text-white text-[12px] font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 pointer-events-none mb-3"
            style={{
                background: 'rgba(20,20,26,0.88)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                transform: 'translateX(-50%)',
                fontFamily: 'Inter, -apple-system, sans-serif',
                letterSpacing: '-0.01em',
            }}
        >
            {item.tooltip}
        </div>
    </div>
));

interface DockProps {
    onOpen: (id: WindowId) => void;
    openWindows: Set<WindowId>;
}

export const Dock: React.FC<DockProps> = ({ onOpen, openWindows }) => {
    return (
        <nav 
            className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[800]" 
            aria-label="Application Dock"
        >
            <div className="mac-dock-container dock-glass flex items-end gap-1 px-5 h-[84px] pt-1 pb-1">
                {DOCK_ITEMS.map(item => (
                    <MacOSDockIcon
                        key={item.window}
                        item={item}
                        isOpen={openWindows.has(item.window)}
                        onClick={() => onOpen(item.window)}
                    />
                ))}

                {/* Separator */}
                <div className="w-px h-12 rounded-full mx-2 self-end mb-2" style={{ background: 'rgba(255,255,255,0.20)' }} />

                <MacOSDockIcon
                    item={HABITFORGE}
                    isOpen={openWindows.has('habitforge')}
                    onClick={() => onOpen('habitforge')}
                />
            </div>
        </nav>
    );
};
