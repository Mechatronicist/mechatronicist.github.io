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

interface WindowState {
    id: string;
    definition: WindowDefinition;
    position: Vector2;
    size: Vector2;
    isDragging: boolean;
    isResizing: boolean;
    isMinimized: boolean;
    zIndex: number;
}

interface WindowDefinition {
    id: string;
    name: string;
    component: Component;
    initialSize?: Vector2;
    iconPath?: string;
}

export const windows = ref<WindowState[]>([]);
export const windowDefinitions = ref<WindowDefinition[]>([]);

export function registerWindow(definition: WindowDefinition) {
    windowDefinitions.value.push(definition);
}

export function canCreateWindow(definitionId: string) {
    let definition = windowDefinitions.value.find(d => d.id === definitionId);
    if(!definition) {
        return false;
    }

    return true;
}

export function createWindow(definitionId: string) {
    let definition = windowDefinitions.value.find(d => d.id === definitionId);
    if(!definition) {
        console.error(`Failed to create window, no definition with id '${definitionId}' exists.`);
        return;
    }

    if(!definition.initialSize) {
        definition.initialSize = {
            x: initialWindowWidth,
            y: initailWindowHeight
        };
    }

    let posX = (window.innerWidth - definition.initialSize.x) / 2;
    let posY = (window.innerHeight - definition.initialSize.y) / 2;

    windows.value.push({
            id: crypto.randomUUID(),
            definition: definition,
            position: {
                x: posX,
                y: posY
            },
            size: {
                x: definition.initialSize.x,
                y: definition.initialSize.y
            },
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

    addEventListener('touchstart', handleDragStartEvents);
    addEventListener('touchmove', (event: TouchEvent) => {
        handleDragResizeEvents(event);

        lastMouseX = event.touches[0].clientX;
        lastMouseY = event.touches[0].clientY;
    });
    addEventListener('touchend', handleDragResizeStopEvents);
}

function handleDragStartEvents(event: MouseEvent | TouchEvent) {
     const isTouch = event instanceof TouchEvent;

    lastMouseX = (isTouch ? (event as TouchEvent).touches[0].clientX : (event as MouseEvent).clientX);
    lastMouseY = (isTouch ? (event as TouchEvent).touches[0].clientY : (event as MouseEvent).clientY);
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

function handleDragResizeEvents(event: MouseEvent | TouchEvent) {
    const isTouch = event instanceof TouchEvent;

    const deltaX = (isTouch ? (event as TouchEvent).touches[0].clientX : (event as MouseEvent).clientX) - lastMouseX
    const deltaY = (isTouch ? (event as TouchEvent).touches[0].clientY : (event as MouseEvent).clientY) - lastMouseY

    for(let window of windows.value) {
        if(window.isDragging) {
            window.position.x += deltaX;
            window.position.y += deltaY;
        }

        if(window.isResizing) {
            console.log(`Resizing ${window.definition.name}`);
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
    console.log("Dragging windows");
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