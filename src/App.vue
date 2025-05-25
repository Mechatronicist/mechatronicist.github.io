<script setup lang="ts">
import { onMounted } from 'vue';
import Desktop from './components/Desktop.vue';
import Taskbar from './components/Taskbar.vue';

onMounted(() => {
    const setVh = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);
});
</script>

<template>
    <Desktop></Desktop>
    <Taskbar></Taskbar>
</template>
