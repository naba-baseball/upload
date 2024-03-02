export default defineEventHandler(async (event) => {
  if(!useRuntimeConfig().deployUrl) {
    throw createError({
      statusCode: 500,
      message: 'deploy url not set'
    });
  }
  await $fetch(useRuntimeConfig().deployUrl, { method: "POST", body: {} });
  return "done";
});
