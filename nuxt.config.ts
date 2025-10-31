import Aura from '@primeuix/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: true,

  css: [
    "~/assets/global.css"
  ],

  app: {
    baseURL: "/",
    head: {
      title: "Portfolio - James Kelly",
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "stylesheet", type: "text/css", href: "https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css" }
      ]
    }
  },

  primevue: {
      options: {
          theme: {
              preset: Aura
          }
      }
  }
})