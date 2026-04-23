import { createMutationMocks } from '@staff-portal/test-utils'

import {
  RescheduleEngagementBreakMutation,
  RescheduleEngagementBreakMutationVariables
} from './reschedule-break.staff.gql.types'
import { RESCHEDULE_ENGAGEMENT_BREAK } from './reschedule-break.staff.gql'

export const {
  success: createRescheduleBreakMock,
  failed: createRescheduleBreakFailedMock
} = createMutationMocks<
  RescheduleEngagementBreakMutationVariables['input'],
  RescheduleEngagementBreakMutation
>({
  options: {
    query: RESCHEDULE_ENGAGEMENT_BREAK,
    key: 'rescheduleEngagementBreak',
    keyTypename: 'RescheduleEngagementBreakPayload'
  }
})
