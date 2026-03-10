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
}

const PROJECTS: Project[] = [
    {
        icon: '🎮', name: 'HabitForge', featured: true, window: 'habitforge',
        desc: 'Full-stack gamified habit tracker with microservices, real-time XP system, clubs, leaderboards, and Prometheus monitoring',
        tags: ['Node.js', 'TypeScript', 'React', 'Redis', 'Docker'],
        link: 'https://github.com/Sujayz22/HabitForge',
        liveUrl: 'https://habit-forge.app',
    },
    {
        icon: '📈', name: 'SJINVESTS',
        desc: 'Algorithmic trading platform with Upstox API, decision engine, paper trading, Nifty 500 universe & QuestDB time-series',
        tags: ['TypeScript', 'QuestDB', 'Upstox API'],
        link: 'https://github.com/Sujayz22/sjinvests',
    },
    {
        icon: '🚀', name: 'SujayOS',
        desc: 'This portfolio itself — a macOS-inspired OS simulation with draggable windows, spring physics & pixel art icons',
        tags: ['React', 'TypeScript', 'Tailwind', 'Canvas'],
        link: 'https://github.com/Sujayz22/sujayos',
        liveUrl: 'https://Sujayz22.dev',
    },
    {
        icon: '📊', name: 'AlgoTrading Engine',
        desc: 'Real-time stock market analysis with rule-based decision engine, WebSocket streaming, and automated order management',
        tags: ['Node.js', 'WebSocket', 'PostgreSQL'],
        link: 'https://github.com/Sujayz22/algotrading',
    },
];

interface ProjectsWindowProps {
    onOpenHabitForge: () => void;
}

export const ProjectsWindow: React.FC<ProjectsWindowProps> = ({ onOpenHabitForge }) => (
    <div className="p-3 grid grid-cols-2 gap-3">
        {PROJECTS.map(p => (
            <div
                key={p.name}
                onClick={p.featured ? onOpenHabitForge : undefined}
                className={`relative rounded-lg p-3.5 border transition-all duration-200 overflow-hidden
          ${p.featured
                        ? 'col-span-2 border-[#2a58c5] cursor-pointer hover:shadow-[0_8px_24px_rgba(42,88,197,0.4)]'
                        : 'border-[#d4d4cc] bg-white hover:border-[#c5d8f8] hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-lg cursor-default'
                    }`}
                style={p.featured ? { background: 'linear-gradient(135deg, #0f1f3d, #1a2e5a)' } : {}}
            >
                {p.featured && (
                    <div className="absolute top-2.5 right-2.5 font-pixel text-[8px] bg-[#ffd700] text-[#1a0a00] px-1.5 py-0.5 rounded">
                        ★ FEATURED
                    </div>
                )}
                <div className="text-3xl mb-2">{p.icon}</div>
                <h3 className={`text-[13px] font-mono font-bold mb-1.5 ${p.featured ? 'text-white' : 'text-[#1a1a18]'}`}>{p.name}</h3>
                <p className={`text-[10px] font-mono leading-relaxed mb-2.5 ${p.featured ? 'text-[#9ab0d4]' : 'text-[#4a4a44]'}`}>{p.desc}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                    {p.tags.map(t => (
                        <span
                            key={t}
                            className={`text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-full border
                ${p.featured
                                    ? 'bg-white/10 border-white/20 text-[#b8d0f8]'
                                    : 'bg-[#e8f0fe] border-[#c5d8f8] text-[#2a58c5]'
                                }`}
                        >
                            {t}
                        </span>
                    ))}
                </div>
                {p.featured
                    ? (
                        <div className="flex items-center gap-3" onClick={e => e.stopPropagation()}>
                            <button
                                onClick={onOpenHabitForge}
                                className="text-[10px] font-mono font-bold text-[#00ff88] hover:underline"
                            >
                                ⚡ Launch App →
                            </button>
                            {p.link && (
                                <a href={p.link} target="_blank" rel="noopener noreferrer"
                                    className="text-[10px] font-mono font-bold text-[#7aaeff] hover:underline">
                                    View Source ↗
                                </a>
                            )}
                            {p.liveUrl && (
                                <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                                    className="text-[10px] font-mono font-bold text-[#ffd700] hover:underline">
                                    🌐 Live Site ↗
                                </a>
                            )}
                        </div>
                    )
                    : (
                        <div className="flex items-center gap-3">
                            {p.link && (
                                <a href={p.link} target="_blank" rel="noopener noreferrer"
                                    className="text-[10px] font-mono font-bold text-[#2a58c5] hover:underline">
                                    View Source ↗
                                </a>
                            )}
                            {p.liveUrl && (
                                <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                                    className="text-[10px] font-mono font-bold text-[#27ae60] hover:underline">
                                    🌐 Live Site ↗
                                </a>
                            )}
                        </div>
                    )
                }
            </div>
        ))}
    </div>
);
