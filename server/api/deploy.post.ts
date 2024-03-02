export default defineEventHandler(async (event) => {
  if(!useRuntimeConfig().deployWebhook) {
    throw createError({
      statusCode: 500,
      message: 'deploy url not set'
    });
  }
  await $fetch(useRuntimeConfig().deployWebhook, { method: "POST", body: {} });
  return "done";
});
