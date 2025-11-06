<script setup lang="ts">
import { getRecentCommits, getTodayEvents,  type Commit, type UserEvent } from '~/lib/github';
import GitHubPushActivity from '~/components/GitHubPushActivity.vue';

const props = defineProps<{
	username: string
	count: number
	showMore: boolean
}>();

const uEvents = ref<UserEvent[] | null | undefined>(undefined);
const commits = ref<Commit[] | null | undefined>(undefined);

onMounted(async () => {
	// get live event data for up to date heatmap
  if(props.username === undefined) {
    console.error("No GitHub username defined.");
    return;
  }
  var res = await getTodayEvents(props.username);
  if(res === null) {
	uEvents.value = null;
	return;
  }
  uEvents.value = res;

  // get detailed stored data for commit messages
  var items = getRecentCommits();
  commits.value = items.slice(0, props.count ?? 5);
});
</script>

<template>
	<div class="item"><GitHubPushActivity v-for="commit in commits" :commit="commit"></GitHubPushActivity></div>
	<div v-if="showMore === true">
		<GitHubCalendar :username="props.username" :events="uEvents"/>
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