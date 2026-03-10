import React from 'react';

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-full border bg-[#e8f0fe] border-[#c5d8f8] text-[#2a58c5]">
        {children}
    </span>
);

interface WorkEntry {
    role: string;
    company: string;
    period: string;
    points: string[];
    tags: string[];
    active: boolean;
}

const ENTRIES: WorkEntry[] = [
    {
        role: 'Full-Stack Developer Intern',
        company: 'TechSpark Solutions',
        period: 'Jun 2023 – Aug 2023 · 3 months',
        active: true,
        points: [
            'Built REST APIs with Spring Boot serving 10K+ daily requests',
            'Developed React dashboards reducing load time by 40%',
            'Containerized services with Docker & deployed on OCI',
        ],
        tags: ['Java', 'Spring Boot', 'React', 'Docker'],
    },
    {
        role: 'Open Source Contributor',
        company: 'Personal Projects',
        period: '2023 – Present · Ongoing',
        active: false,
        points: [
            'Architected HabitForge microservices platform (Node.js + TypeScript)',
            'Built SJINVESTS algorithmic trading engine with Upstox API',
            'Deployed monitoring stack: Prometheus + Grafana',
        ],
        tags: ['TypeScript', 'Microservices', 'Redis'],
    },
];

export const WorkLogWindow: React.FC = () => (
    <div className="p-4 flex flex-col gap-4">
        <div className="bg-[#1a1a18] rounded px-3 py-2 font-terminal text-[17px]">
            <span className="text-[#27ae60]">root@sujayos:~$</span>
            <span className="text-[#c8c8c0]"> cat work_experience.log</span>
        </div>

        <div className="flex flex-col gap-4">
            {ENTRIES.map((e, i) => (
                <div key={i} className="flex gap-3.5 items-start">
                    {/* Timeline */}
                    <div className="flex flex-col items-center flex-shrink-0 pt-1.5">
                        <div
                            className={`w-3 h-3 rounded-full border-2 border-white ${e.active ? 'bg-[#27ae60] shadow-[0_0_0_2px_#27ae60,0_0_8px_rgba(39,174,96,0.5)]' : 'bg-[#b8b8ae] shadow-[0_0_0_2px_#b8b8ae]'}`}
                        />
                        {i < ENTRIES.length - 1 && (
                            <div className="w-0.5 flex-1 min-h-[40px] mt-1 rounded-sm"
                                style={{ background: 'linear-gradient(180deg, #b8b8ae, transparent)' }} />
                        )}
                    </div>

                    {/* Card */}
                    <div className="flex-1 bg-white border border-[#d4d4cc] rounded-lg p-3">
                        <div className="text-[13px] font-mono font-bold text-[#1a1a18]">{e.role}</div>
                        <div className="text-[11px] text-[#2980b9] mt-0.5">{e.company}</div>
                        <div className="text-[10px] text-[#787872] mb-2">{e.period}</div>
                        <ul className="flex flex-col gap-1 mb-2.5">
                            {e.points.map((p, j) => (
                                <li key={j} className="text-[11px] font-mono text-[#3a3a36] pl-3.5 relative leading-relaxed before:content-['▸'] before:absolute before:left-0 before:text-[#2980b9] before:text-[10px]">
                                    {p}
                                </li>
                            ))}
                        </ul>
                        <div className="flex gap-1.5 flex-wrap">
                            {e.tags.map(t => <Tag key={t}>{t}</Tag>)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
