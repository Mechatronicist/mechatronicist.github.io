<template>
    <div class="about">
        <div class="title">L(ewis)-OS</div>
        <div>Powered by Vite + Vue & PrimeVue.</div>
        <div>Read the <a class="source-link" href="https://github.com/lewpar/lewpar.github.io" target="_blank">source code</a>.</div>
    </div>
</template>

<style scoped>
.about {
    display: flex;
    flex-direction: column;

    gap: 1rem;

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