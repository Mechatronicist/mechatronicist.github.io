<script setup lang="ts">
import { onMounted, ref } from 'vue';

const isFetchingUpdates = ref<boolean>(true);
const fetchingFailed = ref<boolean>(false);

interface CommitAuthor {
    name: string,
    date: Date
}
interface Commit {
    author: CommitAuthor,
    message: string
}
interface CommitDetails {
    commit: Commit
}

const commits = ref<CommitDetails[]>([]);

onMounted(async () => {
    let result = await fetch('https://api.github.com/repos/lewpar/lewpar.github.io/commits');
    if(!result.ok) {
        fetchingFailed.value = true;
        isFetchingUpdates.value = false;
        return;
    }

    commits.value = (await result.json()) as CommitDetails[];
    isFetchingUpdates.value = false;
});
</script>

<template>
    <div v-if="isFetchingUpdates" class="loading">
        <img src="/default.png" class="icon" />
        <div class="text">Fetching recent commits..</div>
    </div>

    <template v-if="!isFetchingUpdates">
        <div v-if="fetchingFailed">
            Failed to fetch commits.
        </div>

        <div v-if="!fetchingFailed" class="commits">
            <h3>Recent Commits</h3>
            <div v-for="commit in commits" class="commit">
                <div class="author">
                    {{ commit.commit.author.name }}
                </div>

                <div class="message">
                    {{ commit.commit.message }}
                </div>
            </div>
        </div>
    </template>
</template>

<style scoped>
.loading {
    flex: 1;
    display: flex;
    flex-direction: column;

    gap: 0.5rem;

    align-items: center;
    justify-content: center;
}

.loading .icon {
    width: 40px;
    height: 40px;

    animation-name: rotate;
    animation-duration: 0.5s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
}

.loading .text {
    font-size: 0.75rem;
}

.commits {
    display: flex;
    flex-direction: column;

    gap: 0.5rem;

    padding: 0.5rem;
}
.commits .commit {
    display: flex;
    flex-direction: column;

    gap: 0.5rem;

    border: 1px solid black;
    border-radius: 5px;

    background-color: #303030;

    padding: 1rem;
}
.commits .commit .author {
    font-weight: bold;
}
.commits .commit .message {
    
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>