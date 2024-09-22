/**
 * @param fileSize in bytes
 * @returns estimated time in seconds formatted as a string
 */
export function useUploadEstimate(fileSize: MaybeRefOrGetter<number | null | undefined>) {
  const { downlink } = useNetwork()
  const fileSizeMb = computed(() => (toValue(fileSize) || 0) / 1024 / 1024)
  const mbps = computed(() => ((downlink.value ?? 0)))
  const seconds = computed(() => (fileSizeMb.value * 8) / mbps.value)
  const message = computed(() => {
    if (!fileSizeMb.value)
      return ''
      // get file size
    return `${Math.round(seconds.value)} seconds`
  })
  return { message, mbps, seconds }
}
