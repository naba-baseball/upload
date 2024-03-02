// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@kgierke/nuxt-basic-auth", "@nuxtjs/tailwindcss", "shadcn-nuxt"],
  css: ["~/assets/css/tailwind.css"],
  devtools: { enabled: true },
  runtimeConfig: {
    s3: {
      endpoint: "",
      secretAccessKey: "",
      accessKeyId: "",
      bucket: "",
    },
    discordWebhook: "",
    deployUrl: "",
  },
  basicAuth: {
    enabled: true,
    allowedRoutes: ["/webhooks/*"],
  },
  shadcn: {
    prefix: "ui",
  },
});
