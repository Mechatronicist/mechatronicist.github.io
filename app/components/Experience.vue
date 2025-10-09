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
            <div class="card" v-for="experience in Experience">
                <div class="flex col gap-05">
                    <div class="flex row gap-1 center-align">
                        <div class="image">
                            <img :src="`${experience.image}`"/>
                        </div>
                        <h3>{{ experience.title }}</h3>
                    </div>

                    <div class="flex col gap-05">
                        <p>{{ experience.subtitle }}</p>
                        <p>{{ experience.description }}</p>
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

#experience .image {
    display: flex;

    align-items: center;
    justify-content: center;

    border: 0;
    border-radius: 50%;

    padding: 0.75rem;

    background-color: white;

    min-width: 50px;
    min-height: 50px;
    max-width: 50px;
    max-height: 50px;
}
#experience .image img {
    max-width: 100%;
    max-height: 100%;
}
</style>