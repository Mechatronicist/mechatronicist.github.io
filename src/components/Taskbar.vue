<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { createWindow, minimizeOrFocusWindow, windowDefinitions, windows } from '../lib/windows';

const isMenuVisible = ref<boolean>(false);
const currentTime = ref<string>("");
const showTaskbar = ref<boolean>(false);
const menuSearchTerm = ref<string>("");

function toggleMenu() {
    isMenuVisible.value = !isMenuVisible.value;
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
            if (target.id === 'taskbar-menu-icon' || 
                target.id === 'taskbar-menu-button' ||
                target.id === 'taskbar-menu-search') {
                return;
            }
        }

        if (isMenuVisible.value) {
            isMenuVisible.value = false;
        }
    });

    showTaskbar.value = true;
    setTimeout(() => {
        setTaskbarHeight();
    }, 1000);
});

function setTaskbarHeight() {
    const taskbar = document.getElementById('taskbar');

    if (taskbar) {
        let height = window.getComputedStyle(taskbar).height;
        document.documentElement.style.setProperty('--taskbar-height', `${height}`);
    }
}

let orderedWindowDefinitions = computed(() => {
    if (menuSearchTerm.value !== "") {
        return windowDefinitions.value
            .filter(wd => wd.name.toLocaleLowerCase()
            .includes(menuSearchTerm.value.toLocaleLowerCase()))
            .sort((a, b) => a.name.localeCompare(b.name));
    }

    return windowDefinitions.value
        .sort((a, b) => a.name.localeCompare(b.name));
})
</script>

<template>
    <Transition name="slide-up">
        <div id="taskbar" v-if="showTaskbar">
            <Transition name="fade-in">
                <div id="taskbar-menu" v-if="isMenuVisible">
                    <input id="taskbar-menu-search" type="text" v-model="menuSearchTerm" placeholder="Search.." />

                    <template v-for="definition in orderedWindowDefinitions">
                        <div class="taskbar-menu-item" @click="createWindow(definition.id)">
                            <img :src="`${definition.iconPath ?? '/default.png'}`" class="icon" />
                            {{ definition.name }}
                        </div>
                    </template>

                    <template v-if="orderedWindowDefinitions.length < 1">
                        <div style="font-size: 0.75rem">No programs found..</div>
                    </template>
                </div>
            </Transition>

            <div id="taskbar-menu-button" @click="toggleMenu">
                <img id="taskbar-menu-icon" src="/src/assets/menu.png" />
            </div>

            <div class="separator"></div>

            <div id="taskbar-windows">
                <TransitionGroup name="fade-in">
                    <div v-for="window in windows" :key="window.id"
                        :class="`${window.isMinimized ? 'taskbar-window-inactive' : 'taskbar-window-active'}`" 
                        :style="`${window.isFocused && !window.isMinimized ? 'border-bottom-color: dodgerblue' : ''}`"
                        @click="minimizeOrFocusWindow(window.id)">
                        <img :src="`${window.definition.iconPath ?? '/default.png'}`" class="icon" />
                        <!-- <div class="title">{{ window.definition.name }}</div> -->
                    </div>
                </TransitionGroup>
            </div>

            <div id="taskbar-tray">
                <div id="time">
                    {{ currentTime }}
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
    #taskbar {
        display: flex;
        flex-direction: row;

        position: relative;

        align-items: center;
        gap: 1rem;

        border-top: 1px solid #303030;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(10, 10, 10, 0.5));

        backdrop-filter: blur(10px);

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

        gap: 0.5rem;

        position: absolute;

        bottom: calc(var(--taskbar-height));

        max-width: 200px;
        padding: 0.5rem;

        background-color: #101010;
        
        border: 1px solid #303030;
        border-radius: 0 10px 0 0;

        backdrop-filter: blur(10px);

        z-index: 2;
    }
    #taskbar-menu:hover {
        display: flex;
    }
    #taskbar-menu-icon {
        width: 40px;
        height: 40px;
    }
    #taskbar-menu-search {
        padding: 0.5rem;

        color: white;
        background-color: #202020;

        border: 1px solid #303030;
        border-radius: 5px;
    }
    .taskbar-menu-item {
        display: flex;
        flex-direction: row;

        align-items: center;

        gap: 0.5rem;

        font-size: 0.75rem;
        border-radius: 5px;

        color: white;
        padding: 1rem;

        transition: background-color 0.25s;

        cursor: pointer;
    }
    .taskbar-menu-item:hover {
        background-color: #202020;
    }
    .taskbar-menu-item img {
        width: 20px;
        height: 20px;
    }

    #taskbar-windows {
        flex: 1;

        display: flex;
        flex-direction: row;

        flex-wrap: wrap;

        min-width: 0;

        gap: 0.5rem;
    }

    .taskbar-window-active {
        display: flex;
        flex-direction: column;

        padding: 0.5rem;

        border-bottom: 2px solid rgb(54, 54, 54);
        border-radius: 5px 5px 0 0;
    }
    .taskbar-window-active:hover {
        background-color: rgba(255, 255, 255, 0.15);
    }
    .taskbar-window-active .icon {
        width: 20px;
        height: 20px;
    }

    .taskbar-window-inactive {
        display: flex;
        flex-direction: column;

        padding: 0.5rem;

        border-bottom: 2px solid transparent;
        border-radius: 5px;
    }
    .taskbar-window-inactive:hover {
        background-color: rgba(255, 255, 255, 0.15);
    }
    .taskbar-window-inactive .icon {
        width: 20px;
        height: 20px;

        filter:grayscale();
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