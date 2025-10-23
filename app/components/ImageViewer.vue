<script setup lang="ts">
import { imageSrc, closeImageViewer } from '~/lib/image-viewer';
</script>

<template>
    <template v-if="imageSrc">
        <div class="image-viewer-container">
            <div class="image-viewer" @click="closeImageViewer">
                <img class="image" :src="imageSrc" />
            </div>
        </div>
    </template>
</template>

<style scoped>
.image-viewer-container {
    display: flex;
    flex-direction: column;

    top: 0;
    left: 0;

    position: fixed;

    height: 100px;
    width: 100px;

    background-color: red;
}
.image-viewer {
    display: flex;
    flex-direction: row;
    
    align-items: center;
    justify-content: center;

    position: sticky;

    top: 0;
    left: 0;
}

.image {
    transform: scale(0);

    user-select: none;

    animation-name: pop-in;
    animation-duration: 0.25s;
    animation-fill-mode: both;

    height: 100vh;
}

@keyframes pop-in {
    from {
        transform: scale(0);
    }

    to {
        transform: scale(100%);
    }
}

@media screen and (max-width: 800px) {
    .image {
        width: 100%;
        height: unset;
    }
    .image-viewer {
        height: unset;
        padding: 1rem;
    }
}
</style>