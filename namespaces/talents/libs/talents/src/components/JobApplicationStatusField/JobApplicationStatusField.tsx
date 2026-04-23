import React, { useMemo } from 'react'
import { NO_VALUE } from '@staff-portal/config'
import { TalentJobApplicationStatusValue } from '@staff-portal/graphql/staff'
import { LinkWrapper } from '@staff-portal/ui'
import { titleize } from '@staff-portal/string'

import { JobApplicationStatusFragment } from '../../data'

// eslint-disable-next-line complexity
const getStatusText = (
  status: TalentJobApplicationStatusValue,
  relatedObject: JobApplicationStatusFragment['relatedObject']
) => {
  if (status === TalentJobApplicationStatusValue.APPLIED_AFTER_RECOMMENDATION) {
    return 'Applied after recommendation'
  }

  if (status === TalentJobApplicationStatusValue.RECOMMENDED_FOR_THE_JOB) {
    return 'Recommended for the job'
  }

  if ('availabilityRequestStatus' in relatedObject) {
    return `Request ${titleize(relatedObject.availabilityRequestStatus)}`
  }

  if ('engagementStatus' in relatedObject && relatedObject.engagementStatus) {
    return `Engagement ${titleize(relatedObject.engagementStatus)}`
  }

  if ('jobApplicationStatus' in relatedObject) {
    return `Talent Application ${titleize(relatedObject.jobApplicationStatus)}`
  }
}

export interface Props {
  jobApplicationStatus: JobApplicationStatusFragment
}

const JobApplicationStatusField = ({
  jobApplicationStatus: { status, relatedObject, webResource }
}: Props) => {
  const statusText = useMemo(
    () => getStatusText(status, relatedObject),
    [status, relatedObject]
  )

  if (!statusText) {
    return <>{NO_VALUE}</>
  }

  return (
    <LinkWrapper
      wrapWhen={Boolean(webResource.url)}
      href={webResource.url as string}
      title={statusText}
    >
      {statusText}
    </LinkWrapper>
  )
}

export default JobApplicationStatusField
