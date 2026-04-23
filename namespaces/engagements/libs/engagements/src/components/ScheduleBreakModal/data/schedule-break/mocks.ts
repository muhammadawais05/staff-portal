import { createMutationMocks } from '@staff-portal/test-utils'

import {
  ScheduleEngagementBreakMutation,
  ScheduleEngagementBreakMutationVariables
} from './schedule-break.staff.gql.types'
import { SCHEDULE_ENGAGEMENT_BREAK } from './schedule-break.staff.gql'

export const {
  success: createScheduleBreakMock,
  failed: createScheduleBreakFailedMock
} = createMutationMocks<
  ScheduleEngagementBreakMutationVariables['input'],
  ScheduleEngagementBreakMutation
>({
  options: {
    query: SCHEDULE_ENGAGEMENT_BREAK,
    key: 'scheduleEngagementBreak',
    keyTypename: 'ScheduleEngagementBreakPayload'
  }
})
