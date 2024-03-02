// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@kgierke/nuxt-basic-auth", "@nuxtjs/tailwindcss", "shadcn-nuxt"],
  css: ["~/assets/css/tailwind.css"],
  devtools: { enabled: true },
  runtimeConfig: {
    s3: {
      endpoint: "set me in the environment",
      secretAccessKey: "set me in the environment",
      accessKeyId: "set me in the environment",
      bucket: "set me in the environment",
    },
    discordWebhook: "set me in the environment",
    deployUrl: "set me in the environment",
  },
  basicAuth: {
    enabled: true,
    allowedRoutes: ["/webhooks/*"],
  },
  shadcn: {
    prefix: "ui",
  },
});
