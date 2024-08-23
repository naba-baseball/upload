import { AwsClient } from 'aws4fetch'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  if (!config.s3.accessKeyId) {
    throw createError({
      statusCode: 500,
      message: 's3 accessKeyId not set',
    })
  }
  if (!config.s3.secretAccessKey) {
    throw createError({
      statusCode: 500,
      message: 's3 secretAccessKey not set',
    })
  }
  if (!config.s3.endpoint) {
    throw createError({
      statusCode: 500,
      message: 's3 endpoint not set',
    })
  }
  if (!config.s3.bucket) {
    throw createError({
      statusCode: 500,
      message: 's3 bucket not set',
    })
  }
  const client = new AwsClient({
    accessKeyId: config.s3.accessKeyId,
    secretAccessKey: config.s3.secretAccessKey,
    region: 'auto',
  })
  const thing = await client.sign(
    `${config.s3.endpoint}/${config.s3.bucket}/reports.tar.gz`,
    {
      method: 'PUT',
      aws: {
        signQuery: true,
      },
    },
  )
  return thing.url
})
