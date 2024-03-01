// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    plugins: ["s3_driver/plugin.ts"],
  },
  runtimeConfig: {
    accountId: "set me in the environment",
    secretAccessKey: "set me in the environment",
    accessKeyId: "set me in the environment",
    bucket: "set me in the environment",
  },
});
