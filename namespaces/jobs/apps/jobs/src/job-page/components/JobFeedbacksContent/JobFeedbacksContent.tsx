import React from 'react'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { Container } from '@toptal/picasso'
import { ContainerLoader } from '@staff-portal/ui'
import { JOB_UPDATED } from '@staff-portal/jobs'
import { Feedback, FeedbackWithAnswersFragment } from '@staff-portal/feedbacks'

import JobFeedbacksSkeletonLoader from '../JobFeedbacksSkeletonLoader'

export interface Props {
  jobId: string
  labelColumnWidth: number
  loading: boolean
  initialLoading: boolean
  feedbacks?: FeedbackWithAnswersFragment[]
}

const JobFeedbacksContent = ({
  jobId,
  feedbacks,
  loading,
  initialLoading,
  labelColumnWidth
}: Props) => {
  const emitMessage = useMessageEmitter()
  const handleMarkOutdated = () => {
    emitMessage(JOB_UPDATED, { jobId })
  }

  return (
    <ContainerLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <JobFeedbacksSkeletonLoader labelColumnWidth={labelColumnWidth} />
      }
    >
      {feedbacks?.map(feedback => (
        <Container top='medium' key={feedback.id}>
          <Feedback
            feedback={feedback}
            labelColumnWidth={labelColumnWidth}
            onMarkOutdated={handleMarkOutdated}
            sectionVariant='withHeaderBar'
          />
        </Container>
      ))}
    </ContainerLoader>
  )
}

export default JobFeedbacksContent
