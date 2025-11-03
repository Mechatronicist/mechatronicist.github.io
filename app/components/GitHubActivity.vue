<script setup lang="ts">
import { getRecentEvents, type UserEvent, type PushPayload, type PullRequestPayload } from '~/lib/github';
import { CalendarHeatmap } from 'vue3-calendar-heatmap';
import HeatmapData from '@/data/heatmap.json';

const props = defineProps<{
	username: string
	count: number
}>();

const events = ref<UserEvent[] | null | undefined>(undefined);

onMounted(async () => {
  if(props.username === undefined) {
    console.error("No GitHub username defined.");
    return;
  }

  var items = await getRecentEvents(props.username);
  if(items === null) {
	events.value = null;
	return;
  }

  events.value = items.slice(0, props.count ?? 5);
});
</script>

<template>
	<div class="flex col gap-1">
		<CalendarHeatmap :values=""></CalendarHeatmap>
		<div v-if="events != null" v-for="event in events">
			<GitHubPushActivity v-if="event.type == 'PushEvent'" :event="event"></GitHubPushActivity>
			<GitHubPullActivity v-if="event.type == 'PullRequestEvent'" :event="event"></GitHubPullActivity>
		</div>
		<div v-else>
			<div v-if="events == undefined">
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