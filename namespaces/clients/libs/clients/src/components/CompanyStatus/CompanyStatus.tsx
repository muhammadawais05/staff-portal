import React from 'react'
import { Exclamation16 } from '@toptal/picasso'
import { ColoredStatus } from '@staff-portal/ui'
import { NO_VALUE } from '@staff-portal/config'

import {
  getCompanyVerboseStatus,
  getCompanyStatusColor,
  getCompanyTooltip
} from './utils'
import { CompanyStatusInput } from './types'

const CompanyStatus = (company: CompanyStatusInput) => {
  const { cumulativeStatus, investigations } = company

  if (!cumulativeStatus) {
    return <>{NO_VALUE}</>
  }

  const statusText = getCompanyVerboseStatus(cumulativeStatus)
  const statusColor = getCompanyStatusColor({
    cumulativeStatus,
    investigations
  })

  const tooltipContent = getCompanyTooltip(investigations)
  const tooltipIcon = <Exclamation16 color='dark-grey' />

  return (
    <ColoredStatus
      status={statusText}
      color={statusColor}
      tooltipContent={tooltipContent}
      tooltipIcon={tooltipIcon}
    />
  )
}

export default CompanyStatus
