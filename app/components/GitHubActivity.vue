<script setup lang="ts">
import { getRecentEvents as getRecentCommits, type Commit } from '~/lib/github';

import { CalendarHeatmap } from 'vue3-calendar-heatmap';
import 'vue3-calendar-heatmap/dist/style.css'
import HeatmapData from '@/data/heatmap.json';

const props = defineProps<{
	username: string
	count: number
}>();

interface HeatmapDataPoint {
	date: string;
	count: number;
}

const commits = ref<Commit[] | null | undefined>(undefined);
const heatmap = ref<HeatmapDataPoint[]>([]);

onMounted(async () => {
	heatmap.value = HeatmapData.map(d => ({
		date: d.date,
		count: d.contributionCount
	}) as HeatmapDataPoint);

	if(props.username === undefined) {
		console.error("No GitHub username defined.");
		return;
	}

	var items = getRecentCommits();

	commits.value = items.slice(0, props.count ?? 5);
});
</script>

<template>
	<div class="flex col gap-1">
		<div>
			<CalendarHeatmap 
				:values="heatmap" 
				:end-date="new Date()"
				:round="5"
				:tooltip="true"
				:dark-mode="true">
			</CalendarHeatmap>
		</div>

		<div v-if="commits != null" v-for="commit in commits">
			<GitHubPushActivity :commit="commit"></GitHubPushActivity>
		</div>
		<div v-else>
			<div v-if="commits == undefined">
				Loading..
			</div>
			<div v-else>
				Failed to load recent activity.
			</div>
		</div>
	</div>
</template>

<style scoped>
.activity-link {
	display: flex;
	flex-direction: column;

	padding: 0.5rem;

	border: 0;
	border-radius: 5px;

	transition: background-color 0.25s;
}
.activity-link:hover {
	background-color: rgba(255, 255, 255, 0.05);
}
</style>