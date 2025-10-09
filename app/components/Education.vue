<script setup lang="ts">
import EducationData from "~/data/education.json";

interface Education {
    title: string;
    subtitle: string;
    description: string;
    image: string;
}

const Education = ref<Education[]>(EducationData);
</script>

<template>

</template>