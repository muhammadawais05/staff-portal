import { EngagementStatus } from '@staff-portal/graphql/staff'

import { getEngagementStatusColor } from '../../../../../services'

interface EngagementStatusProps {
  status?: EngagementStatus | null
  cumulativeStatus?: string | null
}

const DEFAULT_COLOR = 'black'

export const getFeedbackStatusColor = (engagement: EngagementStatusProps) => {
  const { status, cumulativeStatus } = engagement

  if (status && cumulativeStatus) {
    return (
      getEngagementStatusColor({ status, cumulativeStatus }) || DEFAULT_COLOR
    )
  }

  return DEFAULT_COLOR
}
