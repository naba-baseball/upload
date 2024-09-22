<script setup lang="ts">
definePageMeta({
  middleware: () => {
    const { loggedIn } = useUserSession()
    if (!loggedIn.value)
      return navigateTo('/login', { replace: true })
  },
})

const loadingProgress = ref(0)
const loading = ref(false)
const toast = useToast()
const startUpload = useMultipartUpload('/api/upload', { partSize: 5 * 1024 * 1024, maxRetry: 10 })
async function handleUpload(event: SubmitEvent) {
  const form = event.currentTarget as HTMLFormElement
  const formData = new FormData(form)
  const formFile = formData.get('file') as File
  const file = new File([formFile], 'reports.tar.gz')

  loading.value = true
  loadingProgress.value = 0
  const { completed, progress } = startUpload(file)
  const stopProgressSync = watchEffect(() => { loadingProgress.value = progress.value })
  completed.finally(() => { loading.value = false })
  await completed.catch((err) => {
    toast.add({
      title: 'Upload failed',
      description: 'Please try again',
      timeout: 0,
    })
    throw err
  }).finally(() => { stopProgressSync() })
  loadingProgress.value = 100
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

/** in megabytes */
const fileSize = ref<number>()
const estimatedTime = useUploadEstimate(fileSize)
const { isSupported: isNetworkSupported } = useNetwork()
</script>

<template>
  <section>
    <UCard class="relative overflow-hidden">
      <template #header>
        <div class="text-lg font-bold">
          Upload the reports file here
        </div>
      </template>
      <form
        name="upload"
        method="POST"
        enctype="multipart/form-data"
        class="space-y-4"
        @submit.prevent="handleUpload($event as SubmitEvent)"
      >
        <UFormGroup label="Upload reports file">
          <UInput type="file" name="file" icon="i-lucide-file-archive" required @change="fileSize = ($event?.[0]?.size) ?? undefined" />
          <template #help>
            <ClientOnly>
              <template #fallback>
                <span>&nbsp;</span>
              </template>
              <span v-if="isNetworkSupported">
                Your estimated upload time:
                <span>{{ estimatedTime }}</span>
              </span>
              <span v-else>
                Upload could take several minutes
              </span>
            </ClientOnly>
          </template>
        </UFormGroup>
        <UButton
          icon="i-lucide-upload"
          type="submit"
          :loading="loading"
        >
          Upload file
        </UButton>
        <UProgress indicator :color="loadingProgress === 100 ? 'green' : 'primary'" :value="loadingProgress" />
      </form>
    </UCard>
  </section>
</template>
