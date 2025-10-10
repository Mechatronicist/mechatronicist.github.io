<script setup lang="ts">
import ProfileData from "~/data/profile.json";
import GitHubActivity from "./GitHubActivity.vue";

interface Profile {
    name: string;
    description: string;
    socials: Social[];
}

interface Social {
    name: string;
    link: string;
}

const Profile = ref<Profile>(ProfileData);
</script>

<template>
    <div id="profile" class="card">
        <div class="flex row gap-05">
            <img src="/headshot.png" />
            <div class="flex col gap-1">
                <div id="name">{{ Profile.name }}</div>
                <div id="description">{{ Profile.description }}</div>
            </div>
        </div>
        <div id="socials">
            <h2>Socials</h2>
            <a v-for="social in Profile.socials" :href="`${social.link}`">{{ social.name }}</a>
        </div>
        <div id="activity">
            <h2>Recent Activity</h2>
            <GitHubActivity username="lewpar" :count="3" />
        </div>
    </div>
</template>

<style scoped>
#profile {
    top: 1rem;
    position: sticky;
    flex: 1;
    
    display: flex;
    flex-direction: column;
}
#profile img {
    border-radius: 50%;
    width: 150px;
    height: 150px;
}
#profile #name {
    font-weight: bold;
    font-size: 1.25rem;
}
#profile #socials {
    display: flex;
    flex-direction: column;

    gap: 0.25rem;
}
#profile #socials h2 {
    font-weight: bold;
    font-size: 1.1rem;
}
#profile #socials a {
    color: dodgerblue;
    text-decoration: none;

    transition: color 0.25s;
}
#profile #socials a:hover {
    color: rgb(12, 110, 208);
}
</style>