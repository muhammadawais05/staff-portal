import React from 'react'
import { Button, Typography } from '@toptal/picasso'
import { Modal, useModal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useCompleteMeeting } from '../../data'
import MeetingMarkAsCompletedWithSurveyModal from '../MeetingMarkAsCompletedWithSurveyModal'

export interface Props {
  meetingId: string
  hideModal: () => void
}

const MeetingMarkAsCompletedWithSurveyConfirmationModal = ({
  meetingId,
  hideModal
}: Props) => {
  const { handleMutationResult } = useHandleMutationResult()
  const [completeMeeting, { loading: completeMeetingLoading }] =
    useCompleteMeeting()
  const { showModal: showSurveyModal } = useModal(
    MeetingMarkAsCompletedWithSurveyModal,
    { meetingId }
  )

  const handleSkipSurveyClick = async () => {
    const { data, errors } = await completeMeeting({
      variables: {
        meetingId
      }
    })

    return handleMutationResult({
      mutationResult: data?.completeMeeting,
      successNotificationMessage: 'Meeting was marked as "Completed"',
      onSuccessAction: hideModal,
      rootLevelErrors: errors
    })
  }

  const handleSubmitSurveyClick = () => {
    hideModal()
    showSurveyModal()
  }

  return (
    <Modal open onClose={hideModal}>
      <Modal.Title>
        Do you want to submit the talent objection survey?
      </Modal.Title>

      <Modal.Content>
        <Typography>
          Surveys should be submitted for organic talent sourcing calls only.
        </Typography>
        <Typography>
          Skipping the survey still marks the meeting as completed.
        </Typography>
      </Modal.Content>

      <Modal.Actions>
        <Button
          variant='secondary'
          onClick={handleSkipSurveyClick}
          disabled={completeMeetingLoading}
          loading={completeMeetingLoading}
        >
          Skip Survey
        </Button>
        <Button
          variant='positive'
          onClick={handleSubmitSurveyClick}
          disabled={completeMeetingLoading}
        >
          Submit Survey
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default MeetingMarkAsCompletedWithSurveyConfirmationModal
