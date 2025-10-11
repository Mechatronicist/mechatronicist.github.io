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
    icon: string;
}

const Profile = ref<Profile>(ProfileData);
</script>

<template>
    <div id="profile" class="">
        <div class="flex row gap-1 center-align">
            <img src="/headshot.png" />
            <div class="flex col gap-05">
                <div id="name">{{ Profile.name }}</div>
                <div id="description">{{ Profile.description }}</div>
            </div>
        </div>
        
        <div class="flex col">
            <h2>Socials</h2>
            <div id="socials">
                <a v-for="social in Profile.socials" :href="`${social.link}`">
                    <img :src="`${social.icon}`" />
                    {{ social.name }}
                </a>
            </div>
        </div>

        <div id="activity">
            <h2>Recent Activity (3)</h2>
            <GitHubActivity username="lewpar" :count="3" />
        </div>
    </div>
</template>

<style scoped>
#profile {
    top: 2rem;

    position: sticky;
    flex: 1;
    
    display: flex;
    flex-direction: column;
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

    transition: color 0.25s;
}
#profile #socials img {
    max-width: 24px;
    max-height: 24px;
}
#profile #socials a:hover {
    color: rgb(12, 110, 208);
}

#socials {
    display: flex;
    flex-direction: row;

    gap: 0.25rem;
}
</style>