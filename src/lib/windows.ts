import { ref } from "vue";

let lastMouseX = 0;
let lastMouseY = 0;

export function registerWindowEvents() {
    addEventListener('mousedown', (event: MouseEvent) => {
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    });

    addEventListener('mousemove', (event: MouseEvent) => {
        handleDragMoveEvents(event);

        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    });

    addEventListener('mouseup', () => {
        if(isTestWindowDragging.value) {
            stopDragTestWindow();
        }
    });
}

export function handleDragMoveEvents(event: MouseEvent) {
    if(isTestWindowDragging.value) {
        const deltaX = event.clientX - lastMouseX
        const deltaY = event.clientY - lastMouseY

        testWindowX.value += deltaX;
        testWindowY.value += deltaY;

        console.log(deltaX);
        console.log(deltaY);
    }
}

export const isTestWindowVisible = ref<boolean>(false);
export const isTestWindowDragging = ref<boolean>(false);
export const testWindowX = ref<number>(10);
export const testWindowY = ref<number>(10);

export function startDragTestWindow() {
    isTestWindowDragging.value = true;
    console.log("Starting drag move");
}
export function stopDragTestWindow() {
    isTestWindowDragging.value = false;
    console.log("Stopping drag move");
}
export function moveDragTestWindow(event: MouseEvent) {
    testWindowX.value = event.clientX;
    testWindowY.value = event.clientY;
    console.log("Moving window");
}
export function toggleTestWindow() {
    isTestWindowVisible.value = !isTestWindowVisible.value;
}