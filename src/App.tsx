import { Component, useCallback, useEffect, useState } from 'react';
import { BootScreen } from './components/BootScreen';
import { MenuBar } from './components/MenuBar';
import { DesktopIcon } from './components/DesktopIcon';
import { ResumeIcon } from './components/ResumeIcon';
import { Window } from './components/Window';
import { Dock } from './components/Dock';
import { ZoomControl } from './components/ZoomControl';
import { QuickLookModal } from './components/QuickLookModal';
import { EducationWindow } from './components/windows/EducationWindow';
import { WorkLogWindow } from './components/windows/WorkLogWindow';
import { ProjectsWindow } from './components/windows/ProjectsWindow';
import { SpecsWindow } from './components/windows/SpecsWindow';
import { HabitForgeWindow } from './components/windows/HabitForgeWindow';
import { useWindowManager } from './hooks/useWindowManager';
import type { WindowId } from './hooks/useWindowManager';
import { useZoom } from './hooks/useZoom';

// Desktop icon definitions
const DESKTOP_ICONS: { id: WindowId; label: string; type: 'folder-edu' | 'folder-work' | 'folder-proj' | 'folder-spec' | 'habitforge' }[] = [
  { id: 'education', label: 'Education', type: 'folder-edu' },
  { id: 'worklog', label: 'Work_Log', type: 'folder-work' },
  { id: 'projects', label: 'Projects', type: 'folder-proj' },
  { id: 'specs', label: 'System_Specs', type: 'folder-spec' },
  { id: 'habitforge', label: 'HabitForge.app', type: 'habitforge' },
];

// Window metadata
const WINDOW_META: Record<WindowId, { title: string; icon: string; game?: boolean }> = {
  education: { title: 'Education', icon: '🎓' },
  worklog: { title: 'Work_Log', icon: '💼' },
  projects: { title: 'Projects', icon: '🗂' },
  specs: { title: 'System_Specs', icon: '⚙' },
  habitforge: { title: 'HabitForge.app', icon: '🎮', game: true },
};

// ── Error Boundary to prevent a modal crash from blanking the whole app ──────
class ModalErrorBoundary extends Component<{ onReset: () => void; children: React.ReactNode }, { errored: boolean }> {
  constructor(props: { onReset: () => void; children: React.ReactNode }) {
    super(props);
    this.state = { errored: false };
  }
  static getDerivedStateFromError() { return { errored: true }; }
  componentDidCatch() { this.props.onReset(); }
  render() { return this.state.errored ? null : this.props.children; }
}

