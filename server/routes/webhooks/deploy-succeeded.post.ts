export default defineEventHandler(async (event) => {
  await $fetch(useRuntimeConfig().discordWebhook, {
    method: "POST",
    body: {
      content: "<@&1147023121682006106> Website updated: https://nabaleague.com",
    },
  });
  return "OK";
});
