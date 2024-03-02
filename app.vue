<template>
  <main class="h-screen grid place-content-center">
    <ui-card class="relative overflow-hidden">
      <nuxt-loading-indicator class="!absolute !rounded top-0" />
      <ui-card-header>
        <ui-card-title> Upload the reports file here </ui-card-title>
        <span> it might take several minutes </span>
      </ui-card-header>
      <ui-card-content>
        <form
          @submit.prevent="handleUpload($event as SubmitEvent)"
          name="upload"
          method="POST"
          enctype="multipart/form-data"
          class="space-y-4"
        >
          <ui-label>
            Upload
            <ui-input class="inline" name="file" required type="file" />
          </ui-label>
          <ui-button variant="default" type="submit">Upload file</ui-button>
        </form>
      </ui-card-content>
    </ui-card>
    <ui-toaster />
  </main>
</template>

<script lang="ts" setup>
import { useToast } from "./components/ui/toast/index.js";
const loading = useLoadingIndicator({ duration: 15000 });
loading.finish();
const { toast } = useToast();
async function handleUpload(event: SubmitEvent) {
  const form = event.currentTarget as HTMLFormElement;
  const formData = new FormData(form);
  const file = formData.get("file") as File;
  const url: string = await $fetch("/api/upload", {
    method: "POST",
  });
  if (!url) return;
  try {
    loading.start();
    await fetch(url, {
      method: "PUT",
      body: file,
    }).catch((err) => {
      toast({
        title: "Upload failed",
        description: "Please try again",
        duration: 7000,
      });
      throw err;
    });
    await $fetch("/api/deploy", { method: "POST" }).catch((err) => {
      toast({
        title: "Deployment trigger failed",
        description: "Please try again",
        duration: 7000,
      });
      throw err;
    });
    toast({
      title: "Website uploaded!",
      description: "It should be deployed in a few minutes :)",
    });
  } finally {
    loading.finish();
  }
}
</script>
