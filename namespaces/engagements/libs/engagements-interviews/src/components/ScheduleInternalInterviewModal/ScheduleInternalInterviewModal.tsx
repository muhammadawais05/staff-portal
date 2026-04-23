import { concatMessages, useQuery } from '@staff-portal/data-layer-service'
import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { isOperationEnabled } from '@staff-portal/operations'
import { lazy } from '@staff-portal/utils'
import { Alert } from '@toptal/picasso'
import React, { useMemo } from 'react'

import { extractScheduleInternalInterviewOperation } from '../../utils'
import { GetEngagementScheduleInternalInterviewOperationDocument } from './data'

const ScheduleInternalInterviewModalContent = lazy(
  () =>
    import(
      './components/ScheduleInternalInterviewModalContent/ScheduleInternalInterviewModalContent'
    )
)

export type Props = {
  engagementId: string
  hideModal: () => void
}

const ScheduleInternalInterviewModal = ({ hideModal, engagementId }: Props) => {
  const { data, loading, error } = useQuery(
    GetEngagementScheduleInternalInterviewOperationDocument,
    {
      variables: { engagementId }
    }
  )

  const content = useMemo(() => {
    if (loading) {
      return <ModalSuspender />
    }

    const operation = extractScheduleInternalInterviewOperation({
      latestInternalInterview: data?.node?.latestInternalInterview?.nodes[0],
      newInternalInterview: data?.node?.newInternalInterview
    })

    if (!isOperationEnabled(operation)) {
      const errorMessage = concatMessages(operation?.messages) ?? error?.message

      return (
        <>
          <Modal.Title>Schedule Internal Interview</Modal.Title>
          <Modal.Content>
            <Alert>{errorMessage}</Alert>
          </Modal.Content>
        </>
      )
    }

    return (
      <ScheduleInternalInterviewModalContent
        hideModal={hideModal}
        engagementId={engagementId}
      />
    )
  }, [
    data?.node?.latestInternalInterview?.nodes,
    data?.node?.newInternalInterview,
    engagementId,
    error?.message,
    hideModal,
    loading
  ])

  return (
    <Modal
      open
      onClose={hideModal}
      data-testid='schedule-internal-interview-modal'
    >
      {content}
    </Modal>
  )
}

export default ScheduleInternalInterviewModal
