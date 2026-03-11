import React, { useEffect, useState } from 'react';

interface BootScreenProps {
    onComplete: () => void;
}

const MESSAGES = [
    'Initializing SujayOS…',
    'Loading Liquid Glass engine…',
    'Mounting file system…',
    'Starting window compositor…',
    'Connecting services…',
    'Ready.',
];

const STEPS = [14, 28, 48, 66, 82, 100];

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [msgIndex, setMsgIndex] = useState(0);
    const [hiding, setHiding] = useState(false);

    useEffect(() => {
        let i = 0;
        const advance = () => {
            if (i >= STEPS.length) {
                setTimeout(() => {
                    setHiding(true);
                    setTimeout(onComplete, 900);
                }, 500);
                return;
            }
            setProgress(STEPS[i]);
            setMsgIndex(i);
            i++;
            setTimeout(advance, 280 + Math.random() * 220);
        };
        const t = setTimeout(advance, 450);
        return () => clearTimeout(t);
    }, [onComplete]);

    return (
        <div
            className={`fixed inset-0 flex flex-col items-center justify-center z-[2000] transition-all duration-900 ${hiding ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'}`}
            style={{
                background: 'linear-gradient(165deg, #0c1c44 0%, #101835 40%, #060f22 100%)',
                transition: 'opacity 0.9s ease, transform 0.9s ease',
            }}
        >
            {/* Ambient glow orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
                    style={{ background: '#3778f0', top: '15%', left: '20%', transform: 'translate(-50%, -50%)' }} />
                <div className="absolute w-80 h-80 rounded-full blur-3xl opacity-15"
                    style={{ background: '#8c46e6', top: '60%', right: '20%', transform: 'translate(50%, 50%)' }} />
            </div>

            <div className="relative flex flex-col items-center gap-7">
                {/* Logo mark — glowing S */}
                <div className="relative">
                    <div className="absolute inset-0 rounded-2xl blur-xl opacity-60"
                        style={{ background: 'var(--accent, #a8e634)', transform: 'scale(1.3)' }} />
                    <div
                        className="relative w-20 h-20 rounded-2xl flex items-center justify-center text-[36px] font-bold"
                        style={{
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.20)',
                            backdropFilter: 'blur(20px)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.25)',
                            fontFamily: 'Inter, -apple-system, sans-serif',
                            color: 'var(--accent, #a8e634)',
                            letterSpacing: '-0.04em',
                        }}
                    >
                        S
                    </div>
                </div>

                {/* Title */}
                <div className="flex flex-col items-center gap-1.5">
                    <div className="text-[28px] font-semibold text-white tracking-tight"
                        style={{ fontFamily: 'Inter, -apple-system, sans-serif', letterSpacing: '-0.04em' }}>
                        SujayOS
                    </div>
                    <div className="text-[12px] font-medium text-white/40"
                        style={{ fontFamily: 'Inter, -apple-system, sans-serif', letterSpacing: '-0.01em' }}>
                        v2.0 · Tahoe Edition
                    </div>
                </div>

                {/* Progress section */}
                <div className="flex flex-col items-center gap-3 w-60">
                    {/* Status message */}
                    <div className="text-[11px] text-white/40 h-4 transition-all duration-300"
                        style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}>
                        {MESSAGES[msgIndex]}
                    </div>

                    {/* Glass progress bar */}
                    <div className="w-full h-[3px] rounded-full overflow-hidden"
                        style={{ background: 'rgba(255,255,255,0.10)', border: '0.5px solid rgba(255,255,255,0.08)' }}>
                        <div
                            className="h-full rounded-full transition-all duration-500 ease-out"
                            style={{
                                width: `${progress}%`,
                                background: 'linear-gradient(90deg, var(--accent, #a8e634), rgba(168,230,52,0.7))',
                                boxShadow: '0 0 8px var(--accent-glow, rgba(168,230,52,0.5))',
                            }}
                        />
                    </div>

                    {/* Dots */}
                    <div className="flex gap-1.5 mt-1">
                        {[0, 1, 2, 3, 4].map(i => (
                            <div
                                key={i}
                                className="spinner-dot w-1.5 h-1.5 rounded-full"
                                style={{ background: 'rgba(255,255,255,0.25)' }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
