<script setup lang="ts">
import { getProjects, type IProject } from "~/lib/data";

const Projects = ref<IProject[]>(getProjects());
</script>

<template>
    <h2 class="flex row gap-05 center-align"><i class="ph ph-folder-open"></i> Projects</h2>

    <div id="projects">
        <RouterLink class="project card" v-for="project in Projects" :to="`/project/${project.id}`">
            <div class="image">
                <img :src="`${project.image}`" />
            </div>
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

    align-items: center;
    justify-content: center;

    gap: 0.5rem;

    transition: border-color 0.25s;
}
#projects .project:hover {
    border: 1px solid rgba(106, 106, 106, 0.473);
}
#projects .project .name {
    font-weight: bold;
}
#projects .project .summary {
    text-align: center;
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