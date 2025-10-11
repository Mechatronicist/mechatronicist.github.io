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
        { rel: 'icon', type: 'image/png', href: '/default.png' }
      ]
    }
  }
})
