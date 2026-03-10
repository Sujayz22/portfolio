import React, { useEffect, useRef } from 'react';
import { drawJava, drawTypeScript, drawOCI, drawDocker, drawHabitForgeDock } from '../utils/pixelArt';
import { WindowId } from '../hooks/useWindowManager';

type DockIconType = 'java' | 'typescript' | 'oci' | 'docker' | 'habitforge-dock';

const DOCK_ITEMS: { type: DockIconType; tooltip: string; window: WindowId }[] = [
    { type: 'java', tooltip: 'Java', window: 'education' },
    { type: 'typescript', tooltip: 'TypeScript', window: 'projects' },
    { type: 'oci', tooltip: 'Oracle Cloud', window: 'specs' },
    { type: 'docker', tooltip: 'Docker', window: 'worklog' },
];
const HABITFORGE_DOCK = { type: 'habitforge-dock' as DockIconType, tooltip: 'HabitForge', window: 'habitforge' as WindowId };

function DockIcon({ type, onDraw }: { type: DockIconType; onDraw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void }) {
    const ref = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (!ref.current) return;
        const ctx = ref.current.getContext('2d')!;
        ctx.imageSmoothingEnabled = false;
        onDraw(ctx, ref.current.width, ref.current.height);
    }, [onDraw]);
    return <canvas ref={ref} width={48} height={48} className="block w-12 h-12 rounded-xl shadow-md" />;
}

const DRAW_FNS: Record<DockIconType, (ctx: CanvasRenderingContext2D, w: number, h: number) => void> = {
    'java': drawJava,
    'typescript': drawTypeScript,
    'oci': drawOCI,
    'docker': drawDocker,
    'habitforge-dock': drawHabitForgeDock,
};

interface DockProps {
    onOpen: (id: WindowId) => void;
    openWindows: Set<WindowId>;
}

export const Dock: React.FC<DockProps> = ({ onOpen, openWindows }) => {
    const handleClick = (id: WindowId) => {
        onOpen(id);
    };

    return (
        <nav
            className="fixed bottom-1.5 left-1/2 -translate-x-1/2 z-[800]"
            aria-label="Application Dock"
        >
            <div
                className="flex items-end gap-1.5 px-3.5 py-2 rounded-[18px] border border-white/50"
                style={{
                    background: 'rgba(220,220,210,0.7)',
                    backdropFilter: 'blur(24px) saturate(180%)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.6)',
                }}
            >
                {DOCK_ITEMS.map(item => (
                    <div
                        key={item.type}
                        onClick={() => handleClick(item.window)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleClick(item.window)}
                        className="dock-item relative flex flex-col items-center cursor-pointer"
                    >
                        <DockIcon type={item.type} onDraw={DRAW_FNS[item.type]} />
                        <div
                            className="dock-tooltip absolute bottom-full left-1/2 -translate-x-1/2 bg-[rgba(20,20,18,0.88)] text-white text-[10px] font-mono px-2 py-0.5 rounded-md whitespace-nowrap opacity-0 pointer-events-none mb-1.5 backdrop-blur-sm transition-all duration-150"
                            style={{ transform: 'translateX(-50%) translateY(0)' }}
                        >
                            {item.tooltip}
                        </div>
                    </div>
                ))}

                {/* Separator */}
                <div className="w-px h-9 bg-black/20 rounded self-center mx-0.5" />

                {/* HabitForge */}
                <div
                    onClick={() => handleClick(HABITFORGE_DOCK.window)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleClick(HABITFORGE_DOCK.window)}
                    className="dock-item relative flex flex-col items-center cursor-pointer"
                >
                    <DockIcon type={HABITFORGE_DOCK.type} onDraw={DRAW_FNS[HABITFORGE_DOCK.type]} />
                    {openWindows.has('habitforge') && (
                        <div className="w-1 h-1 rounded-full bg-[#1a1a18] mt-0.5" />
                    )}
                    <div
                        className="dock-tooltip absolute bottom-full left-1/2 -translate-x-1/2 bg-[rgba(20,20,18,0.88)] text-white text-[10px] font-mono px-2 py-0.5 rounded-md whitespace-nowrap opacity-0 pointer-events-none mb-1.5 backdrop-blur-sm"
                        style={{ transform: 'translateX(-50%) translateY(0)' }}
                    >
                        HabitForge
                    </div>
                </div>
            </div>
        </nav>
    );
};
