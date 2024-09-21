export default defineEventHandler(async (event) => {
  if (!useRuntimeConfig(event).deployWebhook) {
    throw createError({
      statusCode: 500,
      message: 'deploy url not set',
    })
  }
  await $fetch(useRuntimeConfig(event).deployWebhook, { method: 'POST', body: {} })
  return 'done'
})
