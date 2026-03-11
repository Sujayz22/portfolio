import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { WindowId } from '../hooks/useWindowManager';

interface SearchResult {
  icon: string;
  title: string;
  subtitle: string;
  category: 'skill' | 'project' | 'experience';
  windowId?: WindowId;
  keywords: string[];
}

const SEARCH_INDEX: SearchResult[] = [
  // Skills
  { icon: '☕', title: 'Java', subtitle: 'Spring Boot · OOP · JVM', category: 'skill', windowId: 'specs', keywords: ['java', 'spring', 'jvm', 'backend', 'springboot'] },
  { icon: '⚡', title: 'TypeScript', subtitle: 'Full-stack · Node.js · React', category: 'skill', windowId: 'specs', keywords: ['typescript', 'ts', 'javascript', 'react', 'node'] },
  { icon: '🐍', title: 'Python', subtitle: 'ML · Scripting · Automation', category: 'skill', windowId: 'specs', keywords: ['python', 'ml', 'machine learning', 'automation'] },
  { icon: '🗄', title: 'PostgreSQL', subtitle: 'Relational DB · SQL', category: 'skill', windowId: 'specs', keywords: ['postgres', 'sql', 'database', 'relational'] },
  { icon: '☁', title: 'Oracle Cloud (OCI)', subtitle: 'Cloud Infra · Kubernetes · ARM', category: 'skill', windowId: 'specs', keywords: ['oci', 'oracle', 'cloud', 'kubernetes', 'k8s', 'arm'] },
  { icon: '🐳', title: 'Docker', subtitle: 'Containers · Compose · DevOps', category: 'skill', windowId: 'specs', keywords: ['docker', 'container', 'devops', 'compose'] },
  { icon: '📊', title: 'Prometheus + Grafana', subtitle: 'Monitoring · Observability', category: 'skill', windowId: 'specs', keywords: ['prometheus', 'grafana', 'monitoring', 'metrics', 'observability'] },
  { icon: '⚡', title: 'Redis', subtitle: 'In-memory Cache · Pub/Sub', category: 'skill', windowId: 'specs', keywords: ['redis', 'cache', 'pubsub', 'memory'] },
  // Projects
  { icon: '🎮', title: 'HabitForge', subtitle: 'Gamified habit tracker · Full-stack microservices', category: 'project', windowId: 'habitforge', keywords: ['habitforge', 'habit', 'microservices', 'gamified', 'xp', 'leaderboard'] },
  { icon: '📈', title: 'SJINVESTS', subtitle: 'Algo trading · Upstox API · QuestDB', category: 'project', windowId: 'projects', keywords: ['sjinvests', 'trading', 'algo', 'upstox', 'questdb', 'finance'] },
  { icon: '🚀', title: 'DevOS', subtitle: 'This portfolio · macOS simulator', category: 'project', windowId: 'projects', keywords: ['devos', 'portfolio', 'macos', 'simulator', 'react'] },
  { icon: '📊', title: 'AlgoTrading Engine', subtitle: 'Real-time · WebSocket · Decision Engine', category: 'project', windowId: 'projects', keywords: ['algotrading', 'algo', 'websocket', 'realtime', 'engine'] },
  // Experience
  { icon: '💼', title: 'TechSpark Solutions', subtitle: 'Full-Stack Intern · Java · Spring Boot · OCI', category: 'experience', windowId: 'worklog', keywords: ['techspark', 'intern', 'java', 'spring', 'oci', 'docker', 'rest api'] },
  { icon: '🎓', title: 'MCA · VIT', subtitle: 'Master of Computer Applications · 2025–2027', category: 'experience', windowId: 'education', keywords: ['mca', 'vit', 'vellore', 'master', 'education', 'algorithm', 'cloud'] },
  { icon: '🎓', title: 'BCA · Bengaluru North University', subtitle: 'Bachelor of Computer Applications · CGPA 8.41', category: 'experience', windowId: 'education', keywords: ['bca', 'bengaluru', 'bachelor', 'education', 'cgpa'] },
];

