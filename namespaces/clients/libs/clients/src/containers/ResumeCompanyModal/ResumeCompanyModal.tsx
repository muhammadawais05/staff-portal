import { useMutation } from '@staff-portal/data-layer-service'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import React from 'react'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'

import { CLIENT_UPDATED } from '../../messages'
import { ResumeClientDocument } from './data'

const TITLE = 'Resume Company'

export interface Props {
  companyId: string
  hideModal: () => void
  onResumeCompany?: () => void
  onClose?: () => void
}

const ResumeCompanyModal = ({
  companyId,
  hideModal,
  onResumeCompany,
  onClose
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const [resumeClient, { loading }] = useMutation(ResumeClientDocument, {
    onError: () =>
      showError('An error occurred, the company has not been resumed.')
  })

  const handleSubmit = async (comment = '') => {
    const { data } = await resumeClient({
      variables: { clientId: companyId, comment }
    })

    return handleMutationResult({
      mutationResult: data?.resumeClient,
      successNotificationMessage: 'Company has been resumed.',
      onSuccessAction: () => {
        hideModal()
        onResumeCompany?.()
        emitMessage(CLIENT_UPDATED, { companyId })
      }
    })
  }

  const handleClose = () => {
    hideModal()
    onClose?.()
  }

  return (
    <ConfirmationModal
      variant='positive'
      required
      label='Comment'
      title={TITLE}
      submitText={TITLE}
      textFieldName='comment'
      onSubmit={handleSubmit}
      onClose={handleClose}
      loading={loading}
      message='Are you sure you want to resume this company and return it to
      previous state?'
      operationVariables={{
        nodeId: companyId,
        nodeType: NodeType.CLIENT,
        operationName: 'resumeClient'
      }}
    />
  )
}

export default ResumeCompanyModal
