/* ══════════════════════════════════════════════
   SujayOS v1.0 — JavaScript Engine
   Pixel art · Springs · Windows · Interactions
══════════════════════════════════════════════ */
"use strict";

// ─────────────────────────────────────────────
// PIXEL ART RENDERING ENGINE
// ─────────────────────────────────────────────

const PixelArt = {
  // Draws a macOS-style folder icon
  drawFolder(ctx, w, h, color, label, labelColor) {
    ctx.clearRect(0, 0, w, h);
    const px = (x, y, cw, ch, c) => {
      ctx.fillStyle = c;
      ctx.fillRect(x, y, cw, ch);
    };

    // Folder back
    px(4, 10, 24, 6, color);       // tab
    px(4, 14, w - 8, h - 18, color);  // body

    // Highlight stripe
    px(4, 14, w - 8, 4, adjustColor(color, 40));

    // Shadow
    px(4, h - 6, w - 8, 3, adjustColor(color, -40));

    // Border
    ctx.strokeStyle = adjustColor(color, -60);
    ctx.lineWidth = 1;
    ctx.strokeRect(4, 14, w - 8, h - 18);
    ctx.strokeRect(4, 10, 24, 4);

    // Label inside (small pixel dots for realism)
    if (label) {
      ctx.fillStyle = adjustColor(color, -30);
      ctx.font = '7px "Press Start 2P"';
      ctx.textAlign = 'center';
      ctx.fillText(label, w / 2, h - 8);
    }
  },

  // Draws the SujayOS logo (pixelated S)
  drawLogo(ctx, w, h, color = '#1a1a18') {
    ctx.clearRect(0, 0, w, h);
    const s = Math.min(w, h);
    const off = (w - s) / 2;
    const px = (x, y, sz) => {
      ctx.fillStyle = color;
      ctx.fillRect(off + x * (s / 7), y * (s / 7), sz * (s / 7), sz * (s / 7));
    };
    // Pixel letter S
    px(1, 0, 4); // top
    px(0, 1, 2); // left top
    px(1, 2, 4); // middle
    px(3, 3, 2); // right bottom top
    px(1, 4, 4); // bottom
    px(0, 3, 2); // fill left bot
  },

  // Boot logo — stylized face/icon
  drawBootLogo(ctx, w, h) {
    ctx.clearRect(0, 0, w, h);
    // Monitor shape
    const mw = w * 0.7, mh = h * 0.65;
    const mx = (w - mw) / 2, my = h * 0.05;
    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.beginPath();
    roundRect(ctx, mx + 4, my + 4, mw, mh, 10);
    ctx.fill();
    // Monitor body
    const grad = ctx.createLinearGradient(mx, my, mx + mw, my + mh);
    grad.addColorStop(0, '#d8d8d0');
    grad.addColorStop(1, '#b8b8b0');
    ctx.fillStyle = grad;
    ctx.beginPath();
    roundRect(ctx, mx, my, mw, mh, 10);
    ctx.fill();
    // Screen
    ctx.fillStyle = '#1a1a2e';
    ctx.beginPath();
    roundRect(ctx, mx + 8, my + 8, mw - 16, mh - 20, 6);
    ctx.fill();
    // Screen glow
    ctx.fillStyle = '#00ff88';
    ctx.font = `bold ${h * 0.12}px "Press Start 2P"`;
    ctx.textAlign = 'center';
    ctx.fillText('S', w / 2, my + mh - 10);
    // Stand
    ctx.fillStyle = '#a8a8a0';
    ctx.fillRect(w / 2 - 12, my + mh, 24, 10);
    ctx.fillRect(w / 2 - 20, my + mh + 10, 40, 6);
    // Highlight
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.beginPath();
    roundRect(ctx, mx + 4, my + 2, mw - 8, 10, 4);
    ctx.fill();
  },

  // Pixel Java icon (coffee cup)
  drawJava(ctx, w, h) {
    ctx.clearRect(0, 0, w, h);
    const s = 3.5;
    ctx.imageSmoothingEnabled = false;
    // Cup body
    ctx.fillStyle = '#e8a020';
    ctx.fillRect(8, 16, 26, 22);
    // Cup shade
    ctx.fillStyle = '#c87818';
    ctx.fillRect(8, 34, 26, 4);
    // Handle
    ctx.fillStyle = '#c87818';
    ctx.fillRect(34, 20, 5, 14);
    ctx.fillStyle = '#e8a020';
    ctx.fillRect(35, 22, 3, 10);
    ctx.fillStyle = '#c87818';
    ctx.fillRect(35, 22, 3, 2);
    ctx.fillRect(35, 30, 3, 2);
    // Steam pixels
    ctx.fillStyle = '#c0c0b8';
    ctx.fillRect(14, 8, 2, 6);
    ctx.fillRect(20, 6, 2, 8);
    ctx.fillRect(26, 8, 2, 6);
    // Java text below
    ctx.fillStyle = '#e05020';
    ctx.font = '7px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('java', w / 2, h - 2);
  },

  // Pixel TypeScript icon (blue square with TS)
  drawTypeScript(ctx, w, h) {
    ctx.clearRect(0, 0, w, h);
    // Background square
    ctx.fillStyle = '#2d79c7';
    ctx.beginPath();
    roundRect(ctx, 4, 4, w - 8, h - 8, 6);
    ctx.fill();
    // Highlight stripe
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(4, 4, w - 8, 10);
    // "TS" text
    ctx.fillStyle = 'white';
    ctx.font = `bold ${w * 0.38}px "Share Tech Mono"`;
    ctx.textAlign = 'center';
    ctx.fillText('TS', w / 2, h / 2 + 8);
  },

  // Pixel OCI icon (red/orange cloud)
  drawOCI(ctx, w, h) {
    ctx.clearRect(0, 0, w, h);
    // Cloud shapes (pixel style)
    ctx.fillStyle = '#c74634';
    ctx.beginPath();
    ctx.arc(20, 26, 12, Math.PI, 2 * Math.PI);
    ctx.arc(32, 22, 14, Math.PI, 2 * Math.PI);
    ctx.arc(42, 26, 10, Math.PI, 2 * Math.PI);
    ctx.rect(8, 26, 38, 12);
    ctx.fill();
    // Highlight
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.beginPath();
    ctx.arc(28, 20, 10, Math.PI, 2 * Math.PI);
    ctx.fill();
    // Bottom label
    ctx.fillStyle = '#c74634';
    ctx.font = '6px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('OCI', w / 2, h - 2);
  },

  // Pixel Docker icon (whale + cargo)
  drawDocker(ctx, w, h) {
    ctx.clearRect(0, 0, w, h);
    // Water
    ctx.fillStyle = '#0db7ed';
    ctx.fillRect(2, 34, w - 4, 12);
    // Whale body
    ctx.fillStyle = '#0080aa';
    ctx.fillRect(8, 26, 30, 14);
    ctx.fillRect(36, 30, 8, 8);
    ctx.fillRect(40, 24, 4, 8);
    // Eye
    ctx.fillStyle = 'white';
    ctx.fillRect(30, 28, 4, 4);
    ctx.fillStyle = '#004466';
    ctx.fillRect(31, 29, 2, 2);
    // Container boxes on whale
    const boxes = [[10, 18], [16, 18], [22, 18], [10, 12], [16, 12]];
    boxes.forEach(([bx, by]) => {
      ctx.fillStyle = '#60b8e0';
      ctx.fillRect(bx, by, 5, 5);
      ctx.fillStyle = '#2080aa';
      ctx.fillRect(bx + 4, by, 1, 5);
      ctx.fillRect(bx, by + 4, 6, 1);
    });
    // Docker label
    ctx.fillStyle = '#0db7ed';
    ctx.font = '6px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('docker', w / 2, h - 1);
  },

  // HabitForge app icon (16-bit game controller face)
  drawHabitForge(ctx, w, h) {
    ctx.clearRect(0, 0, w, h);
    // Background
    ctx.fillStyle = '#0a0a1a';
    ctx.beginPath();
    roundRect(ctx, 0, 0, w, h, 12);
    ctx.fill();
    // Glow border
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 2;
    ctx.beginPath();
    roundRect(ctx, 1, 1, w - 2, h - 2, 12);
    ctx.stroke();
    // Pixel "H" letter
    ctx.fillStyle = '#00ff88';
    const pw = 4, ph = 4;
    const hxy = [[4,4],[4,8],[4,12],[4,16],[8,12],[12,12],[16,4],[16,8],[16,12],[16,16]];
    hxy.forEach(([x, y]) => ctx.fillRect(x + 12, y + 8, pw, ph));
    // Stars
    ctx.fillStyle = '#ffd700';
    [[6,6],[40,10],[50,30],[8,40]].forEach(([x,y]) => ctx.fillRect(x, y, 2, 2));
    // Bottom XP bar
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(8, h - 12, w - 16, 6);
    ctx.fillStyle = '#00ff88';
    ctx.fillRect(8, h - 12, (w - 16) * 0.72, 6);
  },

  // HabitForge dock icon
  drawHabitForgeDock(ctx, w, h) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0a0a1a';
    ctx.beginPath();
    roundRect(ctx, 0, 0, w, h, 10);
    ctx.fill();
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    roundRect(ctx, 1, 1, w - 2, h - 2, 10);
    ctx.stroke();
    ctx.fillStyle = '#00ff88';
    ctx.font = `bold ${w * 0.26}px "Share Tech Mono"`;
    ctx.textAlign = 'center';
    ctx.fillText('HF', w / 2, h / 2 + 5);
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(6, 6, 3, 3);
    ctx.fillRect(w - 9, 6, 3, 3);
  },

  // Colored folder for desktop icons
  drawDesktopFolder(ctx, w, h, color, accent) {
    ctx.clearRect(0, 0, w, h);
    // Tab
    ctx.fillStyle = accent;
    ctx.beginPath();
    roundRect(ctx, 4, 8, 22, 8, [4, 4, 0, 0]);
    ctx.fill();
    // Folder body
    const grad = ctx.createLinearGradient(0, 14, 0, h);
    grad.addColorStop(0, color);
    grad.addColorStop(1, adjustColor(color, -20));
    ctx.fillStyle = grad;
    ctx.beginPath();
    roundRect(ctx, 2, 14, w - 4, h - 16, [0, 0, 4, 4]);
    ctx.fill();
    // Inner shadow line
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.fillRect(3, 15, w - 6, 2);
    // Bottom shadow
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(2, h - 4, w - 4, 2);
    // Pixel grid inside (gives folder interior look)
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    for (let i = 20; i < h - 4; i += 5) {
      ctx.fillRect(4, i, w - 8, 1);
    }
  },
};

