<template>
    <div class="about">
        <p>Powered by Vite + Vue & PrimeVue.</p>
        <p>Read the <a class="source-link" href="https://github.com/lewpar/lewpar.github.io" target="_blank">source code</a></p>
    </div>
</template>

<style scoped>
.about {
    display: flex;
    flex-direction: column;

    gap: 0.5rem;

    padding: 0.5rem;
}

.about .title {
    font-weight: bold;
    font-size: 1.25rem;
}

.about .source-link {
    text-decoration: underline;
}
</style>