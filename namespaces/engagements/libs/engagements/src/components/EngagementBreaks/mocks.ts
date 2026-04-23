import {
  EngagementBreakStatus,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'

import { EngagementBreakFragment } from './data/get-engagement-breaks'

export const createEngagementBreakMock = (
  engagementBreak?: Partial<EngagementBreakFragment>
): EngagementBreakFragment => ({
  id: '123',
  startDate: '2020-04-20T00:00:00+00:00',
  endDate: '2020-04-20T00:00:00+00:00',
  operations: {
    rescheduleEngagementBreak: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    removeEngagementBreak: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  },
  status: EngagementBreakStatus.SCHEDULED,
  ...engagementBreak
})
