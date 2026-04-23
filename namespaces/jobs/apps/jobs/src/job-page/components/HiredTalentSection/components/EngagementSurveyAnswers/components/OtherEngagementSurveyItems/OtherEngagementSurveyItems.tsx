import React, { useState } from 'react'
import { ArrowDownMinor16, Button } from '@toptal/picasso'
import { EngagementSurveyAnswerKind, Link } from '@staff-portal/graphql/staff'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import * as S from './styles'
import EngagementSurveyItemSkeletonLoader from '../EngagementSurveyItemSkeletonLoader'
import EngagementSurveyItem from '../EngagementSurveyItem'
import { GetOtherEngagementSurveyAnswersDocument } from '../../data/get-other-engagement-survey-answers/get-other-engagement-survey-answers.staff.gql.types'

type Props = {
  engagementId: string
  hasOtherSurveys?: boolean
  recentTalentSurveyId?: string
  recentClientSurveyId?: string
  talentWebResource?: Link
  clientWebResource?: Link
}

const OtherEngagementSurveyItems = ({
  engagementId,
  hasOtherSurveys,
  recentTalentSurveyId,
  recentClientSurveyId,
  talentWebResource,
  clientWebResource
}: Props) => {
  const [isShowMoreButtonVisible, setShowMoreButtonVisiblity] = useState(true)

  const [getOtherEngagementSurveyAnswers, { data, loading }] = useLazyQuery(
    GetOtherEngagementSurveyAnswersDocument,
    {
      variables: { engagementId }
    }
  )

  const fetchOtherSurveys = () => {
    setShowMoreButtonVisiblity(false)
    getOtherEngagementSurveyAnswers()
  }

  const otherSurveys = (data?.node?.surveyAnswers?.nodes || []).filter(
    surveyItem => {
      return (
        surveyItem.id !== recentTalentSurveyId &&
        surveyItem.id !== recentClientSurveyId
      )
    }
  )

  return (
    <>
      {hasOtherSurveys && isShowMoreButtonVisible && (
        <Button
          fullWidth
          css={S.button}
          data-testid='EngagementSurveyAnswers-showMore'
          onClick={fetchOtherSurveys}
          icon={<ArrowDownMinor16 />}
          iconPosition='right'
        >
          Show More
        </Button>
      )}

      {loading && <EngagementSurveyItemSkeletonLoader />}

      {otherSurveys.map(item => (
        <EngagementSurveyItem
          data-testid='EngagementSurveyItem-other'
          key={item.id}
          userWebResource={
            item.kind === EngagementSurveyAnswerKind.CLIENT
              ? clientWebResource
              : talentWebResource
          }
          surveyAnswers={item}
        />
      ))}
    </>
  )
}

export default OtherEngagementSurveyItems
