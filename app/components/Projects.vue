<script setup lang="ts">
import ProjectData from "~/data/projects.json";

interface Project {
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

const Projects = ref<Project[]>(ProjectData);
</script>

<template>

</template>