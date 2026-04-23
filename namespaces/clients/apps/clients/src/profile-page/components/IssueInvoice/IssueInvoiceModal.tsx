import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { DocumentNode } from '@staff-portal/data-layer-service'
import { lazy } from '@staff-portal/utils'

export interface Props {
  modalTitle: string
  hideModal: () => void
  clientId: string
  companyName: string
  mutationResultName: string
  mutationDocument: DocumentNode
  successNotificationMessage: string
  showSendNotifications?: boolean
}

const IssueInvoiceModalContent = lazy(
  () => import('./components/IssueInvoiceModalContent')
)

const IssueInvoiceModal = (props: Props) => (
  <Modal
    withForm
    open
    onClose={props.hideModal}
    data-testid='issue-invoice-modal'
  >
    <IssueInvoiceModalContent {...props} />
  </Modal>
)

export default IssueInvoiceModal
