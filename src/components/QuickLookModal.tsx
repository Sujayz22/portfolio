import React, { useState, useEffect, useRef, useCallback } from 'react';

// ── Dot-matrix printer animation component ──────────────────────────────────
const PRINT_LINES = [
    'SUJAY ARUN PANDA',
    'Full-Stack Developer · MCA @ VIT',
    '─────────────────────────────',
    'CONTACT',
    'sujayjsx@gmail.com',
    'github.com/Sujayz22',
    '─────────────────────────────',
    'PROJECTS',
    'HabitForge · SJINVESTS · SujayOS',
    '─────────────────────────────',
    'SKILLS',
    'Java · TypeScript · Node.js',
    'React · Docker · OCI · Redis',
    '─────────────────────────────',
    'EDUCATION',
    'MCA · VIT, Vellore 2025–2027',
    'BCA · Bengaluru North University  2020-2024',
];

const DotMatrixPrinter: React.FC<{ onDone: () => void }> = ({ onDone }) => {
    const [lines, setLines] = useState<string[]>([]);
    const [finished, setFinished] = useState(false);
    const indexRef = useRef(0);
    const onDoneRef = useRef(onDone);
    onDoneRef.current = onDone; // always fresh, no extra effect needed

    useEffect(() => {
        // Local 'alive' flag — each effect invocation has its own copy.
        // This is safe under React 18 Strict Mode double-invocation.
        let alive = true;
        indexRef.current = 0; // reset in case Strict Mode re-runs this

        const interval = setInterval(() => {
            if (!alive) return;
            if (indexRef.current >= PRINT_LINES.length) {
                clearInterval(interval);
                if (alive) setFinished(true);
                setTimeout(() => { if (alive) onDoneRef.current(); }, 500);
                return;
            }
            const line = PRINT_LINES[indexRef.current];
            if (alive && line !== undefined) {
                setLines(prev => [...prev, line]);
            }
            indexRef.current++;
        }, 80);

        return () => {
            alive = false;
            clearInterval(interval);
        };
    }, []); // intentionally empty — animation runs once

    return (
        <div className="flex flex-col items-center gap-3">
            {/* Printer body */}
            <div className="relative w-72" style={{ fontFamily: '"VT323", monospace' }}>
                {/* Printer chassis */}
                <div
                    className="rounded-lg border-2 border-[#888880] px-2 py-1.5 flex items-center gap-2"
                    style={{ background: 'linear-gradient(180deg, #d4d4cc, #c0c0b8)' }}
                >
                    <div className="w-6 h-6 rounded-full border border-[#888880] bg-[#1a1a18] flex items-center justify-center">
                        <div className={`w-2.5 h-2.5 rounded-full ${finished ? 'bg-[#27ae60]' : 'bg-[#e74c3c]'} transition-colors`} />
                    </div>
                    <div className="text-[11px] font-mono text-[#3a3a36] font-semibold tracking-wider">
                        EPSON FX-80 DOT MATRIX
                    </div>
                    <div className="ml-auto flex gap-1">
                        {[0, 1, 2].map(i => (
                            <div key={i} className={`w-1.5 h-1.5 rounded-full border border-[#888880] ${i === 1 && !finished ? 'bg-[#f39c12]' : 'bg-[#b8b8ae]'}`} />
                        ))}
                    </div>
                </div>
                {/* Paper slot */}
                <div className="h-1 mx-4 bg-white border-x border-[#c8c8c0]" />
            </div>

            {/* Paper output */}
            <div
                className="w-72 rounded border border-[#d4d4cc] overflow-hidden"
                style={{ background: '#fafaf8', maxHeight: 200, overflowY: 'auto' }}
            >
                {/* Sprocket holes + paper */}
                <div className="flex">
                    <div className="w-4 flex-shrink-0 border-r border-[#e8e8e2] flex flex-col gap-2 pt-3 pb-1 items-center"
                        style={{ background: '#f0f0ec' }}>
                        {lines.map((_, i) => (
                            <div key={i} className="w-2 h-2 rounded-full border border-[#d4d4cc] bg-[#e8e8e2]" style={{ marginTop: i === 0 ? 0 : -2 }} />
                        ))}
                    </div>
                    <div className="flex-1 px-3 py-2 flex flex-col gap-0.5">
                        {lines.map((line, i) => (
                            <div
                                key={i}
                                className={`text-[13px] leading-tight ${line.startsWith('─') ? 'text-[#b8b8ae]' : 'text-[#2a2a22]'}`}
                                style={{ fontFamily: '"VT323", monospace', letterSpacing: line === PRINT_LINES[0] ? '1px' : '0' }}
                                id={`printer-line-${i}`}
                            >
                                {line}
                            </div>
                        ))}
                        {!finished && (
                            <div className="text-[13px] text-[#2a2a22] animate-pulse" style={{ fontFamily: '"VT323", monospace' }}>
                                ▌
                            </div>
                        )}
                    </div>
                    <div className="w-4 flex-shrink-0 border-l border-[#e8e8e2] flex flex-col gap-2 pt-3 pb-1 items-center"
                        style={{ background: '#f0f0ec' }}>
                        {lines.map((_, i) => (
                            <div key={i} className="w-2 h-2 rounded-full border border-[#d4d4cc] bg-[#e8e8e2]" style={{ marginTop: i === 0 ? 0 : -2 }} />
                        ))}
                    </div>
                </div>
            </div>

            <p className="text-[10px] font-mono text-[#787872] text-center">
                {finished ? '✓ Print complete!' : 'Printing your resume…'}
            </p>
        </div>
    );
};

