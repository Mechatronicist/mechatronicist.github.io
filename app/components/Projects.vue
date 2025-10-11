<script setup lang="ts">
import ProjectData from "~/data/projects.json";

interface Project {
    name: string;
    description: string;
    image: string;
    tags: string[];
    link: string;
}

const Projects = ref<Project[]>(ProjectData);
</script>

<template>
    <h2>Projects</h2>

    <div id="projects">
        <a class="project card" v-for="project in Projects" :href="`${project.link}`" target="_blank">
            <div class="image">
                <img :src="`${project.image}`" />
            </div>
            <div class="name">{{ project.name }}</div>
            <div class="description">{{ project.description }}</div>
            <div class="tags">
                <div class="tag" v-for="tag in project.tags">
                    {{ tag }}
                </div>
            </div>
        </a>
    </div>
</template>

<style scoped>
#projects {
    flex: 1;

    display: flex;
    flex-direction: row;

    flex-wrap: wrap;
    
    gap: 1rem;

    overflow-y: auto;
}
#projects .project {
    flex: 1;

    display: flex;
    flex-direction: column;

    gap: 0.5rem;

    transition: border-color 0.25s;
}
#projects .project:hover {
    border: 1px solid rgba(106, 106, 106, 0.473);
}
#projects .project .name {
    font-weight: bold;
}
#projects .project .tags {
    display: flex;
    flex-direction: row;

    flex-wrap: wrap;

    gap: 0.25rem;
}
#projects .project .tags .tag {
    display: flex;

    align-items: center;
    justify-content: center;

    border: 1px solid rgb(67, 161, 255);
    border-radius: 5px;

    background-color: dodgerblue;

    padding: 0.25rem;
}

.image {
    width: 60px;
    height: 60px;
}
.image img {
    width: 100%;
    height: 100%;

    object-fit: contain;
}
</style>