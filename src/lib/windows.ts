import { ref, type Component } from "vue";

let lastMouseX = 0;
let lastMouseY = 0;

const minWindowWidth = 250;
const minWindowHeight = 150;

const initialWindowWidth = 300;
const initailWindowHeight = 200;

interface Vector2 {
    x: number;
    y: number;
}

interface Window {
    id: string;
    title: string;
    position: Vector2;
    size: Vector2;
    content: Component;
    isDragging: boolean;
    isResizing: boolean;
    isMinimized: boolean;
    zIndex: number;
}

export const windows = ref<Window[]>([]);

export function createWindow(title: string, content: Component, initialSize?: Vector2) {
    let posX = Math.random() * window.innerWidth - minWindowWidth;
    let posY = Math.random() * window.innerHeight - minWindowHeight;

    if(posX <= 0) {
        posX = 10;
    }

    if(posY <= 0) {
        posY = 10;
    }

    if(!initialSize) {
        initialSize = {
            x: initialWindowWidth,
            y: initailWindowHeight
        };
    }

    window.screen.availHeight
    windows.value.push({
            id: crypto.randomUUID(),
            title: title,
            position: {
                x: posX,
                y: posY
            },
            size: {
                x: initialSize.x,
                y: initialSize.y
            },
            content: content,
            isDragging: false,
            isResizing: false,
            isMinimized: false,
            zIndex: 1
    });
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
        handleDragResizeEvents(event);

        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    });
    addEventListener('mouseup', handleDragResizeStopEvents);
}

function handleDragStartEvents(event: MouseEvent) {
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
}

function handleDragResizeStopEvents() {
    for(let window of windows.value) {
        if(window.isDragging) {
            window.isDragging = false;
        }

        if(window.isResizing) {
            window.isResizing = false;
        }
    }
}

function handleDragResizeEvents(mEvent: MouseEvent) {
    const deltaX = mEvent!.clientX - lastMouseX
    const deltaY = mEvent!.clientY - lastMouseY

    for(let window of windows.value) {
        if(window.isDragging) {
            window.position.x += deltaX;
            window.position.y += deltaY;
        }

        if(window.isResizing) {
            console.log(`Resizing ${window.title}`);
            let newWidth = window.size.x + deltaX;
            let newHeight = window.size.y + deltaY;

            if(newWidth < minWindowWidth) {
                newWidth = minWindowWidth;
            }

            if(newHeight < minWindowHeight) {
                newHeight = minWindowHeight;
            }

            window.size.x = newWidth;
            window.size.y = newHeight;
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

export function startResizeWindow(id: string) {
    const window = windows.value.find(w => w.id == id);
    if (!window) {
        return;
    }

    window.isResizing = true;
}