import { parseAndFormatDate } from '@staff-portal/date-time-utils'

import { CurrentEngagementFragment } from '../../data'

export const getEndDate = (
  currentEngagement: CurrentEngagementFragment['currentEngagement']
) => {
  const endDate =
    currentEngagement?.nodes[0]?.endDate &&
    parseAndFormatDate(currentEngagement.nodes[0].endDate)

  if (currentEngagement?.nodes[0]?.startDate && !endDate) {
    return 'not set'
  }

  return endDate
}
