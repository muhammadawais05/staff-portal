import { JobHoursOverlap } from '@staff-portal/graphql/staff'
import pluralize from 'pluralize'

export const buildHoursOverlapValue = (value?: JobHoursOverlap | null) => {
  if (!value) {
    return ''
  }

  return `Min ${pluralize('hour', parseInt(value.split('_')[1]), true)}`
}
