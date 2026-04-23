import { NodeType } from '@staff-portal/graphql'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import React, { useCallback } from 'react'

import { CancelMeetingDocument } from './data'
import { useCancelMeetingActions } from './hooks/use-cancel-meeting-actions'

export interface Props {
  meetingId: string
  hideModal: () => void
}

const MeetingCancelModal = ({ meetingId, hideModal }: Props) => {
  const { cancelSuccessHandler } = useCancelMeetingActions(meetingId)

  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler({
      mutationDocument: CancelMeetingDocument,
      mutationResultOptions: {
        successNotificationMessage: 'Meeting was canceled.',
        onSuccessAction: result => {
          hideModal()
          cancelSuccessHandler(result)
        }
      },
      errorNotificationMessage: 'An error occurred, meeting was not canceled.'
    })

  const handleSubmit = useCallback(
    (comment = '') => handleMutationSubmit({ meetingId, comment }),
    [handleMutationSubmit, meetingId]
  )

  return (
    <ConfirmationModal
      operationVariables={{
        nodeId: meetingId,
        nodeType: NodeType.MEETING,
        operationName: 'cancelMeeting'
      }}
      loading={loading}
      variant='negative'
      required
      label='Comment'
      textFieldName='comment'
      title='Cancel the Meeting'
      submitText='Confirm Cancellation'
      onSubmit={handleSubmit}
      onClose={hideModal}
    />
  )
}

export default MeetingCancelModal
