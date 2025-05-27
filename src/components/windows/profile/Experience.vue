<template>
    <div class="experience">
        <div class="entry">
            <img src="/advancedit.png" class="image" style="background-color: white; padding: 0.5rem; border-radius: 10px" />
            <div class="details">
                <div class="title">
                    Junior Software Developer
                </div>
                <div class="subtitle">
                    AdvancedIT Ltd - Jun 2023 - Jul 2023, Feb 2025 - Apr 2025
                </div>
                <div class="description">
                    Designed, developed and maintained software to manage client configurations.
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.experience {
    display: flex;
    flex-direction: column;

    gap: 1rem;

    padding: 1rem;
}
.experience .entry {
    display: flex;
    flex-direction: row;

    align-items: center;

    gap: 0.5rem;
}
.experience .entry .image {
    width: 80px;
    height: 80px;

    object-fit: contain;
}
.experience .entry .details {
    display: flex;
    flex-direction: column;

    gap: 0.25rem;
}
.experience .entry .details .title {
    font-weight: bold;
    font-size: 1.1rem;
}
.experience .entry .details .subtitle {
    font-style: italic;
    font-size: 0.75rem;
}
.experience .entry .details .description {
    font-size: 0.9rem;
}
</style>