import { ScheduleInterviewFormValues } from '../../../../types'
import { prepareFormDataForSchedule } from '../prepare-form-data-for-schedule'

export const prepareFormDataForTopScheduler = (
  values: ScheduleInterviewFormValues
) => ({
  proposedTimeSlot: {
    date: values.date ?? '',
    time: values.time ?? ''
  },
  ...prepareFormDataForSchedule(values)
})
