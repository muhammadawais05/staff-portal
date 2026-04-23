import React from 'react'
import { useGetNode } from '@staff-portal/data-layer-service'
import { ContainerLoader } from '@staff-portal/ui'

import { GetLatestEngagementSurveyAnswersDocument } from './data/get-latest-engagement-survey-answers/get-latest-engagement-survey-answers.staff.gql.types'
import {
  EngagementSurveyItem,
  EngagementSurveyItemSkeletonLoader
} from './components'
import EngagementSurveyAnswersLayout from './components/EngagementSurveyAnswersLayout'
import OtherEngagementSurveyItems from './components/OtherEngagementSurveyItems'

type Props = {
  engagementId: string
}

const EngagementSurveyAnswers = ({ engagementId }: Props) => {
  const { data, loading, initialLoading } = useGetNode(
    GetLatestEngagementSurveyAnswersDocument
  )(
    { engagementId },
    {
      throwOnError: true,
      fetchPolicy: 'cache-first'
    }
  )

  const { client, talent, talentSurveyTotalCount, clientSurveyTotalCount } =
    data || {}
  const talentTotalCount = talentSurveyTotalCount?.totalCount || 0
  const clientTotalCount = clientSurveyTotalCount?.totalCount || 0

  if (talentTotalCount === 0 && clientTotalCount === 0) {
    return null
  }

  const hasOtherSurveys = talentTotalCount > 1 || clientTotalCount > 1
  const recentTalentSurvey = data?.recentTalentSurvey?.nodes[0]
  const recentClientSurvey = data?.recentClientSurvey?.nodes[0]

  return (
    <ContainerLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <EngagementSurveyAnswersLayout>
          <EngagementSurveyItemSkeletonLoader />
        </EngagementSurveyAnswersLayout>
      }
    >
      <EngagementSurveyAnswersLayout>
        {recentTalentSurvey && (
          <>
            <EngagementSurveyItem
              data-testid='EngagementSurveyItem-talent'
              userWebResource={talent?.webResource}
              surveyAnswers={recentTalentSurvey}
            />
          </>
        )}

        {recentClientSurvey && (
          <EngagementSurveyItem
            data-testid='EngagementSurveyItem-client'
            userWebResource={client?.webResource}
            surveyAnswers={recentClientSurvey}
          />
        )}

        <OtherEngagementSurveyItems
          engagementId={engagementId}
          hasOtherSurveys={hasOtherSurveys}
          recentTalentSurveyId={recentTalentSurvey?.id}
          recentClientSurveyId={recentClientSurvey?.id}
          talentWebResource={talent?.webResource}
          clientWebResource={client?.webResource}
        />
      </EngagementSurveyAnswersLayout>
    </ContainerLoader>
  )
}

export default EngagementSurveyAnswers
