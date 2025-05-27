<template>
    <div class="bio">
        <img src="/src/assets/menu.png" class="headshot" />
        <div class="info">
            <div class="title">Lewis Parmenter</div>
            <div>Software Developer with 3+ years of experience developing software in languages such as: C# (ASP.NET), JavaScript/TypeScript, Python, C++. Additional experience with Git, Terraform, AWS + Azure, and Docker.</div>

            <div class="title">Socials</div>
            <div class="social">
                <a href="https://linkedin.com/in/lewpar/" target="_blank">LinkedIn</a>
                <a href="https://github.com/lewpar" target="_blank">GitHub</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bio {
    display: flex;
    flex-direction: row;
    
    gap: 0.5rem;

    padding: 1rem;
}
.bio .headshot {
    width: 200px;
    object-fit: contain;
}
.bio .info {
    display: flex;
    flex-direction: column;

    gap: 1rem;
}
.bio .info .social {
    display: flex;
    flex-direction: row;

    gap: 0.5rem;
}
.bio .info .title {
    font-weight: bold;
}
</style>