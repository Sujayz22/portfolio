import { Component, useCallback, useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { BootScreen } from './components/BootScreen';
import { MenuBar } from './components/MenuBar';
import { DesktopIcon } from './components/DesktopIcon';
import { ResumeIcon } from './components/ResumeIcon';
import { Window } from './components/Window';
import { Dock } from './components/Dock';
import { QuickLookModal } from './components/QuickLookModal';
import { SpotlightSearch } from './components/SpotlightSearch';
import { SystemSettings } from './components/SystemSettings';
import { DesktopWidgets } from './components/DesktopWidgets';
import { EducationWindow } from './components/windows/EducationWindow';
import { WorkLogWindow } from './components/windows/WorkLogWindow';
import { ProjectsWindow } from './components/windows/ProjectsWindow';
import { SpecsWindow } from './components/windows/SpecsWindow';
import { HabitForgeWindow } from './components/windows/HabitForgeWindow';
import { useWindowManager } from './hooks/useWindowManager';
import type { WindowId } from './hooks/useWindowManager';
import { useDraggable } from './hooks/useDraggable';

const DESKTOP_ICONS: { id: WindowId; label: string; type: 'folder-edu' | 'folder-work' | 'folder-proj' | 'folder-spec' | 'habitforge' }[] = [
  { id: 'education',  label: 'Education',    type: 'folder-edu' },
  { id: 'worklog',    label: 'Work_Log',     type: 'folder-work' },
  { id: 'projects',   label: 'Projects',     type: 'folder-proj' },
  { id: 'specs',      label: 'System_Specs', type: 'folder-spec' },
  { id: 'habitforge', label: 'HabitForge',   type: 'habitforge' },
];

const WINDOW_META: Record<WindowId, { title: string; icon: string; game?: boolean }> = {
  education:  { title: 'Education',      icon: '🎓' },
  worklog:    { title: 'Work Log',       icon: '💼' },
  projects:   { title: 'Projects',       icon: '🗂' },
  specs:      { title: 'System Specs',   icon: '⚙' },
  habitforge: { title: 'HabitForge.app', icon: '🎮', game: true },
};

// ── Draggable Desktop Icons Layer ──────────────────────────────────────────

interface DraggableIconsLayerProps {
  icons: typeof DESKTOP_ICONS;
  onOpen: (id: WindowId) => void;
  onOpenResume: () => void;
}

const ICON_H = 116;
const ICON_GAP = 12;

function DraggableIcon({ id, label, type, initialX, initialY, onOpen }: {
  id: WindowId; label: string; type: 'folder-edu' | 'folder-work' | 'folder-proj' | 'folder-spec' | 'habitforge';
  initialX: number; initialY: number;
  onOpen: (id: WindowId) => void;
}) {
  const { pos, dragging, hasDragged, onMouseDown } = useDraggable({
    initialX, initialY, storageKey: `icon-pos-${id}`,
  });
  return (
    <div
      className="absolute z-10"
      style={{ left: pos.x, top: pos.y, cursor: dragging ? 'grabbing' : 'default', willChange: dragging ? 'transform' : 'auto' }}
      onMouseDown={onMouseDown}
    >
      <DesktopIcon id={id} label={label} type={type} onOpen={hasDragged ? () => {} : onOpen} />
    </div>
  );
}

function DraggableResumeIcon({ initialX, initialY, onOpen }: { initialX: number; initialY: number; onOpen: () => void }) {
  const { pos, dragging, hasDragged, onMouseDown } = useDraggable({
    initialX, initialY, storageKey: 'icon-pos-resume',
  });
  return (
    <div
      className="absolute z-10"
      style={{ left: pos.x, top: pos.y, cursor: dragging ? 'grabbing' : 'default' }}
      onMouseDown={onMouseDown}
    >
      <ResumeIcon onOpen={hasDragged ? () => {} : onOpen} />
    </div>
  );
}

function DraggableIconsLayer({ icons, onOpen, onOpenResume }: DraggableIconsLayerProps) {
  // Initial layout: left side, single column
  const startX = 8;
  const startY = 36;

  const getPos = (i: number) => ({
    x: startX,
    y: startY + i * (ICON_H + ICON_GAP),
  });

  return (
    <>
      {icons.map((icon, i) => {
        const { x, y } = getPos(i);
        return (
          <DraggableIcon key={icon.id} id={icon.id} label={icon.label} type={icon.type}
            initialX={x} initialY={y} onOpen={onOpen} />
        );
      })}
      {(() => { const { x, y } = getPos(icons.length); return (
        <DraggableResumeIcon initialX={x} initialY={y} onOpen={onOpenResume} />
      ); })()}
    </>
  );
}

class ModalErrorBoundary extends Component<{ onReset: () => void; children: React.ReactNode }, { errored: boolean }> {
  constructor(props: { onReset: () => void; children: React.ReactNode }) {
    super(props);
    this.state = { errored: false };
  }
  static getDerivedStateFromError() { return { errored: true }; }
  componentDidCatch() { this.props.onReset(); }
  render() { return this.state.errored ? null : this.props.children; }
}

function AppInner() {
  const [booted, setBooted] = useState(false);
  const [showShutdown, setShowShutdown] = useState(false);
  const [showQuickLook, setShowQuickLook] = useState(false);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const { windows, openWindow, closeWindow, minimizeWindow, maximizeWindow, bringToFront, updatePosition } = useWindowManager();

  const handleBooted = useCallback(() => {
    setBooted(true);
    setTimeout(() => openWindow('education'), 300);
    setTimeout(() => openWindow('projects'), 700);
  }, [openWindow]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // CMD+K / Ctrl+K → Spotlight
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSpotlight(s => !s);
        return;
      }
      // Space on desktop → Spotlight  
      if (e.key === ' ' && !showSpotlight && (e.target as HTMLElement).tagName !== 'INPUT') {
        e.preventDefault();
        setShowSpotlight(true);
        return;
      }
      // Escape → close topmost window
      if (e.key === 'Escape' && !showSpotlight && !showSettings) {
        const sorted = Object.values(windows)
          .filter(w => w.isOpen)
          .sort((a, b) => b.zIndex - a.zIndex);
        if (sorted.length > 0) closeWindow(sorted[0].id);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [windows, closeWindow, showSpotlight, showSettings]);

  const handleShutdownConfirm = () => {
    setShowShutdown(false);
    Object.values(windows).filter(w => w.isOpen).forEach(w => closeWindow(w.id));
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

  const renderContent = (id: WindowId) => {
    switch (id) {
      case 'education':  return <EducationWindow />;
      case 'worklog':    return <WorkLogWindow />;
      case 'projects':   return <ProjectsWindow onOpenHabitForge={() => openWindow('habitforge')} />;
      case 'specs':      return <SpecsWindow />;
      case 'habitforge': return <HabitForgeWindow />;
    }
  };

  return (
    <div className="w-full h-full overflow-hidden relative text-[15px]"
      style={{
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      }}>

      {/* Boot screen */}
      {!booted && <BootScreen onComplete={handleBooted} />}

      {/* Invisible floating Menu Bar */}
      <MenuBar
        onOpenWindow={openWindow}
        onShutdown={() => setShowShutdown(true)}
        onOpenSpotlight={() => setShowSpotlight(true)}
        onOpenSettings={() => setShowSettings(true)}
      />

      {/* Desktop + windows area */}
      <div
        className="desktop-bg fixed inset-0 top-7 bottom-0 overflow-hidden"
        style={{ zIndex: 1 }}
      >
        {/* Left side — desktop widgets */}
        <DesktopWidgets onOpenResume={() => setShowQuickLook(true)} />

        {/* Desktop icons — individually draggable, initial 2-col grid bottom-right */}
        <DraggableIconsLayer
          icons={DESKTOP_ICONS}
          onOpen={openWindow}
          onOpenResume={() => setShowQuickLook(true)}
        />

        {/* Windows */}
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

      {/* Dock */}
      <Dock onOpen={openWindow} openWindows={openWindows} />

      {/* Spotlight Search */}
      <SpotlightSearch
        isOpen={showSpotlight}
        onClose={() => setShowSpotlight(false)}
        onOpenWindow={(id) => { openWindow(id); setShowSpotlight(false); }}
      />

      {/* System Settings */}
      {showSettings && <SystemSettings onClose={() => setShowSettings(false)} />}

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
          style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(16px)' }}
        >
          <div
            className="settings-glass settings-in text-center max-w-sm w-[90%] p-8"
          >
            <div className="text-5xl mb-4">⏻</div>
            <div className="text-[16px] font-semibold text-white mb-2"
              style={{ fontFamily: 'Inter, -apple-system, sans-serif', letterSpacing: '-0.02em' }}>
              Shut Down DevOS?
            </div>
            <div className="text-[12px] text-white/50 leading-relaxed mb-6"
              style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}>
              Are you sure you want to shut down DevOS v2.0?<br />
              Unsaved inspiration will be saved automatically.
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowShutdown(false)}
                className="text-[12px] font-medium px-5 py-2 rounded-xl transition-all duration-150 hover:bg-white/15"
                style={{
                  color: 'rgba(255,255,255,0.70)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  fontFamily: 'Inter, sans-serif',
                  background: 'rgba(255,255,255,0.06)',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleShutdownConfirm}
                className="text-[12px] font-semibold px-5 py-2 rounded-xl text-white transition-all hover:scale-[1.04]"
                style={{
                  background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                  boxShadow: '0 4px 16px rgba(231,76,60,0.4)',
                  fontFamily: 'Inter, sans-serif',
                }}
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

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
