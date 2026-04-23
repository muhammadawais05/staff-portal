import { Section } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import React, { ComponentProps } from 'react'
import { ContainerLoader } from '@staff-portal/ui'
import { FeedbackWithAnswersFragment, Feedback } from '@staff-portal/feedbacks'

import EngagementFeedbacksSkeletonLoader from '../EngagementFeedbacksSkeletonLoader'
import { ENGAGEMENT_UPDATED } from '../../messages'

export interface Props {
  engagementId: string
  labelColumnWidth: number
  sectionVariant?: ComponentProps<typeof Section>['variant']
  loading: boolean
  initialLoading: boolean
  feedbacks?: FeedbackWithAnswersFragment[]
  refetch: () => void
}

const EngagementFeedbacksCommon = ({
  engagementId,
  feedbacks,
  loading,
  initialLoading,
  sectionVariant,
  labelColumnWidth,
  refetch
}: Props) => {
  useMessageListener(
    ENGAGEMENT_UPDATED,
    ({ engagementId: id }) => id === engagementId && refetch()
  )

  return (
    <ContainerLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <EngagementFeedbacksSkeletonLoader
          sectionVariant={sectionVariant}
          labelColumnWidth={labelColumnWidth}
        />
      }
    >
      {feedbacks?.map(feedback => (
        <Feedback
          key={feedback.id}
          sectionVariant={sectionVariant}
          feedback={feedback}
          labelColumnWidth={labelColumnWidth}
          onMarkOutdated={refetch}
        />
      ))}
    </ContainerLoader>
  )
}

export default EngagementFeedbacksCommon
