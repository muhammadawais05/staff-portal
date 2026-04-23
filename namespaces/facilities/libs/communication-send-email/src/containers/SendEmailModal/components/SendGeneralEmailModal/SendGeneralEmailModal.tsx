import { GetLazyOperationVariables } from '@staff-portal/operations'
import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { lazy } from '@staff-portal/utils'

import { ContactCompanyPayload } from '../../types'

const SendGeneralEmailModalContent = lazy(
  () => import('../SendGeneralEmailModalContent/SendGeneralEmailModalContent')
)

export type SendGeneralEmailModalProps = {
  nodeId: string
  preselectedEmailTemplateId?: string
  operationVariables?: GetLazyOperationVariables
  hideModal: () => void
  onCompleted?: (data?: ContactCompanyPayload) => void
}

const SendGeneralEmailModal = ({
  nodeId,
  preselectedEmailTemplateId,
  operationVariables,
  hideModal,
  onCompleted
}: SendGeneralEmailModalProps) => (
  <Modal
    open
    onClose={hideModal}
    size='large'
    operationVariables={operationVariables}
    data-testid='send-email-modal'
  >
    <SendGeneralEmailModalContent
      nodeId={nodeId}
      preselectedEmailTemplateId={preselectedEmailTemplateId}
      onCompleted={onCompleted}
      hideModal={hideModal}
    />
  </Modal>
)

export default SendGeneralEmailModal
