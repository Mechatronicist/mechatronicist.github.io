<script setup lang="ts">
import type { PushPayload, UserEvent } from '~/lib/github';

const props = defineProps<{
    event: UserEvent
}>();

const pushEvent = props.event.payload as PushPayload;
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

        <a v-for="commit in pushEvent.commits" class="commit" 
            :href="`https://github.com/${props.event.repo.name}/commit/${commit.sha}`" target="_blank">
            <i class="ph ph-git-commit"></i>
            {{ commit.message }}
        </a>
    </div>
</template>

<style scoped>
.event {
    display: flex;
    flex-direction: column;

    gap: 0.25rem;

    padding: 0.5rem;
}
.commit {
    display: flex;
    flex-direction: row;

    align-items: center;

    gap: 1rem;

    padding: 0.5rem;
    border-radius: 5px;
}
.commit:hover {
    background-color: rgba(255, 255, 255, 0.1);
}
</style>