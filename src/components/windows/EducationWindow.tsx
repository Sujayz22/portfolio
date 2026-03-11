import React from 'react';

export const EducationWindow: React.FC = () => (
    <div className="p-4 flex flex-col gap-3" style={{ background: 'linear-gradient(160deg, rgba(15,25,50,0.6) 0%, rgba(10,18,40,0.8) 100%)' }}>

        {/* MCA Entry */}
        <div className="rounded-2xl overflow-hidden" style={{
            background: 'linear-gradient(135deg, rgba(30,60,140,0.55) 0%, rgba(20,45,110,0.65) 100%)',
            border: '1px solid rgba(80,140,255,0.25)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 24px rgba(30,60,140,0.35), inset 0 1px 0 rgba(255,255,255,0.12)',
        }}>
            {/* Accent top stripe */}
            <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #2d7be8, #5b8aff, rgba(91,138,255,0))' }} />
            <div className="flex items-center gap-4 p-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-[11px] font-bold tracking-widest"
                    style={{ background: 'linear-gradient(135deg, #f39c12, #e67e22)', color: '#1a0a00', fontFamily: 'Inter, sans-serif' }}>
                    MCA
                </div>
                <div className="flex-1 min-w-0">
                    <h2 className="text-[14px] font-semibold text-white leading-tight mb-0.5"
                        style={{ fontFamily: 'Inter, -apple-system, sans-serif', letterSpacing: '-0.02em' }}>
                        Master of Computer Applications
                    </h2>
                    <p className="text-[11px] font-medium mb-2" style={{ color: 'rgba(140,185,255,0.85)' }}>
                        Vellore Institute of Technology (VIT)
                    </p>
                    <div className="flex gap-2 flex-wrap">
                        {['2025 – 2027', 'Vellore Campus'].map(tag => (
                            <span key={tag} className="glass-tag">{tag}</span>
                        ))}
                    </div>
                </div>
                <div className="text-3xl opacity-80 flex-shrink-0">🎓</div>
            </div>
        </div>

        {/* Courses */}
        <div className="rounded-2xl overflow-hidden" style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.10)',
            backdropFilter: 'blur(16px)',
        }}>
            <div className="px-4 py-2.5 border-b border-white/8">
                <span className="text-[10px] font-semibold text-white/40 uppercase tracking-widest">📚 Coursework</span>
            </div>
            {[
                { name: 'Advanced_Algorithms.course', meta: 'Data Structures · Complexity Theory', icon: '⚡' },
                { name: 'Cloud_Computing.course', meta: 'Microservices · Docker · Kubernetes', icon: '☁' },
                { name: 'Full_Stack_Dev.course', meta: 'React · Node · Spring Boot', icon: '🚀' },
                { name: 'Machine_Learning.course', meta: 'TensorFlow · Neural Networks', icon: '🤖' },
            ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors cursor-default">
                    <span className="text-base flex-shrink-0">{f.icon}</span>
                    <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-medium text-white/85" style={{ fontFamily: 'SF Mono, monospace' }}>{f.name}</div>
                        <div className="text-[10px] text-white/40 mt-0.5">{f.meta}</div>
                    </div>
                </div>
            ))}
        </div>

        {/* BCA Entry */}
        <div className="rounded-2xl overflow-hidden" style={{
            background: 'linear-gradient(135deg, rgba(20,80,50,0.55) 0%, rgba(15,65,40,0.65) 100%)',
            border: '1px solid rgba(80,200,130,0.22)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 24px rgba(20,80,50,0.30), inset 0 1px 0 rgba(255,255,255,0.10)',
        }}>
            <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #27ae60, #6fcf97, rgba(111,207,151,0))' }} />
            <div className="flex items-center gap-4 p-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-[11px] font-bold tracking-widest"
                    style={{ background: 'linear-gradient(135deg, #27ae60, #1a8a48)', color: 'white', fontFamily: 'Inter, sans-serif' }}>
                    BCA
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] font-semibold text-white leading-tight mb-0.5"
                        style={{ fontFamily: 'Inter, -apple-system, sans-serif', letterSpacing: '-0.02em' }}>
                        Bachelor of Computer Applications
                    </h3>
                    <p className="text-[11px] font-medium mb-2" style={{ color: 'rgba(140,220,180,0.85)' }}>
                        Bengaluru North University
                    </p>
                    <div className="flex gap-2 flex-wrap">
                        {['2020 – 2024', '🏅 CGPA 8.41'].map(tag => (
                            <span key={tag} className="glass-tag">{tag}</span>
                        ))}
                    </div>
                </div>
                <div className="text-3xl opacity-80 flex-shrink-0">📜</div>
            </div>
        </div>
    </div>
);
