<script setup lang="ts">
import Profile from '~/components/Profile.vue';
import Projects from '~/components/Projects.vue';
</script>

<template>
    <div id="portfolio">
        <div id="left">
            <Profile/>
        </div>

        <div id="right" class="box">
            <Experience/>
            <Projects/>
            <Education/>
        </div>
    </div>
</template>

<style scoped>
#portfolio {
    display: flex;
    flex-direction: row;

    gap: 1rem;

    margin: 1rem;
}

#portfolio #left {
    flex: 5;
}

#portfolio #right {
    flex: 10;
}
</style>