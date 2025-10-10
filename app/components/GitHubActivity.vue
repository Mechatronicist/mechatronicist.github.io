<script setup lang="ts">
import { getRecentEvents, type UserEvent, type PushPayload, type PullRequestPayload } from '~/lib/github';

const props = defineProps({
  username: String,
  count: Number
});

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
		<div v-if="events != null" v-for="event in events">
			<a v-if="(event.type === 'PushEvent')" v-for="commit in (event.payload as PushPayload).commits"
				class="activity-link" :href="`https://github.com/${event.repo.name}/commit/${commit.sha}`" target="_blank">

				<div class="flex col gap-05">
					<div class="flex row gap-05 center-align">
						<img :src="`${event.actor.avatar_url}`" width="32" />

						<div class="flex col">
							<b>{{ event.repo.name }}</b>
							<div>{{ event.created_at.toLocaleDateString() }}</div>
						</div>
					</div>
					<div>{{ commit.message }}</div>
				</div>

			</a>

			<a v-if="(event.type === 'PullRequestEvent')"
				class="activity-link" :href="`${(event.payload as PullRequestPayload).pull_request.url}`" target="_blank">
				<img :src="`${event.actor.avatar_url}`" width="32" />
				<div class="flex col">
					<b>{{ event.repo.name }} - {{ (event.payload as PullRequestPayload).action }} a pull request</b>
					<div>{{ event.created_at.toLocaleDateString() }}</div>
				</div>

				<div>{{ (event.payload as PullRequestPayload).pull_request.title }}</div>
			</a>
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