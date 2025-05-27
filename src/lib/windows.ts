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
    isFocused: boolean;
    zIndex: number;
}

interface WindowDefinition {
    id: string;
    name: string;
    component: Component;
    initialSize?: Vector2;
    iconPath?: string;
    openOnStartup?: boolean;
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

    const windowId = crypto.randomUUID();

    windows.value.push({
            id: windowId,
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
            isFocused: true,
            zIndex: 1
    });

    focusWindow(windowId);
}

export function launchStartupWindows() {
    for(let definition of windowDefinitions.value) {
        if(definition.openOnStartup) {
            createWindow(definition.id);
        }
    }  
}

export function focusWindow(id: string) {
    for(let window of windows.value) {
        if(window.id === id) {
            window.zIndex = 1;
            window.isFocused = true;
        } else {
            window.zIndex = 0;
            window.isFocused = false;
        }
    }    
}

export function closeWindow(id: string) {
    windows.value = windows.value.filter(w => w.id != id);
}
export function minimizeWindow(id: string) {
    const window = windows.value.find(w => w.id == id);
    if (!window) {
        return;
    }

    window.isFocused = false;
    window.isMinimized = true;
}
export function minimizeOrFocusWindow(id: string) {
    const window = windows.value.find(w => w.id == id);
    if (!window) {
        return;
    }

    if(!window.isFocused && !window.isMinimized) {
        focusWindow(window.id);
        return;
    }

    window.isMinimized = !window.isMinimized;

    if(!window.isMinimized) {
        focusWindow(window.id);
    }
    else {
        // If the current window is minimized, focus the first unminimized window that is open.
        let nextWindow = windows.value.find(w => !w.isFocused && !w.isMinimized);
        if (nextWindow) {
            focusWindow(nextWindow.id);
        }
    }
}

export function registerWindowEvents() {
    addEventListener('pointerdown', handleDragStartEvents);
    addEventListener('pointermove', (event: PointerEvent) => {
        handleDragResizeEvents(event);
        console.log("Move");

        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    });
    addEventListener('pointerup', handleDragResizeStopEvents);
}

function handleDragStartEvents(event: PointerEvent) {
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
}

function handleDragResizeStopEvents() {
    console.log("Stop");
    for(let window of windows.value) {
        if(window.isDragging) {
            window.isDragging = false;
        }

        if(window.isResizing) {
            window.isResizing = false;
        }
    }
}

function handleDragResizeEvents(event: PointerEvent) {
    const deltaX = event.clientX - lastMouseX;
    const deltaY = event.clientY - lastMouseY;

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
    for(let window of windows.value) {
        if (window.id === id) {
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