// ── Main QuickLook Modal ─────────────────────────────────────────────────────
interface QuickLookModalProps {
    onClose: () => void;
}

const RESUME_ID = '1RMqyGp-YsAjCqx1VpnslLAo6wGtmKecD';
const PREVIEW_URL = `https://drive.google.com/file/d/${RESUME_ID}/preview`;
const DOWNLOAD_URL = '/resume.pdf';

type Phase = 'preview' | 'printing' | 'done';

export const QuickLookModal: React.FC<QuickLookModalProps> = ({ onClose }) => {
    const [phase, setPhase] = useState<Phase>('preview');

    // Escape to close
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    const handleDownloadClick = () => {
        // Force fresh fetch — avoids downloading a stale cached Vite HTML error page
        fetch(DOWNLOAD_URL, { cache: 'no-cache' })
            .then(r => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.blob();
            })
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Sujay_Arun_Panda_Resume.pdf';
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                a.remove();
                setTimeout(() => URL.revokeObjectURL(url), 10_000);
            })
            .catch(err => console.error('Resume download failed:', err));
        setPhase('printing');
    };

    const handlePrintDone = useCallback(() => {
        setPhase('done');
    }, []);

    return (
        <div
            className="fixed inset-0 z-[1500] flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(12px)' }}
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div
                className="relative flex flex-col rounded-2xl border border-white/20 overflow-hidden"
                style={{
                    width: 'min(820px, 94vw)',
                    height: 'min(600px, 88vh)',
                    background: 'rgba(20,20,28,0.82)',
                    backdropFilter: 'blur(32px) saturate(180%)',
                    boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)',
                    animation: 'ql-open 0.35s cubic-bezier(0.34,1.3,0.64,1) forwards',
                }}
            >
                {/* ── Title bar ── */}
                <div
                    className="flex items-center px-4 py-2.5 gap-3 flex-shrink-0"
                    style={{ background: 'rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
                >
                    {/* Traffic lights */}
                    <div className="flex gap-1.5 group">
                        <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0342c] group-hover:opacity-100" />
                        <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d5920a] opacity-40" />
                        <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#14a62a] opacity-40" />
                    </div>
                    {/* Title */}
                    <div className="flex-1 flex items-center justify-center gap-2 text-white/80 text-[12px] font-mono font-semibold tracking-wide">
                        <span className="text-base">📄</span>
                        Resume.pdf — Quick Look
                    </div>
                    {/* Magnifying glass icon */}
                    <div className="text-white/40 text-sm select-none">🔍</div>
                </div>

                {/* ── Body ── */}
                <div className="flex-1 overflow-hidden flex flex-col">
                    {phase === 'preview' && (
                        <iframe
                            src={PREVIEW_URL}
                            title="Resume Preview"
                            className="flex-1 w-full border-0"
                            allow="autoplay"
                            style={{ background: '#fff' }}
                        />
                    )}

                    {(phase === 'printing' || phase === 'done') && (
                        <div className="flex-1 flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
                            <DotMatrixPrinter onDone={handlePrintDone} />
                        </div>
                    )}
                </div>

                {/* ── Bottom bar ── */}
                <div
                    className="flex items-center justify-between px-5 py-3 flex-shrink-0"
                    style={{ background: 'rgba(255,255,255,0.05)', borderTop: '1px solid rgba(255,255,255,0.08)' }}
                >
                    <div className="text-[11px] font-mono text-white/40">
                        Sujay_Arun_Panda_Resume.pdf · PDF Document
                    </div>
                    <div className="flex gap-2.5">
                        <button
                            onClick={onClose}
                            className="font-mono text-[11px] px-4 py-1.5 rounded-lg text-white/70 border border-white/15 hover:border-white/30 hover:text-white transition-all"
                        >
                            ✕ Close
                        </button>
                        {phase === 'preview' && (
                            <button
                                onClick={handleDownloadClick}
                                className="font-mono text-[11px] px-4 py-1.5 rounded-lg text-[#1a1a18] font-semibold transition-all hover:scale-105 hover:shadow-[0_4px_16px_rgba(0,255,136,0.4)] active:scale-95 flex items-center gap-1.5"
                                style={{ background: 'linear-gradient(135deg, #00ff88, #00cc6a)' }}
                            >
                                🖨 Download PDF
                            </button>
                        )}
                        {phase === 'done' && (
                            <a
                                href={DOWNLOAD_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-[11px] px-4 py-1.5 rounded-lg text-[#1a1a18] font-semibold flex items-center gap-1.5"
                                style={{ background: 'linear-gradient(135deg, #27ae60, #1a8a4a)' }}
                            >
                                ✓ Download again
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes ql-open {
          0%   { opacity: 0; transform: scale(0.88) translateY(24px); }
          60%  { opacity: 1; transform: scale(1.01) translateY(-4px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
        </div>
    );
};
