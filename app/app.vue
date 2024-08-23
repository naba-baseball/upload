<script lang="ts" setup>
const loading = reactive(useLoadingIndicator({ duration: 30_000 }))
loading.finish()
const toast = useToast()
async function handleUpload(event: SubmitEvent) {
  const form = event.currentTarget as HTMLFormElement
  const formData = new FormData(form)
  const file = formData.get('file') as File
  const url: string = await $fetch('/api/upload', {
    method: 'POST',
  })
  if (!url)
    return
  try {
    loading.start()
    await fetch(url, {
      method: 'PUT',
      body: file,
    }).catch((err) => {
      toast.add({
        title: 'Upload failed',
        description: 'Please try again',
        timeout: 0,
      })
      throw err
    })
    await $fetch('/api/deploy', { method: 'POST' }).catch((err) => {
      toast.add({
        title: 'Deployment trigger failed',
        description: 'Please try again',
        timeout: 0,
      })
      throw err
    })
    toast.add({
      title: 'Website uploaded!',
      description: 'It should be deployed in a few minutes :)',
      timeout: 0,
    })
  }
  finally {
    loading.finish()
  }
}
</script>

<template>
  <main
    class="h-screen font-sans grid place-content-center bg-gray-50 dark:bg-gray-950"
  >
    <UContainer>
      <UNotifications />
      <div class="mb-2">
        <ColorTheme />
      </div>
      <UCard class="relative overflow-hidden">
        <NuxtLoadingIndicator class="!absolute !rounded top-0" />
        <template #header>
          <div class="text-lg font-bold">
            Upload the reports file here
          </div>
          <span class="opacity-70"> it might take several minutes </span>
        </template>
        <form
          name="upload"
          method="POST"
          enctype="multipart/form-data"
          class="space-y-4"
          @submit.prevent="handleUpload($event as SubmitEvent)"
        >
          <UFormGroup label="Upload">
            <UInput type="file" name="file" required />
          </UFormGroup>
          <UButton
            icon="i-lucide-upload"
            type="submit"
            :disabled="loading.isLoading"
          >
            Upload file
          </UButton>
        </form>
      </UCard>
    </UContainer>
    <!-- <ui-toaster /> -->
  </main>
</template>