// ─────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────

function adjustColor(hex, amount) {
  let r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  r = Math.max(0, Math.min(255, r + amount));
  g = Math.max(0, Math.min(255, g + amount));
  b = Math.max(0, Math.min(255, b + amount));
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
}

function roundRect(ctx, x, y, w, h, r) {
  if (typeof r === 'number') r = [r, r, r, r];
  ctx.moveTo(x + r[0], y);
  ctx.lineTo(x + w - r[1], y);
  ctx.arcTo(x + w, y, x + w, y + r[1], r[1]);
  ctx.lineTo(x + w, y + h - r[2]);
  ctx.arcTo(x + w, y + h, x + w - r[2], y + h, r[2]);
  ctx.lineTo(x + r[3], y + h);
  ctx.arcTo(x, y + h, x, y + h - r[3], r[3]);
  ctx.lineTo(x, y + r[0]);
  ctx.arcTo(x, y, x + r[0], y, r[0]);
  ctx.closePath();
}

// ─────────────────────────────────────────────
// WINDOW MANAGER
// ─────────────────────────────────────────────

let highestZ = 100;
let dragState = null;
let activeWindow = null;

function openWindow(id) {
  const win = document.getElementById(`win-${id}`);
  if (!win) return;

  if (win.classList.contains('open')) {
    bringToFront(win);
    return;
  }

  if (win.classList.contains('closing')) {
    win.classList.remove('closing');
    win.style.display = 'flex';
  }

  // Position offset for stacking
  const openWindows = document.querySelectorAll('.window.open');
  const offset = openWindows.length * 26;
  const baseLeft = parseInt(win.style.left) || 100;
  const baseTop  = parseInt(win.style.top)  || 80;

  if (openWindows.length > 0) {
    win.style.left = `${baseLeft + offset}px`;
    win.style.top  = `${baseTop  + offset}px`;
  }

  win.classList.add('open');
  bringToFront(win);

  // Animate the desktop icon
  const icon = document.querySelector(`[data-window="${id}"]`);
  if (icon) {
    icon.classList.add('opening');
    setTimeout(() => icon.classList.remove('opening'), 400);
  }
}

