import React from 'react';
import type { WindowId } from '../../hooks/useWindowManager';

interface Project {
    icon: string;
    name: string;
    desc: string;
    tags: string[];
    featured?: boolean;
    window?: WindowId;
    link?: string;
    liveUrl?: string;
    accentColor: string;
    glowColor: string;
}

const PROJECTS: Project[] = [
    {
        icon: '🎮', name: 'HabitForge', featured: true, window: 'habitforge',
        desc: 'Full-stack gamified habit tracker with microservices, real-time XP system, clubs, leaderboards, and Prometheus monitoring',
        tags: ['Node.js', 'TypeScript', 'React', 'Redis', 'Docker'],
        link: 'https://github.com/Sujayz22/HabitForge',
        liveUrl: 'https://habit-forge.app',
        accentColor: '#a8e634',
        glowColor: 'rgba(168,230,52,0.35)',
    },
    {
        icon: '📈', name: 'SJINVESTS',
        desc: 'Algorithmic trading platform with Upstox API, decision engine, paper trading, Nifty 500 universe & QuestDB time-series',
        tags: ['TypeScript', 'QuestDB', 'Upstox API'],
        link: 'https://github.com/Sujayz22/sjinvests',
        accentColor: '#38bdf8',
        glowColor: 'rgba(56,189,248,0.30)',
    },
    {
        icon: '🚀', name: 'DevOS',
        desc: 'This portfolio — a macOS Tahoe UI simulation with Liquid Glass, spring physics & Spotlight search',
        tags: ['React', 'TypeScript', 'Tailwind', 'Canvas'],
        link: 'https://github.com/Sujayz22/sujayos',
        liveUrl: 'https://Sujayz22.dev',
        accentColor: '#a78bfa',
        glowColor: 'rgba(167,139,250,0.30)',
    },
    {
        icon: '📊', name: 'AlgoTrading Engine',
        desc: 'Real-time stock market analysis with rule-based decision engine, WebSocket streaming, and automated order management',
        tags: ['Node.js', 'WebSocket', 'PostgreSQL'],
        link: 'https://github.com/Sujayz22/algotrading',
        accentColor: '#f5a623',
        glowColor: 'rgba(245,166,35,0.28)',
    },
];

interface ProjectsWindowProps {
    onOpenHabitForge: () => void;
}

export const ProjectsWindow: React.FC<ProjectsWindowProps> = ({ onOpenHabitForge }) => (
    <div className="p-3 grid grid-cols-2 gap-3" style={{ background: 'linear-gradient(160deg, rgba(12,20,44,0.55) 0%, rgba(8,14,32,0.75) 100%)' }}>
        {PROJECTS.map(p => (
            <div
                key={p.name}
                onClick={p.featured ? onOpenHabitForge : undefined}
                className={`relative rounded-2xl overflow-hidden transition-all duration-250 group
                    ${p.featured ? 'col-span-2 cursor-pointer' : 'cursor-default hover:-translate-y-0.5'}`}
                style={{
                    background: p.featured
                        ? 'linear-gradient(135deg, rgba(15,25,55,0.75), rgba(10,18,45,0.85))'
                        : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${p.featured ? p.accentColor + '40' : 'rgba(255,255,255,0.10)'}`,
                    backdropFilter: 'blur(20px)',
                    boxShadow: `0 8px 24px rgba(0,0,0,0.3)`,
                    transition: 'all 0.22s cubic-bezier(0.34, 1.2, 0.64, 1)',
                }}
                onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 36px ${p.glowColor}, 0 4px 12px rgba(0,0,0,0.3)`;
                }}
                onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
                }}
            >
                {/* Accent gradient top border */}
                <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${p.accentColor}, transparent)` }} />

                {p.featured && (
                    <div className="absolute top-0 right-0 text-[10px] font-bold px-3 py-1.5 rounded-bl-[16px] z-10"
                        style={{ background: p.accentColor, color: '#0a1200', letterSpacing: '0.05em' }}>
                        ★ FEATURED
                    </div>
                )}

                <div className={`p-4 ${p.featured ? 'flex flex-col sm:flex-row gap-5 items-start' : ''}`}>
                    {/* Left: Icon, Title, Desc */}
                    <div className={p.featured ? 'flex-1 min-w-[200px]' : ''}>
                        <div className="text-3xl mb-2.5">{p.icon}</div>
                        <h3 className="text-[13px] font-semibold text-white mb-1.5"
                            style={{ fontFamily: 'Inter, -apple-system, sans-serif', letterSpacing: '-0.02em' }}>
                            {p.name}
                        </h3>
                        <p className="text-[10px] text-white/50 leading-relaxed mb-3"
                            style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}>
                            {p.desc}
                        </p>
                    </div>

                    {p.featured && <div className="hidden sm:block flex-shrink-0 w-px self-stretch bg-white/8 mx-1" />}

                    {/* Right: Tags and Links */}
                    <div className={p.featured ? 'w-full sm:w-56 flex-shrink-0 flex flex-col justify-between h-full min-h-[80px] pt-4 sm:pt-6' : ''}>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {p.tags.map(t => (
                                <span key={t} className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                                    style={{
                                        background: `${p.accentColor}20`,
                                        border: `1px solid ${p.accentColor}35`,
                                        color: p.accentColor,
                                    }}>
                                    {t}
                                </span>
                            ))}
                        </div>
                        <div className={`flex flex-wrap items-center gap-2 ${p.featured ? 'mt-auto' : ''}`}>
                            {p.featured && (
                                <button
                                    onClick={e => { e.stopPropagation(); onOpenHabitForge(); }}
                                    className="text-[11px] font-semibold transition-all px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                                    style={{
                                        color: p.accentColor,
                                        background: `${p.accentColor}15`,
                                        border: `1px solid ${p.accentColor}40`,
                                        fontFamily: 'Inter, sans-serif'
                                    }}
                                >
                                    ⚡ Launch App →
                                </button>
                            )}
                            {p.link && (
                                <a href={p.link} target="_blank" rel="noopener noreferrer"
                                    className="text-[11px] font-semibold transition-all px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                                    style={{
                                        color: 'rgba(255,255,255,0.7)',
                                        background: 'rgba(255,255,255,0.06)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                    }}
                                    onClick={e => e.stopPropagation()}>
                                    Source ↗
                                </a>
                            )}
                            {p.liveUrl && (
                                <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                                    className="text-[11px] font-semibold transition-all px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:brightness-125"
                                    style={{
                                        color: p.accentColor,
                                        background: `${p.accentColor}15`,
                                        border: `1px solid ${p.accentColor}40`,
                                    }}
                                    onClick={e => e.stopPropagation()}>
                                    🌐 Live ↗
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);
