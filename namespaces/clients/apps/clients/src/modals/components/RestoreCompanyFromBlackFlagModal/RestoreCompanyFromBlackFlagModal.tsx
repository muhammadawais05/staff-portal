import { useMutation } from '@staff-portal/data-layer-service'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import React from 'react'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'
import { CLIENT_UPDATED } from '@staff-portal/clients'
import { lazy } from '@staff-portal/utils'

import { RestoreClientFromBlackFlagDocument } from './data'

const Content = lazy(
  () =>
    import(
      '../RestoreCompanyFromBlackFlagModalContent/RestoreCompanyFromBlackFlagModalContent'
    )
)

export interface Props {
  companyId: string
  hideModal: () => void
}

const RestoreCompanyFromBlackFlagModal = ({ companyId, hideModal }: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const [restoreClientFromBlackFlag, { loading }] = useMutation(
    RestoreClientFromBlackFlagDocument,
    {
      onError: () =>
        showError('An error occurred, the company has not been restored.')
    }
  )

  const handleSubmit = async (comment = '') => {
    const { data } = await restoreClientFromBlackFlag({
      variables: { clientId: companyId, comment }
    })

    return handleMutationResult({
      mutationResult: data?.restoreClientFromBlackFlag,
      successNotificationMessage:
        'Company has been restored from Black Flag status.',
      onSuccessAction: () => {
        hideModal()
        emitMessage(CLIENT_UPDATED, { companyId })
      }
    })
  }

  return (
    <ConfirmationModal
      variant='positive'
      required
      label='Comment'
      title='Restore Client From Black Flag Status'
      submitText='Restore From Black Flag'
      placeholder='Please specify a good reason.'
      textFieldName='comment'
      onSubmit={handleSubmit}
      onClose={hideModal}
      loading={loading}
      message={<Content companyId={companyId} />}
      operationVariables={{
        nodeId: companyId,
        nodeType: NodeType.CLIENT,
        operationName: 'restoreClientFromBlackFlag'
      }}
    />
  )
}

export default RestoreCompanyFromBlackFlagModal
