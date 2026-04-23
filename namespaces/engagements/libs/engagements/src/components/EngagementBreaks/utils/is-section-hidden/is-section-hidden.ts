import { Maybe } from '@toptal/picasso/utils'
import { EngagementStatus } from '@staff-portal/graphql/staff'

import { CURRENT_STATUSES } from '../../../../config'

export const isSectionHidden = (status: Maybe<EngagementStatus>) => {
  if (!status) {
    return true
  }

  return !CURRENT_STATUSES.includes(status)
}
