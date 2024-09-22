export default defineLazyEventHandler(() => defineEventHandler(async (event) => {
  if (!useRuntimeConfig(event).discordWebhook) {
    throw createError({
      statusCode: 500,
      message: 'Discord webhook not set',
    })
  }
  await $fetch(useRuntimeConfig(event).discordWebhook, {
    method: 'POST',
    body: {
      content: 'Website deploy failed!',
    },
  })
  return 'ok'
}))
