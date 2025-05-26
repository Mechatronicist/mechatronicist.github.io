<script setup lang="ts">
import { onMounted } from 'vue';

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
    <div class="loading">
        <img src="/default.png" class="rotate" width="180" height="180" />
    </div>
</template>

<style scoped>
.loading {
    flex: 1;
    display: flex;

    align-items: center;
    justify-content: center;

    background-color: black;
}
.rotate {
    animation-name: rotate;
    animation-duration: 1s;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>