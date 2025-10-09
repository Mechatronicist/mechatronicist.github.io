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
    <div>
        <h2>Experience</h2>

        <div id="experience">
            <div v-for="experience in Experience">
                <h3>{{ experience.title }}</h3>
                <p>{{ experience.subtitle }}</p>
            </div>
        </div>
    </div>
</template>