import React from 'react'
import { Link } from '@staff-portal/graphql/staff'
import { ModalSuspender } from '@staff-portal/modals-service'

import { SurveyEngagementFragment } from '../../../../data/survey-engagement-fragment'
import LeaveFeedbackForm from '../LeaveFeedbackForm'
import { useClientEngagementSurveyQuestions } from '../../hooks'

interface Props {
  hideModal: () => void
  companyId: string
  webResource: Link
  engagements: SurveyEngagementFragment['engagements']
}

const LeaveFeedbackContent = ({
  companyId,
  hideModal,
  engagements,
  webResource
}: Props) => {
  const { data: questions, loading } = useClientEngagementSurveyQuestions()

  if (!questions || loading || !engagements?.nodes) {
    return <ModalSuspender />
  }

  return (
    <LeaveFeedbackForm
      hideModal={hideModal}
      companyId={companyId}
      engagements={engagements}
      webResource={webResource}
      questions={questions}
    />
  )
}

export default LeaveFeedbackContent
