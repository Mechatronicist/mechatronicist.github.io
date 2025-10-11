<script lang="ts" setup>
import { getProjects } from '~/lib/data';

const route = useRoute();
const slug = route.params.slug as string;

const projects = getProjects();
const project = projects.find(p => p.id === slug);
</script>

<template>
  <div v-if="project" class="project">
    <RouterLink to="/">Back to Portfolio</RouterLink>

    <h1>{{ project.name }}</h1>
    <pre>{{ project.description }}</pre>
  </div>
  <div v-else>
    No project found.
  </div>
</template>

<style>
.project {
    padding: 1rem;

    animation-name: fade-in;
	animation-duration: 1s;
	animation-fill-mode: both;
}
</style>