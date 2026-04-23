import { ScheduleInterviewFragment } from '../../../../data/fragments/schedule-interview-fragment'
import { ScheduleEngagementFragment } from '../../../../data/fragments/schedule-engagement-fragment'
import { EmailCarbonCopyOptionFragment } from '../../../../data/fragments/schedule-engagement-fragment/schedule-engagement-fragment.staff.gql.types'
import { ScheduleInternalInterviewFormValues } from '../../../../types'
import { prepareFormDataForInternalSchedule } from '../prepare-form-data-for-internal-schedule'

type Props = {
  values: ScheduleInternalInterviewFormValues
  gcUserReceivers?: EmailCarbonCopyOptionFragment[]
  scheduleEngagement: ScheduleEngagementFragment
  scheduleInterview: ScheduleInterviewFragment
}

export const prepareFormDataForInternalTopScheduler = ({
  values,
  gcUserReceivers,
  scheduleEngagement,
  scheduleInterview
}: Props) => ({
  preferredDuration: values.preferredDuration,
  proposedTimeSlot: {
    date: values.date ?? '',
    time: values.time ?? ''
  },
  ...prepareFormDataForInternalSchedule({
    values,
    gcUserReceivers,
    scheduleEngagement,
    scheduleInterview
  })
})
