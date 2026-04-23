import React from 'react'
import { Exclamation16, QuestionMark16, TypographyProps } from '@toptal/picasso'
import { ColoredStatus } from '@staff-portal/ui'

import { JobStatusInput } from '../../types'
import {
  getJobStatusColor,
  getJobStatusTooltip,
  getJobVerboseStatus
} from '../../utils'

type Props = {
  job: JobStatusInput
  tooltipContent?: string
  inheritStyling?: boolean
  size?: TypographyProps['size']
  showTooltip?: boolean
  ignoreInvestigationStatus?: boolean
}

const getTooltipIcon = (job: JobStatusInput) => {
  return job.currentInvestigation ? (
    <Exclamation16 color='dark-grey' />
  ) : (
    <QuestionMark16 color='dark-grey' />
  )
}

const JobStatus = ({
  job,
  tooltipContent,
  inheritStyling = false,
  showTooltip = true,
  ignoreInvestigationStatus = false,
  size = 'inherit'
}: Props) => {
  const statusText = getJobVerboseStatus(job)

  const statusColor = inheritStyling
    ? 'inherit'
    : getJobStatusColor(job, ignoreInvestigationStatus)
  const weight = inheritStyling ? 'inherit' : 'semibold'
  const tooltipIcon = getTooltipIcon(job)
  const tooltipMessage =
    showTooltip && (tooltipContent || getJobStatusTooltip(job))

  return (
    <ColoredStatus
      status={statusText}
      color={statusColor}
      lines={1}
      size={size}
      weight={weight}
      tooltipContent={tooltipMessage}
      tooltipIcon={tooltipIcon}
      disableTooltip={!showTooltip}
    />
  )
}

export default JobStatus
