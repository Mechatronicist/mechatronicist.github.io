<script setup lang="ts">
import Profile from '~/components/Profile.vue';
import Projects from '~/components/Projects.vue';
</script>

<template>
    <div class="page">
        <div id="portfolio">
            <div id="left">
                <Profile/>
            </div>
    
            <div id="right">
                <Experience/>
                <Projects/>
                <Education/>
            </div>
        </div>
    </div>
</template>

<style scoped>
#portfolio {
    display: flex;
    flex-direction: row;

    gap: 1rem;
}

#portfolio #left {
    flex: 5;

    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;

    padding: 1rem;

    background-color: rgba(255, 255, 255, 0.05);
}

#portfolio #right {
    flex: 10;
}

@media screen and (max-width: 800px) {
    #portfolio {
        flex-direction: column;
    }
}
</style>