<script setup lang="ts">
import { type IProject } from '~/lib/data';

const props = defineProps<{
  project: IProject
}>();

const project = props.project;
</script>

<template>
	<RouterLink to="/" class="link">Back to Portfolio</RouterLink>

	<div class="flex col gap-05">
		<div class="flex row gap-1">
			<img :src="`${project.image}`" height="64" />
			<h1>{{ project.name }}</h1>
		</div>
	
		<pre class="description">{{ project.description }}</pre>
	
		<div class="flex col">
			<h2>Skills Learned</h2>
			<div class="tags">
				<div class="tag" v-for="tag in project.tags">
					{{ tag }}
				</div>
			</div>
		</div>
	</div>

</template>

<style scoped>
.description {
    word-wrap: break-word;
    text-wrap: wrap;
    max-width: 100ch;
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