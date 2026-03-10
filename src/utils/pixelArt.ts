// Pixel Art Canvas Rendering Utilities
// All drawing functions for SujayOS v1.0

export function adjustColor(hex: string, amount: number): string {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    r = Math.max(0, Math.min(255, r + amount));
    g = Math.max(0, Math.min(255, g + amount));
    b = Math.max(0, Math.min(255, b + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number | number[]) {
    const radii = typeof r === 'number' ? [r, r, r, r] : r;
    ctx.moveTo(x + radii[0], y);
    ctx.lineTo(x + w - radii[1], y);
    ctx.arcTo(x + w, y, x + w, y + radii[1], radii[1]);
    ctx.lineTo(x + w, y + h - radii[2]);
    ctx.arcTo(x + w, y + h, x + w - radii[2], y + h, radii[2]);
    ctx.lineTo(x + radii[3], y + h);
    ctx.arcTo(x, y + h, x, y + h - radii[3], radii[3]);
    ctx.lineTo(x, y + radii[0]);
    ctx.arcTo(x, y, x + radii[0], y, radii[0]);
    ctx.closePath();
}

export function drawDesktopFolder(ctx: CanvasRenderingContext2D, w: number, h: number, color: string, accent: string) {
    ctx.clearRect(0, 0, w, h);
    // Tab
    ctx.fillStyle = accent;
    ctx.beginPath();
    roundRectPath(ctx, 4, 8, 22, 8, [4, 4, 0, 0]);
    ctx.fill();
    // Folder body gradient
    const grad = ctx.createLinearGradient(0, 14, 0, h);
    grad.addColorStop(0, color);
    grad.addColorStop(1, adjustColor(color, -20));
    ctx.fillStyle = grad;
    ctx.beginPath();
    roundRectPath(ctx, 2, 14, w - 4, h - 16, [0, 0, 4, 4]);
    ctx.fill();
    // Highlight
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.fillRect(3, 15, w - 6, 2);
    // Bottom shadow
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(2, h - 4, w - 4, 2);
    // Pixel grid inside
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    for (let i = 20; i < h - 4; i += 5) {
        ctx.fillRect(4, i, w - 8, 1);
    }
}

export function drawLogoS(ctx: CanvasRenderingContext2D, w: number, h: number, color = '#1a1a18') {
    ctx.clearRect(0, 0, w, h);
    const s = Math.min(w, h);
    const off = (w - s) / 2;
    const u = s / 7;
    const px = (x: number, y: number, cw: number, ch: number) => {
        ctx.fillStyle = color;
        ctx.fillRect(off + x * u, y * u, cw * u, ch * u);
    };
    px(1, 0, 4, 1);
    px(0, 1, 2, 1);
    px(1, 2, 4, 1);
    px(3, 3, 2, 1);
    px(1, 4, 4, 1);
    px(0, 3, 2, 1);
}

export function drawBootLogo(ctx: CanvasRenderingContext2D, w: number, h: number) {
    ctx.clearRect(0, 0, w, h);
    const mw = w * 0.7, mh = h * 0.65;
    const mx = (w - mw) / 2, my = h * 0.05;
    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.beginPath();
    roundRectPath(ctx, mx + 4, my + 4, mw, mh, 10);
    ctx.fill();
    // Monitor body
    const grad = ctx.createLinearGradient(mx, my, mx + mw, my + mh);
    grad.addColorStop(0, '#d8d8d0');
    grad.addColorStop(1, '#b8b8b0');
    ctx.fillStyle = grad;
    ctx.beginPath();
    roundRectPath(ctx, mx, my, mw, mh, 10);
    ctx.fill();
    // Screen
    ctx.fillStyle = '#1a1a2e';
    ctx.beginPath();
    roundRectPath(ctx, mx + 8, my + 8, mw - 16, mh - 20, 6);
    ctx.fill();
    // S letter on screen
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
    roundRectPath(ctx, mx + 4, my + 2, mw - 8, 10, 4);
    ctx.fill();
}

export function drawJava(ctx: CanvasRenderingContext2D, w: number, h: number) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#e8a020';
    ctx.fillRect(8, 16, 26, 22);
    ctx.fillStyle = '#c87818';
    ctx.fillRect(8, 34, 26, 4);
    ctx.fillRect(34, 20, 5, 14);
    ctx.fillStyle = '#e8a020';
    ctx.fillRect(35, 22, 3, 10);
    ctx.fillStyle = '#c87818';
    ctx.fillRect(35, 22, 3, 2);
    ctx.fillRect(35, 30, 3, 2);
    ctx.fillStyle = '#c0c0b8';
    ctx.fillRect(14, 8, 2, 6);
    ctx.fillRect(20, 6, 2, 8);
    ctx.fillRect(26, 8, 2, 6);
    ctx.fillStyle = '#e05020';
    ctx.font = '7px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('java', w / 2, h - 2);
}

export function drawTypeScript(ctx: CanvasRenderingContext2D, w: number, h: number) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#2d79c7';
    ctx.beginPath();
    roundRectPath(ctx, 4, 4, w - 8, h - 8, 6);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(4, 4, w - 8, 10);
    ctx.fillStyle = 'white';
    ctx.font = `bold ${w * 0.38}px "Share Tech Mono"`;
    ctx.textAlign = 'center';
    ctx.fillText('TS', w / 2, h / 2 + 8);
}

