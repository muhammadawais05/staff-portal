import { ScheduleInterviewFragment } from '../../../../data/fragments/schedule-interview-fragment'
import {
  EmailCarbonCopyOptionFragment,
  ScheduleEngagementFragment
} from '../../../../data/fragments/schedule-engagement-fragment'
import { ScheduleInternalInterviewFormValues } from '../../../../types'
import { prepareFormDataForInternalSchedule } from '../prepare-form-data-for-internal-schedule'

type Props = {
  values: ScheduleInternalInterviewFormValues
  gcUserReceivers?: EmailCarbonCopyOptionFragment[]
  scheduleEngagement: ScheduleEngagementFragment
  scheduleInterview: ScheduleInterviewFragment
}

export const prepareFormDataForInternalClassicScheduling = ({
  values,
  gcUserReceivers,
  scheduleEngagement,
  scheduleInterview
}: Props) => {
  const { acceptForTalent, scheduledAtTimes } = values

  return {
    acceptForTalent,
    proposedTimeSlots: scheduledAtTimes.map(({ date, time }) => ({
      date: date ?? '',
      time
    })),
    ...prepareFormDataForInternalSchedule({
      values,
      gcUserReceivers,
      scheduleEngagement,
      scheduleInterview
    })
  }
}
