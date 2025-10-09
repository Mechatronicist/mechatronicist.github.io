<script setup lang="ts">
import ProfileData from "~/data/profile.json";

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
    <div id="profile" class="box">
        <div id="name">{{ Profile.name }}</div>
        <div id="description">{{ Profile.description }}</div>
        <div id="socials">
            <h2>Socials</h2>
            <a v-for="social in Profile.socials" :href="`${social.link}`">{{ social.name }}</a>
        </div>
    </div>
</template>

<style scoped>
#profile {
    top: 0;
    position: sticky;
    flex: 1;
    
    display: flex;
    flex-direction: column;
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