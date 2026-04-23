import { Maybe } from '@toptal/picasso/utils'

import { ScheduleEngagementBreakMutation } from '../../data/schedule-break/schedule-break.staff.gql.types'
import { RescheduleEngagementBreakMutation } from '../../data/reschedule-break/reschedule-break.staff.gql.types'
import { ScheduleType } from '../../types'

export const getScheduleBreakMutationResult = ({
  data,
  scheduleType
}: {
  data?: Maybe<
    ScheduleEngagementBreakMutation | RescheduleEngagementBreakMutation
  >
  scheduleType: ScheduleType
}) => {
  if (!data) {
    return undefined
  }

  switch (scheduleType) {
    case ScheduleType.CREATE:
      return (data as ScheduleEngagementBreakMutation)?.scheduleEngagementBreak
    case ScheduleType.EDIT:
      return (data as RescheduleEngagementBreakMutation)
        ?.rescheduleEngagementBreak
  }
}
