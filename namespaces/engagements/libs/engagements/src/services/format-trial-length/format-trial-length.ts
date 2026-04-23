import pluralize from 'pluralize'

export const formatTrialLength = (length?: number | null) => {
  if (!length) {
    return 'No trial'
  }

  return `${length} business ${pluralize('day', length)}`
}
