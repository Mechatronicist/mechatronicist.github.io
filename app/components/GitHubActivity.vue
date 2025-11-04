<script setup lang="ts">
import { getRecentEvents as getRecentCommits, type Commit } from '~/lib/github';

const props = defineProps<{
	username: string
	count: number
}>();

const commits = ref<Commit[] | null | undefined>(undefined);

onMounted(async () => {
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