const CATEGORY_LABELS: Record<string, string> = {
  skill: '⚡ Skills',
  project: '🗂 Projects',
  experience: '💼 & 🎓 Experience',
};

interface SpotlightSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWindow: (id: WindowId) => void;
}

export const SpotlightSearch: React.FC<SpotlightSearchProps> = ({ isOpen, onClose, onOpenWindow }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim().length < 1
    ? SEARCH_INDEX.slice(0, 8)
    : SEARCH_INDEX.filter(r => {
        const q = query.toLowerCase();
        return r.title.toLowerCase().includes(q) ||
          r.subtitle.toLowerCase().includes(q) ||
          r.keywords.some(k => k.includes(q));
      });

  const grouped = results.reduce<Record<string, SearchResult[]>>((acc, r) => {
    (acc[r.category] ||= []).push(r);
    return acc;
  }, {});

  const flatResults = Object.values(grouped).flat();

  const handleSelect = useCallback((r: SearchResult) => {
    if (r.windowId) onOpenWindow(r.windowId);
    onClose();
    setQuery('');
  }, [onOpenWindow, onClose]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => { setSelectedIndex(0); }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); setQuery(''); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex(i => Math.min(i + 1, flatResults.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter' && flatResults[selectedIndex]) { handleSelect(flatResults[selectedIndex]); }
  };

  if (!isOpen) return null;

  let flatIdx = -1;

  return (
    <div
      className="spotlight-overlay fixed inset-0 z-[2000] flex items-start justify-center pt-[14vh] modal-in"
      onClick={() => { onClose(); setQuery(''); }}
    >
      <div
        className="spotlight-input-glass spotlight-in w-full max-w-[640px] mx-4 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 opacity-50">
            <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search skills, projects, experience…"
            className="flex-1 bg-transparent text-white text-[17px] font-medium outline-none placeholder:text-white/35 leading-relaxed"
            style={{ fontFamily: 'Inter, -apple-system, sans-serif', letterSpacing: '-0.01em' }}
          />
          {query && (
            <button onClick={() => setQuery('')} className="opacity-40 hover:opacity-70 text-white text-lg font-light">×</button>
          )}
          <kbd className="text-[10px] text-white/40 border border-white/15 rounded-md px-1.5 py-0.5 font-mono">ESC</kbd>
        </div>

        {/* Divider */}
        <div className="h-px mx-5 bg-white/10" />

        {/* Results */}
        {results.length > 0 && (
          <div className="max-h-[52vh] overflow-y-auto py-2 px-2">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category} className="mb-1">
                <div className="px-3 py-1.5 text-[10px] font-semibold text-white/35 uppercase tracking-widest">
                  {CATEGORY_LABELS[category]}
                </div>
                {items.map(r => {
                  flatIdx++;
                  const isSelected = flatIdx === selectedIndex;
                  return (
                    <div
                      key={r.title}
                      className={`spotlight-result-item flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-all duration-100 ${isSelected ? 'rounded-[10px]' : ''}`}
                      style={isSelected ? { background: `rgba(var(--accent-rgb), 0.20)` } : {}}
                      onClick={() => handleSelect(r)}
                      onMouseEnter={() => setSelectedIndex(flatIdx)}
                    >
                      <span className="text-xl flex-shrink-0 w-8 text-center">{r.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-medium text-white/95 leading-tight">{r.title}</div>
                        <div className="text-[11px] text-white/45 mt-0.5 leading-tight">{r.subtitle}</div>
                      </div>
                      {isSelected && (
                        <span className="text-[10px] text-white/35 flex-shrink-0">↵ open</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {results.length === 0 && query && (
          <div className="py-8 text-center text-white/35 text-[13px]">
            No results for "<span className="text-white/55">{query}</span>"
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/8">
          <span className="text-[10px] text-white/25">↑↓ navigate · ↵ open</span>
          <span className="text-[10px] text-white/25" style={{ color: 'var(--accent)', opacity: 0.6 }}>
            ⌘K <span className="text-white/40">Dev</span><span style={{ color: '#8da2ba' }}>OS</span> Spotlight
          </span>
        </div>
      </div>
    </div>
  );
};
