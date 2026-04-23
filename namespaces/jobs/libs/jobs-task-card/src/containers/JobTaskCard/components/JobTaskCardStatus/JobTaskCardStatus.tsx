import React from 'react'
import { TaskCardLayout } from '@staff-portal/tasks'
import {
  JobFulfillmentStatus,
  JobStatus,
  showJobFulfillmentStatus
} from '@staff-portal/jobs'

import { JobFragment } from '../../data'

export interface Props {
  job: JobFragment
}

const JobTaskCardStatus = ({ job }: Props) => {
  const showFulfillmentStatus = showJobFulfillmentStatus(
    job.talentCount,
    job.status
  )

  if (showFulfillmentStatus) {
    return (
      <TaskCardLayout.SummaryItem
        label='Fulfillment status'
        value={<JobFulfillmentStatus job={job} />}
      />
    )
  }

  return (
    <TaskCardLayout.SummaryItem
      label='Status'
      value={<JobStatus job={job} />}
    />
  )
}

export default JobTaskCardStatus
