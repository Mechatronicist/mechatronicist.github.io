<script setup lang="ts">
import { ref } from 'vue';

interface Education {
    title: string;
    subtitle: string;
    description: string;
    image: string;
}

const educations = ref<Education[]>([
    {
        title: "Diploma of Information Technology",
        subtitle: "Kangan Institute - 2024 - Current",
        description: "",
        image: "/kangan.png"
    },
    {
        title: "Certificate IV in Cyber Security",
        subtitle: "Kangan Institute - 2023 - 2024",
        description: "",
        image: "/kangan.png"
    }
    ,
    {
        title: "Certificate III in Information Technology",
        subtitle: "Victoria University - 2023",
        description: "",
        image: "/vu.png"
    }
]);
</script>

<template>
    <div class="education">
        <div class="entry" v-for="education in educations">
            <img :src="education.image" class="image" />
            <div class="details">
                <div class="title">{{ education.title }}</div>
                <div class="subtext">
                    {{ education.subtitle }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.education {
    display: flex;
    flex-direction: column;

    gap: 1rem;

    padding: 1rem;
}

.education .entry {
    display: flex;
    flex-direction: row;

    gap: 1rem;
}
.education .entry .image {
    width: 40px;
    height: 40px;

    border-radius: 50%;

    object-fit: contain;
}
.education .entry .details {
    display: flex;
    flex-direction: column;

    justify-content: center;
}
.education .entry .details .title {
    font-weight: bold;
}
.education .entry .details .subtext {
    font-size: 0.75rem;
}
</style>