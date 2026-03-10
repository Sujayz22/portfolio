import { useState, useCallback } from 'react';

export type WindowId = 'education' | 'worklog' | 'projects' | 'specs' | 'habitforge';

export interface WindowState {
    id: WindowId;
    isOpen: boolean;
    isMinimized: boolean;
    zIndex: number;
    x: number;
    y: number;
    width: number;
    height: number;
    prevX?: number;
    prevY?: number;
    prevWidth?: number;
    prevHeight?: number;
    isMaximized: boolean;
}

const INITIAL_POSITIONS: Record<WindowId, Partial<WindowState>> = {
    education: { x: 120, y: 80, width: 560, height: 440 },
    worklog: { x: 200, y: 120, width: 600, height: 480 },
    projects: { x: 280, y: 60, width: 680, height: 520 },
    specs: { x: 160, y: 100, width: 520, height: 460 },
    habitforge: { x: 340, y: 90, width: 620, height: 520 },
};

let highestZ = 100;
let openCount = 0;

export function useWindowManager() {
    const [windows, setWindows] = useState<Record<WindowId, WindowState>>(() => {
        const ids: WindowId[] = ['education', 'worklog', 'projects', 'specs', 'habitforge'];
        return Object.fromEntries(
            ids.map(id => [id, {
                id,
                isOpen: false,
                isMinimized: false,
                zIndex: 100,
                isMaximized: false,
                ...INITIAL_POSITIONS[id],
            }])
        ) as Record<WindowId, WindowState>;
    });

    const openWindow = useCallback((id: WindowId) => {
        setWindows(prev => {
            const existing = prev[id];
            if (existing.isOpen) {
                // Bring to front
                highestZ++;
                return { ...prev, [id]: { ...existing, zIndex: highestZ } };
            }
            highestZ++;
            openCount++;
            const offsetX = (openCount - 1) * 24 % 120;
            const offsetY = (openCount - 1) * 24 % 80;
            return {
                ...prev,
                [id]: {
                    ...existing,
                    isOpen: true,
                    isMinimized: false,
                    zIndex: highestZ,
                    x: (INITIAL_POSITIONS[id].x ?? 100) + offsetX,
                    y: (INITIAL_POSITIONS[id].y ?? 80) + offsetY,
                },
            };
        });
    }, []);

    const closeWindow = useCallback((id: WindowId) => {
        setWindows(prev => ({
            ...prev,
            [id]: { ...prev[id], isOpen: false, isMinimized: false },
        }));
        openCount = Math.max(0, openCount - 1);
    }, []);

    const minimizeWindow = useCallback((id: WindowId) => {
        setWindows(prev => ({
            ...prev,
            [id]: { ...prev[id], isOpen: false, isMinimized: true },
        }));
    }, []);

    const maximizeWindow = useCallback((id: WindowId) => {
        setWindows(prev => {
            const win = prev[id];
            highestZ++;
            if (win.isMaximized) {
                return {
                    ...prev,
                    [id]: {
                        ...win,
                        x: win.prevX ?? 100,
                        y: win.prevY ?? 80,
                        width: win.prevWidth ?? 560,
                        height: win.prevHeight ?? 440,
                        isMaximized: false,
                        zIndex: highestZ,
                    },
                };
            }
            return {
                ...prev,
                [id]: {
                    ...win,
                    prevX: win.x, prevY: win.y,
                    prevWidth: win.width, prevHeight: win.height,
                    x: 4, y: 4,
                    width: window.innerWidth - 8,
                    height: window.innerHeight - 108,
                    isMaximized: true,
                    zIndex: highestZ,
                },
            };
        });
    }, []);

    const bringToFront = useCallback((id: WindowId) => {
        highestZ++;
        setWindows(prev => ({ ...prev, [id]: { ...prev[id], zIndex: highestZ } }));
    }, []);

    const updatePosition = useCallback((id: WindowId, x: number, y: number) => {
        setWindows(prev => ({ ...prev, [id]: { ...prev[id], x, y } }));
    }, []);

    return { windows, openWindow, closeWindow, minimizeWindow, maximizeWindow, bringToFront, updatePosition };
}