function closeWindow(id) {
  const win = document.getElementById(`win-${id}`);
  if (!win || !win.classList.contains('open')) return;
  win.classList.add('closing');
  setTimeout(() => {
    win.classList.remove('open', 'closing', 'active');
  }, 280);
}

function minimizeWindow(id) {
  const win = document.getElementById(`win-${id}`);
  if (!win || !win.classList.contains('open')) return;
  win.classList.add('minimizing');
  setTimeout(() => {
    win.classList.remove('open', 'minimizing', 'active');
    win.style.transform = '';
  }, 300);
}

function maximizeWindow(id) {
  const win = document.getElementById(`win-${id}`);
  if (!win) return;
  const isMaximized = win.dataset.maximized === 'true';
  if (isMaximized) {
    win.style.left   = win.dataset.prevLeft;
    win.style.top    = win.dataset.prevTop;
    win.style.width  = win.dataset.prevWidth;
    win.style.height = win.dataset.prevHeight;
    win.dataset.maximized = 'false';
  } else {
    win.dataset.prevLeft   = win.style.left;
    win.dataset.prevTop    = win.style.top;
    win.dataset.prevWidth  = win.style.width;
    win.dataset.prevHeight = win.style.height;
    win.style.left   = '4px';
    win.style.top    = '4px';
    win.style.width  = `calc(100vw - 8px)`;
    win.style.height = `calc(100vh - 104px)`;
    win.dataset.maximized = 'true';
  }
  bringToFront(win);
}

