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
        <h2 class="flex row gap-05 center-align"><i class="ph ph-brackets-curly"></i> Work Experience</h2>

        <div id="experience">
            <div class="card" v-for="experience in Experience">
                <div class="flex col gap-05">
                    <div class="flex col gap-1 center-align">
                        <NuxtImg :src="`${experience.image}`" height="64" />
                        <h3>{{ experience.title }}</h3>
                    </div>

                    <div class="flex col gap-1">
                        <div>{{ experience.subtitle }}</div>
                        <div>{{ experience.description }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#experience {
    flex: 1;

    display: flex;
    flex-direction: row;

    flex-wrap: wrap;
    gap: 1rem;
}
</style>