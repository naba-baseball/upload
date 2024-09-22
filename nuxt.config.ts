// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    viewTransition: true,
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
  compatibilityDate: '2024-09-21',
  modules: ['@nuxthub/core', 'nuxt-auth-utils'],
  hub: {
    blob: true,
  },
})
