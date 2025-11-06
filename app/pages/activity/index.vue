<script setup lang="ts">
import GitHubActivity from '~/components/GitHubActivity.vue';
import { getProfile } from '~/lib/data';

const profile = getProfile();
</script>

<template>
    <div class="page">
        <div class="activity">
            <NuxtLink to="/" class="back">Back to Portfolio</NuxtLink>

            <h2 class="flex row gap-05 center-align"><i class="ph ph-github-logo"></i> Recent Activity</h2>
            <GitHubActivity :count="100" :username="profile.github" :showMore="false"></GitHubActivity>
        </div>
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
.activity {
    align-self: center;

    display: flex;
    flex-direction: column;
    
    align-items: center;
}
</style>