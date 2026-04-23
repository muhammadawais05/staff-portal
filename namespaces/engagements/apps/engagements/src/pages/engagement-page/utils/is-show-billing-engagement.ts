import { Maybe } from '@toptal/picasso/utils'
import { EngagementStatus } from '@staff-portal/graphql/staff'

export const isShowBillingEngagement = (status: Maybe<EngagementStatus>) =>
  !!status &&
  [
    EngagementStatus.PENDING_LEGAL,
    EngagementStatus.SCHEDULED,
    EngagementStatus.ON_TRIAL,
    EngagementStatus.ON_HOLD,
    EngagementStatus.ACTIVE,
    EngagementStatus.ON_BREAK,
    EngagementStatus.END_SCHEDULED,
    EngagementStatus.CLOSED,
    EngagementStatus.REJECTED_TRIAL
  ].includes(status)