export default function App() {
  const [booted, setBooted] = useState(false);
  const [showShutdown, setShowShutdown] = useState(false);
  const [showQuickLook, setShowQuickLook] = useState(false);
  const { windows, openWindow, closeWindow, minimizeWindow, maximizeWindow, bringToFront, updatePosition } = useWindowManager();
  const { zoom, zoomIn, zoomOut, resetZoom, min, max } = useZoom();

  // Auto-open welcome windows after boot
  const handleBooted = useCallback(() => {
    setBooted(true);
    setTimeout(() => openWindow('education'), 300);
    setTimeout(() => openWindow('projects'), 700);
  }, [openWindow]);

  // Escape to close topmost window
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const sorted = Object.values(windows)
          .filter(w => w.isOpen)
          .sort((a, b) => b.zIndex - a.zIndex);
        if (sorted.length > 0) closeWindow(sorted[0].id);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [windows, closeWindow]);

  // Apply zoom to the entire document root — works like PC display scaling.
  // CSS `zoom` scales everything (fixed elements, menu bar, dock, windows) uniformly.
  useEffect(() => {
    document.documentElement.style.zoom = String(zoom);
    return () => { document.documentElement.style.zoom = ''; };
  }, [zoom]);

  const handleShutdownConfirm = () => {
    setShowShutdown(false);
    Object.values(windows).filter(w => w.isOpen).forEach(w => closeWindow(w.id));
    // Brief blackout then re-boot
    document.body.style.transition = 'opacity 1.4s';
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.opacity = '1';
      setBooted(false);
    }, 1400);
  };

  const openWindows = new Set(
    Object.values(windows).filter(w => w.isOpen).map(w => w.id)
  );

  // Window content renderer
  const renderContent = (id: WindowId) => {
    switch (id) {
      case 'education': return <EducationWindow />;
      case 'worklog': return <WorkLogWindow />;
      case 'projects': return <ProjectsWindow onOpenHabitForge={() => openWindow('habitforge')} />;
      case 'specs': return <SpecsWindow />;
      case 'habitforge': return <HabitForgeWindow />;
    }
  };

  return (
    <div className="w-full h-full overflow-hidden relative" style={{ fontFamily: '"Share Tech Mono", monospace' }}>

      {/* CRT overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999] animate-crt-flicker scanlines"
        style={{ background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.35) 100%)' }}
        aria-hidden="true"
      />

      {/* Boot screen */}
      {!booted && <BootScreen onComplete={handleBooted} />}

      {/* Menu bar */}
      <MenuBar onOpenWindow={openWindow} onShutdown={() => setShowShutdown(true)} />

      {/* Desktop + windows area */}
      <div
        className="desktop-bg fixed inset-0 top-6 bottom-0 overflow-hidden"
        style={{ zIndex: 1 }}
        onClick={() => {/* deselect icons */ }}
      >
        {/* Desktop icons — right column (includes Resume icon at bottom) */}
        <div className="absolute top-4 right-4 flex flex-col gap-5 z-10">
          {DESKTOP_ICONS.map(icon => (
            <DesktopIcon key={icon.id} id={icon.id} label={icon.label} type={icon.type} onOpen={openWindow} />
          ))}
          {/* Resume QuickLook icon */}
          <ResumeIcon onOpen={() => setShowQuickLook(true)} />
        </div>

        {/* All windows */}
        {Object.values(windows).map(win => {
          const meta = WINDOW_META[win.id];
          if (!win.isOpen) return null;
          return (
            <Window
              key={win.id}
              win={win}
              title={meta.title}
              titleIcon={meta.icon}
              gameStyle={!!meta.game}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              onMaximize={maximizeWindow}
              onFocus={bringToFront}
              onMove={updatePosition}
            >
              {renderContent(win.id)}
            </Window>
          );
        })}
      </div>

      {/* Dock — outside zoom wrapper, always visible */}
      <Dock onOpen={openWindow} openWindows={openWindows} />

      {/* Zoom control */}
      <ZoomControl
        zoom={zoom}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onReset={resetZoom}
        min={min}
        max={max}
      />

      {/* QuickLook Resume modal */}
      {showQuickLook && (
        <ModalErrorBoundary onReset={() => setShowQuickLook(false)}>
          <QuickLookModal onClose={() => setShowQuickLook(false)} />
        </ModalErrorBoundary>
      )}

      {/* Shutdown modal */}
      {showShutdown && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center modal-in"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
        >
          <div
            className="bg-[#ececea] border border-[#888880] rounded-xl p-7 text-center max-w-sm w-[90%] window-open"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.45)' }}
          >
            <div className="text-4xl mb-3">⏻</div>
            <div className="text-[14px] font-mono font-bold mb-2.5">Shut Down SujayOS?</div>
            <div className="text-[11px] font-mono text-[#4a4a44] leading-relaxed mb-5">
              Are you sure you want to shut down SujayOS v1.0?<br />
              Unsaved inspiration will be saved automatically.
            </div>
            <div className="flex gap-2.5 justify-center">
              <button
                onClick={() => setShowShutdown(false)}
                className="font-mono text-[12px] font-semibold px-5 py-2 rounded-lg border border-[#b8b8ae] bg-[#e8e8e2] text-[#1a1a18] hover:bg-[#d4d4cc] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleShutdownConfirm}
                className="font-mono text-[12px] font-semibold px-5 py-2 rounded-lg text-white transition-all hover:scale-[1.04] shadow-[0_2px_8px_rgba(231,76,60,0.4)]"
                style={{ background: 'linear-gradient(135deg, #e74c3c, #c0392b)' }}
              >
                Shut Down
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
