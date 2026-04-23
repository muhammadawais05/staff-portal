import { Menu } from '@toptal/picasso'
import React, { useState } from 'react'
import { isOperationHidden } from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'
import { MenuLink, MoreButton } from '@staff-portal/ui'
import {
  ScheduleInternalInterviewItem,
  extractScheduleInternalInterviewOperation,
  extractRescheduleInternalInterviewOperation,
  RescheduleInternalInterviewItem
} from '@staff-portal/engagements-interviews'
import {
  CancelEngagementDraftMenuItem,
  RejectWithFeedbackMenuItem,
  RestoreCancelledEngagementMenuItem
} from '@staff-portal/engagements'

import { isPitchSnippetEngagement } from '../../../../../../utils/is-pitch-snippet-engagement'
import { useSendTestEmailModal } from '../SendTestEmailModal/hooks/use-send-test-email-modal'
import ApproveDraftEngagementMenuItem from '../ApproveDraftEngagementMenuItem'
import { CandidateIntroDraftItem } from '../../../../../../types'
import GeneratePitchSnippetsModal from '../../../../../PitchSnippets/components/GeneratePitchSnippetsModal/GeneratePitchSnippetsModal'

export interface Props {
  candidate: CandidateIntroDraftItem & {
    operations: Pick<
      CandidateIntroDraftItem['operations'],
      | 'sendEngagementTalentIntroductionTestEmail'
      | 'rejectDraftEngagement'
      | 'approveDraftEngagement'
      | 'cancelEngagementDraftInInterview'
      | 'restoreCancelledEngagement'
    >
  }
}

// eslint-disable-next-line complexity
const CandidateIntroDraftsMoreDropdown = ({ candidate }: Props) => {
  const {
    id: engagementId,
    newInternalInterview,
    resumeUrl: engagementResumeUrl,
    talent,
    operations: {
      sendEngagementTalentIntroductionTestEmail,
      rejectDraftEngagement,
      approveDraftEngagement,
      cancelEngagementDraftInInterview,
      restoreCancelledEngagement
    }
  } = candidate
  const latestInternalInterview = candidate.latestInternalInterview?.nodes?.[0]
  const [isOperationLoading, setIsOperationLoading] = useState(false)

  const rescheduleInternalInterviewOperation =
    extractRescheduleInternalInterviewOperation({
      latestInternalInterview,
      newInternalInterview
    })

  const handleOperationClick = (checkOperation: () => void) => () => {
    setIsOperationLoading(true)
    checkOperation()
  }

  const {
    renderModal: renderSendTestEmailModal,
    renderLazyOperation: renderSendTestEmailOperation
  } = useSendTestEmailModal({
    engagementId,
    initialOperation: sendEngagementTalentIntroductionTestEmail,
    onLazyOperationSettled: () => setIsOperationLoading(false)
  })

  const { showModal } = useModal(GeneratePitchSnippetsModal, {
    engagementIds: [engagementId]
  })

  const isPitchSnippetEngagementActionAvailable =
    isPitchSnippetEngagement(candidate)
  const loading = isOperationLoading

  const scheduleInternalInterviewOperation =
    extractScheduleInternalInterviewOperation({
      latestInternalInterview,
      newInternalInterview
    })

  const isNewResumeUrl =
    engagementResumeUrl && engagementResumeUrl !== talent?.resumeUrl

  const actions =
    !isOperationHidden(sendEngagementTalentIntroductionTestEmail) ||
    !isOperationHidden(rejectDraftEngagement) ||
    !isOperationHidden(approveDraftEngagement) ||
    !isOperationHidden(cancelEngagementDraftInInterview) ||
    !isOperationHidden(restoreCancelledEngagement) ||
    !isOperationHidden(scheduleInternalInterviewOperation) ||
    !isOperationHidden(rescheduleInternalInterviewOperation) ||
    isPitchSnippetEngagementActionAvailable ||
    isNewResumeUrl

  return (
    <>
      {actions && (
        <MoreButton loading={loading}>
          {isNewResumeUrl && (
            <Menu.Item as={MenuLink} target='_blank' href={engagementResumeUrl} rel="noreferrer">
              View Resume
            </Menu.Item>
          )}
          <RescheduleInternalInterviewItem
            componentType='menu-item'
            newInternalInterview={newInternalInterview}
            latestInternalInterview={latestInternalInterview}
          />

          <ScheduleInternalInterviewItem
            componentType='menu-item'
            engagementId={engagementId}
            latestInternalInterview={latestInternalInterview}
            newInternalInterview={newInternalInterview}
          />

          <CancelEngagementDraftMenuItem
            engagementId={engagementId}
            operation={cancelEngagementDraftInInterview}
          />

          <RestoreCancelledEngagementMenuItem
            engagementId={engagementId}
            operation={restoreCancelledEngagement}
          />

          {renderSendTestEmailOperation(({ checkOperation, disabled }) => (
            <Menu.Item
              disabled={disabled}
              onClick={handleOperationClick(checkOperation)}
            >
              Send Test Email
            </Menu.Item>
          ))}

          {isPitchSnippetEngagementActionAvailable && (
            <Menu.Item onClick={showModal}>View Pitch Snippet</Menu.Item>
          )}

          <RejectWithFeedbackMenuItem
            engagementId={engagementId}
            operation={rejectDraftEngagement}
          />

          <ApproveDraftEngagementMenuItem
            engagementId={engagementId}
            operation={approveDraftEngagement}
          />
        </MoreButton>
      )}

      {renderSendTestEmailModal()}
    </>
  )
}

export default CandidateIntroDraftsMoreDropdown
