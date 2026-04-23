import React from 'react'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { JobStatus } from '@staff-portal/graphql/staff'
import { useGetNode } from '@staff-portal/data-layer-service'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import { JOB_UPDATED } from '@staff-portal/jobs'

import JobFeedbacksContent from '../JobFeedbacksContent'
import { GetJobFeedbacksDocument } from './data/get-job-feedbacks/get-job-feedbacks.staff.gql.types'

export const LABEL_COLUMN_WIDTH = 9

export interface Props {
  jobId: string
}

const JobFeedbacksSection = ({ jobId }: Props) => {
  const { data, loading, initialLoading, refetch } = useGetNode(
    GetJobFeedbacksDocument
  )({ jobId })

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => id === jobId && refetch())
  useMessageListener(ENGAGEMENT_UPDATED, () => refetch())

  if (data && data.status !== JobStatus.REMOVED) {
    return null
  }

  return (
    <JobFeedbacksContent
      jobId={jobId}
      feedbacks={data?.feedbacks?.nodes}
      loading={loading}
      initialLoading={initialLoading}
      labelColumnWidth={LABEL_COLUMN_WIDTH}
    />
  )
}

export default JobFeedbacksSection
