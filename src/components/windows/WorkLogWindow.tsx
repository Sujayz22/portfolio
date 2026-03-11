import React from 'react';

interface WorkEntry {
    role: string;
    company: string;
    period: string;
    points: string[];
    tags: string[];
    active: boolean;
    icon: string;
    color: string;
}

const ENTRIES: WorkEntry[] = [
    {
        role: 'Full-Stack Developer Intern',
        company: 'TechSpark Solutions',
        period: 'Jun 2023 – Aug 2023 · 3 months',
        active: true,
        icon: '💼',
        color: 'rgba(245,166,35,0.85)',
        points: [
            'Built REST APIs with Spring Boot serving 10K+ daily requests',
            'Developed React dashboards reducing load time by 40%',
            'Containerized services with Docker & deployed on OCI',
        ],
        tags: ['Java', 'Spring Boot', 'React', 'Docker', 'OCI'],
    },
    {
        role: 'Open Source Contributor',
        company: 'Personal Projects',
        period: '2023 – Present · Ongoing',
        active: false,
        icon: '🚀',
        color: 'rgba(168,230,52,0.85)',
        points: [
            'Architected HabitForge microservices platform (Node.js + TypeScript)',
            'Built SJINVESTS algorithmic trading engine with Upstox API',
            'Deployed monitoring stack: Prometheus + Grafana on OCI',
        ],
        tags: ['TypeScript', 'Microservices', 'Redis', 'Prometheus'],
    },
];

export const WorkLogWindow: React.FC = () => (
    <div className="p-4 flex flex-col gap-4" style={{ background: 'linear-gradient(160deg, rgba(12,20,44,0.6) 0%, rgba(8,14,32,0.8) 100%)' }}>
        {/* Terminal header */}
        <div className="rounded-xl overflow-hidden" style={{
            background: 'rgba(10,12,20,0.88)',
            border: '1px solid rgba(255,255,255,0.10)',
            backdropFilter: 'blur(20px)',
        }}>
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/8">
                {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
                    <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                ))}
                <span className="ml-2 text-[10px] text-white/30 font-mono">work_experience.log</span>
            </div>
            <div className="px-4 py-3 font-mono text-[13px]">
                <span style={{ color: '#27ae60' }}>sujay@sujayos</span>
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>:~$ </span>
                <span style={{ color: 'rgba(255,255,255,0.85)' }}>cat work_experience.log</span>
            </div>
        </div>

        {/* Timeline entries */}
        <div className="flex flex-col gap-3">
            {ENTRIES.map((e, i) => (
                <div key={i} className="flex gap-3.5 items-start">
                    {/* Timeline line */}
                    <div className="flex flex-col items-center flex-shrink-0 pt-0.5">
                        <div
                            className="w-3 h-3 rounded-full border-2 border-transparent flex-shrink-0"
                            style={{
                                background: e.color,
                                boxShadow: e.active ? `0 0 0 3px rgba(255,255,255,0.08), 0 0 10px ${e.color}` : `0 0 0 2px rgba(255,255,255,0.06)`,
                            }}
                        />
                        {i < ENTRIES.length - 1 && (
                            <div className="w-0.5 flex-1 min-h-[44px] mt-1.5 rounded-full"
                                style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.15), transparent)' }} />
                        )}
                    </div>

                    {/* Card */}
                    <div className="flex-1 rounded-2xl overflow-hidden" style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.10)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                    }}>
                        <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${e.color}, transparent)` }} />
                        <div className="p-3.5">
                            <div className="flex items-start gap-2.5 mb-2">
                                <span className="text-xl flex-shrink-0">{e.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="text-[13px] font-semibold text-white leading-tight"
                                        style={{ fontFamily: 'Inter, -apple-system, sans-serif', letterSpacing: '-0.02em' }}>
                                        {e.role}
                                    </div>
                                    <div className="text-[11px] mt-0.5 font-medium" style={{ color: e.color }}>{e.company}</div>
                                    <div className="text-[10px] text-white/35 mt-0.5">{e.period}</div>
                                </div>
                                {e.active && (
                                    <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                                        style={{ background: 'rgba(168,230,52,0.18)', color: '#a8e634', border: '1px solid rgba(168,230,52,0.3)' }}>
                                        ACTIVE
                                    </span>
                                )}
                            </div>
                            <ul className="flex flex-col gap-1.5 mb-3">
                                {e.points.map((pt, j) => (
                                    <li key={j} className="text-[11px] text-white/65 pl-3.5 relative leading-relaxed"
                                        style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}>
                                        <span className="absolute left-0 top-0.5 text-[10px]" style={{ color: e.color }}>▸</span>
                                        {pt}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-wrap gap-1.5">
                                {e.tags.map(t => (
                                    <span key={t} className="glass-tag">{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
