// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'preconnect', href: 'https://rsms.me' },
        { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  typescript: {
    typeCheck: true,
  },
  experimental: {
    asyncContext: true,
    typedPages: true,
    viewTransition: true,
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  devtools: {
    enabled: true,
  },
  extends: 'github:naba-baseball/naba-base-layer/layer',
  runtimeConfig: {
    discordWebhook: '',
    deployWebhook: '',
    auth: {
      /** username:password */
      user: '',
    },
  },
  compatibilityDate: '2025-07-20',
  modules: ['@vueuse/nuxt', '@nuxt/eslint', '@nuxt/ui', '@nuxthub/core', 'nuxt-auth-utils'],
  hub: {
    blob: true,
  },
  nitro: {
    experimental: {
      openAPI: true,
    },
  },
})
