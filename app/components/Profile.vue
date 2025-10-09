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

</template>