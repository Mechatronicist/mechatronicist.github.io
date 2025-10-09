<script setup lang="ts">
import ProjectData from "~/data/projects.json";

interface Project {
    name: string;
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
    <h2>What am I working on?</h2>

    <div id="projects">
        <div class="project" v-for="project in Projects">
            <div class="name">{{ project.name }}</div>
            <div class="description">{{ project.description }}</div>
            <div class="tags">
                <div class="tag" v-for="tag in project.tags">
                    {{ tag }}
                </div>
            </div>
        </div>
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
    flex: 1 1 200px;

    display: flex;
    flex-direction: column;

    gap: 0.5rem;

    border: 1px solid #202020;
    border-radius: 5px;

    background-color: #191919;

    padding: 1rem;
}
#projects .project .name {
    font-weight: bold;
}
#projects .project .tags {
    display: flex;
    flex-direction: row;

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
</style>