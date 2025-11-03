<script setup lang="ts">
import { getRecentEvents, type UserEvent, type PushPayload, type PullRequestPayload } from '~/lib/github';

const props = defineProps<{
	username: string
	count: number
	showMore: boolean
}>();

const userEvents = ref<UserEvent[] | null | undefined>(undefined);

onMounted(async () => {
  if(props.username === undefined) {
    console.error("No GitHub username defined.");
    return;
  }

  var items = await getRecentEvents(props.username);
  if(items === null) {
	userEvents.value = null;
	return;
  }

  userEvents.value = items;
});
</script>

<template>
	<div class="item"><GitHubEvent :username="props.username" :count="props.count" :events="userEvents?.slice(0, props.count ?? 5)" /></div>
	<div v-if="showMore === true">
		<GitHubCalendar :username="props.username" :events="userEvents"/>
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