<script setup lang="ts">
import { onMounted } from 'vue';
import { registerWindowEvents, windows, minimizeWindow, closeWindow, startDragWindow, startResizeWindow } from '../lib/windows';

onMounted(() => {
    registerWindowEvents();
});
</script>

<template>
    <div id="desktop">

        <TransitionGroup name="scale-in">
            <template v-for="window in windows" :key="window.id">
                <div class="window" v-show="!window.isMinimized" 
                    :style="`left: ${window.position.x}px; top: ${window.position.y}px; width: ${window.size.x}px; height: ${window.size.y}px; z-index: ${window.zIndex}`">
                    <div class="header" @mousedown="startDragWindow(window.id)" @touchstart="startDragWindow(window.id)">
                        <img :src="`${window.iconPath}`" class="icon" />
                        <div class="title">{{ window.definition.name }}</div>
                        <div class="controls">
                            <div class="minimize" @click="minimizeWindow(window.id)">-</div>
                            <div class="exit" @click="closeWindow(window.id)">x</div>
                        </div>
                    </div>
                    <div class="content">
                        <component :is="window.definition.component"></component>
                    </div>
                    <div class="resizer" @mousedown="startResizeWindow(window.id)" @touchstart="startResizeWindow(window.id)"></div>
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

    background: linear-gradient(45deg, #101010, #202020);
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
    gap: 1rem;

    font-weight: bold;
    background: linear-gradient(0deg, #101010, #202020);
    padding: 0.5rem;

    cursor: grab;
}
.window .header .icon {
    width: 20px;
    height: 20px;
}
.window .header .title {
    flex: 1;
    user-select: none;

    text-overflow: ellipsis;
    white-space: nowrap;
}
.window .header .controls {
    display: flex;
    flex-direction: row;

    gap: 0.5rem;
}
.window .header .controls .minimize {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 24px;
    height: 24px;

    border: 1px solid #404040;
    border-radius: 5px;

    background-color: #252525;

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

    width: 24px;
    height: 24px;

    border: 1px solid #404040;
    border-radius: 5px;

    background-color: #252525;

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
</style>