import React, { useEffect, useState, useCallback } from 'react';
import { useDraggable } from '../hooks/useDraggable';

// ── Types ──────────────────────────────────────────────────────────────────

interface WakaStats {
    total_seconds: number;
    daily_average: number;
    languages: { name: string; total_seconds: number; percent: number }[];
    best_day: { date: string; total_seconds: number } | null;
}

// ── Helpers ────────────────────────────────────────────────────────────────

const fmtHours = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

const MOCK_WAKA: WakaStats = {
    total_seconds: 168_300,
    daily_average: 24_042,
    languages: [
        { name: 'TypeScript', total_seconds: 68_000, percent: 40.4 },
        { name: 'Java', total_seconds: 42_000, percent: 25.0 },
        { name: 'CSS', total_seconds: 25_000, percent: 14.9 },
        { name: 'JSON', total_seconds: 15_000, percent: 8.9 },
        { name: 'Other', total_seconds: 18_300, percent: 10.8 },
    ],
    best_day: { date: 'Today', total_seconds: 32_400 },
};

const LANG_COLORS: Record<string, string> = {
    TypeScript: '#38bdf8', JavaScript: '#ffd700', Java: '#f5a623',
    Python: '#a8e634', CSS: '#c084fc', HTML: '#fb923c',
    Rust: '#fb923c', Go: '#22d3ee', JSON: '#94a3b8', Other: '#64748b',
};

// ── Draggable Widget Wrapper ───────────────────────────────────────────────

interface DraggableWidgetProps {
    children: React.ReactNode;
    initialX: number;
    initialY: number;
    storageKey: string;
}

const DraggableWidget: React.FC<DraggableWidgetProps> = ({ children, initialX, initialY, storageKey }) => {
    const { pos, dragging, onMouseDown } = useDraggable({ initialX, initialY, storageKey });

    return (
        <div
            className="absolute select-none pointer-events-auto"
            style={{
                left: pos.x,
                top: pos.y,
                zIndex: dragging ? 500 : 10,
                willChange: dragging ? 'transform' : 'auto',
            }}
        >
            {/* Drag handle strip — always visible at top, grab cursor */}
            <div
                onMouseDown={onMouseDown}
                className="w-full flex items-center justify-center pb-1 cursor-grab active:cursor-grabbing"
                style={{ height: 14 }}
            >
                <div className="w-8 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.20)' }} />
            </div>
            {/* Widget content - pointer events re-enabled; interactive elements inside should stopPropagation on mouseDown */}
            <div
                style={{
                    filter: dragging ? 'brightness(1.05)' : 'none',
                    transition: 'filter 0.15s, box-shadow 0.15s',
                    boxShadow: dragging ? '0 20px 50px rgba(0,0,0,0.55)' : undefined,
                }}
            >
                {children}
            </div>
        </div>
    );
};

// ── Clock Widget ─────────────────────────────────────────────────────────

const ClockWidget: React.FC = () => {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    const s = now.getSeconds().toString().padStart(2, '0');
    const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    return (
        <div className="widget-glass p-5 flex flex-col items-center gap-2 min-w-[200px]">
            <div className="text-[48px] font-light text-white leading-none tabular-nums"
                style={{ fontFamily: 'Inter, -apple-system, sans-serif', letterSpacing: '-0.04em' }}>
                {h}<span className="opacity-50">:</span>{m}
                <span className="text-[28px] opacity-35 ml-1">{s}</span>
            </div>
            <div className="text-[13px] text-white/45 font-medium"
                style={{ fontFamily: 'Inter, sans-serif' }}>
                {dateStr}
            </div>
        </div>
    );
};

// ── WakaTime Widget ──────────────────────────────────────────────────────

const WAKATIME_USER = 'Sujayz';

