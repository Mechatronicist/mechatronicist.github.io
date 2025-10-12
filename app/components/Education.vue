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
            <div class="cardless" v-for="education in Education">
                <div class="flex col gap-1 center-align center-justify" style="text-align: center;">
                    <NuxtImg :src="`${education.image}`" height="64" loading="lazy" />

                    <div class="flex col gap-05">
                        <b>{{ education.title }}</b>
                        <div>{{ education.subtitle }}</div>
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
</style>