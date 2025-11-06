<script setup lang="ts">
import { type Commit } from '~/lib/github';

const props = defineProps<{
    commit: Commit
}>();

console.log(props.commit)
</script>

<template>
    <div class="event">
        <div class="flex row gap-05 center-align">
            <img :src="`${commit.author.avatar_url}`" width="32" />

            <div class="flex col">
                <b><a :href="commit.author.html_url">{{ commit.author.login }}</a></b>
                <div>{{ new Date(commit.commit.author.date).toLocaleDateString() }}</div>
            </div>
        </div>

        <a class="commit" 
            :href="commit.html_url" target="_blank">
            <i class="ph ph-git-commit"></i>
            {{ commit.commit.message }}
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

    transition: background-color 0.25s;
}
.commit:hover {
    background-color: rgba(255, 255, 255, 0.1);
}
</style>