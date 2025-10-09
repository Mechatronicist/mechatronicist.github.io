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
    <div>
        <h2>Education</h2>

        <div id="education">
            <div v-for="education in Education">
                <h3>{{ education.title }}</h3>
                <p>{{ education.subtitle }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
#education {
    display: flex;
    flex-direction: column;

    gap: 0.25rem;
}
</style>