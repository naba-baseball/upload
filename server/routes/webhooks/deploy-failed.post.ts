export default defineEventHandler(async (event) => {
  await $fetch(useRuntimeConfig().discordWebhook, {
    method: "POST",
    body: {
      content: "Website deploy failed!",
    },
  });
  return "ok";
});
