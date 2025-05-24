import { ref } from "vue";

export const isTestWindowVisible = ref<boolean>(false);
export function toggleTestWindow() {
    isTestWindowVisible.value = !isTestWindowVisible.value;
}