function bringToFront(win) {
  highestZ++;
  win.style.zIndex = highestZ;
  document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));
  win.classList.add('active');
  activeWindow = win;
}

// ─── Drag ───────────────────────────────────

function initDragging() {
  document.addEventListener('mousedown', e => {
    const titlebar = e.target.closest('.window-titlebar');
    if (!titlebar) return;
    if (e.target.closest('.win-btn')) return;

    const win = titlebar.closest('.window');
    if (!win) return;

    bringToFront(win);
    const rect = win.getBoundingClientRect();

    dragState = {
      win,
      startX: e.clientX,
      startY: e.clientY,
      origLeft: rect.left,
      origTop:  rect.top,
    };

    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!dragState) return;
    const dx = e.clientX - dragState.startX;
    const dy = e.clientY - dragState.startY;
    let newLeft = dragState.origLeft + dx;
    let newTop  = dragState.origTop  + dy;
    // Clamp within viewport
    newLeft = Math.max(0, Math.min(newLeft, window.innerWidth  - 200));
    newTop  = Math.max(24, Math.min(newTop,  window.innerHeight - 100));
    dragState.win.style.left = `${newLeft}px`;
    dragState.win.style.top  = `${newTop}px`;
  });

  document.addEventListener('mouseup', () => { dragState = null; });

  // Touch support
  document.addEventListener('touchstart', e => {
    const titlebar = e.target.closest('.window-titlebar');
    if (!titlebar || e.target.closest('.win-btn')) return;
    const win = titlebar.closest('.window');
    if (!win) return;
    bringToFront(win);
    const touch = e.touches[0];
    const rect = win.getBoundingClientRect();
    dragState = { win, startX: touch.clientX, startY: touch.clientY, origLeft: rect.left, origTop: rect.top };
  }, { passive: true });

  document.addEventListener('touchmove', e => {
    if (!dragState) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragState.startX;
    const dy = touch.clientY - dragState.startY;
    let newLeft = Math.max(0, dragState.origLeft + dx);
    let newTop  = Math.max(24, dragState.origTop  + dy);
    dragState.win.style.left = `${newLeft}px`;
    dragState.win.style.top  = `${newTop}px`;
  }, { passive: true });

  document.addEventListener('touchend', () => { dragState = null; });
}

