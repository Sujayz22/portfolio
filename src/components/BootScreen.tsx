import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { drawBootLogo } from '../utils/pixelArt';

interface BootScreenProps {
    onComplete: () => void;
}

const STEPS = [15, 35, 55, 75, 90, 100];

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [progress, setProgress] = useState(0);
    const [hiding, setHiding] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d')!;
        drawBootLogo(ctx, canvas.width, canvas.height);
    }, []);

    useEffect(() => {
        let i = 0;
        const advance = () => {
            if (i >= STEPS.length) {
                // Done → fade out then call onComplete
                setTimeout(() => {
                    setHiding(true);
                    setTimeout(onComplete, 800);
                }, 400);
                return;
            }
            setProgress(STEPS[i]);
            i++;
            setTimeout(advance, 260 + Math.random() * 200);
        };
        const t = setTimeout(advance, 400);
        return () => clearTimeout(t);
    }, [onComplete]);

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-[2000] transition-opacity duration-700 ${hiding ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            style={{ background: '#c8c8c0' }}
        >
            <div className="flex flex-col items-center gap-4">
                <canvas ref={canvasRef} width={120} height={120} />
                <div className="font-pixel text-[22px] text-[#1a1a18] tracking-[4px]">SujayOS</div>
                <div className="font-mono text-[10px] text-[#787872] tracking-wider">v1.0 · Full-Stack Developer Edition</div>

                {/* Spinner dots */}
                <div className="flex gap-2 mt-2">
                    {[0, 1, 2, 3, 4].map(i => (
                        <div key={i} className="spinner-dot w-2 h-2 rounded-full bg-[#b0b0a8]" />
                    ))}
                </div>

                {/* Progress bar */}
                <div className="w-60 h-1.5 bg-[#a8a8a0] rounded-sm overflow-hidden border border-[#888880]">
                    <div
                        className="h-full bg-[#1a1a18] rounded-sm transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
};
