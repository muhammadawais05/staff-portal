import React from 'react'
import { Exclamation16 } from '@toptal/picasso'
import { SourcingRequestStatus } from '@staff-portal/graphql/staff'
import { ColoredStatus } from '@staff-portal/ui'
import { titleize } from '@staff-portal/string'

import {
  getSourcingRequestStatusColor,
  getSourcingRequestVerboseStatus
} from './utils'

export const SourcingRequestStatusComponent = ({
  status
}: {
  status?: SourcingRequestStatus | null
}) => {
  if (!status) {
    return null
  }

  const statusText = getSourcingRequestVerboseStatus(status)
  const statusColor = getSourcingRequestStatusColor(status)

  const tooltipIcon = <Exclamation16 color='dark-grey' />

  return (
    <ColoredStatus
      status={titleize(status)}
      color={statusColor}
      tooltipContent={statusText}
      tooltipIcon={tooltipIcon}
    />
  )
}

export default SourcingRequestStatusComponent
