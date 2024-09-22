export default defineLazyEventHandler(() => defineEventHandler(async (event) => {
  await requireUserSession(event)
  return await hubBlob().handleMultipartUpload(event)
}))
