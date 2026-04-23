import React from 'react'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { CLIENT_UPDATED } from '@staff-portal/clients'
import { NodeType } from '@staff-portal/graphql'

import { RestoreClientFromBadLeadDocument } from './data'
import {
  RESTORE_FROM_BAD_LEAD_SUBMIT_BUTTON,
  RESTORE_FROM_BAD_LEAD_TITLE
} from '../config'
import { getRestoreFromBadLeadMessage } from '../utils'

interface Props {
  clientId: string
  clientName: string
  hideModal: () => void
}

const RestoreFromBadLeadModal = ({
  clientId,
  clientName,
  hideModal
}: Props) => {
  const { handleSubmit, loading } = useModalFormChangeHandler({
    mutationDocument: RestoreClientFromBadLeadDocument,
    mutationResultOptions: {
      onSuccessAction: hideModal,
      successNotificationMessage:
        'Client has been restored from Bad Lead status.',
      successMessageEmitOptions: {
        type: CLIENT_UPDATED,
        payload: { companyId: clientId }
      }
    }
  })

  const onSubmit = (value?: string) =>
    handleSubmit({ clientId, comment: value || '' })

  return (
    <ConfirmationModal
      open
      required
      message={getRestoreFromBadLeadMessage(clientName)}
      data-testid='restore-from-bad-lead-modal'
      title={RESTORE_FROM_BAD_LEAD_TITLE}
      variant='positive'
      submitText={RESTORE_FROM_BAD_LEAD_SUBMIT_BUTTON}
      label='Comment'
      textFieldName='comment'
      placeholder='Please specify a reason.'
      loading={loading}
      onClose={hideModal}
      onSubmit={onSubmit}
      operationVariables={{
        nodeId: clientId,
        nodeType: NodeType.CLIENT,
        operationName: 'restoreClientFromBadLead'
      }}
    />
  )
}

export default RestoreFromBadLeadModal
