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
        <h2 class="flex row gap-05 center-align"><i class="ph ph-graduation-cap"></i> Education</h2>

        <div id="education">
            <div class="card" v-for="education in Education">
                <div class="flex col gap-1">
                    <div class="image">
                        <img :src="`${education.image}`" />
                    </div>
                    <div class="flex col">
                        <b>{{ education.title }}</b>
                        <p>{{ education.subtitle }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#education {
    display: flex;
    flex-direction: row;

    flex-wrap: wrap;

    gap: 1rem;
}

#education .image {
    background-color: white;
    padding: 1rem;

    max-height: 40px;

    border-radius: 5px;
}
#education .image img {
    height: 100%;
    width: 100%;

    object-fit: contain;
}
</style>