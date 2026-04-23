import { BaseDraftJobFormType } from '../../../types'

export const applyHoursOverlap = (
  formData: BaseDraftJobFormType,
  hoursOverlap?: BaseDraftJobFormType['hoursOverlap'],
  hasPreferredHours?: BaseDraftJobFormType['hasPreferredHours']
) => {
  if (!hoursOverlap) {
    return formData
  }

  if (hasPreferredHours === 'true') {
    return {
      hoursOverlap,
      ...formData
    }
  }

  return formData
}
