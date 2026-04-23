import { useModal } from '@staff-portal/modals-service'

import {
  CreateClientDepositInvoiceDocument,
  CreateClientServiceInvoiceDocument
} from '../data'
import IssueInvoiceModal from '../IssueInvoiceModal'

const useCreateInvoiceModals = ({
  clientId,
  companyName
}: {
  clientId: string
  companyName: string
}) => {
  const { showModal: showIssueDepositInvoiceModal } = useModal(
    IssueInvoiceModal,
    {
      modalTitle: 'Issue a Deposit Invoice',
      clientId,
      companyName,
      mutationDocument: CreateClientDepositInvoiceDocument,
      mutationResultName: 'createClientDepositInvoice',
      successNotificationMessage:
        'The Deposit Invoice was successfully created.',
      showSendNotifications: true
    }
  )

  const { showModal: showIssueServiceInvoiceModal } = useModal(
    IssueInvoiceModal,
    {
      modalTitle: `Issue an Invoice for ${companyName}`,
      clientId,
      companyName,
      mutationDocument: CreateClientServiceInvoiceDocument,
      mutationResultName: 'createClientServiceInvoice',
      successNotificationMessage: 'The Invoice was successfully created.'
    }
  )

  return {
    showIssueServiceInvoiceModal,
    showIssueDepositInvoiceModal
  }
}

export default useCreateInvoiceModals
