<script setup lang="ts">
import ExperienceData from "~/data/experience.json";

interface Experience {
    title: string;
    subtitle: string;
    description: string;
    image: string;
}

const Experience = ref<Experience[]>(ExperienceData);
</script>

<template>

</template>