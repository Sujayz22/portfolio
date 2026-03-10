import React, { useEffect, useRef } from 'react';
import { drawSpecsAvatar } from '../../utils/pixelArt';

const SKILLS = [
    { name: 'Java', pct: 90 },
    { name: 'TypeScript', pct: 85 },
    { name: 'JavaScript', pct: 88 },
    { name: 'Python', pct: 72 },
    { name: 'SQL', pct: 80 },
];

const FRAMEWORKS = ['Spring Boot', 'React', 'Node.js', 'Express', 'Vite', 'Tailwind'];
const DEVOPS = ['Docker', 'OCI', 'Kubernetes', 'Prometheus', 'Grafana', 'Redis'];
const DATABASES = ['PostgreSQL', 'MongoDB', 'QuestDB', 'MySQL'];

const TagChip: React.FC<{ children: React.ReactNode; variant?: 'blue' | 'green' | 'orange' }> = ({ children, variant = 'blue' }) => {
    const variants = {
        blue: 'bg-[#e8f0fe] border-[#c5d8f8] text-[#2a58c5]',
        green: 'bg-[#e8f8f0] border-[#b8e8c8] text-[#1a7a40]',
        orange: 'bg-[#fef8e8] border-[#f8e0b8] text-[#8a4a10]',
    };
    return (
        <span className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full border ${variants[variant]}`}>
            {children}
        </span>
    );
};

export const SpecsWindow: React.FC = () => {
    const avatarRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (avatarRef.current) {
            drawSpecsAvatar(avatarRef.current.getContext('2d')!, 80, 80);
        }
    }, []);

    return (
        <div className="flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-3.5 px-4 py-4 border-b border-white/10"
                style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
                <canvas ref={avatarRef} width={80} height={80} className="rounded-full flex-shrink-0" />
                <div>
                    <div className="text-[15px] font-mono font-bold text-white">Sujay Arun Panda</div>
                    <div className="text-[11px] font-mono text-[#8cb8da] mt-1">Full-Stack Developer · MCA Student</div>
                    <div className="text-[9px] font-pixel text-[#00ff88] mt-1.5 tracking-wide">SujayOS v1.0 · Build 2026.03</div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 flex-1">
                {/* Languages */}
                <div className="p-3.5 border-r border-b border-[#e8e8e2]">
                    <div className="text-[10px] font-mono font-bold text-[#1a1a18] mb-2.5 uppercase tracking-wider">⚡ Languages</div>
                    <div className="flex flex-col gap-2">
                        {SKILLS.map(s => (
                            <div key={s.name} className="flex items-center gap-2 text-[10px] font-mono text-[#3a3a36]">
                                <span className="w-20 flex-shrink-0">{s.name}</span>
                                <div className="flex-1 h-1.5 bg-[#e8e8e2] rounded-full overflow-hidden border border-[#d4d4cc]">
                                    <div
                                        className="bar-fill h-full rounded-full"
                                        style={{ width: `${s.pct}%`, background: 'linear-gradient(90deg, #2a58c5, #5b8aff)' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Frameworks */}
                <div className="p-3.5 border-b border-[#e8e8e2]">
                    <div className="text-[10px] font-mono font-bold text-[#1a1a18] mb-2.5 uppercase tracking-wider">🚀 Frameworks</div>
                    <div className="flex flex-wrap gap-1.5">
                        {FRAMEWORKS.map(f => <TagChip key={f}>{f}</TagChip>)}
                    </div>
                </div>

                {/* DevOps */}
                <div className="p-3.5 border-r border-[#e8e8e2]">
                    <div className="text-[10px] font-mono font-bold text-[#1a1a18] mb-2.5 uppercase tracking-wider">☁ Cloud &amp; DevOps</div>
                    <div className="flex flex-wrap gap-1.5">
                        {DEVOPS.map(d => <TagChip key={d} variant="green">{d}</TagChip>)}
                    </div>
                </div>

                {/* Databases */}
                <div className="p-3.5">
                    <div className="text-[10px] font-mono font-bold text-[#1a1a18] mb-2.5 uppercase tracking-wider">🗄 Databases</div>
                    <div className="flex flex-wrap gap-1.5">
                        {DATABASES.map(d => <TagChip key={d} variant="orange">{d}</TagChip>)}
                    </div>
                </div>
            </div>
        </div>
    );
};
