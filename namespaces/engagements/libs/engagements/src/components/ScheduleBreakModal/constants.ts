import {
  useRescheduleEngagementBreak,
  useScheduleEngagementBreak
} from './data'
import { ScheduleType } from './types'

export const SCHEDULE_ENGAGEMENT_BREAK_MAPPING = {
  [ScheduleType.CREATE]: {
    useScheduleMutation: useScheduleEngagementBreak,
    errorMessage: 'Unable to schedule the Engagement Break.',
    successMessage: 'The Engagement Break was successfully scheduled.',
    modalTitle: 'Schedule a Break',
    submitText: 'Schedule Break'
  },
  [ScheduleType.EDIT]: {
    useScheduleMutation: useRescheduleEngagementBreak,
    errorMessage: 'Unable to update the Engagement Break.',
    successMessage: 'The Engagement Break was successfully updated.',
    modalTitle: 'Reschedule Break',
    submitText: 'Reschedule Break'
  }
}
