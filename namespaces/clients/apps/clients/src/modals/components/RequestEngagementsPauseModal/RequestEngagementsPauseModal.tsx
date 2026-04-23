import React, { useCallback } from 'react'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'
import { CLIENT_UPDATED } from '@staff-portal/clients'

import { RequestClientEngagementsPauseDocument } from './data'

export interface Props {
  companyId: string
  hideModal: () => void
}

const RequestEngagementsPauseModal = ({ companyId, hideModal }: Props) => {
  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler({
      mutationDocument: RequestClientEngagementsPauseDocument,
      mutationResultOptions: {
        successMessageEmitOptions: {
          type: CLIENT_UPDATED,
          payload: { companyId }
        },
        isFormSubmit: true,
        successNotificationMessage:
          'The Engagements Pause Request was successfully sent to the engagement matcher.',
        onSuccessAction: () => {
          hideModal()
        }
      }
    })

  const handleSubmit = useCallback(
    (comment?: string) =>
      handleMutationSubmit({
        clientId: companyId,
        comment: comment ?? ''
      }),
    [handleMutationSubmit, companyId]
  )

  return (
    <ConfirmationModal
      required
      loading={loading}
      variant='positive'
      label='Comment'
      textFieldName='comment'
      title='Request Engagements Pause'
      placeholder='Please specify a reason.'
      message='Please specify your reason for requesting a pause on all company engagements. Your matcher(s) will be notified.'
      submitText='Request Engagements Pause'
      onSubmit={handleSubmit}
      onClose={hideModal}
      operationVariables={{
        nodeId: companyId,
        nodeType: NodeType.CLIENT,
        operationName: 'requestClientEngagementsPause'
      }}
    />
  )
}

export default RequestEngagementsPauseModal
