import { AwsClient } from "aws4fetch";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const client = new AwsClient({
    accessKeyId: config.s3.accessKeyId,
    secretAccessKey: config.s3.secretAccessKey,
    region: "auto",
  });
  const thing = await client.sign(`${config.s3.endpoint}/${config.s3.bucket}/reports.tar.gz`, {
    method: 'PUT',
    aws: {
      signQuery: true,
    }
  })
  return thing.url
});
