export type MemoryStatus = {
  deviceMemory?: number | null
  totalJSHeapSize?: number | null
  usedJSHeapSize?: number | null
  jsHeapSizeLimit?: number | null
}

const unsupported = !(
  typeof navigator !== 'undefined' && 'deviceMemory' in navigator
)

let memoryStatus: MemoryStatus & {
  unsupported: boolean
}

if (!unsupported) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const performanceMemory = performance?.memory ?? null

  memoryStatus = {
    unsupported,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    deviceMemory: navigator?.deviceMemory ?? null,
    // prettier-ignore
    totalJSHeapSize: performanceMemory?.totalJSHeapSize ?? null,
    // prettier-ignore
    usedJSHeapSize: performanceMemory?.usedJSHeapSize ?? null,
    // prettier-ignore
    jsHeapSizeLimit: performanceMemory?.jsHeapSizeLimit ?? null
  }
} else {
  memoryStatus = { unsupported }
}

const useMemoryStatus = (initialMemoryStatus: MemoryStatus = {}) => {
  return unsupported && initialMemoryStatus
    ? { ...memoryStatus, ...initialMemoryStatus }
    : { ...memoryStatus }
}

export { useMemoryStatus }
