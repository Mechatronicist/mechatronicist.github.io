<script lang="ts" setup>
import { getProjects } from '~/lib/data';

const route = useRoute();
const slug = route.params.slug as string;

const projects = getProjects();
const project = projects.find(p => p.id === slug);
</script>

<template>
    <div v-if="project" class="project">
        <RouterLink to="/" class="link">Back to Portfolio</RouterLink>

        <h1>{{ project.name }}</h1>
        <pre class="description">{{ project.description }}</pre>

        <h2>Skills Learned</h2>
        <div class="tags">
            <div class="tag" v-for="tag in project.tags">
                {{ tag }}
            </div>
        </div>
    </div>
    <div v-else>
        No project found.
    </div>
</template>

<style>
.project {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 1rem;

    padding: 1rem;

    animation-name: fade-in;
	animation-duration: 1s;
	animation-fill-mode: both;
}
.project .description {
    word-wrap: break-word;
    text-wrap: wrap;
    max-width: 100ch;
}

.project .tags {
    display: flex;
    flex-direction: row;

    flex-wrap: wrap;

    gap: 0.25rem;
}
.project .tags .tag {
    display: flex;

    align-items: center;
    justify-content: center;

    border: 1px solid rgb(67, 161, 255);
    border-radius: 5px;

    background-color: dodgerblue;

    padding: 0.25rem;
}

.link {
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 5px;

    background-color: rgba(255, 255, 255, 0.05);

    padding: 1rem;

    transition: background-color 0.25s;
}
.link:hover {
    background-color: rgba(255, 255, 255, 0.1);
}
</style>