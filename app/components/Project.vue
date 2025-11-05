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
	desc: r.description,
	thumbnail: r.href
} as GalleryImage));

const activeIndex = ref(0);
const displayCustom = ref(false);

const imageClick = (index: number) => {
    activeIndex.value = index;
    displayCustom.value = true;
};
</script>

<template>
	<div class="project">
		<RouterLink to="/" class="back">Back to Portfolio</RouterLink>

		<div class="flex row gap-1 center-align">
			<img :src="`${project.image}`" height="64" />

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
				<Galleria v-model:active-index="activeIndex" :value="images" :num-visible="5" 
							v-model:visible="displayCustom" :circular="true" :fullScreen="true" :showItemNavigators="true" :showThumbnails="false">
					<template #item="slotProps">
						<img :src="slotProps.item.item" :alt="slotProps.item.alt" class="overlay-image">
							<div v-if="slotProps.item.desc" class="overlay-description">
								{{ slotProps.item.desc }}
							</div>
						</img>
					</template>
				</Galleria>

				<div v-if="images" class="images">
					<div v-for="(image, index) of images" :key="index">
						<img class="image" :src="image.thumbnail" @click="imageClick(index)" />
					</div>
				</div>

				<template v-for="resource in project.resources">
					<video v-if="resource.type == 'video'" :src="resource.href" class="resource" controls></video>
				</template>
			</div>
		</div>
	</div>

</template>

<style scoped>
.images {
	display: grid;
	grid-template-columns: 12;
	gap: 4px;
}
.image {
	border-radius: 15px;
	cursor: pointer; 
	max-width: 256px;
}
.overlay-image {
	border: 3px solid rgba(255, 255, 255, 0.25);
	object-fit: contain;
	max-height: 85vh;
}
@media screen and (max-width: 800px) {
	.image {
		max-width: 128px;
	}
	.overlay-image {
		max-width: 50vh;
	}
}
.overlay-description {
	position: absolute;

	bottom: 0;
	left: 0;

	width: 100%;
	padding: 1rem;

	background-color: rgba(0, 0, 0, 0.5);
}

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

	max-width: 100%;
}
</style>