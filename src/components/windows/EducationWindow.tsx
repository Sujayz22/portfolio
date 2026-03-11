import React from 'react';

export const EducationWindow: React.FC = () => (
    <div className="p-4 flex flex-col gap-4">
        {/* MCA */}
        <div className="flex items-start gap-3.5 p-3.5 rounded-lg border border-[#0d2a44]"
            style={{ background: 'linear-gradient(135deg, #1a3a5c, #16486e)' }}>
            <div className="font-pixel text-[10px] bg-[#f39c12] text-[#1a0a00] px-2.5 py-1.5 rounded flex-shrink-0 tracking-widest">MCA</div>
            <div>
                <h2 className="text-[13px] font-mono font-bold text-white mb-1">Master of Computer Applications</h2>
                <p className="text-[11px] text-[#8cb8da] mb-2">Vellore Institute of Technology (VIT)</p>
                <div className="flex gap-2 flex-wrap">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-white/20 bg-white/10 text-[#c8e0f8]">2025 – 2027</span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-white/20 bg-white/10 text-[#c8e0f8]">Vellore Campus</span>
                </div>
            </div>
        </div>

        {/* Courses */}
        <div className="border border-[#d4d4cc] rounded-lg overflow-hidden">
            {[
                { name: 'Advanced_Algorithms.course', meta: 'Data Structures · Complexity Theory' },
                { name: 'Cloud_Computing.course', meta: 'Microservices · Docker · Kubernetes' },
                { name: 'Full_Stack_Dev.course', meta: 'React · Node · Spring Boot' },
                { name: 'Machine_Learning.course', meta: 'TensorFlow · Neural Networks' },
            ].map((f, i) => (
                <div key={i} className="flex items-center gap-2.5 px-3 py-2 bg-white border-b border-[#e8e8e2] last:border-b-0 hover:bg-[#e8f0fe] transition-colors">
                    <span className="text-lg flex-shrink-0">📄</span>
                    <div>
                        <div className="text-[11px] font-mono font-semibold text-[#1a1a18]">{f.name}</div>
                        <div className="text-[10px] font-mono text-[#787872] mt-0.5">{f.meta}</div>
                    </div>
                </div>
            ))}
        </div>

        {/* BCA */}
        <div className="flex items-start gap-3.5 p-3.5 rounded-lg border border-[#0d3220]"
            style={{ background: 'linear-gradient(135deg, #1a4a2e, #1a5a32)' }}>
            <div className="font-pixel text-[10px] bg-[#27ae60] text-white px-2.5 py-1.5 rounded flex-shrink-0 tracking-widest">BCA</div>
            <div>
                <h3 className="text-[12px] font-mono font-bold text-white mb-1">Bachelor of Computer Applications</h3>
                <p className="text-[11px] text-[#88c8a0] mb-2">Bengaluru North University</p>
                <div className="flex gap-2 flex-wrap">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-white/20 bg-white/10 text-[#c8e8d8]">2020 – 2024</span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-white/20 bg-white/10 text-[#c8e8d8]">CGPA: 8.41</span>
                </div>
            </div>
        </div>
    </div>
);