export function drawOCI(ctx: CanvasRenderingContext2D, w: number, h: number) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#c74634';
    ctx.beginPath();
    ctx.arc(20, 26, 12, Math.PI, 2 * Math.PI);
    ctx.arc(32, 22, 14, Math.PI, 2 * Math.PI);
    ctx.arc(42, 26, 10, Math.PI, 2 * Math.PI);
    ctx.rect(8, 26, 38, 12);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.beginPath();
    ctx.arc(28, 20, 10, Math.PI, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#c74634';
    ctx.font = '6px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('OCI', w / 2, h - 2);
}

export function drawDocker(ctx: CanvasRenderingContext2D, w: number, h: number) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0db7ed';
    ctx.fillRect(2, 34, w - 4, 12);
    ctx.fillStyle = '#0080aa';
    ctx.fillRect(8, 26, 30, 14);
    ctx.fillRect(36, 30, 8, 8);
    ctx.fillRect(40, 24, 4, 8);
    ctx.fillStyle = 'white';
    ctx.fillRect(30, 28, 4, 4);
    ctx.fillStyle = '#004466';
    ctx.fillRect(31, 29, 2, 2);
    const boxes: [number, number][] = [[10, 18], [16, 18], [22, 18], [10, 12], [16, 12]];
    boxes.forEach(([bx, by]) => {
        ctx.fillStyle = '#60b8e0';
        ctx.fillRect(bx, by, 5, 5);
        ctx.fillStyle = '#2080aa';
        ctx.fillRect(bx + 4, by, 1, 5);
        ctx.fillRect(bx, by + 4, 6, 1);
    });
    ctx.fillStyle = '#0db7ed';
    ctx.font = '6px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('docker', w / 2, h - 1);
}

export function drawHabitForge(ctx: CanvasRenderingContext2D, w: number, h: number) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0a0a1a';
    ctx.beginPath();
    roundRectPath(ctx, 0, 0, w, h, 12);
    ctx.fill();
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 2;
    ctx.beginPath();
    roundRectPath(ctx, 1, 1, w - 2, h - 2, 12);
    ctx.stroke();
    ctx.fillStyle = '#00ff88';
    const pw = 4, ph = 4;
    const hxy: [number, number][] = [[4, 4], [4, 8], [4, 12], [4, 16], [8, 12], [12, 12], [16, 4], [16, 8], [16, 12], [16, 16]];
    hxy.forEach(([x, y]) => ctx.fillRect(x + 12, y + 8, pw, ph));
    ctx.fillStyle = '#ffd700';
    [[6, 6], [40, 10], [50, 30], [8, 40]].forEach(([x, y]) => ctx.fillRect(x, y, 2, 2));
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(8, h - 12, w - 16, 6);
    ctx.fillStyle = '#00ff88';
    ctx.fillRect(8, h - 12, (w - 16) * 0.72, 6);
}

