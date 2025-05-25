<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { createWindow, toggleMinimizeWindow, windows } from '../lib/windows';

    const isMenuVisible = ref<boolean>(false);
    
    function toggleMenu() {
        isMenuVisible.value = !isMenuVisible.value;
    }

    function createTestWindow(id: number) {
        createWindow(`Test Window ${id}`, "Hello World!");
    }

    onMounted(() => {
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
        <template v-for="id in [1,2,3,4,5]">
            <div class="taskbar-menu-item" @click="createTestWindow(id)">Test Window {{ id }}</div>
        </template>
    </div>
    <div id="taskbar">
        <div id="taskbar-menu-button" @click="toggleMenu">
            <img id="taskbar-menu-icon" src="/src/assets/vue.svg" />
        </div>

        <div id="taskbar-windows">
            <div class="taskbar-window" v-for="window in windows" @click="toggleMinimizeWindow(window.id)">{{ window.title }}</div>
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

        gap: 0.5rem;
    }
    .taskbar-window {
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
</style>