// ─────────────────────────────────────────────
// MENU BAR
// ─────────────────────────────────────────────

function initMenuBar() {
  const menuItems = document.querySelectorAll('.menu-item');

  menuItems.forEach(item => {
    item.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = item.classList.contains('open');
      // Close all
      menuItems.forEach(m => m.classList.remove('open'));
      if (!isOpen && item.querySelector('.dropdown')) {
        item.classList.add('open');
      }
    });
  });

  document.addEventListener('click', () => {
    menuItems.forEach(m => m.classList.remove('open'));
  });

  // File menu items open windows
  document.querySelectorAll('[data-window]').forEach(el => {
    if (el.classList.contains('dropdown-item')) {
      el.addEventListener('click', e => {
        const id = el.dataset.window;
        openWindow(id);
      });
    }
  });
}

// ─────────────────────────────────────────────
// CLOCK
// ─────────────────────────────────────────────

function updateClock() {
  const el = document.getElementById('clockDisplay');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

// ─────────────────────────────────────────────
// DESKTOP ICON INTERACTIONS
// ─────────────────────────────────────────────

function initDesktopIcons() {
  let lastClick = { id: null, time: 0 };

  document.querySelectorAll('.desktop-icon').forEach(icon => {
    icon.addEventListener('click', e => {
      const id = icon.dataset.window;
      const now = Date.now();

      // Select
      document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
      icon.classList.add('selected');

      // Double-click detection (or single click for immediate open)
      if (lastClick.id === id && now - lastClick.time < 500) {
        openWindow(id);
        icon.classList.remove('selected');
        lastClick = { id: null, time: 0 };
      } else {
        lastClick = { id, time: now };
        // Auto-open after brief delay for smooth UX
        setTimeout(() => {
          if (lastClick.id === id) openWindow(id);
        }, 300);
      }

      e.stopPropagation();
    });

    icon.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openWindow(icon.dataset.window);
      }
    });
  });

  // Deselect on desktop click
  document.getElementById('desktop').addEventListener('click', () => {
    document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
  });
}

// ─────────────────────────────────────────────
// WINDOW BUTTON HANDLERS
// ─────────────────────────────────────────────

function initWindowButtons() {
  document.querySelectorAll('.win-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const action = btn.dataset.action;
      const target = btn.dataset.target;
      if (!target) return;
      const id = target.replace('win-', '');
      if      (action === 'close')    closeWindow(id);
      else if (action === 'minimize') minimizeWindow(id);
      else if (action === 'maximize') maximizeWindow(id);
    });
  });

  // Bring window to front on click
  document.querySelectorAll('.window').forEach(win => {
    win.addEventListener('mousedown', () => bringToFront(win));
  });
}

// ─────────────────────────────────────────────
// DOCK
// ─────────────────────────────────────────────

function initDock() {
  document.querySelectorAll('.dock-item').forEach(item => {
    item.addEventListener('click', () => {
      const id = item.dataset.window;
      if (id) {
        openWindow(id);
        // Bounce animation
        item.style.transform = 'scale(1.5) translateY(-18px)';
        setTimeout(() => { item.style.transform = ''; }, 300);
      }
    });

    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openWindow(item.dataset.window);
      }
    });
  });
}

// ─────────────────────────────────────────────
// PIXEL ART RENDERING
// ─────────────────────────────────────────────

