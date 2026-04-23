export const useDebounce = (value: unknown) => {
  return [value]
}

export const useDebouncedCallback = (
  callback: (...args: unknown[]) => void
) => {
  const debouncedCallback = (...args: unknown[]) => {
    callback(...args)
  }

  debouncedCallback.cancel = () => {}

  return debouncedCallback
}
