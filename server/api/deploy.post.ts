export default defineEventHandler(async (event) => {
  await $fetch(useRuntimeConfig().deployUrl, { method: "POST", body: {} });
  return "done";
});
