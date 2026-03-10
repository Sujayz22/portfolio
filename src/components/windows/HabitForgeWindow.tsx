import React, { useState } from 'react';

const StatBlock: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="text-center">
        <div className="text-[6px] font-pixel text-game-primary opacity-70 tracking-widest mb-0.5">{label}</div>
        <div className="text-[12px] font-pixel game-gold-glow" style={{ color: '#ffd700' }}>{value}</div>
    </div>
);

interface Quest { name: string; reward: string; done: boolean; }

const INITIAL_QUESTS: Quest[] = [
    { name: 'Morning Code Sprint', reward: '+120 XP · +15 🔥', done: true },
    { name: 'Read Technical Paper', reward: '+80 XP · +10 🔥', done: false },
    { name: 'Algorithm Challenge', reward: '+200 XP · +20 🔥', done: false },
];

const LB = [
    { rank: '👑 1', name: 'SujayArun', score: '9,240 pts', gold: true },
    { rank: ' #2', name: 'CodeNinja_V', score: '7,810 pts', gold: false },
    { rank: ' #3', name: 'DevQueen99', score: '6,550 pts', gold: false },
];

const TECH = ['Node.js', 'TypeScript', 'React', 'Microservices', 'Redis', 'Docker', 'Prometheus'];

export const HabitForgeWindow: React.FC = () => {
    const [xp, setXp] = useState(2840);
    const [quests, setQuests] = useState(INITIAL_QUESTS);
    const targetXp = 3500;
    const xpPct = Math.min(100, Math.round((xp / targetXp) * 100));

    const claimQuest = (i: number) => {
        if (quests[i].done) return;
        setQuests(prev => prev.map((q, idx) => idx === i ? { ...q, done: true } : q));
        const gain = i === 1 ? 80 : 200;
        setXp(prev => Math.min(prev + gain, targetXp));
    };

    return (
        <div className="p-4 min-h-[380px]" style={{ background: '#0a0a1a', fontFamily: '"Press Start 2P"' }}>

            {/* Header */}
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <div className="text-[14px] tracking-[2px] game-glow-orange" style={{ color: '#ff6b35' }}>
                    HABIT<span style={{ color: '#00ff88' }}>FORGE</span>
                </div>
                <div className="flex gap-3 bg-[rgba(0,255,136,0.06)] border border-[rgba(0,255,136,0.2)] px-3 py-1.5 rounded">
                    <StatBlock label="LVL" value={12} />
                    <StatBlock label="XP" value={xp} />
                    <StatBlock label="🔥" value={7} />
                    <StatBlock label="GOLD" value={450} />
                </div>
            </div>

            {/* XP Bar */}
            <div className="flex items-center gap-2 mb-4">
                <span className="text-[6px] text-game-primary opacity-70 tracking-wide whitespace-nowrap">XP TO NEXT LEVEL</span>
                <div className="flex-1 h-3 bg-black/50 rounded border border-[rgba(0,255,136,0.3)] overflow-hidden">
                    <div
                        className="h-full rounded relative overflow-hidden transition-all duration-1000"
                        style={{ width: `${xpPct}%`, background: 'linear-gradient(90deg, #00aa55, #00ff88)' }}
                    >
                        <div className="xp-shimmer absolute inset-0" />
                    </div>
                </div>
                <span className="text-[6px] text-game-primary opacity-70 whitespace-nowrap">{xp}/{targetXp}</span>
            </div>

            {/* Quests */}
            <div className="border border-[rgba(0,255,136,0.2)] rounded overflow-hidden mb-3">
                <div className="bg-[rgba(0,255,136,0.1)] px-3 py-1.5 text-[8px] tracking-[2px] border-b border-[rgba(0,255,136,0.2)]"
                    style={{ color: '#00ff88' }}>
                    ⚔ DAILY QUESTS
                </div>
                {quests.map((q, i) => (
                    <div key={i} className={`flex items-center gap-2.5 px-3 py-2.5 border-b border-[rgba(0,255,136,0.08)] last:border-b-0 hover:bg-[rgba(0,255,136,0.04)] transition-colors ${q.done ? 'opacity-60' : ''}`}>
                        <div className="w-5 h-5 border-2 border-[rgba(0,255,136,0.4)] rounded flex items-center justify-center text-[11px] flex-shrink-0"
                            style={{ background: 'rgba(0,255,136,0.05)', color: '#00ff88' }}>
                            {q.done ? '✔' : ''}
                        </div>
                        <div className="flex-1">
                            <div className="text-[8px] mb-1 tracking-wide" style={{ color: '#e0e0d8' }}>{q.name}</div>
                            <div className="text-[7px]" style={{ color: '#ffd700' }}>{q.reward}</div>
                        </div>
                        {q.done
                            ? <span className="text-[7px] px-1.5 py-0.5 border rounded tracking-wide" style={{ color: '#00ff88', borderColor: 'rgba(0,255,136,0.4)', background: 'rgba(0,255,136,0.1)' }}>DONE</span>
                            : (
                                <button
                                    onClick={() => claimQuest(i)}
                                    className="text-[7px] px-2 py-1 border rounded tracking-wide cursor-pointer transition-all hover:scale-105 active:scale-95"
                                    style={{ color: '#ff6b35', borderColor: 'rgba(255,107,53,0.4)', background: 'rgba(255,107,53,0.1)' }}
                                >
                                    {i === 1 ? 'CLAIM' : 'START'}
                                </button>
                            )
                        }
                    </div>
                ))}
            </div>

            {/* Leaderboard */}
            <div className="border border-[rgba(255,215,0,0.25)] rounded overflow-hidden mb-3">
                <div className="bg-[rgba(255,215,0,0.08)] px-3 py-1.5 text-[8px] tracking-[2px] border-b border-[rgba(255,215,0,0.2)]"
                    style={{ color: '#ffd700' }}>
                    🏆 CLUB LEADERBOARD
                </div>
                {LB.map((row, i) => (
                    <div key={i} className={`flex items-center gap-2.5 px-3 py-2 border-b border-[rgba(255,215,0,0.06)] last:border-b-0 text-[8px] ${row.gold ? 'bg-[rgba(255,215,0,0.06)]' : ''}`}
                        style={{ color: row.gold ? '#ffd700' : '#b0a890' }}>
                        <span className="w-8 flex-shrink-0">{row.rank}</span>
                        <span className="flex-1">{row.name}</span>
                        <span>{row.score}</span>
                    </div>
                ))}
            </div>

            {/* Tech chips */}
            <div className="flex flex-wrap gap-1.5 mb-3">
                {TECH.map(t => (
                    <span key={t} className="text-[7px] px-2 py-0.5 border rounded tracking-wide" style={{ color: '#c4a8f8', borderColor: 'rgba(139,92,246,0.4)', background: 'rgba(139,92,246,0.1)' }}>
                        {t}
                    </span>
                ))}
            </div>

            {/* CTA */}
            <div className="text-center flex gap-2">
                <a
                    href="https://github.com/Sujayz22/HabitForge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[8px] px-5 py-2.5 border-2 tracking-[2px] transition-all duration-200 hover:scale-[1.03]"
                    style={{
                        color: '#00ff88', borderColor: '#00ff88',
                        boxShadow: '0 0 12px rgba(0,255,136,0.2), inset 0 0 12px rgba(0,255,136,0.05)',
                    }}
                >
                    VIEW SOURCE CODE ↗
                </a>
                <a
                    href="https://www.habit-forge.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[8px] px-5 py-2.5 border-2 tracking-[2px] transition-all duration-200 hover:scale-[1.03]"
                    style={{
                        color: '#00ff88', borderColor: '#00ff88',
                        boxShadow: '0 0 12px rgba(0,255,136,0.2), inset 0 0 12px rgba(0,255,136,0.05)',
                    }}
                >
                    VIEW LIVE ↗
                </a>
            </div>

        </div>
    );
};