export function drawHabitForgeDock(ctx: CanvasRenderingContext2D, w: number, h: number) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0a0a1a';
    ctx.beginPath();
    roundRectPath(ctx, 0, 0, w, h, 10);
    ctx.fill();
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    roundRectPath(ctx, 1, 1, w - 2, h - 2, 10);
    ctx.stroke();
    ctx.fillStyle = '#00ff88';
    ctx.font = `bold ${w * 0.26}px "Share Tech Mono"`;
    ctx.textAlign = 'center';
    ctx.fillText('HF', w / 2, h / 2 + 5);
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(6, 6, 3, 3);
    ctx.fillRect(w - 9, 6, 3, 3);
}

export function drawSpecsAvatar(ctx: CanvasRenderingContext2D, w: number, h: number) {
    ctx.clearRect(0, 0, w, h);
    const grad = ctx.createRadialGradient(w / 2, h / 2, 4, w / 2, h / 2, w / 2);
    grad.addColorStop(0, '#1a3a5c');
    grad.addColorStop(1, '#0e2040');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, w / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f5c8a0';
    ctx.beginPath();
    ctx.arc(w / 2, h / 2 - 4, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#2a1a08';
    ctx.beginPath();
    ctx.arc(w / 2, h / 2 - 14, 22, Math.PI, 2 * Math.PI);
    ctx.fill();
    ctx.fillRect(w / 2 - 22, h / 2 - 16, 44, 8);
    ctx.fillStyle = '#2a1a08';
    ctx.fillRect(w / 2 - 10, h / 2 - 8, 5, 5);
    ctx.fillRect(w / 2 + 5, h / 2 - 8, 5, 5);
    ctx.strokeStyle = '#8a4820';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2 - 2, 8, 0, Math.PI);
    ctx.stroke();
    ctx.fillStyle = '#2a58c5';
    ctx.beginPath();
    ctx.arc(w / 2, h - 4, 24, Math.PI, 2 * Math.PI);
    ctx.fill();
}

export function drawResumeIcon(ctx: CanvasRenderingContext2D, w: number, h: number) {
    ctx.clearRect(0, 0, w, h);
    const fold = 14;
    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath();
    ctx.moveTo(6 + fold, 6); ctx.lineTo(w - 2, 6);
    ctx.lineTo(w - 2, h - 2); ctx.lineTo(6, h - 2);
    ctx.lineTo(6, 6 + fold); ctx.closePath();
    ctx.fill();
    // Paper body
    const grad = ctx.createLinearGradient(4, 4, w - 4, h - 4);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(1, '#e8e8e8');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(4 + fold, 4); ctx.lineTo(w - 4, 4);
    ctx.lineTo(w - 4, h - 4); ctx.lineTo(4, h - 4);
    ctx.lineTo(4, 4 + fold); ctx.closePath();
    ctx.fill();
    // Fold triangle
    ctx.fillStyle = '#c8c8c0';
    ctx.beginPath();
    ctx.moveTo(4, 4 + fold); ctx.lineTo(4 + fold, 4); ctx.lineTo(4 + fold, 4 + fold);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#b0b0a8';
    ctx.lineWidth = 0.5;
    ctx.stroke();
    // Content lines
    ctx.fillStyle = '#c0c0b8';
    [22, 28, 34, 40, 46, 52].forEach((y, i) => {
        ctx.fillRect(10, y, i === 0 ? 28 : 40, 2);
    });
    // CV badge
    ctx.fillStyle = '#2a58c5';
    roundRectPath(ctx, w - 18, h - 15, 13, 9, 2);
    ctx.beginPath();
    roundRectPath(ctx, w - 18, h - 15, 13, 9, 2);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.font = 'bold 6px "Share Tech Mono"';
    ctx.textAlign = 'center';
    ctx.fillText('CV', w - 11.5, h - 8.5);
    // Border
    ctx.strokeStyle = '#b8b8b0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(4 + fold, 4); ctx.lineTo(w - 4, 4);
    ctx.lineTo(w - 4, h - 4); ctx.lineTo(4, h - 4);
    ctx.lineTo(4, 4 + fold); ctx.closePath();
    ctx.stroke();
}
