<script setup lang="ts">
import GitHubActivity from "./GitHubActivity.vue";
import GitHubHeatmap from "./GitHubHeatmap.vue";

import { getAwards, getProfile } from "~/lib/data";

const profile = getProfile();
const awards = getAwards();
</script>

<template>
    <div id="profile">
        <div class="headshot">
            <img src="/headshot.png" loading="lazy" />
            <div class="flex col gap-05">
                <div id="name">{{ profile.name }}</div>
                <div id="description">{{ profile.description }}</div>
            </div>
        </div>
        
        <div class="flex col">
            <h2 class="flex row gap-05 center-align"><i class="ph ph-globe-hemisphere-east"></i> Socials</h2>
            <div id="socials">
                <a v-for="social in profile.socials" :href="`${social.link}`">
                    <img :src="`${social.icon}`" loading="lazy" />
                    {{ social.name }}
                </a>
            </div>
        </div>

        <div class="flex col">
            <h2 class="flex row gap-05 center-align"><i class="ph ph-certificate"></i> Awards</h2>
            <Award v-for="award in awards" :award="award"></Award>
        </div>

        <div id="activity">
            <h2 class="flex row gap-05 center-align"><i class="ph ph-github-logo"></i> Recent Activity</h2>
            <GitHubHeatmap></GitHubHeatmap>
            <GitHubActivity :username="profile.github" :count="3" class="recent-commits" />
        </div>

        <NuxtLink to="/activity" class="read-more"><i class="ph ph-list-magnifying-glass"></i> Recent Commits</NuxtLink>
    </div>
</template>

<style scoped>
#profile {
    top: 2rem;

    position: sticky;
    flex: 1;
    
    display: flex;
    flex-direction: column;

    gap: 1rem;
}
#profile img {
    border-radius: 10px;
    width: 150px;
    height: 150px;
}
#profile #name {
    font-weight: bold;
    font-size: 1.25rem;
}
h2 {
    font-weight: bold;
    font-size: 1.1rem;
}
#profile #socials a {
    display: flex;
    flex-direction: row;

    align-items: center;

    gap: 0.5rem;

    color: white;
    background-color: rgba(255, 255, 255, 0.05);

    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;

    padding: 0.5rem;

    text-decoration: none;

    transition: background-color 0.25s;
}
#profile #socials a:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

#profile #socials img {
    max-width: 24px;
    max-height: 24px;
}

#socials {
    display: flex;
    flex-direction: row;

    gap: 0.25rem;
}

.headshot {
    display: flex;
    flex-direction: row;

    gap: 1rem;
    align-items: center;
}

.read-more {
    display: flex;

    align-items: center;

    gap: 0.5rem;

    background-color: rgba(255, 255, 255, 0.1);

    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 5px;

    align-self: center;

    padding: 0.5rem;

    transition: background-color 0.25s;
}
.read-more:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

@media screen and (max-width: 600px) {
    .headshot {
        flex-direction: column;
    }
    #profile img {
        object-fit: contain;
        width: 100%;
    }
    #activity .recent-commits {
        display: none;
    }
}
</style>