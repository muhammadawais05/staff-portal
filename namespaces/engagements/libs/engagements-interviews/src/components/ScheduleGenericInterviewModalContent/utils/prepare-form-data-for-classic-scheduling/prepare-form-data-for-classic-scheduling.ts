import { ScheduleInterviewFormValues } from '../../../../types'
import { prepareFormDataForSchedule } from '../prepare-form-data-for-schedule'

export const prepareFormDataForClassicScheduling = (
  values: ScheduleInterviewFormValues
) => ({
  acceptForTalent: values.acceptForTalent,
  proposedTimeSlots: values.scheduledAtTimes.map(({ date, time }) => ({
    date: date ?? '',
    time
  })),
  ...prepareFormDataForSchedule(values)
})
