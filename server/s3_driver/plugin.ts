import s3Driver from "./driver.js";
export default defineNitroPlugin((nitro) => {
  const storage = useStorage();
  const config = useRuntimeConfig();
  storage.mount(
    "uploads",
    s3Driver({
      accountId: config.accountId,
      bucket: config.bucket,
      secretAccessKey: config.secretAccessKey,
      accessKeyId: config.accessKeyId,
    })
  );
});
