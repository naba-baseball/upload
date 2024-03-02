// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@kgierke/nuxt-basic-auth", "@nuxtjs/tailwindcss", "shadcn-nuxt"],
  css: ["~/assets/css/tailwind.css"],
  devtools: { enabled: true },
  runtimeConfig: {
    s3: {
      endpoint: import.meta.env.NUXT_S3_ENDPOINT,
      secretAccessKey: import.meta.env.NUXT_S3_SECRET_ACCESS_KEY,
      accessKeyId: import.meta.env.NUXT_S3_ACCESS_KEY_ID,
      bucket: import.meta.env.NUXT_S3_BUCKET,
    },
    discordWebhook: import.meta.env.NUXT_DISCORD_WEBHOOK,
    deployUrl: import.meta.env.NUXT_DEPLOY_URL,
  },
  basicAuth: {
    enabled: true,
    allowedRoutes: ["/webhooks/*"],
  },
  shadcn: {
    prefix: "ui",
  },
});
