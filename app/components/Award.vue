<script setup lang="ts">
import type { IAward } from '~/lib/data';

const props = defineProps<{
    award: IAward
}>();
</script>

<template>
   <a class="award" :href="props.award.link" target="_blank">
        <div class="title">{{ props.award.name }}</div>
        <div class="grantor">{{ props.award.grantor }}</div>
        <div class="description">{{ props.award.description }}</div>
   </a> 
</template>

<style scoped>
.award {
    display: flex;
    flex-direction: column;

    gap: 0.25rem;

    background-color: rgba(255, 255, 255, 0.05);

    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 5px;

    padding: 0.5rem;

    transition: background-color 0.25s;
}
.award:hover {
    background-color: rgba(255, 255, 255, 0.1);
}
.award .title {
    font-weight: bold;
}
.award .grantor {
    font-size: 0.8rem;
}
.award .description {
    margin-top: 0.5rem;
}
</style>