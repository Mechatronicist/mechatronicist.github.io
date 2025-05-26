<script setup lang="ts">
import { Terminal as PrimeTerminal } from 'primevue';
import { computed } from 'vue';

const currentDate = computed(() => {
    return new Date();
})
</script>

<template>
    <div class="terminal">
        <PrimeTerminal :welcome-message="`Welcome to L-OS. ${currentDate}`" prompt="> "></PrimeTerminal>
    </div>
</template>

<style scoped>
.terminal {
    flex: 1;

    display: flex;
    flex-direction: column;

    gap: 0.5rem;
}

.terminal > div {
    flex: 1;
}
</style>