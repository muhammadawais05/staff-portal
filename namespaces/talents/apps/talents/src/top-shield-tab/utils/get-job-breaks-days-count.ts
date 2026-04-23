import { differenceInDays } from '@staff-portal/date-time-utils'
import { TalentTopShieldEngagementFragment } from '@staff-portal/talents-top-shield'

export const getJobBreaksDaysCount = (
  engagement: TalentTopShieldEngagementFragment
) => {
  return engagement.engagementBreaks?.nodes
    .reduce(
      (totalDays, node) =>
        totalDays +
        differenceInDays(
          node.endDate ? new Date(node.endDate) : new Date(),
          new Date(node.startDate)
        ),
      0
    )
    .toString()
}
