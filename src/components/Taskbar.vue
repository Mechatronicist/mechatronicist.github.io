<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { createWindow, toggleMinimizeWindow, windows } from '../lib/windows';
import HelloWorld from './HelloWorld.vue';
import UuidGenerator from './UuidGenerator.vue';

const isMenuVisible = ref<boolean>(false);
const currentTime = ref<string>("");

function toggleMenu() {
    isMenuVisible.value = !isMenuVisible.value;
}

function createTestWindow(id: number) {
    createWindow(`Test Window ${id}`, HelloWorld);
}

function createUuidGeneratorWindow() {
    createWindow("Uuid Generator", UuidGenerator, {
        x: 300,
        y: 200
    }, "/vite.svg");
}

function getCurrentTime12h(): string {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const hourStr = hours.toString().padStart(2, '0');
    return `${hourStr}:${minutes} ${ampm}`;
}

function updateCurrentTime() {
    currentTime.value = getCurrentTime12h();
}

setInterval(updateCurrentTime, 1000);

onMounted(() => {
    updateCurrentTime();

    addEventListener('click', (event) => {
        let target = event.target as HTMLElement;
        if (target) {
            if (target.id === 'taskbar-menu-icon' || target.id === 'taskbar-menu-button') {
                return;
            }
        }

        if (isMenuVisible.value) {
            isMenuVisible.value = false;
            console.log("Closing menu");
        }
    });
});
</script>

<template>
    <div id="taskbar-menu" v-if="isMenuVisible">
        <template v-for="id in [1,2]">
            <div class="taskbar-menu-item" @click="createTestWindow(id)">Test Window {{ id }}</div>
        </template>

        <div class="taskbar-menu-item" @click="createUuidGeneratorWindow">
            Uuid Generator
        </div>
    </div>
    <div id="taskbar">
        <div id="taskbar-menu-button" @click="toggleMenu">
            <img id="taskbar-menu-icon" src="/src/assets/vue.svg" />
        </div>

        <div class="separator"></div>

        <div id="taskbar-windows">
            <TransitionGroup name="fade-in">
                <div v-for="window in windows" :key="window.id"
                    :class="`${window.isMinimized ? 'taskbar-window-minimized' : 'taskbar-window'}`" @click="toggleMinimizeWindow(window.id)">
                    <img :src="window.iconPath" class="icon" />
                    <div class="title">{{ window.title }}</div>
                </div>
            </TransitionGroup>
        </div>

        <div id="taskbar-tray">
            <div id="time">
                {{ currentTime }}
            </div>
        </div>
    </div>
</template>

<style scoped>
    #taskbar {
        display: flex;
        flex-direction: row;

        align-items: center;
        gap: 1rem;

        border-top: 1px solid #303030;
        background: linear-gradient(0deg, black, #101010);
        z-index: 2;
        user-select: none;
    }

    #taskbar-menu-button {
        display: flex;
        padding: 0.5rem;
    }
    #taskbar-menu-button:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    #taskbar-menu {
        display: flex;
        flex-direction: column;

        position: relative;

        bottom: 0;

        max-width: 200px;

        background-color: rgba(0, 0, 0, 0.5);
        
        border: 1px solid #303030;
        border-radius: 0 10px;

        backdrop-filter: blur(10px);

        z-index: 2;
    }
    #taskbar-menu:hover {
        display: flex;
    }
    .taskbar-menu-item {
        color: white;
        padding: 0.5rem;

        transition: background-color 0.25s;

        cursor: pointer;
    }
    .taskbar-menu-item:hover {
        background-color: #202020;
    }

    #taskbar-windows {
        flex: 1;

        display: flex;
        flex-direction: row;

        flex-wrap: wrap;

        min-width: 0;

        gap: 0.5rem;
    }
    .taskbar-window {
        flex: 0 0 150px;
        width: 150px;

        display: flex;
        flex-direction: row;

        align-items: center;

        gap: 1rem;

        border: 1px solid #404040;
        border-radius: 5px;

        color: white;
        background-color: #202020;

        padding: 0.5rem;
    }
    .taskbar-window:hover {
        cursor: pointer;
        background-color: #303030;
    }
    .taskbar-window .title {
        font-size: 0.75rem;
        
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .taskbar-window .icon {
        width: 20px;
        height: 20px;
    }
    .taskbar-window-minimized {
        color: gray !important;
        background-color: transparent !important;
        border: unset !important;
    }
    #taskbar-tray {
        color: white;
        padding-right: 1rem;
    }
    #taskbar-tray #time {
        font-size: 0.85rem;
    }

    .separator {
        border-left: 1px solid #303030;
        border-right: 1px solid rgb(0, 0, 0);

        width: 2px;
        height: 60%;
    }
</style>