// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  extends: 'github:naba-baseball/naba-base-layer/layer',
  runtimeConfig: {
    s3: {
      endpoint: '',
      secretAccessKey: '',
      accessKeyId: '',
      bucket: '',
    },
    discordWebhook: '',
    deployWebhook: '',
  },

  modules: ['@kgierke/nuxt-basic-auth'],
  basicAuth: {
    enabled: true,
    allowedRoutes: ['/webhooks/*'],
    users: '',
  },
})
