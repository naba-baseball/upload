export default defineLazyEventHandler(() => defineEventHandler(async (event) => {
  if (event.method === 'DELETE')
    return await clearUserSession(event)
  if (event.method === 'GET')
    return await getUserSession(event)
  if (event.method !== 'POST' && event.method !== 'PUT') {
    return createError({ message: 'Method not allowed', statusCode: 405 })
  }
  const { user } = await getUserSession(event)
  if (user)
    return user
  const userStr = useRuntimeConfig(event).auth.user
  if (!userStr)
    throw createError({ message: 'No user setup', statusCode: 500 })
  const [reqUsername, reqPassword] = userStr.split(':')
  const body = await readBody(event) as { username: string, password: string }
  if (!body)
    throw createError({ message: 'No request body found', statusCode: 400 })
  if (!(reqUsername === body.username && reqPassword === body.password)) {
    throw createError({ message: 'Invalid username or password', statusCode: 403 })
  }
  await setUserSession(event, { user: { signedInAt: new Date().toISOString() } }, { maxAge: 60 * 60 * 24 * 7 })
  return await getUserSession(event)
}))
