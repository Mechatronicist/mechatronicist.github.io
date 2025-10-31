<script setup lang="ts">
import { type IProject } from '~/lib/data';
import Galleria from 'primevue/galleria';

const props = defineProps<{
  project: IProject
}>();

interface GalleryImage {
	item: string;
	thumbnail: string;
}

const project = props.project;
const images = props.project.resources.filter(r => r.type == "image").map(r => ({
	item: r.href,
	thumbnail: r.href
} as GalleryImage));
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

		<div class="flex row gap-05" v-if="project.link !== ''">
			<i class="ph ph-link"></i>
			<a :href="project.link" class="link">{{ project.link }}</a>
		</div>
	
		<pre class="description">{{ project.description }}</pre>

		<div class="flex col">
			<div class="tags">
				<div class="tag" v-for="tag in project.tags">
					{{ tag }}
				</div>
			</div>
		</div>

		<div class="flex col" style="width: 100%" v-if="project.resources.length > 0">
			<h2>Resources</h2>
			<div class="resources">
				<Galleria :value="images" :num-visible="5" container-style="max-width: 100%" :show-thumbnail-navigators="false">
					<template #item="slotProps">
						<img :src="slotProps.item.item" class="resource" style="max-height: 512px; max-width: 100%"/>
					</template>
					<template #thumbnail="slotProps">
						<img :src="slotProps.item.item" :alt="slotProps.item" style="max-height: 40px" />
					</template>
				</Galleria>

				<template v-for="resource in project.resources">
					
					<!-- <NuxtImg v-if="resource.type == 'image'" :src="resource.href" class="resource" @click="() => openImageViewer(resource.href)"></NuxtImg> -->
					<video v-if="resource.type == 'video'" :src="resource.href" class="resource" controls></video>
				</template>
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

.images {
	display: flex;
	flex-direction: row;

	flex-wrap: wrap;
	gap: 0.5rem;
}
.image {
	background-color: rgba(255, 255, 255, 0.05);

	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 5px;
}
.video {
	max-height: 400px;
}

.resources {
	display: flex;
	flex-direction: column;

	justify-content: center;

	flex-wrap: wrap;

	gap: 1rem;
}
.resource {
	border: 2px solid rgba(255, 255, 255, 0.2);
	border-radius: 5px;
}
</style>