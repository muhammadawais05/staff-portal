import React from 'react'
import { ColorType } from '@toptal/picasso'
import { ColoredStatus } from '@staff-portal/ui'
import { NO_VALUE } from '@staff-portal/config'

import {
  getEngagementDefaultStatus,
  getEngagementStatusTooltip,
  getEngagementStatusColor,
  EngagementTooltipOptions,
  isStatusTimezoneTooltipAvailable
} from '../../../../services'
import EngagementStatusTimeZoneIcon from '../EngagementStatusTimeZoneIcon'
import { EngagementWithStatusAndTimeZone } from '../../../../types'

export interface Props {
  engagement: EngagementWithStatusAndTimeZone
  talentType?: string
  tooltipOptions?: EngagementTooltipOptions
  color?: ColorType
  'data-testid'?: string
}

const Default = ({
  engagement,
  tooltipOptions,
  talentType,
  color,
  'data-testid': dataTestId = 'EngagementStatus-default'
}: Props) => {
  const { status, cumulativeStatus, interview, timeZone } = engagement

  if (!status || !cumulativeStatus) {
    return <>{NO_VALUE}</>
  }

  const statusText = getEngagementDefaultStatus(
    engagement.cumulativeStatus,
    talentType
  )

  const timeZoneIcon = isStatusTimezoneTooltipAvailable({
    status,
    timeZoneValue: timeZone?.value
  }) && <EngagementStatusTimeZoneIcon timeZoneValue={timeZone?.value} />

  const statusColor =
    color ??
    getEngagementStatusColor({
      status,
      cumulativeStatus,
      interview
    })

  return (
    <ColoredStatus
      status={statusText}
      extraStatusContent={timeZoneIcon}
      color={statusColor}
      tooltipContent={getEngagementStatusTooltip(engagement, tooltipOptions)}
      data-testid={dataTestId}
    />
  )
}

export default Default
