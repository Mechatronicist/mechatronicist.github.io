<script setup lang="ts">
import { imageSrc, closeImageViewer } from '~/lib/image-viewer';
</script>

<template>
    <template v-if="imageSrc">
        <div class="image-viewer" @click="closeImageViewer">
            <img :src="imageSrc" />
        </div>
    </template>
</template>

<style scoped>
.image-viewer {
    display: flex;
    flex-direction: row;
    
    align-items: center;
    justify-content: center;

    background-color: rgba(0, 0, 0, 0.4);

    position: fixed;

    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;
}
</style>