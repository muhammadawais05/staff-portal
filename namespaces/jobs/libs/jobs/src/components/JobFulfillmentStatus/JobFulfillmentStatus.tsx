import React, { HTMLAttributes } from 'react'
import { QuestionMark16 } from '@toptal/picasso'
import { Job, JobStatus } from '@staff-portal/graphql/staff'
import { ColoredStatus } from '@staff-portal/ui'

import {
  getJobStatusColor,
  getJobStatusTooltip,
  getJobVerboseStatus
} from '../../utils'
import { JobWithCurrentInvestigation } from '../../types'

type JobStatusInput = Pick<
  Job,
  | 'talentCount'
  | 'status'
  | 'hiredCount'
  | 'matcherCallScheduled'
  | 'cumulativeStatus'
> &
  JobWithCurrentInvestigation

export interface Props extends HTMLAttributes<HTMLElement> {
  job: JobStatusInput
}

const JobFulfillmentStatus = ({ job: statusProps }: Props) => {
  const statusText = getJobVerboseStatus(statusProps, JobStatus.ACTIVE, true)
  const statusColor = getJobStatusColor(statusProps)

  const tooltipContent = getJobStatusTooltip(statusProps)
  const tooltipIcon = <QuestionMark16 color='dark-grey' />

  return (
    <ColoredStatus
      status={statusText}
      color={statusColor}
      tooltipContent={tooltipContent}
      tooltipIcon={tooltipIcon}
    />
  )
}

export default JobFulfillmentStatus
