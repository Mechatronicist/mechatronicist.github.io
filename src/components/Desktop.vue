<script setup lang="ts">
import { onMounted } from 'vue';
import { registerWindowEvents, windows, minimizeWindow, closeWindow, startDragWindow, startResizeWindow, focusWindow, launchStartupWindows } from '../lib/windows';

onMounted(() => {
    registerWindowEvents();
    launchStartupWindows();
});
</script>

<template>
    <div id="desktop">

        <TransitionGroup name="scale-in">
            <template v-for="window in windows" :key="window.id">
                <div :class="`window ${ window.isFocused ? 'focused' : '' }`" v-show="!window.isMinimized" @pointerdown="focusWindow(window.id)"
                    :style="`left: ${window.position.x}px; top: ${window.position.y}px; width: ${window.size.x}px; height: ${window.size.y}px; z-index: ${window.zIndex}`">
                    <div class="header" @pointerdown="startDragWindow(window.id)">
                        <img :src="`${window.definition.iconPath ?? '/default.png'}`" class="icon" />
                        <div class="title">{{ window.definition.name }}</div>
                        <div class="controls">
                            <div class="minimize" @click="minimizeWindow(window.id)">-</div>
                            <div class="exit" @click="closeWindow(window.id)">x</div>
                        </div>
                    </div>
                    <div class="content">
                        <component :is="window.definition.component"></component>
                    </div>
                    <div class="resizer" @pointerdown="startResizeWindow(window.id)"></div>
                </div>
            </template>
        </TransitionGroup>

    </div>
</template>

<style scoped>
#desktop {
    flex: 1;

    display: flex;
    flex-direction: row;

    align-items: start;
}

.window {
    display: flex;
    flex-direction: column;

    position: absolute;
    border: 1px solid #404040;
    border-radius: 5px;

    color: white;
    background-color: #202020;

    box-shadow: rgb(10, 10, 10) 10px 10px 10px;

    overflow: hidden;
}
.window .resizer {
    position: absolute;
    bottom: 0;
    right: 0;

    cursor: se-resize;
    user-select: none;

    width: 20px;
    height: 20px;

    margin: 4px;

    background-image: url('/src/assets/drag.png');
    background-position: center;
    background-size: cover;

    filter: brightness(30%);
}
.window .header {
    display: flex;
    flex-direction: row;

    align-items: center;
    gap: 0.5rem;

    font-weight: bold;
    background: linear-gradient(0deg, #101010, #202020);

    cursor: grab;
    user-select: none;
}
.window .header .icon {
    width: 30px;
    height: 30px;

    margin: 0.5rem;
    margin-right: 0;
}
.window .header .title {
    flex: 1;
    user-select: none;

    text-overflow: ellipsis;
    white-space: nowrap;

    margin: 0.5rem;
    margin-left: 0;
}
.window .header .controls {
    display: flex;
    flex-direction: row;

    height: 100%;
}
.window .header .controls .minimize {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;

    cursor: pointer;
    user-select: none;

    transition: background-color 0.25s;
}
.window .header .controls .minimize:hover {
    background-color: rgb(0, 140, 255);
}
.window .header .controls .exit {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;

    cursor: pointer;
    user-select: none;

    transition: background-color 0.25s;
}
.window .header .controls .exit:hover {
    background-color: red;
}
.window .content {
    display: flex;
    flex-direction: column;

    height: 100%;
    
    text-wrap: wrap;
    word-wrap: break-word;

    overflow-y: auto;
    overflow-x: hidden;
}
.focused {
    border: 1px solid rgb(100, 100, 100) !important;
}
</style>