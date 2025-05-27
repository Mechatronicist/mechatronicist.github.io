<template>
    <div class="projects">
        <div class="entry">
            <img src="/wgc.png" class="image" />
            <div class="details">
                <div class="title">WireGuard Command</div>
                <div class="subtext">
                    A tool designed for generating road-warrior style WireGuard configuration files. It also supports generating commands for each peer through the use of macros.
                </div>
                <div class="tags">
                    <div class="tag">C#</div>
                    <div class="tag">.NET</div>
                </div>
                <div class="links">
                    <a href="https://github.com/lewpar/WireGuardCommand">GitHub</a>
                </div>
            </div>
        </div>

        <div class="entry">
            <img src="/src/assets/menu.png" class="image" />
            <div class="details">
                <div class="title">Cyber Bilby</div>
                <div class="subtext">
                    An open-source tech blog built using AstroJS.
                </div>
                <div class="tags">
                    <div class="tag">JavaScript</div>
                    <div class="tag">HTML</div>
                    <div class="tag">CSS</div>
                    <div class="tag">Markdown</div>
                </div>
                <div class="links">
                    <a href="https://cyberbilby.com">Visit</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.projects {
    display: flex;
    flex-direction: column;

    gap: 2rem;

    padding: 1rem;
}

.projects .entry {
    display: flex;
    flex-direction: row;

    gap: 0.5rem;

    align-items: center;
}
.projects .entry .image {
    width: 80px;
    height: 80px;

    object-fit: contain;
}
.projects .entry .details {
    display: flex;
    flex-direction: column;

    gap: 0.5rem;
}
.projects .entry .details .title {
    font-weight: bold;
}
.projects .entry .details .subtext {
    font-size: 0.75rem;
}
.projects .entry .details .tags {
    display: flex;
    flex-direction: row;

    flex-wrap: wrap;
    gap: 0.5rem;
}
.projects .entry .details .tags .tag {
    border-radius: 5px;

    background-color: rgb(0, 128, 255);

    font-size: 0.75rem;

    padding: 0.25rem;
}
.projects .entry .details .links {
    display: flex;
    flex-direction: row;

    gap: 0.5rem;
}
</style>