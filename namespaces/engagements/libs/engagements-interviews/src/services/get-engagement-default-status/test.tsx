import { getRoleTypeText } from '@staff-portal/facilities'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'

import {
  getEngagementDefaultStatus,
  getDefaultEngagementStatusMap
} from './get-engagement-default-status'

const TALENT_TYPE = 'FinanceExpert'
const FORMATTED_TALENT_TYPE = getRoleTypeText(TALENT_TYPE)

const ENGAGEMENT_STATUS_MAP = getDefaultEngagementStatusMap(
  FORMATTED_TALENT_TYPE
)

describe('getEngagementVerboseStatus', () => {
  it.each(Object.keys(ENGAGEMENT_STATUS_MAP))(
    'returns valid status message for %s',
    status => {
      const statusMessage = getEngagementDefaultStatus(
        status as EngagementCumulativeStatus,
        TALENT_TYPE
      )

      expect(statusMessage).toBe(
        ENGAGEMENT_STATUS_MAP[status as EngagementCumulativeStatus]
      )
    }
  )
})
