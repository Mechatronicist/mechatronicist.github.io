<script setup lang="ts">
import { imageSrc, closeImageViewer } from '~/lib/image-viewer';
</script>

<template>
    <template v-if="imageSrc">
        <div class="image-viewer" @click="closeImageViewer">
            <img class="image" :src="imageSrc" />
        </div>
    </template>
</template>

<style scoped>
.image-viewer {
    display: flex;
    flex-direction: row;
    
    align-items: center;
    justify-content: center;

    background-color: rgba(0, 0, 0, 0.8);

    position: fixed;

    top: 0;
    left: 0;

    width: 100%;
    height: 100vh;
}

.image {
    transform: scale(0);

    user-select: none;

    animation-name: pop-in;
    animation-duration: 0.25s;
    animation-fill-mode: both;

    height: 80%;
}

@keyframes pop-in {
    from {
        transform: scale(0);
    }

    to {
        transform: scale(100%);
    }
}

@media screen and (min-width: 800px) {
    .image {
        width: auto;
    }
}
</style>