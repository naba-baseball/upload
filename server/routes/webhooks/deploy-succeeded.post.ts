export default defineEventHandler(async (event) => {
  if (!useRuntimeConfig(event).discordWebhook) {
    throw createError({
      statusCode: 500,
      message: 'Discord webhook not set',
    })
  }
  await $fetch(useRuntimeConfig(event).discordWebhook, {
    method: 'POST',
    body: {
      content:
        '<@&1147023121682006106> Website updated: https://nabaleague.com',
    },
  })
  return 'OK'
})
