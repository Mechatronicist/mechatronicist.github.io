<script setup lang="ts">
import type { PullRequestPayload, PushPayload, UserEvent } from '~/lib/github';

const props = defineProps<{
    event: UserEvent
}>();

const pullEvent = props.event.payload as PullRequestPayload;
</script>

<template>
    <div class="event">
        <div class="flex row gap-05 center-align">
            <img :src="`${event.actor.avatar_url}`" width="32" />

            <div class="flex col">
                <b>{{ event.repo.name }}</b>
                <div>{{ event.created_at.toLocaleDateString() }}</div>
            </div>
        </div>

        <a class="pr" :href="pullEvent.pull_request.url">
            <i class="ph ph-git-pull-request"></i>
            <div>
            Pull request '<i>{{ pullEvent.pull_request.title }}</i>' was {{ pullEvent.action }}.
            </div>
        </a>
    </div>
</template>

<style scoped>
.event {
    display: flex;
    flex-direction: column;

    gap: 0.5rem;

    padding: 0.5rem;
}
.pr {
    display: flex;
    flex-direction: row;

    align-items: center;

    gap: 1rem;

    padding: 0.5rem;
    border-radius: 5px;
}
.pr:hover {
    background-color: rgba(255, 255, 255, 0.1);
}
</style>