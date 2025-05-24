import { ref } from "vue";

let lastMouseX = 0;
let lastMouseY = 0;

interface Vector2 {
    x: number;
    y: number;
}

interface Window {
    id: string;
    title: string;
    position: Vector2;
    content: string;
    isDragging: boolean;
    isMinimized: boolean;
    zIndex: number;
}

export const windows = ref<Window[]>([]);

export function createWindow(window: Window) {
    windows.value.push(window);
}
export function closeWindow(id: string) {
    windows.value = windows.value.filter(w => w.id != id);
}
export function minimizeWindow(id: string) {
    const window = windows.value.find(w => w.id == id);
    if (!window) {
        return;
    }

    window.isMinimized = true;
}
export function toggleMinimizeWindow(id: string) {
        const window = windows.value.find(w => w.id == id);
    if (!window) {
        return;
    }

    window.isMinimized = !window.isMinimized;
}

export function registerWindowEvents() {
    addEventListener('mousedown', handleDragStartEvents);
    addEventListener('mousemove', (event: MouseEvent) => {
        handleDragMoveEvents(event);

        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    });
    addEventListener('mouseup', handleDragStopEvents);
}

function handleDragStartEvents(event: MouseEvent) {
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
}
function handleDragStopEvents() {
    for(let window of windows.value) {
        if(window.isDragging) {
            window.isDragging = false;
        }
    }
}

export function handleDragMoveEvents(mEvent: MouseEvent) {
    const deltaX = mEvent!.clientX - lastMouseX
    const deltaY = mEvent!.clientY - lastMouseY

    for(let window of windows.value) {
        if(window.isDragging) {
            window.position.x += deltaX;
            window.position.y += deltaY;
        }
    }
}

export function startDragWindow(id: string) {
    for(let window of windows.value) {
        if (window.id !== id) {
            window.zIndex = 0;
        } else {
            window.zIndex = 1;
            window.isDragging = true;
        }
    }
}