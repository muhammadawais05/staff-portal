import { useMessageListener } from '@toptal/staff-portal-message-bus'
import React from 'react'
import { useGetNode } from '@staff-portal/data-layer-service'
import { ContainerLoader } from '@staff-portal/ui'
import {
  ENGAGEMENT_UPDATED,
  EngagementFeedbacksSkeletonLoader
} from '@staff-portal/engagements'
import { JOB_UPDATED } from '@staff-portal/jobs'
import { Feedback } from '@staff-portal/feedbacks'

import { GetJobFeedbacksDocument } from './data/use-get-job-feedbacks/use-get-job-feedbacks.staff.gql.types'

type Props = {
  jobId: string
  labelColumnWidth: number
}

const JobFeedbacks = ({ jobId, labelColumnWidth }: Props) => {
  const { data, loading, initialLoading, refetch } = useGetNode(
    GetJobFeedbacksDocument
  )(
    {
      jobId
    },
    { fetchPolicy: 'cache-first' }
  )

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => id === jobId && refetch())
  useMessageListener(ENGAGEMENT_UPDATED, () => refetch())

  return (
    <ContainerLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <EngagementFeedbacksSkeletonLoader
          labelColumnWidth={labelColumnWidth}
        />
      }
    >
      {data?.feedbacks?.nodes?.map(feedback => (
        <Feedback
          key={feedback.id}
          feedback={feedback}
          labelColumnWidth={labelColumnWidth}
          onMarkOutdated={refetch}
        />
      ))}
    </ContainerLoader>
  )
}

export default JobFeedbacks
