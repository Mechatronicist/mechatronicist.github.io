<script setup lang="ts">
import { ref } from 'vue';

const uuid = ref<string>("");

function generateUuid() {
    uuid.value = crypto.randomUUID();
}
</script>

<template>
    <div class="generator">
        <h3>Generate a random Unique Identifier</h3>
        <input type="text" v-model="uuid" readonly />
        <button @click="generateUuid">Generate</button>
    </div>
</template>

<style scoped>
.generator {
    display: flex;
    flex-direction: column;

    gap: 0.5rem;
}

.generator input {
    border: 1px solid #505050;
    border-radius: 5px;
    color: white;
    background-color: #404040;
}

.generator button {
    border-radius: 5px;
    background-color: dodgerblue;
    padding: 0.5rem;
}
.generator button:hover {
    filter: brightness(110%);
}
</style>