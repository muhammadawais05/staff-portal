import { SectionWithDetailedListSkeleton } from '@staff-portal/ui'
import React from 'react'

import { JobDetails } from '../../components'
import { useCandidateSendingContext, useGetJobCandidateData } from '../../hooks'

const CandidateSendingJobSection = () => {
  const { jobId } = useCandidateSendingContext()
  const { jobData, jobDataLoading } = useGetJobCandidateData({
    jobId,
    skip: !jobId
  })

  if (jobId && jobDataLoading) {
    return (
      <SectionWithDetailedListSkeleton
        title='Job Details'
        columns={1}
        items={5}
        labelColumnWidth={10}
        dataTestId='candidate-sending-job-section-skeleton-loader'
      />
    )
  }

  if (!jobData) {
    return null
  }

  return <JobDetails job={jobData} />
}

export default CandidateSendingJobSection
