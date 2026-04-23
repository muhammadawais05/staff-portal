import { concatMessages, useQuery } from '@staff-portal/data-layer-service'
import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { isOperationEnabled } from '@staff-portal/operations'
import { lazy } from '@staff-portal/utils'
import { Alert } from '@toptal/picasso'
import React, { useMemo } from 'react'

import { extractScheduleInterviewOperation } from '../../utils'
import { GetEngagementScheduleInterviewOperationDocument } from './data'

const ScheduleInterviewModalContent = lazy(
  () =>
    import(
      './components/ScheduleInterviewModalContent/ScheduleInterviewModalContent'
    )
)

export type Props = {
  engagementId: string
  additionalInterview?: boolean
  hideModal: () => void
}

const ScheduleInterviewModal = ({
  engagementId,
  additionalInterview,
  hideModal
}: Props) => {
  const { data, loading, error } = useQuery(
    GetEngagementScheduleInterviewOperationDocument,
    { variables: { engagementId } }
  )

  const content = useMemo(() => {
    if (loading) {
      return <ModalSuspender />
    }

    const operation = extractScheduleInterviewOperation({
      additionalInterview,
      latestExternalInterview: data?.node?.latestExternalInterview?.nodes[0],
      newExternalInterview: data?.node?.newExternalInterview
    })

    if (!isOperationEnabled(operation)) {
      const errorMessage = concatMessages(operation?.messages) ?? error?.message

      return (
        <>
          <Modal.Title>Schedule Interview</Modal.Title>
          <Modal.Content>
            <Alert>{errorMessage}</Alert>
          </Modal.Content>
        </>
      )
    }

    return (
      <ScheduleInterviewModalContent
        hideModal={hideModal}
        engagementId={engagementId}
      />
    )
  }, [
    additionalInterview,
    data?.node?.latestExternalInterview?.nodes,
    data?.node?.newExternalInterview,
    engagementId,
    error?.message,
    hideModal,
    loading
  ])

  return (
    <Modal open onClose={hideModal} data-testid='schedule-interview-modal'>
      {content}
    </Modal>
  )
}

export default ScheduleInterviewModal
