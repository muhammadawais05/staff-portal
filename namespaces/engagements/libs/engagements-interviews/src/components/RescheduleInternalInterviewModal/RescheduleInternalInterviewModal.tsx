import { concatMessages, useQuery } from '@staff-portal/data-layer-service'
import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { isOperationEnabled } from '@staff-portal/operations'
import { lazy } from '@staff-portal/utils'
import { Alert } from '@toptal/picasso'
import React, { useMemo } from 'react'

import { extractScheduleOperation } from '../../utils'
import { GetRescheduleInternalInterviewOperationDocument } from './data'

const RescheduleInternalInterviewModalContent = lazy(
  () =>
    import(
      './components/RescheduleInternalInterviewModalContent/RescheduleInternalInterviewModalContent'
    )
)

export type Props = {
  interviewId: string
  hideModal: () => void
}

const RescheduleInternalInterviewModal = ({
  interviewId,
  hideModal
}: Props) => {
  const { data, loading, error } = useQuery(
    GetRescheduleInternalInterviewOperationDocument,
    { variables: { interviewId } }
  )

  const content = useMemo(() => {
    if (loading) {
      return <ModalSuspender />
    }

    const operation = extractScheduleOperation([
      data?.node?.operations.clearAndRescheduleInternalSingleCommitInterview,
      data?.node?.operations.clearAndChangeInternalInterviewProposedTimeSlots
    ])

    if (!isOperationEnabled(operation)) {
      const errorMessage = concatMessages(operation?.messages) ?? error?.message

      return (
        <>
          <Modal.Title>Reschedule Internal Interview</Modal.Title>
          <Modal.Content>
            <Alert>{errorMessage}</Alert>
          </Modal.Content>
        </>
      )
    }

    return (
      <RescheduleInternalInterviewModalContent
        hideModal={hideModal}
        interviewId={interviewId}
      />
    )
  }, [
    data?.node?.operations.clearAndChangeInternalInterviewProposedTimeSlots,
    data?.node?.operations.clearAndRescheduleInternalSingleCommitInterview,
    error?.message,
    hideModal,
    interviewId,
    loading
  ])

  return (
    <Modal
      open
      onClose={hideModal}
      data-testid='RescheduleInternalInterviewModal'
    >
      {content}
    </Modal>
  )
}

export default RescheduleInternalInterviewModal
