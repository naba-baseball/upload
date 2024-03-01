import { defineDriver } from "unstorage";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
export default defineDriver(
  (options: {
    accountId: string;
    bucket: string;
    secretAccessKey: string;
    accessKeyId: string;
  }) => {
    const client = new S3Client({
      endpoint: `https://${options.accountId}.r2.cloudflarestorage.com`,
      region: "auto",
      credentials: {
        secretAccessKey: options.secretAccessKey,
        accessKeyId: options.accessKeyId,
      },
    });

    return {
      name: "s3",
      options,
      async setItemRaw(key, val: ReadableStream<Uint8Array>) {
        await client.send(
          new PutObjectCommand({
            Bucket: options.bucket,
            Key: key,
            Body: val,
          })
        );
      },
      getItem(key, opts) {},
      getKeys(base, opts) {},
      hasItem(key, opts) {},
      clear(base, opts) {},
      dispose() {
        client.destroy();
      },
      getItemRaw(key, opts) {},
      getItems(items, commonOptions) {},
      getMeta(key, opts) {},
      removeItem(key, opts) {},
      setItem(key, value, opts) {},
      setItems(items, commonOptions) {},
      watch(callback) {},
    };
  }
);
