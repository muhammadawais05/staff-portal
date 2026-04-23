import {
  EngagementBreak,
  EngagementBreakStatus
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { hiddenOperationMock } from '../hidden-operation-mock'

export const engagementBreaksMock = (
  engagementBreak: Partial<EngagementBreak> = {}
) =>
  ({
    status: EngagementBreakStatus.SCHEDULED,
    startDate: '2021-09-16T00:00:00+00:00',
    endDate: '2021-09-18T00:00:00+00:00',
    messageToClient: 'Nice to meet you!',
    __typename: 'EngagementBreak',
    ...engagementBreak,
    id: encodeEntityId(engagementBreak.id ?? '1', 'EngagementBreak'),
    operations: {
      rescheduleEngagementBreak: hiddenOperationMock(),
      removeEngagementBreak: hiddenOperationMock(),
      __typename: 'EngagementBreakOperations',
      ...engagementBreak.operations
    }
  } as EngagementBreak)
