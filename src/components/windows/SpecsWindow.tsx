import React, { useEffect, useRef } from 'react';
import { drawSpecsAvatar } from '../../utils/pixelArt';

const SKILLS = [
    { name: 'Java',       pct: 90, color: '#f5a623' },
    { name: 'TypeScript', pct: 85, color: '#38bdf8' },
    { name: 'JavaScript', pct: 88, color: '#ffd700' },
    { name: 'Python',     pct: 72, color: '#a8e634' },
    { name: 'SQL',        pct: 80, color: '#a78bfa' },
];

const STACKS: { label: string; items: string[]; color: string }[] = [
    { label: '🚀 Frameworks', color: '#38bdf8',
      items: ['Spring Boot', 'React', 'Node.js', 'Express', 'Vite', 'Tailwind'] },
    { label: '☁ Cloud & DevOps', color: '#a8e634',
      items: ['Docker', 'OCI', 'Kubernetes', 'Prometheus', 'Grafana', 'Redis'] },
    { label: '🗄 Databases', color: '#f5a623',
      items: ['PostgreSQL', 'MongoDB', 'QuestDB', 'MySQL'] },
];

export const SpecsWindow: React.FC = () => {
    const avatarRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (avatarRef.current) {
            drawSpecsAvatar(avatarRef.current.getContext('2d')!, 80, 80);
        }
    }, []);

    return (
        <div className="flex flex-col" style={{ background: 'linear-gradient(160deg, rgba(12,20,44,0.6) 0%, rgba(8,14,32,0.8) 100%)' }}>
            {/* Header hero */}
            <div className="relative flex items-center gap-4 px-5 py-5 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(25,40,90,0.60) 0%, rgba(15,25,60,0.70) 100%)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {/* Glow orb */}
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-30"
                    style={{ background: 'var(--accent)' }} />
                <canvas ref={avatarRef} width={80} height={80}
                    className="rounded-2xl flex-shrink-0"
                    style={{ border: '2px solid rgba(255,255,255,0.15)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }} />
                <div className="relative z-10">
                    <div className="text-[17px] font-bold text-white mb-0.5"
                        style={{ fontFamily: 'Inter, -apple-system, sans-serif', letterSpacing: '-0.03em' }}>
                        Sujay Arun Panda
                    </div>
                    <div className="text-[12px] font-medium mb-1.5" style={{ color: 'rgba(140,185,255,0.85)' }}>
                        Full-Stack Developer · MCA Student @ VIT
                    </div>
                    <div className="flex gap-1.5">
                        <span className="glass-tag-accent text-[9px]">⚡ Available for Opportunities</span>
                        <span className="glass-tag text-[9px]">SujayOS v2.0</span>
                    </div>
                </div>
            </div>

            <div className="p-4 flex flex-col gap-4">
                {/* Languages — skill bars */}
                <div className="rounded-2xl p-4" style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    backdropFilter: 'blur(16px)',
                }}>
                    <div className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-3">⚡ Languages</div>
                    <div className="flex flex-col gap-2.5">
                        {SKILLS.map(s => (
                            <div key={s.name} className="flex items-center gap-3">
                                <span className="text-[11px] font-medium text-white/70 w-22 flex-shrink-0"
                                    style={{ fontFamily: 'Inter, sans-serif', width: 84 }}>{s.name}</span>
                                <div className="flex-1 h-1.5 rounded-full overflow-hidden"
                                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div
                                        className="bar-fill h-full rounded-full"
                                        style={{
                                            width: `${s.pct}%`,
                                            background: `linear-gradient(90deg, ${s.color}, ${s.color}99)`,
                                            boxShadow: `0 0 8px ${s.color}66`,
                                        }}
                                    />
                                </div>
                                <span className="text-[10px] text-white/40 w-8 text-right flex-shrink-0">{s.pct}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stack groups */}
                {STACKS.map(stack => (
                    <div key={stack.label} className="rounded-2xl p-4" style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(12px)',
                    }}>
                        <div className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-2.5">{stack.label}</div>
                        <div className="flex flex-wrap gap-1.5">
                            {stack.items.map(item => (
                                <span key={item}
                                    className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                                    style={{
                                        background: `${stack.color}18`,
                                        border: `1px solid ${stack.color}30`,
                                        color: stack.color,
                                        fontFamily: 'Inter, sans-serif',
                                    }}>
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
