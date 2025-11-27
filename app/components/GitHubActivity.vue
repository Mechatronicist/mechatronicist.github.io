<script setup lang="ts">
import { getRecentCommits, getTodayEvents,  type Commit, type UserEvent } from '~/lib/github';
import GitHubPushActivity from '~/components/GitHubPushActivity.vue';

const props = defineProps<{
	username: string
	count: number
	showMore: boolean
}>();

const commits = ref<Commit[] | null | undefined>(undefined);

onMounted(async () => {
	// get live event data for up to date heatmap
  if(props.username === undefined) {
    console.error("No GitHub username defined.");
    return;
  }
  // get detailed stored data for commit messages
  var items = getRecentCommits();
  if (items === null) {
	commits.value = null;
	return;
  }
  commits.value = items.slice(0, props.count ?? 5);
});
</script>

<template>
	<div class="item" v-if="commits"><GitHubPushActivity v-for="commit in commits" :commit="commit"></GitHubPushActivity></div>
	<div v-if="showMore === true">
		<GitHubCalendar :username="props.username"/>
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