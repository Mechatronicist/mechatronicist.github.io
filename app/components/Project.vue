<script setup lang="ts">
import { type IProject } from '~/lib/data';

const props = defineProps<{
  project: IProject
}>();

const project = props.project;
</script>

<template>
	<div class="project">
		<RouterLink to="/" class="back">Back to Portfolio</RouterLink>

		<div class="flex row gap-1 center-align">
			<NuxtImg :src="`${project.image}`" height="64" />

			<div class="flex col gap-05">
				<div class="title">{{ project.name }}</div>
				<div class="subtext">{{ project.subtext }}</div>
			</div>
		</div>

		<a :href="project.link" class="link">{{ project.link }}</a>
	
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
.back {
	align-self: center;
	
	background-color: rgba(255, 255, 255, 0.05);
	
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 5px;

	padding: 1rem;

	transition: background-color 0.25s;
}
.back:hover {
	background-color: rgba(255, 255, 255, 0.1);
}
.project {
	align-self: center;

	display: flex;
	flex-direction: column;

	align-items: start;

	gap: 1rem;
}
.title {
	font-size: 2rem;
	font-weight: bold;
}
.subtext {
	color: rgb(164, 164, 164);
}
.description {
    word-wrap: break-word;
    text-wrap: wrap;
    max-width: 100ch;
}

.link {
    color: dodgerblue;
    transition: color 0.25s;
}
.link:hover {
    color: rgb(32, 170, 255);
}
</style>