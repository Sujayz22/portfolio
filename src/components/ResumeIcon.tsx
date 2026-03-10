import React, { useEffect, useRef, useState } from 'react';
import { drawResumeIcon } from '../utils/pixelArt';

interface ResumeIconProps {
    onOpen: () => void;
}

export const ResumeIcon: React.FC<ResumeIconProps> = ({ onOpen }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hovered, setHovered] = useState(false);
    const [bouncing, setBouncing] = useState(false);

    useEffect(() => {
        if (!canvasRef.current) return;
        drawResumeIcon(canvasRef.current.getContext('2d')!, 64, 72);
    }, []);

    // Spacebar to open QuickLook when this icon is focused
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.code === 'Space') {
            e.preventDefault();
            triggerOpen();
        }
    };

    const triggerOpen = () => {
        setBouncing(true);
        setTimeout(() => setBouncing(false), 450);
        onOpen();
    };

    return (
        <div
            role="button"
            tabIndex={0}
            aria-label="Resume.pdf — press Space to QuickLook"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={triggerOpen}
            onKeyDown={handleKeyDown}
            className={`relative flex flex-col items-center w-20 cursor-pointer rounded-lg p-1.5 pb-1 transition-all select-none
        hover:bg-white/20 hover:scale-105 ${bouncing ? 'icon-bouncing' : ''}`}
        >
            {/* Spacebar tooltip */}
            {hovered && (
                <div
                    className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-mono font-semibold px-2 py-1 rounded-md pointer-events-none z-50 flex items-center gap-1"
                    style={{
                        background: 'rgba(10,10,18,0.88)',
                        color: 'white',
                        backdropFilter: 'blur(6px)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                    }}
                >
                    <kbd className="text-[8px] px-1 py-0.5 rounded bg-white/20 border border-white/30">␣ Space</kbd>
                    to preview
                </div>
            )}

            <canvas ref={canvasRef} width={64} height={72} className="block" />

            <span
                className="mt-1 text-[10px] font-mono text-white text-center leading-tight"
                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.6)' }}
            >
                Resume.pdf
            </span>
        </div>
    );
};
