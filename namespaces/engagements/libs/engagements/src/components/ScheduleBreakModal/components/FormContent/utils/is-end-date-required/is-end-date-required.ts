import { Maybe } from '@toptal/picasso/utils'
import { EngagementStatus } from '@staff-portal/graphql/staff'

export const isEndDateRequired = (status: Maybe<EngagementStatus>) =>
  Boolean(
    status &&
      [
        EngagementStatus.SCHEDULED,
        EngagementStatus.ON_TRIAL,
        EngagementStatus.ON_HOLD
      ].includes(status)
  )
