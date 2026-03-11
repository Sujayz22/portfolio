import { useState, useRef, useCallback, useEffect } from 'react';

interface Position { x: number; y: number }

interface UseDraggableOptions {
    initialX?: number;
    initialY?: number;
    storageKey?: string;
}

export function useDraggable({ initialX = 0, initialY = 0, storageKey }: UseDraggableOptions = {}) {
    const [pos, setPos] = useState<Position>(() => {
        if (storageKey) {
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                try { return JSON.parse(saved); } catch { /* ignore */ }
            }
        }
        return { x: initialX, y: initialY };
    });

    const [dragging, setDragging] = useState(false);
    const [hasDragged, setHasDragged] = useState(false);
    const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);

    // Provide boundaries constraint so widgets mapped to off-screen coords are pulled back in
    useEffect(() => {
        setPos(p => {
            const maxX = Math.max(0, window.innerWidth - 80);
            const maxY = Math.max(28, window.innerHeight - 80);
            let nx = p.x;
            let ny = p.y;
            
            // if placed too far right (or off screen altogether)
            if (nx > maxX) nx = maxX - 120;
            // if placed too far down
            if (ny > maxY) ny = Math.max(28, maxY - 40);

            if (nx !== p.x || ny !== p.y) {
                const clamped = { x: nx, y: ny };
                if (storageKey) localStorage.setItem(storageKey, JSON.stringify(clamped));
                return clamped;
            }
            return p;
        });
    }, [storageKey]);

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        // Only drag on left button
        if (e.button !== 0) return;
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
        setHasDragged(false);
        dragRef.current = { startX: e.clientX, startY: e.clientY, origX: pos.x, origY: pos.y };

        const onMove = (ev: MouseEvent) => {
            if (!dragRef.current) return;
            const dx = ev.clientX - dragRef.current.startX;
            const dy = ev.clientY - dragRef.current.startY;
            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) setHasDragged(true);
            const nx = Math.max(0, Math.min(dragRef.current.origX + dx, window.innerWidth - 80));
            const ny = Math.max(28, Math.min(dragRef.current.origY + dy, window.innerHeight - 80));
            setPos({ x: nx, y: ny });
        };

        const onUp = () => {
            // save final position to localStorage
            setPos(p => {
                if (storageKey) localStorage.setItem(storageKey, JSON.stringify(p));
                return p;
            });
            dragRef.current = null;
            setDragging(false);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
    }, [pos.x, pos.y, storageKey]);

    return { pos, dragging, hasDragged, onMouseDown };
}
