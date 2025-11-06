<script setup lang="ts">
import { getEducation } from '~/lib/data';

const educations = getEducation();
</script>

<template>
    <div>
        <h2 class="flex row gap-05 center-align"><i class="ph ph-graduation-cap"></i> Education</h2>

        <div id="education">
            <div class="cardless" v-for="education in educations">
                <div class="flex col gap-1 center-align center-justify" style="text-align: center;">
                    <img :src="`${education.image}`" height="64" loading="lazy" />

                    <div class="flex col gap-05">
                        <b>{{ education.title }}</b>
                        <div class="flex-container">
                            <div>{{ education.subtitle }}</div>
                            <div class="sub-item">{{ education.date }}</div>
                        </div>
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