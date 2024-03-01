export default defineEventHandler(async (event) => {
  const body = await readMultipartFormData(event);
  if (!body) throw createError(400, "No files found in request");
  const [data] = body;
  if (!data) throw createError(400, "No files found in request");
  if (data) {
    await useStorage("uploads").setItemRaw(
      data.filename ?? "filename",
      data.data
    );
  }
  return "done!";
});
