import {
  ActivityFragment,
  ACTIVITY_CONFIGURATION,
  getActivityContentMapping
} from '@staff-portal/activities'
import { TaskCardLayoutContentItem } from '@staff-portal/tasks'

export const getActivityContentItems = (
  activity: ActivityFragment,
  timeZone?: string
): TaskCardLayoutContentItem[] => {
  const contentMapping = getActivityContentMapping(activity, timeZone)

  return ACTIVITY_CONFIGURATION.map(key => ({
    key,
    ...contentMapping[key]
  }))
}
