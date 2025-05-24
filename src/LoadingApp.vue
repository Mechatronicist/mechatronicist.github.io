<template>
    <div class="flex-1 flex items-center justify-center">
        <img src="/src/assets/vue.svg" class="rotate" width="40" height="40" />
    </div>
</template>

<style scoped>
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