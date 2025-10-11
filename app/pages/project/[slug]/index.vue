<script lang="ts" setup>
import { getProjects } from '~/lib/data';

const route = useRoute();
const slug = route.params.slug as string;

const projects = getProjects();
const project = projects.find(p => p.id === slug);
</script>

<template>
    <div class="page">
        <template v-if="project">
            <Project :project="project"></Project>
        </template>
        <template v-else>
            No project found.
        </template>
    </div>
</template>