const WakaWidget: React.FC = () => {
    const [data, setData] = useState<WakaStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [isMock, setIsMock] = useState(false);

    const fetchWaka = useCallback(async () => {
        setLoading(true);
        try {
            const targetUrl = `https://wakatime.com/api/v1/users/${WAKATIME_USER}/stats/all_time`;
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
            
            const res = await fetch(proxyUrl);
            if (!res.ok) {
                // console.error(`WakaTime API HTTP ${res.status}`);
                throw new Error(`HTTP ${res.status}`);
            }
            const json = await res.json();
            const d = json.data || {};

            // Check if we actually received meaningful data (total_seconds > 0 or has languages)
            if ((d.total_seconds && d.total_seconds > 0) || (d.languages && d.languages.length > 0)) {
                setData({
                    total_seconds: d.total_seconds || 0,
                    daily_average: d.daily_average || 0,
                    languages: (d.languages || []).slice(0, 5),
                    best_day: d.best_day || null,
                });
                setIsMock(false);
            } else {
                // If API returns empty/zeroed data (often due to privacy settings), fallback to mock
                throw new Error("Empty data received from API");
            }
        } catch (e) {
            // console.warn("Using WakaTime demo data:", e);
            setData(MOCK_WAKA);
            setIsMock(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchWaka(); }, [fetchWaka]);

    if (loading) {
        return (
            <div className="widget-glass p-5 flex flex-col gap-2.5 min-w-[260px]">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">⌨</span>
                    <span className="text-[12px] font-semibold text-white/50 uppercase tracking-widest">WakaTime · Loading…</span>
                </div>
                <div className="flex flex-col gap-2">
                    {[100, 75, 120].map((w, i) => (
                        <div key={i} className="h-2 rounded-full animate-pulse" style={{ width: w, background: 'rgba(255,255,255,0.10)' }} />
                    ))}
                </div>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="widget-glass p-5 flex flex-col gap-4 min-w-[260px]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-lg">⌨</span>
                    <span className="text-[12px] font-semibold text-white/50 uppercase tracking-widest">WakaTime · All Time</span>
                </div>
                {isMock && (
                    <span className="text-[9px] font-medium px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(245,166,35,0.18)', color: '#f5a623', border: '1px solid rgba(245,166,35,0.3)' }}>
                        DEMO
                    </span>
                )}
            </div>

            <div className="flex gap-3.5">
                <div className="flex-1 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="text-[20px] font-semibold text-white leading-none tabular-nums"
                        style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.03em' }}>
                        {fmtHours(data.total_seconds)}
                    </div>
                    <div className="text-[10px] text-white/35 mt-1 uppercase tracking-wider">Total</div>
                </div>
                <div className="flex-1 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="text-[20px] font-semibold text-white leading-none tabular-nums"
                        style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.03em' }}>
                        {fmtHours(data.daily_average)}
                    </div>
                    <div className="text-[10px] text-white/35 mt-1 uppercase tracking-wider">Daily avg</div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                {data.languages.slice(0, 4).map(lang => {
                    const col = LANG_COLORS[lang.name] ?? '#64748b';
                    return (
                        <div key={lang.name}>
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[11px] font-medium text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>{lang.name}</span>
                                <span className="text-[10px] text-white/35 tabular-nums">{lang.percent.toFixed(0)}%</span>
                            </div>
                            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                                <div className="h-full rounded-full"
                                    style={{ width: `${lang.percent}%`, background: col, boxShadow: `0 0 6px ${col}66` }} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {data.best_day && (
                <div className="flex items-center gap-2 pt-1.5 border-t border-white/6">
                    <span className="text-[12px]">🏆</span>
                    <span className="text-[11px] text-white/40" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Best: {data.best_day.date} · {fmtHours(data.best_day.total_seconds)}
                    </span>
                </div>
            )}
        </div>
    );
};



interface QuickLinksWidgetProps { onOpenResume: () => void; }

const LINKS = [
    { icon: '🐙', label: 'GitHub', url: 'https://github.com/Sujayz22', external: true },
    { icon: '💼', label: 'LinkedIn', url: 'https://in.linkedin.com/in/sujaypandajsx', external: true },
    { icon: '✉', label: 'Email', url: 'mailto:sujayjsx@gmail.com', external: true },
];

const QuickLinksWidget: React.FC<QuickLinksWidgetProps> = ({ onOpenResume }) => (
    <div className="widget-glass p-4 flex flex-col gap-2.5 min-w-[200px]">
        <div className="text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-1">Quick Links</div>
        {LINKS.map(l => (
            <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 py-1.5 px-2.5 rounded-lg transition-all duration-150 hover:bg-white/10 cursor-pointer group"
            >
                <span className="text-lg">{l.icon}</span>
                <span className="text-[13px] font-medium text-white/65 group-hover:text-white/90 transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif' }}>{l.label}</span>
                <span className="ml-auto text-[10px] text-white/20 group-hover:text-white/40 transition-colors">↗</span>
            </a>
        ))}
        {/* Resume — opens QuickLook modal */}
        <button
            onClick={onOpenResume}
            className="flex items-center gap-3 py-1.5 px-2.5 rounded-lg transition-all duration-150 hover:bg-white/10 cursor-pointer group w-full text-left"
        >
            <span className="text-lg">📄</span>
            <span className="text-[13px] font-medium text-white/65 group-hover:text-white/90 transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}>Resume</span>
            <span className="ml-auto text-[10px] text-white/20 group-hover:text-white/40 transition-colors">↗</span>
        </button>
    </div>
);

// ── Desktop Widgets Container ────────────────────────────────────────────

interface DesktopWidgetsProps {
    onOpenResume: () => void;
}

// Initial positions — widgets on RIGHT side, stacked column
const vpW = () => (typeof window !== 'undefined' ? window.innerWidth : 1440);
// We use a fixed right offset so they appear at ~right-edge - 260px
const RX = () => vpW() - 272;

export const DesktopWidgets: React.FC<DesktopWidgetsProps> = ({ onOpenResume }) => {
    const rx = RX();
    return (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
            <DraggableWidget initialX={rx} initialY={36} storageKey="widget-clock">
                <ClockWidget />
            </DraggableWidget>
            <DraggableWidget initialX={rx} initialY={185} storageKey="widget-waka">
                <WakaWidget />
            </DraggableWidget>
            <DraggableWidget initialX={rx} initialY={465} storageKey="widget-links">
                <QuickLinksWidget onOpenResume={onOpenResume} />
            </DraggableWidget>
        </div>
    );
};
