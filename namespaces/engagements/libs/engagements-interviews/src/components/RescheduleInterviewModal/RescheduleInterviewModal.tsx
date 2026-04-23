import { concatMessages, useQuery } from '@staff-portal/data-layer-service'
import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { isOperationEnabled } from '@staff-portal/operations'
import { lazy } from '@staff-portal/utils'
import { Alert } from '@toptal/picasso'
import React, { useMemo } from 'react'

import { extractScheduleOperation } from '../../utils'
import { GetRescheduleInterviewOperationDocument } from './data'

const RescheduleInterviewModalContent = lazy(
  () =>
    import(
      './components/RescheduleInterviewModalContent/RescheduleInterviewModalContent'
    )
)

export type Props = {
  hideModal: () => void
  interviewId: string
}

const RescheduleInterviewModal = ({ hideModal, interviewId }: Props) => {
  const { data, loading, error } = useQuery(
    GetRescheduleInterviewOperationDocument,
    {
      variables: { interviewId }
    }
  )

  const content = useMemo(() => {
    if (loading) {
      return <ModalSuspender />
    }

    const operation = extractScheduleOperation([
      data?.node?.operations.clearAndRescheduleSingleCommitInterview,
      data?.node?.operations.clearAndChangeInterviewProposedTimeSlots
    ])

    if (!isOperationEnabled(operation)) {
      const errorMessage = concatMessages(operation?.messages) ?? error?.message

      return (
        <>
          <Modal.Title>Reschedule Interview</Modal.Title>
          <Modal.Content>
            <Alert>{errorMessage}</Alert>
          </Modal.Content>
        </>
      )
    }

    return (
      <RescheduleInterviewModalContent
        hideModal={hideModal}
        interviewId={interviewId}
      />
    )
  }, [
    data?.node?.operations.clearAndChangeInterviewProposedTimeSlots,
    data?.node?.operations.clearAndRescheduleSingleCommitInterview,
    error?.message,
    hideModal,
    interviewId,
    loading
  ])

  return (
    <Modal open onClose={hideModal} data-testid='reschedule-interview-modal'>
      {content}
    </Modal>
  )
}

export default RescheduleInterviewModal
