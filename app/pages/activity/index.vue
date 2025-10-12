<script setup lang="ts">
import GitHubActivity from '~/components/GitHubActivity.vue';
</script>

<template>
    <div class="page">
        <NuxtLink to="/" class="back">Back to Portfolio</NuxtLink>

        <h1>GitHub Activity</h1>
        <GitHubActivity :count="100" username="lewpar"></GitHubActivity>
    </div>
</template>

<style scoped>
.back {
	background-color: rgba(255, 255, 255, 0.05);
	
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 5px;

	padding: 1rem;

	transition: background-color 0.25s;
}
.back:hover {
	background-color: rgba(255, 255, 255, 0.1);
}
</style>