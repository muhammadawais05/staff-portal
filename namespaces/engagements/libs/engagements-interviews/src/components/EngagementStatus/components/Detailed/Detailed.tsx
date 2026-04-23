import React from 'react'
import { ColorType } from '@toptal/picasso'
import { ColoredStatus } from '@staff-portal/ui'
import { NO_VALUE } from '@staff-portal/config'

import {
  getEngagementDetailedStatus,
  getEngagementStatusTooltip,
  getEngagementStatusColor,
  EngagementTooltipOptions,
  isStatusTimezoneTooltipAvailable
} from '../../../../services'
import EngagementStatusTimeZoneIcon from '../EngagementStatusTimeZoneIcon'
import { EngagementDetailedStatusData } from '../../../../types'

export interface Props {
  engagement: EngagementDetailedStatusData
  tooltipOptions?: EngagementTooltipOptions
  color?: ColorType
  lines?: number
  'data-testid'?: string
}

const Detailed = ({
  engagement,
  tooltipOptions,
  color,
  lines,
  'data-testid': dataTestId = 'EngagementStatus-detailed'
}: Props) => {
  const { status, cumulativeStatus, interview, timeZone } = engagement

  if (!status || !cumulativeStatus) {
    return <>{NO_VALUE}</>
  }

  const statusText = getEngagementDetailedStatus(engagement)

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
      lines={lines}
    />
  )
}

export default Detailed
