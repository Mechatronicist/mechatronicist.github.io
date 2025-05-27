<template>
    <div class="bio">
        <img src="/headshot.png" class="image" />
        <div class="info">
            <div class="title">Lewis Parmenter</div>
            <div class="subtext">Software Developer with 3+ years of experience developing software in languages such as: C# (ASP.NET), JavaScript/TypeScript, Python, C++. Additional experience with Git, Terraform, AWS + Azure, and Docker.</div>

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

    align-items: center;
    
    gap: 2rem;

    padding: 1rem;
}
.bio .image {
    width: 150px;
    height: 150px;

    object-fit: contain;

    border-radius: 50%;
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

    font-size: 0.9rem;
}
.bio .info .title {
    font-weight: bold;
}
.bio .info .subtext {
    font-size: 0.9rem;
}
</style>