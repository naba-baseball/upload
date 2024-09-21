/**
 * @param fileSize in bytes
 * @returns estimated time in seconds formatted as a string
 */
export function useUploadEstimate(fileSize: MaybeRefOrGetter<number | null | undefined>): Ref<string> {
  const { downlink } = useNetwork()
  const _fileSize = computed(() => (toValue(fileSize) || 0) / 1024 / 1024)
  const mbps = computed(() => ((downlink.value ?? 0) * 25) / 1000)
  const estimatedTime = computed(() => {
    if (!_fileSize.value)
      return ''
      // get file size
    const result = (_fileSize.value * 0.125) / mbps.value
    return `${Math.round(result)} seconds`
  })
  return estimatedTime
}
