// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: false,
  css: [
    "~/assets/global.css"
  ],
  app: {
    head: {
      title: "Portfolio - Lewis Parmenter",
      link: [
        { rel: "icon", type: "image/png", href: "/default.png" },
        { rel: "stylesheet", type: "text/css", href: "https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css" }
      ]
    }
  }
})
