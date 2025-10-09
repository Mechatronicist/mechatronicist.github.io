<script setup lang="ts">
import { ref } from 'vue';

interface Projects {
    title: string;
    description: string;
    image: string;
    tags: string[];
    links: ProjectLink[];
}

interface ProjectLink {
    name: string;
    url: string;
}

const projects = ref<Projects[]>([
    {
        title: "MyPiUI",
        description: "A UI Framework for Raspberry Pi using the Linux Frame Buffer.",
        image: "/mypiui.png",
        tags: ["C#", "Linux", "Graphics"],
        links: [{ name: "GitHub", url: "https://github.com/lewpar/MyPiUI" }]
    },
    {
        title: "GTNUCL1633 Serial Driver",
        description: "A Python driver for the GTNUCL1633 Fingerprint Reader.",
        image: "/src/assets/menu.png",
        tags: ["Python", "Serial Communication"],
        links: [{ name: "GitHub", url: "https://github.com/lewpar/gtnucl1633" }]
    },
    {
        title: "WireGuard Command",
        description: "A tool designed for generating road-warrior style WireGuard configuration files. It also supports generating commands for each peer through the use of macros.",
        image: "/wgc.png",
        tags: ["C#", ".NET"],
        links: [{ name: "GitHub", url: "https://github.com/lewpar/WireGuardCommand" }]
    },
    {
        title: "Cyber Bilby",
        description: "An open-source tech blog built using AstroJS.",
        image: "/src/assets/menu.png",
        tags: ["JavaScript", "HTML", "CSS", "Markdown"],
        links: [{ name: "Visit", url: "https://cyberbilby.com" }]
    },
    {
        title: "AssettoNet",
        description: "A lightweight interface for receiving real-time telemetry from Assetto Corsa's UDP broadcast.",
        image: "/src/assets/menu.png",
        tags: ["C#", "UDP Networking", "Graphics"],
        links: [{ name: "GitHub", url: "https://github.com/lewpar/AssettoNet" }]
    }
]);
</script>

<template>
    <div class="projects">
         <div class="entry" v-for="project in projects">
            <img :src="project.image" class="image" />
            <div class="details">
                <div class="title">{{ project.title }}</div>
                <div class="description">
                    {{ project.description }}
                </div>
                <div class="tags">
                    <div class="tag" v-for="tag in project.tags">
                        {{ tag }}
                    </div>
                </div>
                <div class="links">
                    <a v-for="link in project.links" :href="`${link.url}`" target="_blank">{{ link.name }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.projects {
    display: flex;
    flex-direction: column;

    gap: 2rem;

    padding: 1rem;
}

.projects .entry {
    display: flex;
    flex-direction: row;

    gap: 0.5rem;

    align-items: center;
}
.projects .entry .image {
    width: 80px;
    height: 80px;

    object-fit: contain;
}
.projects .entry .details {
    display: flex;
    flex-direction: column;

    gap: 0.5rem;
}
.projects .entry .details .title {
    font-weight: bold;
}
.projects .entry .details .subtext {
    font-size: 0.75rem;
}
.projects .entry .details .tags {
    display: flex;
    flex-direction: row;

    flex-wrap: wrap;
    gap: 0.5rem;
}
.projects .entry .details .tags .tag {
    border-radius: 5px;

    background-color: rgb(0, 128, 255);

    font-size: 0.75rem;

    padding: 0.25rem;
}
.projects .entry .details .links {
    display: flex;
    flex-direction: row;

    gap: 0.5rem;

    font-size: 0.75rem;
}
</style>