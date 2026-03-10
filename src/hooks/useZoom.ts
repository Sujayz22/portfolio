import { useState, useCallback } from 'react';

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 1.5;
const STEP = 0.1;
const STORAGE_KEY = 'sujayos-zoom';

export function useZoom() {
    const [zoom, setZoom] = useState<number>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const v = parseFloat(saved);
            if (v >= MIN_ZOOM && v <= MAX_ZOOM) return v;
        }
        return 1.0;
    });

    const zoomIn = useCallback(() => {
        setZoom(prev => {
            const next = Math.min(MAX_ZOOM, parseFloat((prev + STEP).toFixed(1)));
            localStorage.setItem(STORAGE_KEY, String(next));
            return next;
        });
    }, []);

    const zoomOut = useCallback(() => {
        setZoom(prev => {
            const next = Math.max(MIN_ZOOM, parseFloat((prev - STEP).toFixed(1)));
            localStorage.setItem(STORAGE_KEY, String(next));
            return next;
        });
    }, []);

    const resetZoom = useCallback(() => {
        setZoom(1.0);
        localStorage.setItem(STORAGE_KEY, '1.0');
    }, []);

    return { zoom, zoomIn, zoomOut, resetZoom, min: MIN_ZOOM, max: MAX_ZOOM };
}
