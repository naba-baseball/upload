// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  future: {
    compatibilityVersion: 4,
  },
  extends: 'github:naba-baseball/naba-base-layer/layer',
  runtimeConfig: {
    discordWebhook: '',
    deployWebhook: '',
  },
  compatibilityDate: '2024-09-21',
  modules: ['@kgierke/nuxt-basic-auth', '@nuxthub/core'],
  hub: {
    blob: true,
  },
  basicAuth: {
    enabled: true,
    allowedRoutes: ['/webhooks/*'],
  },
})
