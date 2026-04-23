import { EngagementStatus } from '@staff-portal/graphql/staff'

import { ENGAGEMENT_STATUSES_WITH_TIMEZONE_TOOLTIP } from '../../config'

interface Props {
  status?: EngagementStatus | null
  timeZoneValue?: string
}

export const isStatusTimezoneTooltipAvailable = ({
  status,
  timeZoneValue
}: Props) =>
  Boolean(
    timeZoneValue &&
      status &&
      ENGAGEMENT_STATUSES_WITH_TIMEZONE_TOOLTIP.includes(status)
  )
