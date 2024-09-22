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
  const startingProgress = 1 / (Math.ceil((file.size / 1024 / 1024) / 5)) * 100
  loadingProgress.value = startingProgress
  const { completed, progress } = startUpload(file)
  const stopProgressSync = watchEffect(() => {
    if (progress.value > startingProgress)
      loadingProgress.value = progress.value
  })
  completed.finally(() => { loading.value = false })
  const counterInterval = setInterval(() => { timer.value += 1 }, 1000)
  await completed.catch((err) => {
    toast.add({
      title: 'Upload failed',
      description: 'Please try again',
      timeout: 0,
    })
    throw err
  }).finally(() => { stopProgressSync(); clearInterval(counterInterval) })
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
const { message: estimatedTime, mbps } = useUploadEstimate(fileSize)
const { isSupported: isNetworkSupported } = useNetwork()

const timer = ref(0)
</script>

<template>
  <UCard as="section">
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
              Based off your estimated network speed of {{ mbps }} Mbps, your upload should take {{ estimatedTime }} <br>
              time: {{ timer }}
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
</template>
