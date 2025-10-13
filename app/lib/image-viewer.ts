import { ref } from 'vue';

export const imageSrc = ref<string | null>(null);

export function openImageViewer(src: string) {
    imageSrc.value = src;
}

export function closeImageViewer() {
    imageSrc.value = null;
}