function renderAllPixelArt() {
  // Desktop folder icons
  const folderConfigs = {
    'folder-edu':  { color: '#3a7bd5', accent: '#1a5bbf' },
    'folder-work': { color: '#c47a20', accent: '#a05818' },
    'folder-proj': { color: '#8e44ad', accent: '#6c3291' },
    'folder-spec': { color: '#27ae60', accent: '#1d8049' },
  };

  document.querySelectorAll('.icon-canvas').forEach(canvas => {
    const type = canvas.dataset.type;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;

    switch (type) {
      case 'folder-edu':
      case 'folder-work':
      case 'folder-proj':
      case 'folder-spec':
        const fc = folderConfigs[type];
        PixelArt.drawDesktopFolder(ctx, w, h, fc.color, fc.accent);
        break;
      case 'habitforge':
        PixelArt.drawHabitForge(ctx, w, h);
        break;
    }
  });

  // Dock icons
  document.querySelectorAll('.dock-canvas').forEach(canvas => {
    const type = canvas.dataset.type;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    ctx.imageSmoothingEnabled = false;

    switch (type) {
      case 'java':           PixelArt.drawJava(ctx, w, h);           break;
      case 'typescript':     PixelArt.drawTypeScript(ctx, w, h);     break;
      case 'oci':            PixelArt.drawOCI(ctx, w, h);             break;
      case 'docker':         PixelArt.drawDocker(ctx, w, h);          break;
      case 'habitforge-dock': PixelArt.drawHabitForgeDock(ctx, w, h); break;
    }
  });

  // Menu bar logo
  const logoCanvas = document.getElementById('logoCanvas');
  if (logoCanvas) {
    const ctx = logoCanvas.getContext('2d');
    PixelArt.drawLogo(ctx, logoCanvas.width, logoCanvas.height, '#1a1a18');
  }

  // Specs avatar
  const specsAvatar = document.getElementById('specsAvatar');
  if (specsAvatar) {
    const ctx = specsAvatar.getContext('2d');
    drawSpecsAvatar(ctx, specsAvatar.width, specsAvatar.height);
  }

  // Boot logo
  const bootLogo = document.getElementById('bootLogo');
  if (bootLogo) {
    const ctx = bootLogo.getContext('2d');
    PixelArt.drawBootLogo(ctx, bootLogo.width, bootLogo.height);
  }
}

function drawSpecsAvatar(ctx, w, h) {
  // Pixel portrait
  ctx.clearRect(0, 0, w, h);
  // Background circle
  const grad = ctx.createRadialGradient(w/2, h/2, 4, w/2, h/2, w/2);
  grad.addColorStop(0, '#1a3a5c');
  grad.addColorStop(1, '#0e2040');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(w/2, h/2, w/2, 0, Math.PI * 2);
  ctx.fill();
  // Face
  ctx.fillStyle = '#f5c8a0';
  ctx.beginPath();
  ctx.arc(w/2, h/2 - 4, 22, 0, Math.PI * 2);
  ctx.fill();
  // Hair
  ctx.fillStyle = '#2a1a08';
  ctx.beginPath();
  ctx.arc(w/2, h/2 - 14, 22, Math.PI, 2*Math.PI);
  ctx.fill();
  ctx.fillRect(w/2 - 22, h/2 - 16, 44, 8);
  // Eyes
  ctx.fillStyle = '#2a1a08';
  ctx.fillRect(w/2 - 10, h/2 - 8, 5, 5);
  ctx.fillRect(w/2 + 5, h/2 - 8, 5, 5);
  // Smile
  ctx.strokeStyle = '#8a4820';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(w/2, h/2 - 2, 8, 0, Math.PI);
  ctx.stroke();
  // Collar / shirt
  ctx.fillStyle = '#2a58c5';
  ctx.beginPath();
  ctx.arc(w/2, h - 4, 24, Math.PI, 2*Math.PI);
  ctx.fill();
}

// ─────────────────────────────────────────────
// FEATURED PROJECT CLICK
// ─────────────────────────────────────────────

