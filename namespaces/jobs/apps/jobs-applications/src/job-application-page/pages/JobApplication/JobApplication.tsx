import React from 'react'
import { useGetNode } from '@staff-portal/data-layer-service'
import { JOB_UPDATED } from '@staff-portal/jobs'
import ContentWrapper from '@staff-portal/page-wrapper'
import { useMessageListener } from '@toptal/staff-portal-message-bus'

import {
  JobApplicationActions,
  JobApplicationContent,
  JobApplicationSkeletonLoader
} from '../../components'
import { GetJobApplicationDocument } from '../../data/get-job-application'
import { useGetJobApplicationIdParam } from './hooks'

const JobApplication = () => {
  const jobApplicationId = useGetJobApplicationIdParam()

  const {
    data: jobApplication,
    loading,
    refetch
  } = useGetNode(GetJobApplicationDocument)({ jobApplicationId })

  useMessageListener(
    JOB_UPDATED,
    ({ jobId }) => jobId === jobApplication?.job.id && refetch()
  )

  return (
    <ContentWrapper
      title='Job Application'
      browserTitle='Job Application'
      actions={
        <JobApplicationActions
          loading={loading}
          jobApplication={jobApplication}
        />
      }
    >
      {jobApplication ? (
        <JobApplicationContent jobApplication={jobApplication} />
      ) : (
        <JobApplicationSkeletonLoader />
      )}
    </ContentWrapper>
  )
}

export default JobApplication
