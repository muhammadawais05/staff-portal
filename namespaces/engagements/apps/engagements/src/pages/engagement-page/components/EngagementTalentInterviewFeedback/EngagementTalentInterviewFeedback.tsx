import React from 'react'
import { useGetNode } from '@staff-portal/data-layer-service'
import { DetailedListSkeleton, ContainerLoader } from '@staff-portal/ui'

import {
  TalentInterviewFeedbackContent,
  TalentInterviewFeedbackSection
} from './components'
import { GetTalentInterviewFeedbackDocument } from './data/get-talent-interview-feedback/get-talent-interview-feedback.staff.gql.types'

export interface Props {
  engagementId: string
  labelColumnWidth: number
}

const EngagementTalentInterviewFeedback = ({
  engagementId,
  labelColumnWidth
}: Props) => {
  const { initialLoading, loading, data } = useGetNode(
    GetTalentInterviewFeedbackDocument
  )(
    {
      engagementId
    },
    {
      throwOnError: true
    }
  )
  const { interview, talent } = data || {}

  return (
    <ContainerLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <TalentInterviewFeedbackSection>
          <DetailedListSkeleton
            data-testid='talent-interview-feedback-skeleton'
            items={3}
            columns={1}
            labelColumnWidth={labelColumnWidth}
          />
        </TalentInterviewFeedbackSection>
      }
    >
      {interview?.surveyAnswer && talent && (
        <TalentInterviewFeedbackContent
          labelColumnWidth={labelColumnWidth}
          surveyAnswer={interview.surveyAnswer}
          talent={talent}
        />
      )}
    </ContainerLoader>
  )
}

export default EngagementTalentInterviewFeedback
