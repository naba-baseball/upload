// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2024-08-21",
  runtimeConfig: {
    s3: {
      endpoint: import.meta.env.NUXT_S3_ENDPOINT,
      secretAccessKey: import.meta.env.NUXT_S3_SECRET_ACCESS_KEY,
      accessKeyId: import.meta.env.NUXT_S3_ACCESS_KEY_ID,
      bucket: import.meta.env.NUXT_S3_BUCKET,
    },
    discordWebhook: import.meta.env.NUXT_DISCORD_WEBHOOK,
    deployWebhook: import.meta.env.NUXT_DEPLOY_WEBHOOK,
  },
  modules: ["@kgierke/nuxt-basic-auth", "@nuxt/ui", "@nuxt/fonts"],
  basicAuth: {
    enabled: true,
    allowedRoutes: ["/webhooks/*"],
    users: import.meta.env.NUXT_BASIC_AUTH_USERS,
  },
  colorMode:{
    preference: 'light'
  },

});