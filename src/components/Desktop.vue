<script setup lang="ts">
import { onMounted } from 'vue';
import { registerWindowEvents, windows, minimizeWindow, closeWindow, startDragWindow } from '../lib/windows';

onMounted(() => {
    registerWindowEvents();
});
</script>

<template>
    <div id="desktop">

        <template v-for="window in windows">
            <div class="window" v-if="!window.isMinimized" :style="`transform: translate(${window.position.x}px, ${window.position.y}px); z-index: ${window.zIndex}`">
                <div class="header" @mousedown="startDragWindow(window.id)">
                    <div class="title">Test Window</div>
                    <div class="controls">
                        <div class="minimize" @click="minimizeWindow(window.id)">-</div>
                        <div class="exit" @click="closeWindow(window.id)">x</div>
                    </div>
                </div>
                <div class="content">
                    {{ window.content }}
                </div>
            </div>
        </template>

    </div>
</template>

<style scoped>
#desktop {
    flex: 1;

    display: flex;
    flex-direction: row;

    align-items: start;

    margin: 1rem;
}

.window {
    position: absolute;
    border: 1px solid #404040;
    border-radius: 5px;

    color: white;
    background-color: #202020;

    box-shadow: rgb(10, 10, 10) 10px 10px 10px;
}
.window .header {
    display: flex;
    flex-direction: row;

    align-items: center;
    gap: 2rem;

    font-weight: bold;
    background: linear-gradient(0deg, #101010, #202020);
    padding: 0.5rem;
}
.window .header .title {
    flex: 1;
    cursor: default;
    user-select: none;
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
    padding: 0.5rem;
}
</style>