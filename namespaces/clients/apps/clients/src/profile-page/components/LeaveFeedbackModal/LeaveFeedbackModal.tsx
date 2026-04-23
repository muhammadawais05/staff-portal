import React from 'react'
import { Link } from '@staff-portal/graphql/staff'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { lazy } from '@staff-portal/utils'

import { SurveyEngagementFragment } from '../../data/survey-engagement-fragment'
import { TITLE } from './components'

interface Props {
  hideModal: () => void
  companyId: string
  companyWebResource: Link
  engagements: SurveyEngagementFragment['engagements']
}

const LeaveFeedbackModalContent = lazy(
  () =>
    import('./components/LeaveFeedbackModalContent/LeaveFeedbackModalContent')
)

const LeaveFeedbackModal = ({
  companyId,
  companyWebResource,
  hideModal,
  engagements
}: Props) => {
  return (
    <Modal
      open
      onClose={hideModal}
      operationVariables={{
        nodeId: companyId,
        nodeType: NodeType.CLIENT,
        operationName: 'leaveFeedbackClient'
      }}
      defaultTitle={TITLE}
      data-testid='leave-feedback-modal'
    >
      <LeaveFeedbackModalContent
        hideModal={hideModal}
        companyId={companyId}
        engagements={engagements}
        webResource={companyWebResource}
      />
    </Modal>
  )
}

export default LeaveFeedbackModal
