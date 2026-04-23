export const QUOTA_EXCEEDED_ERROR_CODE = 22
export const QUOTA_EXCEEDED_ERROR_NAME = 'QuotaExceededError'

export const isQuotaExceededError = (error: Error): boolean => {
  return (
    error instanceof DOMException &&
    (error.code === QUOTA_EXCEEDED_ERROR_CODE ||
      error.name === QUOTA_EXCEEDED_ERROR_NAME)
  )
}
