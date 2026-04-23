import React from 'react'
import { Maybe, JobStatus as JobStatusType } from '@staff-portal/graphql/staff'
import { TypographyOverflow } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'

import { JOB_STATUS_COLOR_MAPPING, JOB_STATUS_TITLE_MAPPING } from './constants'

const JobStatus = ({
  status
}: {
  status: Maybe<JobStatusType> | undefined
}) => {
  if (!status) {
    return <>{NO_VALUE}</>
  }

  return (
    <TypographyOverflow
      weight='semibold'
      data-testid='job-status'
      color={JOB_STATUS_COLOR_MAPPING[status]}
    >
      {JOB_STATUS_TITLE_MAPPING[status]}
    </TypographyOverflow>
  )
}

export default JobStatus
