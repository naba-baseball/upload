export default defineEventHandler(async (event) => {
  if (!useRuntimeConfig().discordWebhook) {
    throw createError({
      statusCode: 500,
      message: "Discord webhook not set",
    });
  }
  await $fetch(useRuntimeConfig().discordWebhook, {
    method: "POST",
    body: {
      content: "Website deploy failed!",
    },
  });
  return "ok";
});
