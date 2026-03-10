import React from 'react';

interface ZoomControlProps {
    zoom: number;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onReset: () => void;
    min: number;
    max: number;
}

export const ZoomControl: React.FC<ZoomControlProps> = ({ zoom, onZoomIn, onZoomOut, onReset, min, max }) => {
    const pct = Math.round(zoom * 100);

    const btnBase =
        'w-7 h-7 flex items-center justify-center rounded-md text-[13px] font-mono font-bold transition-all duration-150 select-none cursor-pointer ' +
        'bg-[rgba(230,230,224,0.85)] border border-[#aaa89f] text-[#1a1a18] hover:bg-white hover:border-[#888880] hover:scale-110 active:scale-95 shadow-sm';

    return (
        <div
            className="fixed bottom-16 right-4 z-[850] flex items-center gap-1 px-2 py-1.5 rounded-xl border border-white/40"
            style={{
                background: 'rgba(220,220,210,0.75)',
                backdropFilter: 'blur(16px) saturate(160%)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.5)',
            }}
            title="Desktop Zoom"
        >
            {/* Zoom out */}
            <button
                className={btnBase}
                onClick={onZoomOut}
                disabled={zoom <= min}
                aria-label="Zoom out"
                style={{ opacity: zoom <= min ? 0.4 : 1 }}
            >
                −
            </button>

            {/* Percentage badge / reset on click */}
            <button
                className="min-w-[46px] h-7 px-1.5 flex items-center justify-center rounded-md text-[11px] font-mono font-bold text-[#1a1a18] bg-[rgba(255,255,255,0.5)] border border-[#c8c8c0] hover:bg-white transition-all cursor-pointer select-none"
                onClick={onReset}
                title="Reset zoom to 100%"
                aria-label={`Current zoom: ${pct}%. Click to reset.`}
            >
                {pct}%
            </button>

            {/* Zoom in */}
            <button
                className={btnBase}
                onClick={onZoomIn}
                disabled={zoom >= max}
                aria-label="Zoom in"
                style={{ opacity: zoom >= max ? 0.4 : 1 }}
            >
                +
            </button>

            {/* Zoom icon label */}
            <span className="text-[11px] ml-0.5 opacity-50 select-none font-mono">🔍</span>
        </div>
    );
};
