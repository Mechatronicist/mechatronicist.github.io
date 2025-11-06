<script setup lang="ts">
import { getExperience } from '~/lib/data';

const experiences = getExperience();
</script>

<template>
    <div>
        <h2 class="flex row gap-05 center-align"><i class="ph ph-brackets-curly"></i> Work Experience</h2>

        <div id="experience">
            <div class="cardless" v-for="experience in experiences">
                <div class="flex col gap-05">
                    <div class="flex col gap-1 center-align">
                        <img class="mobile-friendly" :src="`${experience.image}`" height="64" loading="lazy" />
                        <h3>{{ experience.title }}</h3>
                    </div>

                    <div class="flex col gap-1">
                        <div class="flex-container">
                            <div>{{ experience.subtitle }}</div>
                            <div class="sub-item">{{ experience.date }}</div>
                        </div>
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

@media screen and (max-width: 600px) {
    .mobile-friendly {
        height: 50px;
    }
}
</style>