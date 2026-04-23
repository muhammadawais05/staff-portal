import { useNotifications } from '@toptal/picasso/utils'
import React from 'react'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'
import { CLIENT_UPDATED } from '@staff-portal/clients'

import { useRestoreClient } from './data'

export interface Props {
  companyId: string
  hideModal: () => void
  onSuccess?: () => void
  onClose?: () => void
}

const RestoreApplicationModal = ({
  companyId,
  hideModal,
  onSuccess,
  onClose
}: Props) => {
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const { handleMutationResult } = useHandleMutationResult()
  const [restoreClient, { loading }] = useRestoreClient({
    onCompleted: () => emitMessage(CLIENT_UPDATED, { companyId }),
    onError: () =>
      showError('An error occurred, the Company Application was not restored.')
  })

  const handleSubmit = async (comment = '') => {
    const { data } = await restoreClient({
      variables: {
        input: {
          clientId: companyId,
          comment
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.restoreClient,
      successNotificationMessage: 'The Applicant was successfully restored.',
      onSuccessAction: () => {
        onSuccess?.()
        hideModal()
      }
    })
  }

  const handleClose = () => {
    onClose?.()
    hideModal()
  }

  return (
    <ConfirmationModal
      required
      loading={loading}
      variant='positive'
      label='Comment'
      textFieldName='comment'
      title='Restore Application'
      placeholder='Please specify a reason'
      message='Do you really want to restore this application?'
      submitText='Restore Application'
      onSubmit={handleSubmit}
      onClose={handleClose}
      operationVariables={{
        nodeId: companyId,
        nodeType: NodeType.CLIENT,
        operationName: 'restoreClient'
      }}
    />
  )
}

export default RestoreApplicationModal