function initProjectCards() {
  const featuredCard = document.getElementById('proj-habitforge');
  if (featuredCard) {
    featuredCard.addEventListener('click', () => openWindow('habitforge'));
  }
}

// ─────────────────────────────────────────────
// SHUTDOWN DIALOG
// ─────────────────────────────────────────────

function initShutdown() {
  const overlay  = document.getElementById('shutdownOverlay');
  const btn      = document.getElementById('shutdownBtn');
  const cancel   = document.getElementById('cancelShutdown');
  const confirm  = document.getElementById('confirmShutdown');

  btn.addEventListener('click', () => {
    document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('open'));
    overlay.classList.add('open');
  });

  cancel.addEventListener('click', () => overlay.classList.remove('open'));

  confirm.addEventListener('click', () => {
    overlay.classList.remove('open');
    document.querySelectorAll('.window').forEach(win => {
      if (win.classList.contains('open')) closeWindow(win.id.replace('win-',''));
    });
    setTimeout(() => {
      document.body.style.transition = 'opacity 1.5s ease';
      document.body.style.opacity = '0';
      setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = '';
        showBoot();
      }, 1500);
    }, 400);
  });
}

// ─────────────────────────────────────────────
// QUEST CLICK FEEDBACK
// ─────────────────────────────────────────────

function initQuestInteractions() {
  const claimBtn = document.getElementById('claim-quest');
  if (claimBtn) {
    claimBtn.addEventListener('click', () => {
      claimBtn.textContent = '✔ CLAIMED!';
      claimBtn.style.background = 'rgba(0,255,136,0.2)';
      claimBtn.style.borderColor = 'rgba(0,255,136,0.5)';
      claimBtn.style.color = '#00ff88';
      // Animate XP
      const xpEl = document.getElementById('g-xp');
      if (xpEl) {
        let xp = 2840;
        const target = 2920;
        const interval = setInterval(() => {
          xp += 4;
          xpEl.textContent = xp;
          if (xp >= target) { xpEl.textContent = target; clearInterval(interval); }
        }, 30);
      }
      // Animate XP bar
      const bar = document.getElementById('xpBar');
      if (bar) bar.style.width = '80%';
    });
  }
}

// ─────────────────────────────────────────────
// BOOT SEQUENCE
// ─────────────────────────────────────────────

function showBoot() {
  const screen = document.getElementById('bootScreen');
  const progress = document.getElementById('bootProgress');
  screen.classList.remove('hidden');
  progress.style.width = '0%';

  const steps = [15, 35, 55, 75, 90, 100];
  let i = 0;
  const advance = () => {
    if (i >= steps.length) {
      setTimeout(() => {
        screen.classList.add('hidden');
        // Auto-open welcome windows after boot
        setTimeout(() => openWindow('education'), 300);
        setTimeout(() => openWindow('habitforge'), 700);
      }, 400);
      return;
    }
    progress.style.width = steps[i] + '%';
    i++;
    setTimeout(advance, 260 + Math.random() * 200);
  };
  setTimeout(advance, 300);
}

// ─────────────────────────────────────────────
// MAIN INIT
// ─────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Render all pixel art first
  renderAllPixelArt();

  // Initialize all subsystems
  initDragging();
  initMenuBar();
  initDesktopIcons();
  initWindowButtons();
  initDock();
  initProjectCards();
  initShutdown();
  initQuestInteractions();

  // Clock
  updateClock();
  setInterval(updateClock, 1000);

  // Boot sequence
  showBoot();

  // Keyboard shortcut: Escape closes topmost window
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const topWin = [...document.querySelectorAll('.window.open')]
        .sort((a, b) => parseInt(b.style.zIndex) - parseInt(a.style.zIndex))[0];
      if (topWin) closeWindow(topWin.id.replace('win-',''));
    }
  });

  // Click anywhere on desktop deselects icons
  document.getElementById('desktop').addEventListener('click', e => {
    if (!e.target.closest('.desktop-icon') && !e.target.closest('.window')) {
      document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
    }
  });
});
