<template>
    <div class="education">
        <div class="entry">
            <img src="/src/assets/menu.png" class="image" />
            <div class="details">
                <div class="title">Diploma of Information Technology</div>
                <div class="subtext">
                    <a href="https://www.kangan.edu.au/" target="_blank">Kangan Institute</a> - 2025 - Current
                </div>
            </div>
        </div>

        <div class="entry">
            <img src="/src/assets/menu.png" class="image" />
            <div class="details">
                <div class="title">Certificate IV in Cyber Security</div>
                <div class="subtext">
                    <a href="https://www.kangan.edu.au/" target="_blank">Kangan Institute</a> - 2023 - 2024
                </div>
            </div>
        </div>

        <div class="entry">
            <img src="/src/assets/menu.png" class="image" />
            <div class="details">
                <div class="title">Certificate III in Information Technology</div>
                <div class="subtext">
                    <a href="https://www.vu.edu.au/" target="_blank">Victoria University</a> - 2023
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.education {
    display: flex;
    flex-direction: column;

    gap: 1rem;

    padding: 1rem;
}

.education .entry {
    display: flex;
    flex-direction: row;

    gap: 0.5rem;
}
.education .entry .image {
    width: 40px;
    height: 40px;

    object-fit: contain;
}
.education .entry .details {
    display: flex;
    flex-direction: column;

    justify-content: center;
}
.education .entry .details .title {
    font-weight: bold;
}
.education .entry .details .subtext {
    font-size: 0.75rem;
}
</style>