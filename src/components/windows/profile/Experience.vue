<script setup lang="ts">
import { ref } from 'vue';

interface WorkExperience {
    title: string;
    subtitle: string;
    description: string;
    image: string;
}

const experiences = ref<WorkExperience[]>([
    {
        title: "Junior Software Developer",
        subtitle: "AdvancedIT Ltd - Feb 2025 - Apr 2025",
        description: "Designed, developed and improved upon an existing in-house tool to maintain and manage WireGuard client configurations.",
        image: "/advancedit.png"
    },
    {
        title: "Web Developer",
        subtitle: "Kangan Institute - Nov 2024",
        description: "Collaborated on the design and development of a website for Kangan Insitutes Enchanted 2024 fashion event.",
        image: "/kangan.png"
    },
    {
        title: "Junior Software Developer",
        subtitle: "AdvancedIT Ltd - Jun 2023 - Jul 2023",
        description: "Designed and developed an open source tool (WireGuard Command) to manage WireGuard configurations for clients.",
        image: "/advancedit.png"
    }
]);
</script>

<template>
    <div class="experience">
        <div class="entry" v-for="experience in experiences">
            <img :src="experience.image" class="image" />
            <div class="details">
                <div class="title">
                    {{ experience.title }}
                </div>
                <div class="subtitle">
                    {{ experience.subtitle }}
                </div>
                <div class="description">
                    {{ experience.description }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.experience {
    display: flex;
    flex-direction: column;

    gap: 1rem;

    padding: 1rem;
}
.experience .entry {
    display: flex;
    flex-direction: row;

    align-items: center;

    gap: 1rem;
}
.experience .entry .image {
    width: 70px;
    height: 70px;

    background-color: white; 
    padding: 0.5rem; 
    border-radius: 50%;

    object-fit: contain;
}
.experience .entry .details {
    display: flex;
    flex-direction: column;

    gap: 0.25rem;
}
.experience .entry .details .title {
    font-weight: bold;
    font-size: 1.1rem;
}
.experience .entry .details .subtitle {
    font-style: italic;
    font-size: 0.75rem;
}
.experience .entry .details .description {
    font-size: 0.9rem;
}
</style>