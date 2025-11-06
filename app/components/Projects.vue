<script setup lang="ts">
import { getProjects } from "~/lib/data";

const projects = getProjects();
</script>

<template>
    <h2 class="flex row gap-05 center-align"><i class="ph ph-folder-open"></i> Projects</h2>

    <div id="projects">
        <RouterLink :class="`project ${(project.visible ? '' : 'hidden')}`" v-for="project in projects" :to="`/project/${project.id}`">
            <img :src="`${project.image}`" :quality="1" height="50" loading="lazy" />
            <div class="name">{{ project.name }}</div>
            <div class="summary">{{ project.summary }}</div>
        </RouterLink>
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

    min-width: 200px;

    align-items: center;
    justify-content: center;

    text-align: center;

    background-color: rgba(255, 255, 255, 0.05);

    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;

    gap: 0.5rem;

    padding: 1rem;

    transition: border-color 0.25s, background-color 0.25s;
}
#projects .project:hover {
    border: 1px solid rgba(255, 255, 255, 0.2);
    background-color: rgba(255, 255, 255, 0.1);
}
#projects .project .name {
    font-weight: bold;
}
#projects .project .summary {
    text-align: center;
}

@media screen and (max-width: 600px) {
    #projects .project {
        min-width: 128px;
    }
    #projects .project .summary {
        display: none;
    }
}
</style>